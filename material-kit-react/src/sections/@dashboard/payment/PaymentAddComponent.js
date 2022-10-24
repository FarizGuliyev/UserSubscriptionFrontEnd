import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input

} from '@mui/material';
import { format } from 'date-fns';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';


import PaymentMoreMenu from "./PaymentMoreMenu";

export default function PaymentAddComponent(props) {
    const { id, userName,surname, userId, payDate, amount, type, note } = props.list;

    const [calendarDate, setCalendarDate] = useState(format(new Date(payDate), 'MM-dd-yyyy'));

    const [payment, setPayment] = useState({
        Id: id,
        UserId: userId,
        Amount: amount,
        PayDate: calendarDate,
        Type: type,
        Note: note,
    });



    return (

        <TableRow
        >
            <TableCell align="center">{payment.Id}</TableCell>
            <TableCell align="center">{userName}</TableCell>
            <TableCell align="center">{surname}</TableCell>
            <TableCell align="center">
                <Input value={payment.Amount} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setPayment({ ...payment, Amount: e.target.value })} />
            </TableCell>
            <TableCell align="center">
                <Input value={payment.Type} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setPayment({ ...payment, Type: e.target.value })} />
            </TableCell>
            <TableCell align="center">

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker

                        label="Ödəniş tarixi"
                        value={payment.PayDate}
                        onChange={(e) => {
                            setPayment({ ...payment, PayDate: e });
                        }}
                        renderInput={(params) => <TextField {...params} />
                        }

                    />
                </LocalizationProvider>
                {

                    
                }

            </TableCell>
            <TableCell align="center">
                <Input value={payment.Note} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setPayment({ ...payment, Note: e.target.value })} />
            </TableCell>

            <TableCell>
                <PaymentMoreMenu pay={payment} />
            </TableCell>
        </TableRow>
    )
}        