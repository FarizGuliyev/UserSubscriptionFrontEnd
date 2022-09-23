import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Select,
    FormControl,
    MenuItem,
    Input

} from '@mui/material';
import UserMoreMenu from "./UserMoreMenu";


export default function MenuItemComponent(props) {

    const [sublist, setSublist] = useState([]);
    const { id, name, surname, fatherName, address, addressDescription, debt, subscriptionTypeId } = props.list;


    const getAllSubs = async () => {

        const response = await fetch('https://localhost:7005/api/SubscriptionType');

        response.json().then((res) => setSublist(res));
    };

    useEffect(() => {
        getAllSubs();
    }, []);

    const [subs, setSubs] = useState({
        Id: id,
        Name: name,
        Surname: surname,
        FatherName: fatherName,
        Address: address,
        AddressDescription: addressDescription,
        Debt: debt,
        SubscriptionTypeId: subscriptionTypeId,
    });

    return (

        <TableRow
        // hover
        // key={id}
        // tabIndex={-1}
        // role="checkbox"
        // selected={isItemSelected}
        // aria-checked={isItemSelected}
        >

            <TableCell align="center">
                <Input value={subs.Name} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, Name: e.target.value })} />
            </TableCell>
            <TableCell align="center">
                <Input value={subs.Surname} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, Surname: e.target.value })} />
            </TableCell>
            <TableCell align="center">
                <Input value={subs.FatherName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, FatherName: e.target.value })} />
            </TableCell>
            <TableCell align="center">
                <Input value={subs.Address} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, Address: e.target.value })} />
            </TableCell>
            <TableCell align='center'>
                <Input value={subs.AddressDescription} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, AddressDescription: e.target.value })} />
            </TableCell>
            <TableCell align='center'>
                <Input value={subs.Debt} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, Debt: e.target.value })} />
            </TableCell>
            <TableCell align='center'>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                    <Select
                        value={subs.SubscriptionTypeId}
                        
                    >
                        {sublist.map((t) =>
                            <MenuItem value={t.id}
                                onClick={() => setSubs({ ...subs, SubscriptionTypeId: t.id })}
                            >{t.name}</MenuItem>
                        )}

                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                <UserMoreMenu user={subs} />
            </TableCell>
        </TableRow>
    )
}        