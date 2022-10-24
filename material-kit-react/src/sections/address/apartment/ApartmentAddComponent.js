import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material';

import ApartmentMoreMenu from "./ApartmentMoreMenu";

export default function ApartmentAddComponent(props) {
    const { id, streetId, regionName, cityName, villageName, streetName, apartmentName } = props.list;

    const [apartment, setApartment] = useState({
        Id: id,
        StreetId: streetId,
        RegionName: regionName,
        CityName: cityName,
        VillageName: villageName,
        "streetName": streetName,
        ApartmentName: apartmentName,
    });


    // --------------------------StreetGet-----------------------
    const [streetList, setStreetList] = useState([]);

    const getAllStreets = async () => {

        const response = await fetch('https://localhost:7005/api/Street');

        response.json().then((res) => setStreetList(res));
    };

    useEffect(() => {
        getAllStreets();
    }, []);

    return (

        <TableRow>
            <TableCell align="center">{apartment.Id}</TableCell>

            <TableCell align="center">
                <Input value={apartment.RegionName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            <TableCell align="center">
                <Input value={apartment.CityName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            <TableCell align="center">
                <Input value={apartment.VillageName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            {/* ------------------------------------Street------------------------------------ */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 230 }}
                    options={streetList}
                    value={apartment}
                    onChange={(e, nv) => {
                        setApartment({
                            ...apartment, CityName: nv.cityName, VillageName: nv.villageName,
                            StreetId: nv.id, RegionName: nv.regionName, streetName:nv.streetName,
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

                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align="center">
                <Input value={apartment.ApartmentName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setApartment({ ...apartment, ApartmentName: e.target.value })} />
            </TableCell>

            <TableCell>
                <ApartmentMoreMenu apartment={apartment} />
            </TableCell>
        </TableRow>
    )
}        