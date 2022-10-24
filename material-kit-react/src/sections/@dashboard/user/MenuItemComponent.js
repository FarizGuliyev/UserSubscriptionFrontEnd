import { useState, useEffect } from "react";
import {
    TableRow,
    TableCell,
    Select,
    FormControl,
    MenuItem,
    Input,
    Modal,
    Box,
    Button,
    Typography

} from '@mui/material';
import UserMoreMenu from "./UserMoreMenu";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '5px solid #1212',
    borderRadius: '50px',
    boxShadow: 12,
    p: 4,
};

export default function MenuItemComponent(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [sublist, setSublist] = useState([]);
    const { id, name, surname, fatherName, debt, subscriptionTypeId,
        regionId, cityId, villageId, streetId, apartmentId, floorId,
        flatId, regionName, cityName, villageName, streetName, houseName,
        apartmentName, floorName, } = props.list;


    const getAllSubs = async () => {

        const response = await fetch('https://localhost:7005/api/SubscriptionType');

        response.json().then((res) => setSublist(res));
    };

    useEffect(() => {
        getAllSubs();
    }, []);

    const [user, setUser] = useState({
        Id: id,
        Name: name,
        Surname: surname,
        FatherName: fatherName,
        Debt: debt,
        SubscriptionTypeId: subscriptionTypeId,
        RegionId: regionId,
        CityId: cityId,
        VillageId: villageId,
        StreetId: streetId,
        ApartmentId: apartmentId,
        FloorId: floorId,
        FlatId: flatId,
        RegionName: regionName,
        CityName: cityName,
        VillageName: villageName,
        StreetName: streetName,
        ApartmentName: apartmentName,
        FloorName: floorName,
        HouseName: houseName,
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
                {user.Id}
            </TableCell>
            <TableCell align="center">
                <Input value={user.Name} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setUser({ ...user, Name: e.target.value })} />
            </TableCell>
            <TableCell align="center">
                <Input value={user.Surname} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setUser({ ...user, Surname: e.target.value })} />
            </TableCell>
            <TableCell align="center">
                <Input value={user.FatherName} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setUser({ ...user, FatherName: e.target.value })} />
            </TableCell>
            {/* --------------------------Select--------------------------- */}

            <TableCell align='center'>
                <Input value={user.Debt} inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    onChange={(e) => setUser({ ...user, Debt: e.target.value })} />
            </TableCell>
            <TableCell align='center'>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                    <Select
                        value={user.SubscriptionTypeId}

                    >
                        {sublist.map((t) =>
                            <MenuItem value={t.id}
                                onClick={() => setUser({ ...user, SubscriptionTypeId: t.id })}
                            >{t.subName}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </TableCell>
            {/* --------------------------Address--------------------------- */}
            <TableCell align="center">
                <Button onClick={handleOpen}>Göstər</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            İstifadəçinin Ünvanı
                        </Typography>
                        {user.ApartmentId === null ?
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {user.RegionName},{user.CityName},{user.VillageName},{user.StreetName},
                                {user.HouseName}
                            </Typography>
                            :
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {user.RegionName},{user.CityName},{user.VillageName},{user.StreetName},
                                {user.ApartmentName},{user.FloorName},{user.HouseName}
                            </Typography>}
                    </Box>
                </Modal>
            </TableCell>
            <TableCell>
                <UserMoreMenu user={user} />
            </TableCell>
        </TableRow>
    )
}        