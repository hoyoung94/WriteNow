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
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "white", // Change to darkblue
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#EEF3FF", // Change to darkblue
        color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'white',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    { id: 'title', label: '제목', minWidth: 200 },
    { id: 'score', label: '트렌드 점수', minWidth: 150 },
    { id: 'sales', label: '판매 점수', minWidth: 100 }
];

const WholeBookTrend = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { data: books, isLoading, error } = useQuery({
        queryFn: () =>
            fetch('http://127.0.0.1:8000/api/trends/books').then(
                (res) => res.json()
            ),
        queryKey: ['books'],
    });

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <div className="error">Error: error fetching</div>
    }

    const rows = books || [];
    return (
        <React.Fragment>
            <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: '20px', border: '1px solid #4028ca', borderRadius: '20px' }}>
                <Typography variant="h6" component="h6" sx={{ pl: 1}}>
                    TOP 100 트렌드 책
                </Typography>
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
                                            <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                {value}
                                            </StyledTableCell>
                                        );
                                    })}
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </React.Fragment>
    );
};
export default WholeBookTrend;