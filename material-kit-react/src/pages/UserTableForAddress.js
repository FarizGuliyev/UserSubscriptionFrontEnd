import { filter } from 'lodash';
import { useState, useEffect, useRef } from 'react';

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button,
  Menu,
} from '@mui/material';
// components

import SearchNotFound from '../components/SearchNotFound';
import { UserButtonAddressChange, UserListHead, UserSearchByAddress } from '../sections/@dashboard/user';

// mock


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: '№', alignRight: false },
  { id: 'name', label: 'Adı', alignRight: false },
  { id: 'surname', label: 'Soyadı', alignRight: false },
  { id: 'fatherName', label: 'Ata adı', alignRight: false },
  { id: 'regionName', label: 'Rayon', alignRight: false },
  { id: 'cityName', label: 'Şəhər', alignRight: false },
  { id: 'villageName', label: 'Kənd/Qəsəbə', alignRight: false },
  { id: 'streetName', label: 'Küçə', alignRight: false },
  { id: 'apartmentName', label: 'Bina', alignRight: false },
  { id: 'floorName', label: 'Mərtəbə', alignRight: false },
  { id: 'houseName', label: 'Mənzil', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
//-------------------------------------------------------------------

export default function UserTableForAddress() {

  const [userList, setUserList] = useState([]);

  const getAllModels = async () => {
    const response = await fetch('https://localhost:7005/api/User');
    response.json().then((res) => setUserList(res));
  };

  useEffect(() => {
    getAllModels();
  }, []);

  const ref = useRef(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <>
      <Button ref={ref} variant="contained" onClick={() => setIsUserOpen(true)}>Ünvana düzəliş et</Button>
      <Menu
        open={isUserOpen}
        anchorEl={ref.current}
        onClose={() => {
          setIsUserOpen(false)
        }}
        PaperProps={{
          sx: { width: 1330, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>

        <Container>
          <Stack direction="column" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h4" gutterBottom >
              İstifadəçinin ünvanını dəyiş
            </Typography>
          </Stack>
          <Card>
            <UserSearchByAddress numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
            <TableContainer sx={{ minWidth: 800 }}>
              <Table >
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <UserButtonAddressChange key={row.id} user={row} />
                    );
                  })}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>


            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={userList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Menu>
    </>

  );
}
