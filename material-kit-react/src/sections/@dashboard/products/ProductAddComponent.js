import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input

} from '@mui/material';
import ProductMoreMenu from "./ProductMoreMenu";


export default function ProductAddComponent(props) {
    const { id, name, price, note } = props.list;

    const [subs, setSubs] = useState({
        Id: id,
        Name: name,
        Price: price,
        Note: note,
    });

    return (

        <TableRow
        >
            <TableCell align="center">
                <Input value={subs.Name} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, Name: e.target.value })} />
            </TableCell>
            <TableCell align="center">
                <Input value={subs.Price} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, Price: e.target.value })} />
            </TableCell>
            <TableCell align="center">
                <Input value={subs.Note} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setSubs({ ...subs, Note: e.target.value })} />
            </TableCell>
    
            <TableCell>
                <ProductMoreMenu subscription={subs} />
            </TableCell>
        </TableRow>
    )
}        