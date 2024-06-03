create definer = root@localhost view v_raw_books as
select `b`.`id`            AS `book_id`,
       `bc`.`id`           AS `category_id`,
       `rb`.`store_code`   AS `store_code`,
       `rb`.`title`        AS `title`,
       `rb`.`author`       AS `author`,
       `rb`.`publisher`    AS `publisher`,
       `rb`.`edition`      AS `edition`,
       `rb`.`pricing`      AS `pricing`,
       `rb`.`published_at` AS `published_at`,
       `rb`.`extra_info`   AS `extra_info`,
       `rb`.`category`     AS `category`,
       `rb`.`scroe`        AS `scroe`
from (((select `jt`.`id`                                                                                             AS `store_code`,
               `jt`.`raw_title`                                                                                      AS `title`,
               json_object('name', `jt`.`raw_author`)                                                                AS `author`,
               json_object('name', `jt`.`raw_publisher`)                                                             AS `publisher`,
               1                                                                                                     AS `edition`,
               json_merge_patch(json_object(), json_object('list_price', `jt`.`raw_list_price`),
                                json_object('selling_price', `jt`.`raw_selling_price`))                              AS `pricing`,
               str_to_date(date_format(str_to_date(`jt`.`raw_publication_date`, '%Y년 %m월'), '%Y-%m-01'),
                           '%Y-%m-%d')                                                                               AS `published_at`,
               json_merge_patch(json_object(), json_object('cover_uri', `jt`.`raw_cover_url`),
                                json_object('description', `jt`.`raw_description`))                                  AS `extra_info`,
               `jt`.`raw_category`                                                                                   AS `category`,
               `jt`.`raw_sales_point`                                                                                AS `scroe`
        from `write_now`.`raw_books`
                 join json_table(`write_now`.`raw_books`.`raw_book`, '$'
                                 columns (`id` varchar(255) character set utf8mb4 collate utf8mb4_general_ci path '$.id', `raw_title` varchar(255) character set utf8mb4 collate utf8mb4_general_ci path '$.title', `raw_author` varchar(255) character set utf8mb4 collate utf8mb4_general_ci path '$.author', `raw_category` varchar(255) character set utf8mb4 collate utf8mb4_general_ci path '$.category', `raw_cover_url` varchar(255) character set utf8mb4 collate utf8mb4_general_ci path '$.cover_url', `raw_publisher` varchar(255) character set utf8mb4 collate utf8mb4_general_ci path '$.publisher', `raw_list_price` int path '$.list_price', `raw_description` text character set utf8mb4 collate utf8mb4_general_ci path '$.description', `raw_sales_point` int path '$.sales_point', `raw_selling_price` int path '$.selling_price', `raw_publication_date` varchar(255) character set utf8mb4 collate utf8mb4_general_ci path '$.publication_date')) `jt`) `rb` join `write_now`.`books` `b`
       on (((`rb`.`title` = `b`.`title`) and
            (json_unquote(json_extract(`rb`.`author`, '$.name')) = `b`.`author_name`) and
            (json_unquote(json_extract(`rb`.`publisher`, '$.name')) = `b`.`publisher_name`) and
            (`rb`.`edition` = `b`.`edition`)))) join `write_now`.`book_categories` `bc`
      on ((`bc`.`name` = `rb`.`category`)));

