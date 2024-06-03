import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './example/Title';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { useQuery } from '@tanstack/react-query';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01579b", // Change to darkblue
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
// 테이블 1차 헤더 색깔

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0693E3", // Change to darkblue
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
// 테이블 2차 헤더 색깔

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
// 테이블 row 색깔 설정 

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: '제복', minWidth: 200 },
  { id: 'author_name', label: '작가', minWidth:100}
];


const GenreTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const { data: books, isLoading, error } = useQuery({
    queryFn: () =>
      fetch('http://127.0.0.1:8000/api/books').then(
        (res) => res.json()
      ),
    queryKey: ['books'],
  });

  // Show a loading message while data is fetching
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // to handle error
  if (error) {
    return <div className="error">Error: error fetching</div>
  }
  const rows = books || [];
  return (
    <React.Fragment>
      <Title>Trending 장르</Title>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell2
                key={column.id}
                align={column.align}
                style={{ top: 57, minWidth: column.minWidth }}
              >
                {column.label}
              </StyledTableCell2>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {value}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );

};
export default GenreTable;

