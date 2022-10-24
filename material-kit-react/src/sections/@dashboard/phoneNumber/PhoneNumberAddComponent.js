import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input

} from '@mui/material';
import PhoneNumberMoreMenu from "./PhoneNumberMoreMenu";


export default function PhoneNumberAddComponent(props) {
    const { id, userId, userName,surName, number } = props.phone;

    const [phoneNumber, setPhoneNumber] = useState({
        Id: id,
        UserName: userName,
        SurName: surName,
        UserId: userId,
        Number: number,
    });

    return (

        <TableRow
        >
            <TableCell align="center">{phoneNumber.Id} </TableCell>
            <TableCell align="center">
                {phoneNumber.UserName}
            </TableCell>
            <TableCell align="center">
            {phoneNumber.SurName}
            </TableCell>
            <TableCell align="center">
                <Input value={phoneNumber.Number} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setPhoneNumber({ ...phoneNumber, Number: e.target.value })} />
            </TableCell>
           
            <TableCell>
                <PhoneNumberMoreMenu phone={phoneNumber} />
            </TableCell>
        </TableRow>
    )
}        