from fastapi import APIRouter, Depends
from mysql.connector.pooling import PooledMySQLConnection
from typing_extensions import TypedDict

from app.database import get_db_connection

router = APIRouter(prefix="/books")


class Books(TypedDict):
    id: int
    title: str
    author_name: str
    publisher_name: str
    edition: int


@router.get('', response_model=list[Books])
def get_books(conn: PooledMySQLConnection = Depends(get_db_connection)):
    cursor = conn.cursor(buffered=True, dictionary=True)
    cursor.execute("select id, title, author_name, publisher_name, edition from books limit 10")
    result = cursor.fetchall()
    return result


@router.get('/{book_id}', response_model=Books)
def get_book_by_id(book_id: int, conn: PooledMySQLConnection = Depends(get_db_connection)):
    cursor = conn.cursor(buffered=True, dictionary=True)
    cursor.execute("select id, title, author_name, publisher_name, edition from books where id = %s", (book_id,))
    result = cursor.fetchone()
    return result
