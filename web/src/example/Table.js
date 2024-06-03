import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';



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
  { id: 'title', label: '책 제목', minWidth: 170 },
  { id: 'author', label: '작가', minWidth: 100 },
  {
    id: 'sales',
    label: '판매지수',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'company',
    label: '출판사',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'date',
    label: '출판일',
    minWidth: 170,
    align: 'right',
  },
];

function createData(title, author, sales, company, date) {

  return { title, author, sales, company, date };
}

const rows = [
  createData('파피용', '베르나르 베르베르', 1324171354, '교보문고', '2024/05/11'),
  createData('피를 마시는 새', '이영도', 1403500365, '다산북스', '2024/05/11'),
  createData('파피용', '베르나르 베르베르', 60483973, '교보문고', '2024/05/11'),
  createData('피를 마시는 새', '이영도', 327167434, '다산북스', '2024/05/11'),
  createData('파피용', '베르나르 베르베르', 37602103, '교보문고', '2024/05/11'),
  createData('피를 마시는 새', '이영도', 25475400, '다산북스', '2024/05/11'),
  createData('파피용', '베르나르 베르베르', 83019200, '교보문고', '2024/05/11'),
  createData('피를 마시는 새', '이영도', 4857000, '다산북스', '2024/05/11'),
  createData('파피용', '베르나르 베르베르', 126577691, '교보문고', '2024/05/11'),
  createData('피를 마시는 새', '이영도', 126317000, '다산북스', '2024/05/11'),
  createData('파피용', '베르나르 베르베르', 67022000, '교보문고', '2024/05/11'),
  createData('피를 마시는 새', '이영도', 67545757, '교보문고', '2024/05/11'),
  createData('파피용', '베르나르 베르베르', 146793744, '다산북스', '2024/05/11'),
  createData('피를 마시는 새', '이영도', 200962417, '교보문고', '2024/05/11'),
  createData('파피용', '베르나르 베르베르', 210147125, '다산북스', '2024/05/11'),
];

const RankTable = function () {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Title>2023년 IT분야 베스트셀러 순위</Title>
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
            .map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
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
}

export default RankTable;


// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

// function preventDefault(event) {
//   event.preventDefault();
// }

// export default function Orders() {
//   return (
//     <React.Fragment>
//       <Title>Recent Orders</Title>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Date</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Ship To</TableCell>
//             <TableCell>Payment Method</TableCell>
//             <TableCell align="right">Sale Amount</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.date}</TableCell>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.shipTo}</TableCell>
//               <TableCell>{row.paymentMethod}</TableCell>
//               <TableCell align="right">{`$${row.amount}`}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
//         See more orders
//       </Link>
//     </React.Fragment>
//   );
// }
