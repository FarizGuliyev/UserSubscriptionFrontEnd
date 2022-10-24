import { filter } from 'lodash';
import { useState, useRef, useEffect } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
    TableRow,
    TableCell,
    Menu,
    Stack,
    Typography,
    Table,
    TableContainer,
    TableBody,
    Card,
    Container,
    Button,
    TextField,

} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { fontSize } from '@mui/system';
import { PaymentCreateBySearchUser, PaymentListHead } from ".";



const TABLE_HEAD = [
    { id: 'id', label: '№', alignRight: false },
    { id: 'name', label: 'Adı', alignRight: false },
    { id: 'surName', label: 'Soyadı', alignRight: false },
    { id: 'fatherName', label: 'Ata adı', alignRight: false },
    { id: 'button', label: '', alignRight: false },

];


export default function PaymentCreate() {

    const [userList, setUserList] = useState([]);
    const getAllSubs = async () => {

        const response = await fetch('https://localhost:7005/api/User');

        response.json().then((res) => setUserList(res));
    };

    useEffect(() => {
        getAllSubs();
    }, []);


    const ref = useRef(null);

    const [page, setPage] = useState(0);

    const [selected, setSelected] = useState([]);

    const [filterName, setFilterName] = useState('');

    const [isUserOpen, setIsUserOpen] = useState(false);

    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const [payment, setPayment] = useState({
        UserId: 0,
        Amount: 0,
        Type: "",
        PayDate: new Date().toISOString(),
        Note: ""
    });

    const [user, setUser] = useState({
        Id: userList.id,
        Name: userList.name,
        Surname: userList.surname,
        FatherName: userList.fatherName,
    });


    const postPayment = (newPayment) => {
        fetch(`https://localhost:7005/api/Payment`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newPayment })
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    function applySortFilter(array, query) {
        const stabilizedThis = array.map((el, index) => [el, index]);

        if (query) {
            return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        }
        return stabilizedThis.map((el) => el[0]);
    }

    const filteredUsers = applySortFilter(userList, filterName);

    return (
        <>
            <Button ref={ref} variant="contained" onClick={() => setIsUserOpen(true)}>Əlavə et</Button>
            <Menu
                open={isUserOpen}
                anchorEl={ref.current}
                onClose={() => {
                    setIsUserOpen(false)
                    setIsPaymentOpen(false)
                }}
                PaperProps={{
                    sx: { width: 941, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>

                <Container>
                    <Stack direction="column" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4" gutterBottom >
                            Yeni ödəniş əlavə edin
                        </Typography>
                    </Stack>
                    <Card>
                        <PaymentCreateBySearchUser numSelected={selected.length} filterName={filterName}
                            onFilterName={handleFilterByName} />

                        {filterName !== '' &&
                            <TableContainer sx={{ minWidth: 800 }}>

                                <Table >
                                    <PaymentListHead

                                        headLabel={TABLE_HEAD}
                                        rowCount={userList.length}
                                        numSelected={selected.length}

                                    />
                                    <TableBody>
                                        {filteredUsers.slice(page).map((row) => {
                                            return (
                                                <TableRow key={row.Id}>

                                                    <TableCell align="center">
                                                        {row.id}
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.surname}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.fatherName}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="contained" onClick={() => {

                                                            setUser({ ...user, Id: row.id, Name: row.name, Surname: row.surname })
                                                            setPayment({ ...payment, UserId: row.id })
                                                            setFilterName('')
                                                            setIsPaymentOpen(true)
                                                        }}>Seç</Button>

                                                    </TableCell>

                                                </TableRow>

                                            );
                                        })}

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        }

                        {isPaymentOpen && filterName === '' &&
                            <>
                                <div style={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    width: '100%',
                                    height: '40px',
                                    paddingLeft: '380px',



                                }}>
                                    <Typography variant='h5'>{user.Name} </Typography>
                                    <div style={{ width: '10px' }} />
                                    <Typography variant='h5'>{user.Surname}</Typography>

                                </div>

                                <Stack spacing={3}>
                                    <TextField required label="Ödəniş miqdarı" value={payment.Amount}
                                        onChange={(e) => setPayment({ ...payment, Amount: e.target.value })} />
                                    <TextField required label="Ödəniş tipi" value={payment.Type}
                                        onChange={(e) => setPayment({ ...payment, Type: e.target.value })} />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Ödəniş tarixi"
                                            value={payment.PayDate}
                                            onChange={(e) => {
                                                setPayment({ ...payment, PayDate: e });
                                            }}
                                            renderInput={(params) => <TextField {...params} />
                                            }
                                        />
                                    </LocalizationProvider>
                                    <TextField label="Qeyd" value={payment.Note}
                                        onChange={(e) => setPayment({ ...payment, Note: e.target.value })} />

                                    <LoadingButton alignItems="center" type="submit" variant="contained"
                                        onClick={() => {
                                            postPayment(payment)
                                            setIsPaymentOpen(false)
                                        }} >
                                        Yadda saxla
                                    </LoadingButton>
                                    <Typography   > </Typography>

                                </Stack>
                            </>
                        }
                    </Card>
                </Container>
            </Menu>
        </>
    )
}        