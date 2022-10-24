import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material';

import FlatMoreMenu from "./FlatMoreMenu";

export default function FlatAddComponent(props) {
    const { id, floorId, apartmentId, cityId, villageId, streetId, regionName, cityName, villageName, streetName, apartmentName, floorName, houseName } = props.list;

    const [flat, setFlat] = useState({
        Id: id,
        StreetId: streetId,
        ApartmentId: apartmentId,
        FloorId: floorId,
        RegionName: regionName,
        CityName: cityName,
        VillageName: villageName,
        "streetName": streetName,
        "apartmentName": apartmentName,
        "floorName": floorName,
        HouseName: houseName,
    });

    // --------------------------StreetGet-----------------------
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

    useEffect(() => {
        if (villageId === null) {
            getAllStreetsByCityId(cityId)
        } else { getAllStreets(villageId) }
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


    // --------------------------FloorGet-----------------------
    const [floorList, setFloorList] = useState([]);

    const getAllFloors = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Floor/${Id}`);

        response.json().then((res) => setFloorList(res));
    };

    useEffect(() => {
        if (apartmentId !== null) {
            getAllFloors(apartmentId);
        }
    }, []);


    return (

        <TableRow>
            <TableCell align="center">{flat.Id}</TableCell>

            <TableCell align="center">
                <Input value={flat.RegionName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            <TableCell align="center">
                <Input value={flat.CityName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            <TableCell align="center">
                <Input value={flat.VillageName} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
            </TableCell>

            {/* ------------------------------Street--------------------------- */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 170 }}
                    options={streetList}
                    value={flat}
                    onChange={(e, nv) => {
                        setFlat({
                            ...flat, StreetId: nv.id, ApartmentId: null, FloorId: null,
                            RegionName: nv.regionName, CityName: nv.cityName,
                            VillageName: nv.villageName, streetName: nv.streetName,
                            apartmentName: "", floorName: "",
                        })
                        getAllFloors(0)
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
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </TableCell>

            {/* ------------------------------Apartment--------------------------- */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 170 }}
                    options={apartmentList}
                    value={flat}
                    onChange={(e, nv) => {
                        setFlat({
                            ...flat, ApartmentId: nv.id, apartmentName: nv.apartmentName,
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

                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </TableCell>

            {/* ------------------------------Floor--------------------------- */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 170 }}
                    options={floorList}
                    value={flat}
                    onChange={(e, nv) => {
                        setFlat({
                            ...flat, FloorId: nv.id, floorName: nv.floorName
                        })

                    }}

                    autoHighlight
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

                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align="center">
                <Input value={flat.HouseName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setFlat({ ...flat, HouseName: e.target.value })} />
            </TableCell>

            <TableCell>
                <FlatMoreMenu flat={flat} />
            </TableCell>
        </TableRow>
    )
}        