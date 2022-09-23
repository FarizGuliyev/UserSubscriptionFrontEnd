import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input

} from '@mui/material';
import ProductMoreMenu from "./PhoneNumberMoreMenu";


export default function PhoneNumberAddComponent(props) {
    const { id, userId, userName, number } = props.phone;

    const [phoneNumber, setPhoneNumber] = useState({
        Id: id,
        UserName: userName,
        UserId: userId,
        Number: number,
    });

    return (

        <TableRow
        >
            <TableCell align="center">
                <Input value={phoneNumber.UserName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                     />
            </TableCell>
            <TableCell align="center">
                <Input value={phoneNumber.Number} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setPhoneNumber({ ...phoneNumber, Number: e.target.value })} />
            </TableCell>
           
            <TableCell>
                <ProductMoreMenu phone={phoneNumber} />
            </TableCell>
        </TableRow>
    )
}        