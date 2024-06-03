create table book_categories
(
    id         int auto_increment
        primary key,
    name       varchar(64)                         not null comment '카테고리 이름(최하위)',
    parents    varchar(192)                        null comment '상위 카테고리 ex) 국내도서 > 에세이',
    store_code varchar(256)                        null comment '서점에서 사용되는 ID 또는 코드',
    store_id   int                                 not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp                           null on update CURRENT_TIMESTAMP,
    deleted_at timestamp                           null,
    constraint book_categories_uidx_name_n_parents_n_store_id
        unique (name, parents, store_id),
    constraint book_categories_uidx_store_id_n_store_code
        unique (store_id, store_code),
    constraint book_categories_bookstores_id_fk
        foreign key (store_id) references bookstores (id)
);

