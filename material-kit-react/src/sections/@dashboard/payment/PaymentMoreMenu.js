import { useRef, useState } from 'react';

import { format } from 'date-fns';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function PaymentMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const updatePayment = props.pay;  

  

  const deleteData = (Id) => {
    fetch(`https://localhost:7005/api/Payment/${Id}`, {
      method: 'DELETE', headers:
        { headers: { 'Content-Type': 'application/json' } }
    })
  }

  const putOptions = (Id, newPayment) => {
    updatePayment.PayDate = (new Date(new Date(updatePayment.PayDate)
    .setDate(new Date(updatePayment.PayDate).getDate()+1))).toISOString();

    fetch(`https://localhost:7005/api/Payment/${Id}`, {
      method: 'PUT', headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ id: Id, ...newPayment })
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
        onClick={() => deleteData(updatePayment.Id)}>
          <ListItemIcon >
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Sil" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>


        <MenuItem sx={{ color: 'text.secondary' }}
          onClick={() => putOptions(updatePayment.Id, updatePayment)}
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







