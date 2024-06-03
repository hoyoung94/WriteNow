create table book_categories_of_books
(
    book_id     int not null,
    category_id int not null,
    primary key (book_id, category_id)
)
    comment '책 카테고리';

