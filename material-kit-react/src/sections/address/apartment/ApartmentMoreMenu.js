import { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function ApartmentMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const updateApartment = props.apartment;

  const deleteData = (Id) => {
    fetch(`https://localhost:7005/api/Apartment/${Id}`, {
      method: 'DELETE', headers:
        { headers: { 'Content-Type': 'application/json' } }
    })
  }

  const putOptions = (Id, newApartment) => {

    fetch(`https://localhost:7005/api/Apartment/${Id}`, {
      method: 'PUT', headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ id: Id, ...newApartment })
    }
    )
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}
          onClick={() => deleteData(updateApartment.Id)}>
          <ListItemIcon >
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Sil" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>


        <MenuItem sx={{ color: 'text.secondary' }}
          onClick={() => putOptions(updateApartment.Id, updateApartment)}
        >
          <ListItemIcon >
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Dəyiş" primaryTypographyProps={{ variant: 'body2' }} />

        </MenuItem>
      </Menu>
    </>
  );
}







