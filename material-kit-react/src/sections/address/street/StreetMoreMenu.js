import { useRef, useState } from 'react';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function StreetMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const updateStreet = props.street;

  const deleteData = (Id) => {
    fetch(`https://localhost:7005/api/Street/${Id}`, {
      method: 'DELETE', headers:
        { headers: { 'Content-Type': 'application/json' } }
    })
  }

  const putOptions = (Id, newStreet) => {

    fetch(`https://localhost:7005/api/Street/${Id}`, {
      method: 'PUT', headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ id: Id, ...newStreet })
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
          onClick={() => deleteData(updateStreet.Id)}>
          <ListItemIcon >
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Sil" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>


        <MenuItem sx={{ color: 'text.secondary' }}
          onClick={() => putOptions(updateStreet.Id, updateStreet)}
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







