use write_now;

set collation_connection = 'utf8mb4_general_ci';
set names utf8mb4;


insert into bookstores (alias, name, website_uri)
values ('aladin', '알라딘', 'https://www.aladin.co.kr')
on duplicate key update alias=alias,
                        name=name,
                        website_uri=website_uri;


set @aladin_bookstore_id = null;
select id
into @aladin_bookstore_id
from bookstores bs
where bs.alias = 'aladin';


insert into book_categories (name, store_code, parents, store_id)
values ('종합', '0', '국내도서', @aladin_bookstore_id),
       ('건강/취미', '55890', '국내도서', @aladin_bookstore_id),
       ('건강운동', '53516', '국내도서', @aladin_bookstore_id),
       ('건강정보', '53521', '국내도서', @aladin_bookstore_id),
       ('걷기/육상스포츠', '53522', '국내도서', @aladin_bookstore_id),
       ('골프', '53524', '국내도서', @aladin_bookstore_id),
       ('공예', '53532', '국내도서', @aladin_bookstore_id),
       ('글씨 쓰기', '161753', '국내도서', @aladin_bookstore_id),
       ('스티커북', '147647', '국내도서', @aladin_bookstore_id),
       ('컬러링북', '114987', '국내도서', @aladin_bookstore_id),
       ('구기', '53525', '국내도서', @aladin_bookstore_id),
       ('낚시', '53528', '국내도서', @aladin_bookstore_id),
       ('다이어트', '53514', '국내도서', @aladin_bookstore_id),
       ('대체의학', '53520', '국내도서', @aladin_bookstore_id),
       ('등산/캠핑', '53529', '국내도서', @aladin_bookstore_id),
       ('무예/무술', '53526', '국내도서', @aladin_bookstore_id),
       ('바둑/장기', '53530', '국내도서', @aladin_bookstore_id),
       ('반려동물', '53534', '국내도서', @aladin_bookstore_id),
       ('수영/수상스포츠', '53523', '국내도서', @aladin_bookstore_id),
       ('스포츠/레저 기타', '53527', '국내도서', @aladin_bookstore_id),
       ('원예', '53533', '국내도서', @aladin_bookstore_id),
       ('재난/생존/서바이벌', '140262', '국내도서', @aladin_bookstore_id),
       ('정신건강', '53517', '국내도서', @aladin_bookstore_id),
       ('질병치료와 예방', '53518', '국내도서', @aladin_bookstore_id),
       ('취미기타', '53535', '국내도서', @aladin_bookstore_id),
       ('퍼즐/스도쿠/퀴즈', '53531', '국내도서', @aladin_bookstore_id),
       ('한의학', '53519', '국내도서', @aladin_bookstore_id),
       ('헬스/피트니스', '53515', '국내도서', @aladin_bookstore_id),
       ('경제경영', '170', '국내도서', @aladin_bookstore_id),
       ('고전', '2105', '국내도서', @aladin_bookstore_id),
       ('과학', '987', '국내도서', @aladin_bookstore_id),
       ('대학교재/전문서적', '8257', '국내도서', @aladin_bookstore_id),
       ('만화', '2551', '국내도서', @aladin_bookstore_id),
       ('달력/기타', '4395', '국내도서', @aladin_bookstore_id),
       ('사회과학', '798', '국내도서', @aladin_bookstore_id),
       ('소설/시/희곡', '1', '국내도서', @aladin_bookstore_id),
       ('수험서/자격증', '1383', '국내도서', @aladin_bookstore_id),
       ('어린이', '1108', '국내도서', @aladin_bookstore_id),
       ('에세이', '55889', '국내도서', @aladin_bookstore_id),
       ('여행', '1196', '국내도서', @aladin_bookstore_id),
       ('역사', '74', '국내도서', @aladin_bookstore_id),
       ('예술/대중문화', '517', '국내도서', @aladin_bookstore_id),
       ('요리/살림', '1230', '국내도서', @aladin_bookstore_id),
       ('외국어', '1322', '국내도서', @aladin_bookstore_id),
       ('유아', '13789', '국내도서', @aladin_bookstore_id),
       ('인문학', '656', '국내도서', @aladin_bookstore_id),
       ('자기계발', '336', '국내도서', @aladin_bookstore_id),
       ('장르소설', '112011', '국내도서', @aladin_bookstore_id),
       ('잡지', '2913', '국내도서', @aladin_bookstore_id),
       ('전집/중고전집', '17195', '국내도서', @aladin_bookstore_id),
       ('종교/역학', '1237', '국내도서', @aladin_bookstore_id),
       ('좋은부모', '2030', '국내도서', @aladin_bookstore_id),
       ('청소년', '1137', '국내도서', @aladin_bookstore_id),
       ('컴퓨터/모바일', '351', '국내도서', @aladin_bookstore_id),
       ('초등학교참고서', '50246', '국내도서', @aladin_bookstore_id),
       ('중학교참고서', '76000', '국내도서', @aladin_bookstore_id),
       ('고등학교참고서', '76001', '국내도서', @aladin_bookstore_id)
on duplicate key update name=name,
                        parents=parents,
                        store_code=store_code,
                        store_id=store_id;


drop view if exists v_raw_books_with_cap;
create view v_raw_books_with_cap as
select jt.id                                                                as store_code,
       jt.raw_title                                                         as title,
       json_object('name', jt.raw_author)                                   as author,
       json_object('name', jt.raw_publisher)                                as publisher,
       1                                                                    as edition,
       json_merge_patch(json_object(),
                        json_object('list_price', jt.raw_list_price),
                        json_object('selling_price', jt.raw_selling_price)) as pricing,
       str_to_date(date_format(str_to_date(jt.raw_publication_date, '%Y년 %m월'), '%Y-%m-01'),
                   '%Y-%m-%d')                                              as published_at,
       json_merge_patch(json_object(),
                        json_object('cover_uri', jt.raw_cover_url),
                        json_object('description', jt.raw_description))     as extra_info,
       jt.raw_category                                                      as category,
       jt.raw_sales_point                                                   as scroe,
       '2024-05-01'                                                         as captured_date
from raw_books,
     JSON_TABLE(
         raw_book, '$' COLUMNS (
         id VARCHAR(255) PATH '$.id',
         raw_title VARCHAR(255) collate utf8mb4_general_ci PATH '$.title',
         raw_author VARCHAR(255) collate utf8mb4_general_ci PATH '$.author',
         raw_category VARCHAR(255) collate utf8mb4_general_ci PATH '$.category',
         raw_cover_url VARCHAR(255) collate utf8mb4_general_ci PATH '$.cover_url',
         raw_publisher VARCHAR(255) collate utf8mb4_general_ci PATH '$.publisher',
         raw_list_price INT PATH '$.list_price',
         raw_description TEXT collate utf8mb4_general_ci PATH '$.description',
         raw_sales_point INT PATH '$.sales_point',
         raw_selling_price INT PATH '$.selling_price',
         raw_publication_date VARCHAR(255) collate utf8mb4_general_ci PATH '$.publication_date',
         raw_captured_date VARCHAR(255) collate utf8mb4_general_ci PATH '$.captured_date'
         )
     ) AS jt
;


drop view if exists v_raw_books;
create view v_raw_books as
select t1.*, DATE_SUB(t1.captured_date, INTERVAL (t2.rn - 1) MONTH) as cap_date
from v_raw_books_with_cap t1
         join (select store_code, row_number() over (partition by store_code) as rn from v_raw_books_with_cap) t2
              on t1.store_code = t2.store_code;


insert into books (title, author, published_at, publisher, edition)
select rb.title, rb.author, rb.published_at, rb.publisher, rb.edition
from v_raw_books rb
on duplicate key update title=rb.title,
                        author=rb.author,
                        published_at=rb.published_at,
                        publisher=rb.publisher,
                        edition=rb.edition;

drop view if exists v_raw_books_with_books;
create view v_raw_books_with_books as
select b.id as book_id, bc.id as category_id, rb.*
from v_raw_books rb
         join books b on rb.title = b.title and rb.author ->> '$.name' = b.author_name and
                         rb.publisher ->> '$.name' = b.publisher_name and rb.edition = b.edition
         join book_categories bc on bc.name = rb.category
;


insert into books_in_bookstores (book_id, store_id, store_code, pricing, extra_info)
select rb.book_id, @aladin_bookstore_id, rb.store_code, rb.pricing, rb.extra_info
from v_raw_books_with_books rb
on duplicate key update store_code=rb.store_code,
                        pricing=rb.pricing,
                        extra_info=rb.extra_info;


insert into book_sales_scores (record_date, book_id, store_id, score)
select rb.cap_date, rb.book_id, @aladin_bookstore_id, rb.scroe
from v_raw_books_with_books rb
on duplicate key update score=rb.scroe;


insert into book_categories_of_books (book_id, category_id)
select rb.book_id, rb.category_id
from v_raw_books_with_books rb
on duplicate key update book_id=rb.book_id,
                        category_id=rb.category_id;