import { useState, useRef, useEffect } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    TableRow,
    TableCell,
    Input,
    Menu,
    Stack,
    Typography,
    Table,
    TableContainer,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    TableBody,
    TextField,
    Button
} from '@mui/material';

import PaymentListHead from './PaymentListHead';

const TABLE_HEAD = [
    { id: 'name', label: 'İstifadəçi adı', alignRight: false },
    { id: 'amount', label: 'Ödəniş miqdarı', alignRight: false },
    { id: 'type', label: 'Ödəniş tipi', alignRight: false },
    { id: 'payDate', label: 'Ödəniş tarixi', alignRight: false },
    { id: 'note', label: 'Qeyd', alignRight: false },
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

    const [isOpen, setIsOpen] = useState(false);

    const [payment, setPayment] = useState({
        UserId: 0,
        Amount: 0,
        Type: "",
        PayDate: "",
        Note: "",
    });
    const postPayment = (newPayment) => {
        payment.PayDate = (new Date(new Date(payment.PayDate)
        .setDate(new Date(payment.PayDate).getDate()+1))).toISOString();

        fetch(`https://localhost:7005/api/Payment`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newPayment })
        }
        )
    }


    return (
        <>

            {/* _____________________________________________ */}
            <Button ref={ref} variant="contained" onClick={() => setIsOpen(true)}>Əlavə et</Button>
            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 941, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Stack direction="column" alignItems="center" >
                    <Typography variant="h5" gutterBottom >
                        Yeni ödəniş əlavə edin
                    </Typography>
                </Stack>

                <TableContainer sx={{ minWidth: 300 }}>
                    <Table>
                        <PaymentListHead
                            headLabel={TABLE_HEAD}
                        />
                        <TableBody>
                            <TableRow
                            >
                                <TableCell align="center">
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-label">Ad</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={payment.UserId}
                                        >
                                            {userList.map((t) =>
                                                <MenuItem value={t.id}
                                                    onClick={() => setPayment({ ...payment, UserId: t.id })}
                                                >{t.name}</MenuItem>
                                            )}

                                        </Select>
                                    </FormControl>
                                </TableCell>

                                <TableCell align="center">
                                    <Input value={payment.Amount} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                        onChange={(e) => setPayment({ ...payment, Amount: e.target.value })} />
                                </TableCell>

                                <TableCell align="center">
                                    <Input value={payment.Type} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                        onChange={(e) => setPayment({ ...payment, Type: e.target.value })} />
                                </TableCell>

                                <TableCell align="center">
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
                                </TableCell>

                                <TableCell align="center">
                                    <Input value={payment.Note} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                        onChange={(e) => setPayment({ ...payment, Note: e.target.value })} />
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="column" alignItems="center">
                    <Button variant="contained"
                        onClick={() => {
                            postPayment(payment)
                            setIsOpen(false)
                        }} >Yadda saxla</Button>
                </Stack>
            </Menu>
        </>
    )
}        