create table bookstores
(
    id          int auto_increment
        primary key,
    alias       varchar(16)                         not null comment '서점 별칭 반드시 ASCII 알파뱃과 숫자만 사용한다. ex) aladin, yes24',
    name        varchar(128)                        not null comment '서점 또는 브랜드 이름 ex) 알라딘, YES24',
    website_uri varchar(512)                        not null,
    created_at  timestamp default CURRENT_TIMESTAMP not null,
    updated_at  timestamp                           null on update CURRENT_TIMESTAMP,
    deleted_at  timestamp                           null invisible,
    constraint bookstores_uidx_alias
        unique (alias),
    constraint bookstores_uidx_name
        unique (name)
)
    comment '온라인 서점';

