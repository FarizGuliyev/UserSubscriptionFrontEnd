import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material';

import FloorMoreMenu from "./FloorMoreMenu";

export default function FloorAddComponent(props) {
    const { id, apartmentId, streetId, regionName, cityName, villageName, streetName, apartmentName, floorName } = props.list;

    const [floor, setFloor] = useState({
        Id: id,
        ApartmentId: apartmentId,
        RegionName: regionName,
        CityName: cityName,
        VillageName: villageName,
        "streetName": streetName,
        "apartmentName": apartmentName,
        FloorName: floorName,
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

    // --------------------------ApartmentGet-----------------------
    const [apartmentList, setApartmentList] = useState([]);

    const getAllApartments = async (Id) => {

        const response = await fetch(`https://localhost:7005/Apartment/ByStreet/${Id}`);

        response.json().then((res) => setApartmentList(res));
    };

    useEffect(() => {
        getAllApartments(streetId);
    }, []);


    return (

        <TableRow>
            <TableCell align="center">{floor.Id}</TableCell>

            <TableCell align="center">
                <Input value={floor.RegionName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            <TableCell align="center">
                <Input value={floor.CityName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            <TableCell align="center">
                <Input value={floor.VillageName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            {/* -------------------------------Street------------------------------------ */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 200 }}
                    options={streetList}
                    value={floor}
                    onChange={(e, nv) => {
                        setFloor({
                            ...floor, RegionName: nv.regionName, CityName: nv.cityName, VillageName: nv.villageName,
                            streetName: nv.streetName, apartmentName: ""
                        })
                        getAllApartments(nv.id)

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

            {/* -------------------------------Apartment------------------------------------ */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 200 }}
                    options={apartmentList}
                    value={floor}
                    onChange={(e, nv) => {
                        setFloor({
                            ...floor, ApartmentId: nv.id, apartmentName: nv.apartmentName
                        })

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

                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </TableCell>

            <TableCell align="center">
                <Input value={floor.FloorName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setFloor({ ...floor, FloorName: e.target.value })} />
            </TableCell>

            <TableCell>
                <FloorMoreMenu floor={floor} />
            </TableCell>
        </TableRow>
    )
}        