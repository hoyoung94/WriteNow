use write_now;

set names utf8mb4;

alter table books
    add fulltext index books_title_ft_idx (title) with parser ngram;
;
