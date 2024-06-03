import scrapy
from datetime import datetime
import numpy as np
import pymysql
import json

class AladinBestSpider(scrapy.Spider):
    name = "aladin_best"
    allowed_domains = ["www.aladin.co.kr"]

    def __init__(self, cid=None, year=None, *args, **kwargs):
        super(AladinBestSpider, self).__init__(*args, **kwargs)
        self.cid = cid
        self.year = year
        self.today = datetime.today()

        # MySQL 연결 설정
        self.connection = pymysql.connect(
            host='localhost',
            port=3306,
            user='root',
            password='',
            db='write_now',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )

    def close(self, reason):
        self.connection.close()

    def start_requests(self):
        for month in range(12, 0, -1): # month 범위
            urls = [
                f'https://www.aladin.co.kr/shop/common/wbest.aspx?BestType=MonthlyBest&BranchType=1&CID={self.cid}&Year={self.year}&Month={month:02d}&page={page}&cnt=100000&SortOrder=5'
                for page in range(1, 151)
            ]

            for url in urls:
                yield scrapy.Request(url=url, callback=self.parse, cb_kwargs={'year': self.year, 'month': month})

    def parse(self, response, year, month):
        id = response.css('div#newbg_body div.ss_book_box::attr(itemid)').getall()
        publication_date_bef = response.xpath('//div[@class="ss_book_list"][1]/ul/li[last()-2]/text()[last()]').getall()
        publication_date = [date[3:] for date in publication_date_bef]
        category = response.css('td.megaseller_t2 > font::text').get()
        title = response.css('.ss_book_list > ul > li:nth-last-child(4) > a > b::text').getall()
        author = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(3) > a:nth-child(1)::text').getall()
        publisher = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(3) > a:nth-last-child(1)::text').getall()
        list_price = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(2) > span:nth-child(1)::text').getall()
        selling_price = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(2) > span.ss_p2 > b > span::text').getall()
        sales_point = response.css('.ss_book_list:nth-child(1) > ul > li:nth-last-child(1) > b::text').getall()

        year = int(year)
        month = int(month)
        
        for id, title, publication_date, author, publisher, list_price, selling_price, sales_point in zip(id, title, publication_date, author, publisher, list_price, selling_price, sales_point):
            id = int(id)
            list_price = int(list_price.replace(',', ''))
            selling_price = int(selling_price.replace(',', ''))
            sales_point = int(sales_point.replace(',', ''))

            data = {
                'id': id,
                'title': title,
                'category': category,
                'publication_date': publication_date,
                'author': author,
                'publisher': publisher,
                'list_price': list_price,
                'selling_price': selling_price,
                'sales_point': sales_point,
                'crawled_at': datetime.today()
            }

            self.save_to_db(data, year, month)

    def save_to_db(self, data, year, month):
        try:
            with self.connection.cursor() as cursor:
                # 데이터가 이미 존재하는지 확인
                check_sql = "SELECT COUNT(*) FROM raw_books WHERE JSON_EXTRACT(raw_book, '$.id') = %s"
                cursor.execute(check_sql, (data['id'],))
                result = cursor.fetchone()

                # datetime 타입을 ISO 형식의 문자열로 변환
                data['crawled_at'] = data['crawled_at'].isoformat()

                year = int(year)
                month = int(month)

                if result['COUNT(*)'] > 0: # 데이터가 이미 존재하면 sales_point에 수식 적용
                    data['sales_point'] = round(data['sales_point'] * np.exp(-0.1 * ((self.today.year - year) * 12 + self.today.month - month)), 2)
                    
                    data_json = json.dumps(data, ensure_ascii=False)
                    
                    insert_sql = """
                    INSERT INTO raw_books (raw_book)
                    VALUES (%s)
                    """
                    cursor.execute(insert_sql, (data_json,))
                else: # 데이터가 존재하지 않으면 원래 데이터 삽입
                    data_json = json.dumps(data, ensure_ascii=False)
                    
                    insert_sql = """
                    INSERT INTO raw_books (raw_book)
                    VALUES (%s)
                    """
                    cursor.execute(insert_sql, (data_json,))

            self.connection.commit()
        except Exception as e:
            self.connection.rollback()
            self.logger.error(f"Error saving to DB: {e}")