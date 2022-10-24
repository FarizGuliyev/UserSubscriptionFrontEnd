import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Input

} from '@mui/material';

import RegionMoreMenu from "./RegionMoreMenu";

export default function RegionAddComponent(props) {
    const { id, regionName } = props.list;

    const [region, setRegion] = useState({
        Id: id,
        RegionName: regionName
    });

    return (
        <TableRow
        >
            <TableCell align="center">{id}</TableCell>
            <TableCell align="center">
                <Input value={region.RegionName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setRegion({ ...region, RegionName: e.target.value })} />
            </TableCell>
            
            <TableCell>
                <RegionMoreMenu region={region} />
            </TableCell>
        </TableRow>
    )
}        