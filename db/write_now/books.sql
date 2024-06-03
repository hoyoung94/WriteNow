create table books
(
    id             int auto_increment
        primary key,
    title          varchar(256)                        not null comment '책 제목',
    author_name    varchar(64) as (json_unquote(json_extract(`author`, _utf8mb4'$.name'))) stored comment '작가 이름',
    published_at   timestamp                           not null comment '출판일',
    publisher_name varchar(64) as (json_unquote(json_extract(`publisher`, _utf8mb4'$.name'))) stored comment '출판사 이름',
    edition        int                                 not null comment '개정 버전',
    author         json                                not null comment '작가 정보',
    publisher      json                                not null comment '출판사 정보',
    extra_info     json                                null comment '추가 정보 (품목정보, 출판사 리뷰, 추천평, 목차 등)',
    created_at     timestamp default CURRENT_TIMESTAMP not null,
    updated_at     timestamp                           null on update CURRENT_TIMESTAMP,
    deleted_at     timestamp                           null,
    constraint books_uidx_publisher_name_n_title_n_author_name_n_edition
        unique (publisher_name, title, author_name, edition)
)
    comment '책 (출판사 제공정보)';

