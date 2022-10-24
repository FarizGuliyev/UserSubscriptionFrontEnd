import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material';

import VillageMoreMenu from "./VillageMoreMenu";

export default function VillageAddComponent(props) {
    const { id, cityId, regionName, cityName, villageName, regionId } = props.list;

    const [village, setVillage] = useState({
        Id: id,
        CityId: cityId,
        RegionName: regionName,
        "cityName": cityName,
        VillageName: villageName,
        RegionId: regionId
    });

    const [cityList, setCityList] = useState([]);

    const getAllCities = async () => {

        const response = await fetch('https://localhost:7005/api/City');

        response.json().then((res) => setCityList(res));
    };

    useEffect(() => {
        getAllCities();
    }, []);

    return (

        <TableRow>
            <TableCell align="center">{village.Id}</TableCell>
            <TableCell align="center">
                <Input value={village.RegionName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>
            <TableCell align="center">
                <Autocomplete
                    id=""
                    style={{
                        minWidth: 250,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    options={cityList}
                    value={village}
                    onChange={(e, nv) => {
                        setVillage({
                            ...village, cityName: nv.cityName,
                            CityId: nv.id, RegionId: nv.regionId, RegionName: nv.regionName
                        })

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

                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align="center">
                <Input value={village.VillageName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setVillage({ ...village, VillageName: e.target.value })} />
            </TableCell>

            <TableCell>
                <VillageMoreMenu village={village} />
            </TableCell>
        </TableRow>
    )
}        