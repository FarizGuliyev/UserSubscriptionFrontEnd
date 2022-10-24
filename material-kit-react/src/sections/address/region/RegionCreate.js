import { useState, useRef} from "react";

import {
    Menu,
    Stack,
    Typography,
    Card,
    Container,
    Button,
    TextField,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

export default function RegionCreate() {

    const ref = useRef(null);

    const [regionOpen, setRegionOpen] = useState(0);

    const [region, setRegion] = useState({
        Id: 0,
        RegionName: "",
    });

    const postRegion = (newRegion) => {
        fetch(`https://localhost:7005/api/Region`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newRegion })
        })
    }

    return (
        <>
            <Button ref={ref} variant="contained" onClick={() => setRegionOpen(true)}>Əlavə et</Button>
            <Menu
                open={regionOpen}
                anchorEl={ref.current}
                onClose={() => {
                    setRegionOpen(false)
                }}
                PaperProps={{
                    sx: { width: 941, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>

                <Container>
                    <Stack direction="column" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4" gutterBottom >
                            İqtisadi rayonun adını daxil edin
                        </Typography>
                    </Stack>
                    <Card>
                        <>
                            <Stack spacing={3}>
                                <TextField required label="Rayon adı" value={region.RegionName}
                                    onKeyDown={(e) => { e.stopPropagation(); }}
                                    onChange={(e) => {
                                        setRegion({ ...region, RegionName: e.target.value })
                                    }
                                    } />

                                <LoadingButton alignItems="center" type="submit" variant="contained"
                                    onClick={() => {
                                        postRegion(region)
                                        setRegionOpen(false)
                                        setRegion({RegionName:""})
                                    }} >
                                    Yadda saxla
                                </LoadingButton>
                                <Typography   > </Typography>

                            </Stack>
                        </>

                    </Card>
                </Container>
            </Menu>
        </>
    )
}        