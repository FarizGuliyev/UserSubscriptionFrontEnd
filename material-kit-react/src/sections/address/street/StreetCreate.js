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

export default function StreetCreate() {

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

    // --------------------------------StreetPost---------------------------------- 
    const postStreet = (newStreet) => {
        fetch(`https://localhost:7005/api/Street`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newStreet })
        })
    }

    // ------------------------------------------------------------------------------
    const ref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [street, setStreet] = useState({
        RegionId: null,
        CityId: null,
        VillageId: null,
        "regionName": "",
        "cityName": "",
        "villageName": "",
        StreetName: "",
    });

    

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
                            Yeni Küçə əlavə edin
                        </Typography>
                    </Stack>
                    <>

                        <Stack direction="column" alignItems="center" spacing={2}>
                            {/* ---------------------------------Region------------------------------ */}
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={regionList}
                                autoHighlight
                                value={street}
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setStreet({
                                            ...street, regionName: "", RegionId: 0
                                        })
                                    }
                                    setStreet({
                                        ...street, RegionId: nv.id,
                                        regionName: nv.regionName, cityName: "", villageName: "",
                                    });
                                    getAllCities(nv.id);
                                }}
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
                                autoHighlight
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setStreet({
                                            ...street, cityName: "", CityId: 0
                                        })
                                    }
                                    setStreet({
                                        ...street, CityId: nv.id, cityName: nv.cityName,
                                        villageName: ""
                                    })
                                    getAllVillages(nv.id);
                                }}
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
                                autoHighlight
                                onChange={(e, nv) => {
                                    if (nv === null) {
                                        setStreet({
                                            ...street, villageName: "", VillageId: 0
                                        })
                                    }
                                    setStreet({
                                        ...street, VillageId: nv.id, villageName: nv.villageName,
                                    })
                                }}
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

                            <TextField required label="Küçə adı" value={street.StreetName}
                                onKeyDown={(e) => { e.stopPropagation(); }}
                                onChange={(e) => {
                                    setStreet({ ...street, StreetName: e.target.value })

                                }} />

                            <LoadingButton alignItems="center" type="submit" variant="contained"
                                onClick={() => {
                                    postStreet(street)
                                    setIsOpen(false)
                                    setStreet({
                                        ...street, cityName: "", regionName: "", CityId: 0, VillageId: 0, RegionId: 0,
                                        villageName: "", StreetName: "",
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