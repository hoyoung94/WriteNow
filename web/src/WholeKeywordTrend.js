import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "white",
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
    '&:nth-of-type(odd)': {
        backgroundColor: 'white',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    { id: 'keyword', label: '키워드', minWidth: 200 },
    { id: 'score', label: '트렌드 점수', minWidth: 50 },
];

const WholeKeywordTrend = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { data: keywords, isLoading, error } = useQuery({
        queryFn: () =>
            fetch('http://127.0.0.1:8000/api/trends/keywords').then(
                (res) => res.json()
            ),
        queryKey: ['keywords'],
    });

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <div className="error">Error: error fetching</div>;
    }

    // Filter keywords with length greater than 1
    const filteredKeywords = keywords.filter(keyword => keyword.keyword.length > 1);

    // Show the first 100 filtered keywords
    const rows = filteredKeywords.slice(0, 100);

    return (
        <React.Fragment>
            <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: '20px', border: '1px solid #4028ca', borderRadius: '20px' }}>

                <Typography variant="h6" component="h6" sx={{ pl: 1 }}>
                    TOP 100 트렌드 키워드
                </Typography>
                <TableContainer component={Paper}>
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
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.keyword}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.id === 'score' ? Math.round(value) : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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

export default WholeKeywordTrend;
