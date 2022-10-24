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

export default function CityCreate() {

    const [regionList, setRegionList] = useState([]);
    const getAllRegions = async () => {

        const response = await fetch('https://localhost:7005/api/Region');

        response.json().then((res) => setRegionList(res));
    };

    useEffect(() => {
        getAllRegions();
    }, []);


    const ref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [city, setCity] = useState({
        RegionId: 0,
        CityName: "",
    });

    const postCity = (newCity) => {
        fetch(`https://localhost:7005/api/City`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newCity })
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
                            Yeni şəhər əlavə edin
                        </Typography>
                    </Stack>
                    <>

                        <Stack direction="column" alignItems="center" spacing={2}>
                            <Autocomplete
                                id=""
                                sx={{ width: 350 }}
                                options={regionList}
                                autoHighlight
                                onChange={(e, nv) => {
                                    setCity({ ...city, RegionId: nv.id })
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
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />

                            <TextField required label="Şəhər adı" value={city.CityName}
                                onKeyDown={(e) => { e.stopPropagation(); }}
                                onChange={(e) => {
                                    setCity({ ...city, CityName: e.target.value })

                                }
                                } />

                            <LoadingButton alignItems="center" type="submit" variant="contained"
                                onClick={() => {
                                    postCity(city)
                                    setIsOpen(false)
                                    setCity({ ...city, CityName: "" })
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