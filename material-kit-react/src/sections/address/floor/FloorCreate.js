import { useState, useRef, useEffect } from "react";

import {
    Menu,
    Stack,
    Typography,
    Container,
    Button,
    TextField,
    Autocomplete,
    Box,

} from '@mui/material';

import { LoadingButton } from '@mui/lab';

export default function FloorCreate() {

    const ref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [floor, setFloor] = useState({
        RegionId: null,
        CityId: null,
        VillageId: null,
        StreetId: null,
        ApartmentId: null,
        "regionName": "",
        "cityName": "",
        "villageName": "",
        "streetName": "",
        "apartmentName": "",
        FloorName: ""
    });

    // -----------------------------RegionGet----------------------------
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

    // --------------------------------VillageGet---------------------------------- 
    const [villageList, setVillageList] = useState([]);

    const getAllVillages = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Village/${Id}`);

        response.json().then((res) => setVillageList(res));
    };

    // --------------------------------StreetGet---------------------------------- 
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

    // --------------------------------ApartmentGet---------------------------------- 
    const [apartmentList, setApartmentList] = useState([]);

    const getAllApartments = async (Id) => {

        const response = await fetch(`https://localhost:7005/Apartment/ByStreet/${Id}`);

        response.json().then((res) => setApartmentList(res));
    };

    // --------------------------------FloorPost----------------------------------
    const postFloor = (newFloor) => {
        fetch(`https://localhost:7005/api/Floor`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newFloor })
        })
    }

    return (
        <>
            <Button ref={ref} variant="contained" onClick={() => setIsOpen(true)}>Əlavə et</Button>
            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => {
                    setIsOpen(false)
                }}
                PaperProps={{
                    sx: { width: 890, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>

                <Container>
                    <Stack direction="column" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4" gutterBottom >
                            Yeni Mərtəbə əlavə edin
                        </Typography>
                    </Stack>
                    <>

                        <Stack direction="column" alignItems="center" spacing={2}>

                            {/* ---------------------------------Region------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={regionList}
                                value={floor}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setFloor({
                                            ...floor, regionName: "",
                                        })
                                    }
                                    setFloor({
                                        ...floor,
                                        regionName: nv.regionName, RegionId: nv.id, cityName: "",
                                        villageName: "", streetName: "", apartmentName: "",
                                    });
                                    getAllCities(nv.id);
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
                                        label="Rayon adı *"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />

                            {/* ---------------------------------City------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={cityList}
                                value={floor}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setFloor({
                                            ...floor, cityName: "",
                                        })
                                    }
                                    setFloor({
                                        ...floor, cityName: nv.cityName, CityId: nv.id,
                                        villageName: "", streetName: "", apartmentName: "",
                                    })
                                    getAllVillages(nv.id);
                                    getAllStreetsByCityId(nv.id);
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
                                        label="Şəhər adı vacibdir *"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />

                            {/* ---------------------------------Village------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={villageList}
                                value={floor}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setFloor({
                                            ...floor, villageName: "", VillageId: null
                                        })
                                    }
                                    setFloor({
                                        ...floor, VillageId: nv.id, villageName: nv.villageName, streetName: "", apartmentName: "",
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
                                        label="Kənd/Qəsəbə adı olmaya bilər *"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />

                            {/* ---------------------------------Street------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={streetList}
                                value={floor}
                                onChange={(e, nv) => {
                                    setFloor({
                                        ...floor, StreetId: nv.id,
                                        streetName: nv.streetName, apartmentName: "",
                                    })
                                    getAllApartments(nv.id);
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
                                        label="Küçə adı *"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />

                            {/* ---------------------------------Apartment------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={apartmentList}
                                value={floor}
                                onChange={(e, nv) => {
                                    setFloor({
                                        ...floor, ApartmentId: nv.id, apartmentName: nv.apartmentName,
                                    })
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

                            <TextField required label="Mərtəbə " value={floor.FloorName}
                                onKeyDown={(e) => { e.stopPropagation(); }}
                                onChange={(e) => {
                                    setFloor({ ...floor, FloorName: e.target.value })

                                }} />

                            <LoadingButton alignItems="center" type="submit" variant="contained"
                                onClick={() => {
                                    postFloor(floor)
                                    setIsOpen(false)
                                    setFloor({
                                        ...floor, CityName: "", RegionName: "",
                                        VillageName: "", StreetName: "", ApartmentName: "", FloorName: "",
                                    })
                                }} >
                                Yadda saxla
                            </LoadingButton>
                        </Stack>
                    </>

                </Container>
            </Menu>
        </>
    )
}     