from mysql.connector import pooling

db_config = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "database": "write_now",
    "password": "test"
}

pool = pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=5,
    **db_config
)


def get_db_connection():
    with pool.get_connection() as connection:
        yield connection
