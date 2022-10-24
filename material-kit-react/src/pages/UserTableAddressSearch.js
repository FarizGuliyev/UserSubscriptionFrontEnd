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
    Autocomplete,
    Box,
    TextField,
} from '@mui/material';
// components

import SearchNotFound from '../components/SearchNotFound';
import { UserButtonAddressSearch, UserListHead, } from '../sections/@dashboard/user';

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

export default function UserTableAddressSearch() {

    const [user, setUser] = useState({
        RegionId: null,
        CityId: null,
        VillageId: null,
        StreetId: null,
        ApartmentId: null,
        FloorId: null,
        FlatId: null,
        "regionName": "",
        "cityName": "",
        "villageName": "",
        "streetName": "",
        "apartmentName": "",
        "floorName": "",
        "houseName": ""
    });

    // --------------------------------RegionGet----------------------------------
    const [regionList, setRegionList] = useState([]);

    const getAllRegions = async () => {

        const response = await fetch('https://localhost:7005/api/Region');

        response.json().then((res) => setRegionList(res));
    };

    useEffect(() => {
        getAllRegions();
    }, []);

    // --------------------------------CityGet---------------------------------- 
    const [cityList, setCityList] = useState([]);

    const getAllCities = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/City/${Id}`);

        response.json().then((res) => setCityList(res));
    };

    // useEffect(() => {
    //     if (regionId !== null) {
    //         getAllCities(regionId);
    //     }
    // }, []);

    // --------------------------------VillageGet---------------------------------- 
    const [villageList, setVillageList] = useState([]);

    const getAllVillages = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Village/${Id}`);

        response.json().then((res) => setVillageList(res));
    };

    // useEffect(() => {
    //     if (cityId !== null) {
    //         getAllVillages(cityId);
    //     }
    // }, []);

    // --------------------------StreetGet-----------------------
    const [streetList, setStreetList] = useState([]);

    const getAllStreets = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Street/${Id}`);

        response.json().then((res) => setStreetList(res));
    };


    // --------------------------------StreetGetByCityId---------------------------------- 

    const getAllStreetsByCityId = async (Id) => {

        const response = await fetch(`https://localhost:7005/ByCity/${Id}`);

        response.json().then((res) => setStreetList(res));
    };

    // useEffect(() => {
    //     if (villageId !== null) {
    //         getAllStreets(villageId);
    //     } else { getAllStreetsByCityId(cityId) }
    // }, []);

    // --------------------------ApartmentGet-----------------------
    const [apartmentList, setApartmentList] = useState([]);

    const getAllApartments = async (Id) => {

        const response = await fetch(`https://localhost:7005/Apartment/ByStreet/${Id}`);

        response.json().then((res) => setApartmentList(res));
    };


    // useEffect(() => {
    //     if (streetId !== null) {
    //         getAllApartments(streetId);
    //     }
    // }, []);



    // --------------------------FloorGet-----------------------
    const [floorList, setFloorList] = useState([]);

    const getAllFloors = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Floor/${Id}`);

        response.json().then((res) => setFloorList(res));
    };

    // useEffect(() => {
    //     if (apartmentId !== null) {
    //         getAllFloors(apartmentId);
    //     }
    // }, []);

    // --------------------------------FlatGet----------------------------------
    const [flatList, setFlatList] = useState([]);

    const getAllFlats = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Flat/${Id}`);

        response.json().then((res) => setFlatList(res));
    };

    // --------------------------------FlatGetByStreetId----------------------------------

    const getAllFlatsByStreetId = async (Id) => {

        const response = await fetch(`https://localhost:7005/Flat/ByStreet/${Id}`);

        response.json().then((res) => setFlatList(res));
    };

    // useEffect(() => {
    //     if (floorId !== null) {
    //         getAllFlats(floorId);
    //     } else { getAllFlatsByStreetId(streetId) }
    // }, []);


    //  ----------------------------------UserGet---------------------------------------
    const [userList, setUserList] = useState([]);

    const getAllUsers = async () => {
        const response = await fetch('https://localhost:7005/api/User');
        response.json().then((res) => setUserList(res));
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // --------------------------------UsersGetByRegionId----------------------------------
    const getAllUsersByRegionId = async (Id) => {

        const response = await fetch(`https://localhost:7005/User/ByRegion/${Id}`);

        response.json().then((res) => setUserList(res));
    };

    // --------------------------------UsersGetByCityId----------------------------------
    const getAllUsersByCityId = async (Id) => {

        const response = await fetch(`https://localhost:7005/User/ByCity/${Id}`);

        response.json().then((res) => setUserList(res));
    };
    // --------------------------------UsersGetByVillageId----------------------------------
    const getAllUsersByVillageId = async (Id) => {

        const response = await fetch(`https://localhost:7005/User/ByVillage/${Id}`);

        response.json().then((res) => setUserList(res));
    };
    // --------------------------------UsersGetByStreetId----------------------------------
    const getAllUsersByStreetId = async (Id) => {

        const response = await fetch(`https://localhost:7005/User/ByStreet/${Id}`);

        response.json().then((res) => setUserList(res));
    };
    // --------------------------------UsersGetByApartmentId----------------------------------
    const getAllUsersByApartmentId = async (Id) => {

        const response = await fetch(`https://localhost:7005/User/ByApartment/${Id}`);

        response.json().then((res) => setUserList(res));
    };
    // --------------------------------UsersGetByFloorId----------------------------------
    const getAllUsersByFloorId = async (Id) => {

        const response = await fetch(`https://localhost:7005/User/ByFloor/${Id}`);

        response.json().then((res) => setUserList(res));
    };

    // --------------------------------UsersGetByFlatId----------------------------------
    const getAllUsersByFlatId = async (Id) => {

        const response = await fetch(`https://localhost:7005/User/ByFlat/${Id}`);

        response.json().then((res) => setUserList(res));
    };

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
            <Button ref={ref} variant="contained" onClick={() => setIsUserOpen(true)}>Ünvana görə axtar</Button>
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
                            İstifadəçiləri ünvana görə axtar
                        </Typography>
                    </Stack>
                    <Card>
                        <Stack spacing={3} ml={6} mt={3} mb={1}>
                            <Stack direction={{ sm: 'row' }} spacing={2} >
                                {/* ----------------------------------Region------------------------ */}
                                <Autocomplete
                                    id=""
                                    sx={{ width: 250 }}
                                    options={regionList}
                                    value={user}
                                    onChange={(e, nv) => {
                                        if (nv === null) {
                                            setUser({
                                                ...user, regionName: "",
                                            })
                                        }
                                        setUser({
                                            ...user, regionName: nv.regionName, RegionId: nv.id,
                                            FloorId: null, FlatId: null, ApartmentId: null,
                                            StreetId: null, VillageId: null, CityId: null,
                                            cityName: "", villageName: "", streetName: "",
                                            apartmentName: "", floorName: "", houseName: ""
                                        })
                                        getAllCities(nv.id);
                                        getAllVillages(0)
                                        getAllStreets(0)
                                        getAllApartments(0)
                                        getAllFloors(0)
                                        getAllFlats(0)
                                    }}

                                    autoHighlight
                                    getOptionLabel={(option) => {
                                        return option.regionName ? option.regionName : ""

                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li"  {...props}>
                                            {option.regionName}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Rayon *"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }} />
                                    )} />

                                {/* -----------------------------City------------------------ */}
                                <Autocomplete
                                    id=""
                                    sx={{ width: 250 }}
                                    options={cityList}
                                    value={user}
                                    onChange={(e, nv) => {
                                        if (nv === null) {
                                            setUser({
                                                ...user, cityName: "", CityId: 0,
                                            })
                                        }
                                        setUser({
                                            ...user, cityName: nv.cityName, CityId: nv.id,
                                            FloorId: null, FlatId: null, ApartmentId: null,
                                            StreetId: null, VillageId: null,
                                            villageName: "", streetName: "", apartmentName: "",
                                            floorName: "", houseName: ""
                                        })
                                        getAllVillages(nv.id);
                                        getAllStreetsByCityId(nv.id)
                                    }}

                                    autoHighlight
                                    getOptionLabel={(option) => {
                                        return option.cityName ? option.cityName : ""

                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li"  {...props}>
                                            {option.cityName}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Şəhər *"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }} />
                                    )} />

                                {/* ---------------------------Village------------------------ */}
                                <Autocomplete
                                    id=""
                                    sx={{ width: 250 }}
                                    options={villageList}
                                    value={user}
                                    onChange={(e, nv) => {
                                        if (nv === null) {
                                            setUser({
                                                ...user, villageName: "", VillageId: 0,
                                            })
                                        }
                                        setUser({
                                            ...user, villageName: nv.villageName, VillageId: nv.id,
                                            FloorId: null, FlatId: null, ApartmentId: null, StreetId: null,
                                            streetName: "", apartmentName: "", floorName: "", houseName: ""
                                        })
                                        getAllStreets(nv.id);
                                    }}

                                    autoHighlight
                                    getOptionLabel={(option) => {
                                        return option.villageName ? option.villageName : ""

                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li"  {...props}>
                                            {option.villageName}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Kənd/Qəsəbə *"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }} />
                                    )} />
                                {/* ---------------------------Street------------------------ */}
                                <Autocomplete
                                    id=""
                                    sx={{ width: 250 }}
                                    options={streetList}
                                    value={user}
                                    onChange={(e, nv) => {
                                        setUser({
                                            ...user, StreetId: nv.id, streetName: nv.streetName,
                                            ApartmentId: null, FloorId: null, FlatId: null,
                                            apartmentName: "", floorName: "", houseName: ""
                                        })
                                        getAllFloors(0)
                                        getAllApartments(nv.id)
                                        getAllFlatsByStreetId(nv.id)

                                    }}

                                    autoHighlight
                                    getOptionLabel={(option) => {
                                        return option.streetName ? option.streetName : ""

                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li"  {...props}>

                                            {option.streetName}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Küçə *"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                        />
                                    )}
                                />
                            </Stack>

                            {/* ---------------------------Apartment------------------------ */}
                            <Stack direction={{ sm: 'row' }} spacing={2} >
                                <Autocomplete
                                    id=""
                                    sx={{ width: 250 }}
                                    options={apartmentList}
                                    value={user}
                                    onChange={(e, nv) => {
                                        setUser({
                                            ...user, ApartmentId: nv.id, apartmentName: nv.apartmentName,
                                            FloorId: null, FlatId: null, floorName: "", houseName: "",
                                        })
                                        getAllFlats(0)
                                        getAllFloors(nv.id)
                                    }}

                                    autoHighlight
                                    getOptionLabel={(option) => {
                                        return option.apartmentName ? option.apartmentName : ""

                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li"  {...props}>

                                            {option.apartmentName}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Bina *"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                        />
                                    )}
                                />

                                {/* ---------------------------Floor------------------------ */}
                                <Autocomplete
                                    id=""
                                    sx={{ width: 250 }}
                                    options={floorList}
                                    value={user}
                                    onChange={(e, nv) => {
                                        setUser({
                                            ...user, FloorId: nv.id, floorName: nv.floorName,
                                            FlatId: null, houseName: ""
                                        })
                                        getAllFlats(nv.id)
                                    }}

                                    autoHighlight
                                    getOptionLabel={(option) => {
                                        return option.floorName ? option.floorName : ""

                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li"  {...props}>

                                            {option.floorName}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Mərtəbə *"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                        />
                                    )}
                                />

                                {/* ---------------------------Flat------------------------ */}
                                <Autocomplete
                                    id=""
                                    sx={{ width: 250 }}
                                    options={flatList}
                                    value={user}
                                    onChange={(e, nv) => {
                                        setUser({
                                            ...user, FlatId: nv.id, houseName: nv.houseName
                                        })

                                    }}

                                    autoHighlight
                                    getOptionLabel={(option) => {
                                        return option.houseName ? option.houseName : ""

                                    }}
                                    renderOption={(props, option) => (
                                        <Box component="li"  {...props}>

                                            {option.houseName}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Mənzil *"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                        />
                                    )}
                                />
                                {/* --------------------------------Button---------------------------- */}
                                <Stack direction={{ sm: 'row' }} spacing={4}>
                                    < Button size="large" type="submit" variant="contained"
                                        onClick={() => {
                                            if (user.RegionId !== null && user.CityId === null) {
                                                getAllUsersByRegionId(user.RegionId)
                                            } else if (user.CityId !== null && user.VillageId === null && user.StreetId === null) {
                                                getAllUsersByCityId(user.CityId)
                                            } else if (user.VillageId !== null && user.StreetId === null) {
                                                getAllUsersByVillageId(user.VillageId)
                                            } else if (user.StreetId !== null && user.ApartmentId === null && user.FlatId === null) {
                                                getAllUsersByStreetId(user.StreetId)
                                            } else if (user.ApartmentId !== null && user.FloorId === null) {
                                                getAllUsersByApartmentId(user.ApartmentId)
                                            } else if (user.FloorId !== null && user.FlatId === null) {
                                                getAllUsersByFloorId(user.FloorId)
                                            } else if (user.FlatId !== null) {
                                                getAllUsersByFlatId(user.FlatId)
                                            }
                                        }} >
                                        Axtar
                                    </Button>

                                    < Button size="large" type="submit" variant="contained"
                                        onClick={() => {
                                            getAllUsers()
                                            setUser({
                                                RegionId: null, CityId: null, VillageId: null, StreetId: null,
                                                ApartmentId: null, FloorId: null, FlatId: null,
                                                regionName: "", cityName: "", villageName: "", streetName: "",
                                                apartmentName: "", floorName: "", houseName: ""
                                            })
                                        }} >
                                        Filteri sıfırla
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        {/* ------------------------------------------------------------------------------------------- */}
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table >
                                <UserListHead
                                    headLabel={TABLE_HEAD}
                                    rowCount={userList.length}
                                    numSelected={selected.length}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <UserButtonAddressSearch key={row.id} user={row} />
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