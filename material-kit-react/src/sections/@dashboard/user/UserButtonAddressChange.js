import { filter } from 'lodash';
import { useState, useRef, useEffect } from "react";

import {
    TableRow,
    TableCell,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material';

import UserMoreMenu from "./UserMoreMenu";

export default function UserButtonAddressChange(props) {


    const { id, name, surname, fatherName,
        regionId, cityId, villageId, streetId, apartmentId, floorId,
        flatId, regionName, cityName, villageName, streetName, houseName,
        apartmentName, floorName, } = props.user;

    const [user, setUser] = useState({
        Id: id,
        Name: name,
        Surname: surname,
        FatherName: fatherName,
        RegionId: regionId,
        CityId: cityId,
        VillageId: villageId,
        StreetId: streetId,
        ApartmentId: apartmentId,
        FloorId: floorId,
        FlatId: flatId,
        "regionName": regionName,
        "cityName": cityName,
        "villageName": villageName,
        "streetName": streetName,
        "apartmentName": apartmentName,
        "floorName": floorName,
        "houseName": houseName
    });

    // --------------------------------RegionGet----------------------------------
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

    useEffect(() => {
        if (regionId !== null) {
            getAllCities(regionId);
        }
    }, []);

    // --------------------------------VillageGet---------------------------------- 
    const [villageList, setVillageList] = useState([]);

    const getAllVillages = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Village/${Id}`);

        response.json().then((res) => setVillageList(res));
    };

    useEffect(() => {
        if (cityId !== null) {
            getAllVillages(cityId);
        }
    }, []);

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
        if (villageId !== null) {
            getAllStreets(villageId);
        } else { getAllStreetsByCityId(cityId) }
    }, []);

    // --------------------------ApartmentGet-----------------------
    const [apartmentList, setApartmentList] = useState([]);

    const getAllApartments = async (Id) => {

        const response = await fetch(`https://localhost:7005/Apartment/ByStreet/${Id}`);

        response.json().then((res) => setApartmentList(res));
    };


    useEffect(() => {
        if (streetId !== null) {
            getAllApartments(streetId);
        }
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

    // --------------------------------FlatGet----------------------------------
    const [flatList, setFlatList] = useState([]);

    const getAllFlats = async (Id) => {

        const response = await fetch(`https://localhost:7005/api/Flat/${Id}`);

        response.json().then((res) => setFlatList(res));
    };

    // --------------------------------FlatGetByStreetId----------------------------------

    const getAllFlatsByStreetId = async (Id) => {

        const response = await fetch(`https://localhost:7005/Flat/ByStreet/${Id}`);

        response.json().then((res) => setFlatList(res));
    };


    useEffect(() => {
        if (floorId !== null) {
            getAllFlats(floorId);
        } else { getAllFlatsByStreetId(streetId) }
    }, []);


    return (
        <TableRow >

            <TableCell align="center">
                {user.Id}
            </TableCell>

            <TableCell align="center">
                {user.Name}
            </TableCell>
            <TableCell align="center">
                {user.Surname}
            </TableCell>
            <TableCell align="center">
                {user.FatherName}
            </TableCell>

            {/* -----------------------------------Region------------------------------------- */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 200 }}
                    options={regionList}
                    value={user}
                    onChange={(e, nv) => {
                        if (nv === null) {
                            setUser({
                                ...user, regionName: "",
                            })
                        }
                        setUser({
                            ...user, regionName: nv.regionName, RegionId: nv.id,
                            FloorId: null, FlatId: null, ApartmentId: null,
                            StreetId: null, VillageId: null, CityId: null,
                            cityName: "", villageName: "", streetName: "",
                            apartmentName: "", floorName: "", houseName: ""
                        })
                        getAllCities(nv.id);
                        getAllVillages(0)
                        getAllStreets(0)
                        getAllApartments(0)
                        getAllFloors(0)
                        getAllFlats(0)
                    }}

                    autoHighlight
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
                            label="Rayon *"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }} />
                    )} />
            </TableCell>

            {/* -----------------------------------City-------------------------------------  */}

            {user.RegionId !== null &&
                <TableCell align="center">
                    <Autocomplete
                        id=""
                        sx={{ width: 200 }}
                        options={cityList}
                        value={user}
                        onChange={(e, nv) => {
                            if (nv === null) {
                                setUser({
                                    ...user, cityName: "", CityId: 0,
                                })
                            }
                            setUser({
                                ...user, cityName: nv.cityName, CityId: nv.id,
                                FloorId: null, FlatId: null, ApartmentId: null,
                                StreetId: null, VillageId: null,
                                villageName: "", streetName: "", apartmentName: "",
                                floorName: "", houseName: ""
                            })
                            getAllVillages(nv.id);
                            getAllStreetsByCityId(nv.id)
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
                                label="Şəhər *"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }} />
                        )} />
                </TableCell>
            }

            {/* --------------------------------------Village---------------------------------- */}
          
                <TableCell align="center">
                    <Autocomplete
                        id=""
                        sx={{ width: 200 }}
                        options={villageList}
                        value={user}
                        onChange={(e, nv) => {
                            if (nv === null) {
                                setUser({
                                    ...user, villageName: "", VillageId: 0,
                                })
                            }
                            setUser({
                                ...user, villageName: nv.villageName, VillageId: nv.id,
                                FloorId: null, FlatId: null, ApartmentId: null, StreetId: null,
                                streetName: "", apartmentName: "", floorName: "", houseName: ""
                            })
                            getAllStreets(nv.id);
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
                                label="Kənd/Qəsəbə *"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }} />
                        )} />
                </TableCell>
            

            {/* ------------------------------Street--------------------------- */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 170 }}
                    options={streetList}
                    value={user}
                    onChange={(e, nv) => {
                        setUser({
                            ...user, StreetId: nv.id, streetName: nv.streetName,
                            ApartmentId: null, FloorId: null, FlatId: null,
                            apartmentName: "", floorName: "", houseName: ""
                        })
                        getAllFloors(0)
                        getAllApartments(nv.id)
                        getAllFlatsByStreetId(nv.id)

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
                            label="Küçə *"
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
                    value={user}
                    onChange={(e, nv) => {
                        setUser({
                            ...user, ApartmentId: nv.id, apartmentName: nv.apartmentName,
                            FloorId: null, FlatId: null, floorName: "", houseName: "",
                        })
                        getAllFlats(0)
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
                            label="Bina *"
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
                    value={user}
                    onChange={(e, nv) => {
                        setUser({
                            ...user, FloorId: nv.id, floorName: nv.floorName,
                            FlatId: null, houseName: ""
                        })
                        getAllFlats(nv.id)
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
                            label="Mərtəbə *"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </TableCell>

            {/* ------------------------------Flat--------------------------- */}
            <TableCell align="center">
                <Autocomplete
                    id=""
                    sx={{ width: 170 }}
                    options={flatList}
                    value={user}
                    onChange={(e, nv) => {
                        setUser({
                            ...user, FlatId: nv.id, houseName: nv.houseName
                        })

                    }}

                    autoHighlight
                    getOptionLabel={(option) => {
                        return option.houseName ? option.houseName : ""

                    }}
                    renderOption={(props, option) => (
                        <Box component="li"  {...props}>

                            {option.houseName}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Mənzil *"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell>
                <UserMoreMenu user={user} />
            </TableCell>
        </TableRow>
    );
}        