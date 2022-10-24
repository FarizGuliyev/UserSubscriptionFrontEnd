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

export default function ApartmentCreate() {

    const ref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [apartment, setApartment] = useState({
        RegionId: null,
        CityId: null,
        VillageId: null,
        StreetId: null,
        "regionName": "",
        "cityName": "",
        "villageName": "",
        "streetName": "",
        ApartmentName: "",
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

    // --------------------------------ApartmentPost---------------------------------- 
    const postApartment = (newApartment) => {
        fetch(`https://localhost:7005/api/Apartment`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newApartment })
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
                            Yeni Bina əlavə edin
                        </Typography>
                    </Stack>
                    <>

                        <Stack direction="column" alignItems="center" spacing={2}>

                            {/* ---------------------------------Region------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={regionList}
                                value={apartment}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setApartment({
                                            ...apartment, regionName: "",
                                        })
                                    }
                                    setApartment({
                                        ...apartment,
                                        regionName: nv.regionName, RegionId: nv.id, cityName: "", villageName: "", streetName: ""
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
                                value={apartment}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setApartment({
                                            ...apartment, cityName: "",
                                        })
                                    }
                                    setApartment({
                                        ...apartment, cityName: nv.cityName, CityId: nv.id,
                                        villageName: "", streetName: "",
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
                                value={apartment}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setApartment({
                                            ...apartment, villageName: "", VillageId: null
                                        })
                                    }
                                    setApartment({
                                        ...apartment, VillageId: nv.id, villageName: nv.villageName, streetName: "",
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
                                value={apartment}
                                onChange={(e, nv) => {
                                    setApartment({
                                        ...apartment, StreetId: nv.id,
                                        streetName: nv.streetName, regionName: nv.regionName, cityName: nv.cityName,
                                        villageName: nv.villageName,
                                    })
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

                            <TextField required label="Bina adı" value={apartment.ApartmentName}
                                onKeyDown={(e) => { e.stopPropagation(); }}
                                onChange={(e) => {
                                    setApartment({ ...apartment, ApartmentName: e.target.value })

                                }} />

                            <LoadingButton alignItems="center" type="submit" variant="contained"
                                onClick={() => {
                                    postApartment(apartment)
                                    setIsOpen(false)
                                    setApartment({
                                        ...apartment, CityName: "", RegionName: "",
                                        VillageName: "", StreetName: "", ApartmentName: "",
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