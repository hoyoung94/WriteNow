create table books_in_bookstores
(
    book_id    int                       not null,
    store_id   int                       not null,
    store_code varchar(256)              null comment '서점에 등록된 책 ID',
    pricing    json                      not null comment '가격 정책',
    extra_info json                      null comment '서점별 제공 정보 (커버 주소등)',
    created_at timestamp default (now()) not null,
    updated_at timestamp                 null on update CURRENT_TIMESTAMP,
    deleted_at timestamp                 null,
    primary key (store_id, book_id),
    constraint books_in_bookstores_uidx_store_id_n_store_code
        unique (store_id, store_code),
    constraint books_in_bookstores_fk_books_id
        foreign key (book_id) references books (id),
    constraint books_in_bookstores_fk_bookstores_id
        foreign key (store_id) references bookstores (id)
)
    comment '서점에 등록되어 있는 책 정보';

