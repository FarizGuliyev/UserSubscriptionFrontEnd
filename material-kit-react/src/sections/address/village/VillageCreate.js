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

export default function VillageCreate() {

    const [cityList, setCityList] = useState([]);
    const getAllCities = async () => {

        const response = await fetch('https://localhost:7005/api/City');

        response.json().then((res) => setCityList(res));
    };

    useEffect(() => {
        getAllCities();
    }, []);


    const ref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [village, setVillage] = useState({
        CityId: 0,
        CityName: "",
        RegionName: "",
        VillageName: "",
    });

    const postVillage = (newVillage) => {
        fetch(`https://localhost:7005/api/Village`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newVillage })
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
                            Yeni Kənd və ya Qəsəbə əlavə edin
                        </Typography>
                    </Stack>
                    <>

                        <Stack direction="column" alignItems="center" spacing={2}>

                            <TextField required label="Rayon adı" value={village.RegionName}
                                onKeyDown={(e) => { e.stopPropagation(); }}
                            />

                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={cityList}
                                autoHighlight
                                onChange={(e, nv) => {
                                    setVillage({
                                        ...village, CityId: nv.id, RegionName: nv.regionName,
                                    })
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
                                        label="Şəhər adı *"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />

                            <TextField required label="Kənd/Qəsəbə adı" value={village.VillageName}
                                onKeyDown={(e) => { e.stopPropagation(); }}
                                onChange={(e) => {
                                    setVillage({ ...village, VillageName: e.target.value })

                                }} />

                            <LoadingButton alignItems="center" type="submit" variant="contained"
                                onClick={() => {
                                    postVillage(village)
                                    setIsOpen(false)
                                    setVillage({ ...village, CityName: "", RegionName: "", VillageName: "" })
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