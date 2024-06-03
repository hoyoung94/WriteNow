import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TextField, Button, CircularProgress, List, ListItem, ListItemText, Container, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#01579b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EEF3FF",
    color: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: 'white',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const fetchRelatedKeyword = async ({ queryKey }) => {
  const [, query] = queryKey;
  const response = await fetch(`http://127.0.0.1:8000/api/trends/related_keywords?query=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const RelatedKeyword = ({ query }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, error, isLoading } = useQuery({
    queryKey: ['relatedKeyword', query],
    queryFn: fetchRelatedKeyword,
    enabled: !!query,
  });

  const sortedData = useMemo(() => {
    if (!data) return [];
    // Sort the data array in descending order of the score
    return [...data].sort((a, b) => b.score - a.score);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'keyword', label: '키워드' },
    { id: 'score', label: '점수' },
  ];

  return (
    <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: '20px', border: '1px solid #4028ca', borderRadius: '20px' }}>
      <Typography variant="h5" component="h5" gutterBottom sx={{ pl: 1 }}>
        {query ? `${query}의 연관 키워드` : '검색한 키워드의 연관 키워드'}
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">An error occurred: {error.message}</Typography>
      ) : (
        data && data.length > 0 ? ( // Check if data is available
          <React.Fragment>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell2 key={column.id} align="left" style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </StyledTableCell2>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = column.id === 'score' ? Math.ceil(row[column.id]) : row[column.id]; // Round up the score
                      return (
                        <StyledTableCell key={column.id} align="left">
                          {value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </React.Fragment>
        ) : (
          <Typography variant="body1"></Typography> // Display message prompting user to enter a query
        )
      )}
    </Paper>
  );
};

export default RelatedKeyword;