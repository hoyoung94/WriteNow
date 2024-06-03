create table book_sales_scores
(
    record_date date                      not null comment '기록일',
    book_id     int                       not null,
    store_id    int                       not null,
    score       int                       not null comment '점수',
    created_at  timestamp default (now()) not null,
    primary key (book_id, record_date, store_id),
    constraint book_sales_scores_books_fk_id
        foreign key (book_id) references books (id),
    constraint book_sales_scores_bookstores_fk_id
        foreign key (store_id) references bookstores (id)
)
    comment '책 판매 지수';

