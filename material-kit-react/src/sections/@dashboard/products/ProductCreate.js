import { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';
import {
    TableRow,
    TableCell,
    Input,
    Menu,
    Stack,
    Typography,
    Table,
    TableContainer,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    TableBody,
    TextField,
} from '@mui/material';

import ProductListHead from './ProductListHead';

const TABLE_HEAD = [
    { id: 'name', label: 'Abunəlik paketi', alignRight: false },
    { id: 'price', label: 'Paket qiyməti', alignRight: false },
    { id: 'note', label: 'Açıqlama', alignRight: false },
];


export default function ProductCreate() {

    const ref = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [product, setProduct] = useState({
        Name: "",
        Price: 0,
        Note: "",
    });

    const postProduct = (newProduct) => {

        fetch(`https://localhost:7005/api/SubscriptionType`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ ...newProduct })
        }
        )
    }


    return (
        <>

            {/* _____________________________________________ */}
            <Button ref={ref} variant="contained" onClick={() => setIsOpen(true)}>Əlavə et</Button>
            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 941, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Stack direction="column" alignItems="center" >
                    <Typography variant="h5" gutterBottom >
                        Telefon nömrəsi əlavə edin
                    </Typography>
                </Stack>

                <TableContainer sx={{ minWidth: 300 }}>
                    <Table>
                        <ProductListHead
                            headLabel={TABLE_HEAD}
                        />
                        <TableBody>
                            <TableRow
                            >

                                <TableCell align="center">
                                    <Input value={product.Name} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                        onChange={(e) => setProduct({ ...product, Name: e.target.value })} />
                                </TableCell>

                                <TableCell align="center">
                                    <Input value={product.Price} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                        onChange={(e) => setProduct({ ...product, Price: e.target.value })} />
                                </TableCell>

                                <TableCell align="center">
                                    <Input value={product.Note} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                        onChange={(e) => setProduct({ ...product, Note: e.target.value })} />
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>

                </TableContainer>
                <Stack direction="column" alignItems="center">
                    <Button variant="contained"
                        onClick={() => {
                            postProduct(product)
                            setIsOpen(false)
                        }} >Yadda saxla</Button>
                </Stack>
            </Menu>
        </>
    )
}        