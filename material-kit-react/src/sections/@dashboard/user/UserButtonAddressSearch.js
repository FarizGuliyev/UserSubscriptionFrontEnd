import { filter } from 'lodash';
import { useState, useRef, useEffect } from "react";

import {
    TableRow,
    TableCell,
    Button,
} from '@mui/material';


export default function UserButtonAddressSearch(props) {

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
  
    return (
        <>
            <TableRow >

                <TableCell align="center">
                    {id}
                </TableCell>
                <TableCell align="center">
                    {name}
                </TableCell>
                <TableCell align="center">
                    {surname}
                </TableCell>
                <TableCell align="center">
                    {fatherName}
                </TableCell>
                <TableCell align="center">
                    {regionName}
                </TableCell>
                <TableCell align="center">
                    {cityName}
                </TableCell>
                <TableCell align="center">
                    {villageName}
                </TableCell>
                <TableCell align="center">
                    {streetName}
                </TableCell>
                <TableCell align="center">
                    {apartmentName}
                </TableCell>
                <TableCell align="center">
                    {floorName}
                </TableCell>
                <TableCell align="center">
                    {houseName}
                </TableCell>

            </TableRow>
        </>
    )
}        