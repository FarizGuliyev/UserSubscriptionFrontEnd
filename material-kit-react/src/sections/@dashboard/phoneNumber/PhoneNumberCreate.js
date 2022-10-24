import { filter } from 'lodash';
import { useState, useRef, useEffect } from "react";

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

import { PhoneNumberCreateBySearchUser, PhoneNumberListHead } from ".";

const TABLE_HEAD = [
    { id: 'id', label: '№', alignRight: false },
    { id: 'name', label: 'Adı', alignRight: false },
    { id: 'surName', label: 'Soyadı', alignRight: false },
    { id: 'fatherName', label: 'Ata adı', alignRight: false },
    { id: 'button', label: '', alignRight: false },

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

    const [page, setPage] = useState(0);

    const [selected, setSelected] = useState([]);

    const [filterName, setFilterName] = useState('');

    const [isUserOpen, setIsUserOpen] = useState(false);

    const [isPhoneOpen, setIsPhoneOpen] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState({
        UserId: 0,
        Number: "",
    });

    const [user, setUser] = useState({
        Id: userList.id,
        Name: userList.name,
        Surname: userList.surname,
        FatherName: userList.fatherName,
    });


    const postPhoneNumber = (newPhoneNumber) => {
        fetch(`https://localhost:7005/api/PhoneNumber`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newPhoneNumber })
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
                    setIsPhoneOpen(false)
                }}
                PaperProps={{
                    sx: { width: 941, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>

                <Container>
                    <Stack direction="column" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4" gutterBottom >
                            Telefon nömrəsi əlavə edin
                        </Typography>
                    </Stack>
                    <Card>
                        <PhoneNumberCreateBySearchUser numSelected={selected.length} filterName={filterName}
                            onFilterName={handleFilterByName} />

                        {filterName !== '' &&
                            <TableContainer sx={{ minWidth: 800 }}>

                                <Table >
                                    <PhoneNumberListHead

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
                                                            setPhoneNumber({ ...phoneNumber, UserId: row.id })
                                                            setFilterName('')
                                                            setIsPhoneOpen(true)
                                                        }}>Seç</Button>

                                                    </TableCell>

                                                </TableRow>

                                            );
                                        })}

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        }

                        {isPhoneOpen && filterName === '' &&
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1} >

                                <Typography   > </Typography>
                                <Typography   >{user.Id}</Typography>
                                <Typography   >{user.Name}</Typography>
                                <Typography   >{user.Surname}</Typography>



                                <TextField required label="Telefon nömrəsi" value={phoneNumber.Number}
                                    onChange={(e) => setPhoneNumber({ ...phoneNumber, Number: e.target.value })} />

                                <LoadingButton alignItems="center" type="submit" variant="contained"
                                    onClick={() => {
                                        postPhoneNumber(phoneNumber)
                                        setIsPhoneOpen(false)
                                    }} >
                                    Yadda saxla
                                </LoadingButton>
                                <Typography   > </Typography>
                            </Stack>
                        }

                    </Card>
                </Container>

            </Menu>
        </>
    )
}        