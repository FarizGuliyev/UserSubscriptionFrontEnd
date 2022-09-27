import { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';
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
} from '@mui/material';

import PhoneNumberListHead from './PhoneNumberListHead';

const TABLE_HEAD = [
    { id: 'name', label: 'İstifadəçi adı', alignRight: false },
    { id: 'price', label: 'Yeni telefon nömrəsi', alignRight: false },
];


export default function PhoneNumberCreate() {

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

    const [phoneNumber, setPhoneNumber] = useState({
        UserId: 0,
        Number: "",
    });
    const postPhoneNumber = (newPhoneNumber) => {

        fetch(`https://localhost:7005/api/PhoneNumber`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newPhoneNumber })
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
                        Telefon nömrəsi əlavə edin
                    </Typography>
                </Stack>

                <TableContainer sx={{ minWidth: 300 }}>
                    <Table>
                        <PhoneNumberListHead
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
                                            value={phoneNumber.UserId}
                                        >
                                            {userList.map((t) =>
                                                <MenuItem value={t.id}
                                                    onClick={() => setPhoneNumber({ ...phoneNumber, UserId: t.id })}
                                                >{t.name}</MenuItem>
                                            )}

                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="center">
                                    <Input value={phoneNumber.Number} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                        onChange={(e) => setPhoneNumber({ ...phoneNumber, Number: e.target.value })} />
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>

                </TableContainer>
                <Stack direction="column" alignItems="center">
                    <Button variant="contained"
                        onClick={() => {
                            postPhoneNumber(phoneNumber)
                            setIsOpen(false)
                            }} >Yadda saxla</Button>
                </Stack>
            </Menu>
        </>
    )
}        