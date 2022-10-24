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

export default function FlatCreate() {

    const ref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [flat, setFlat] = useState({
        RegionId: null,
        CityId: null,
        VillageId: null,
        StreetId: null,
        ApartmentId: null,
        FloorId: null,
        "regionName": "",
        "cityName": "",
        "villageName": "",
        "streetName": "",
        "apartmentName": "",
        "floorName": "",
        HouseName: "",
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

    // --------------------------------FloorGet---------------------------------- 
    const [floorList, setFloorList] = useState([]);

    const getAllFloors = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Floor/${Id}`);

        response.json().then((res) => setFloorList(res));
    };

    const postFlat = (newFlat) => {
        fetch(`https://localhost:7005/api/Flat`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newFlat })
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
                            Yeni Mənzil əlavə edin
                        </Typography>
                    </Stack>
                    <>

                        <Stack direction="column" alignItems="center" spacing={2}>

                            {/* ---------------------------------Region------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={regionList}
                                value={flat}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setFlat({
                                            ...flat, regionName: "",
                                        })
                                    }
                                    setFlat({
                                        ...flat,
                                        regionName: nv.regionName, RegionId: nv.id,
                                        CityId: null, cityName: "", VillageId: null, villageName: "",
                                        StreetId: null, streetName: "", ApartmentId: null,
                                        apartmentName: "", FloorId: null, floorName: ""

                                    });
                                    getAllCities(nv.id);
                                    getAllVillages(0)
                                    getAllStreets(0)
                                    getAllApartments(0)
                                    getAllFloors(0)
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
                                value={flat}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setFlat({
                                            ...flat, cityName: "",
                                        })
                                    }
                                    setFlat({
                                        ...flat, cityName: nv.cityName, CityId: nv.id,
                                        VillageId: null, villageName: "",
                                        StreetId: null, streetName: "", ApartmentId: null,
                                        apartmentName: "", FloorId: null, floorName: ""
                                    })
                                    getAllVillages(nv.id);
                                    getAllStreetsByCityId(nv.id);
                                    getAllApartments(0)
                                    getAllFloors(0)
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
                                value={flat}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setFlat({
                                            ...flat, villageName: "", VillageId: null
                                        })
                                    }
                                    setFlat({
                                        ...flat, VillageId: nv.id, villageName: nv.villageName,
                                        StreetId: null, streetName: "", ApartmentId: null,
                                        apartmentName: "", FloorId: null, floorName: ""
                                    })
                                    getAllStreets(nv.id);
                                    getAllApartments(0)
                                    getAllFloors(0)
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
                                value={flat}
                                onChange={(e, nv) => {
                                    setFlat({
                                        ...flat, StreetId: nv.id, streetName: nv.streetName,
                                        ApartmentId: null, apartmentName: "", FloorId: null, floorName: ""
                                    })
                                    getAllApartments(nv.id);
                                    getAllFloors(0)
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
                                        label="Küçə adı vacibdir *"
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
                                value={flat}
                                onChange={(e, nv) => {
                                    setFlat({
                                        ...flat, ApartmentId: nv.id, apartmentName: nv.apartmentName, FloorId: null, floorName: ""
                                    })
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
                                        label="Bina olmaya bilər *"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />

                            {/* ---------------------------------Floor------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={floorList}
                                autoHighlight
                                onChange={(e, nv) => {
                                    setFlat({
                                        ...flat, FloorId: nv.id, floorName: nv.floorName
                                    })
                                }}
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
                                        label="Mərtəbə olmaya bilər *"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />

                            <TextField required label="Mənzil " value={flat.HouseName}
                                onKeyDown={(e) => { e.stopPropagation(); }}
                                onChange={(e) => {
                                    setFlat({ ...flat, HouseName: e.target.value })

                                }} />

                            <LoadingButton alignItems="center" type="submit" variant="contained"
                                onClick={() => {
                                    postFlat(flat)
                                    setIsOpen(false)
                                    setFlat({
                                        ...flat, cityName: "", regionName: "",
                                        villageName: "", streetName: "",
                                        apartmentName: "", floorName: "", HouseName: "",
                                        RegionId:null,CityId:null,VillageId:null,StreetId:null,
                                        ApartmentId:null,FloorId:null
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