import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material';

import CityMoreMenu from "./CityMoreMenu";

export default function CityAddComponent(props) {
    const { id, regionId, regionName, cityName } = props.list;

    const [city, setCity] = useState({
        Id: id,
        RegionId: regionId,
        "regionName": regionName,
        CityName: cityName,
    });

    const [regionList, setRegionList] = useState([]);

    const getAllRegions = async () => {

        const response = await fetch('https://localhost:7005/api/Region');

        response.json().then((res) => setRegionList(res));
    };

    useEffect(() => {
        getAllRegions();
    }, []);

    return (

        <TableRow>
            <TableCell align="center">{city.Id}</TableCell>
            <TableCell align="center">
                <Autocomplete
                    style={{
                        minWidth: 250,
                        display: 'inline',
                        justifyContent: 'center',
                        alignItems: 'center',
                       
                    }}
                    id=""
                    sx={{ width: 280 }}
                    options={regionList}
                    value={city}
                    onChange={(e, nv) => {
                        setCity({ ...city, regionName: nv.regionName, RegionId: nv.id })
                    }}
                    autoHighlight
                    // filterOptions={(option)=>option.RegionName}
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

                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align="center">
                <Input value={city.CityName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setCity({ ...city, CityName: e.target.value })} />
            </TableCell>

            <TableCell>
                <CityMoreMenu city={city} />
            </TableCell>
        </TableRow>
    )
}        