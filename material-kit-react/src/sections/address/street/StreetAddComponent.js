import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material';

import StreetMoreMenu from "./StreetMoreMenu";

export default function StreetAddComponent(props) {
    const { id, villageId, regionName, cityName, villageName, streetName, cityId } = props.list;

    const [street, setStreet] = useState({
        Id: id,
        VillageId: villageId,
        CityId: cityId,
        RegionName: regionName,
        "cityName": cityName,
        "villageName": villageName,
        StreetName: streetName,
    });

    // --------------------------CityGet-----------------------
    const [cityList, setCityList] = useState([]);

    const getAllCities = async () => {

        const response = await fetch('https://localhost:7005/api/City');

        response.json().then((res) => setCityList(res));
    };

    useEffect(() => {
        getAllCities();
    }, []);

    // --------------------------VillageGet-----------------------
    const [villageList, setVillageList] = useState([]);

    const getAllVillages = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Village/${Id}`);

        response.json().then((res) => setVillageList(res));
    };


    useEffect(() => {
        getAllVillages(cityId);
    }, []);



    return (

        <TableRow>
            <TableCell align="center">{street.Id}</TableCell>
            <TableCell align="center">
                <Input value={street.RegionName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>
            {/* --------------------------------City--------------------------------- */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 200 }}
                    options={cityList}
                    value={street}
                    onChange={(e, nv) => {
                        setStreet({
                            ...street, cityName: nv.cityName,
                            CityId: nv.id, RegionName: nv.regionName, villageName: "", VillageId: null
                        })

                        getAllVillages(nv.id);
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

            {/* --------------------------------Village--------------------------------- */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 200 }}
                    options={villageList}
                    value={street}
                    onChange={(e, nv) => {
                        setStreet({
                            ...street, villageName: nv.villageName,
                            VillageId: nv.id,
                        })

                        console.log("city:", street)
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

                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />

            </TableCell>
            <TableCell align="center">
                <Input value={street.StreetName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setStreet({ ...street, StreetName: e.target.value })} />
            </TableCell>

            <TableCell>
                <StreetMoreMenu street={street} />
            </TableCell>
        </TableRow>
    )
}        