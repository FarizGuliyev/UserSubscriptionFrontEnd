import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import { FormProvider } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {


  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Ad daxil edin'),
    lastName: Yup.string().required('Soyad daxil edin'),
    fatherName: Yup.string().required('Ata adını daxil edin'),
    address: Yup.string().required('Ünvan qeyd edin'),
    addressDescription: Yup.string(),


  });

  const [userValues, setUserValues] = useState({
    Name: '',
    Surname: '',
    FatherName: '',
    SubscriptionDate: '',
    Address: '',
    AddressDescription: '',
    Debt: 0,
    SubscriptionTypeId: 1,
  });



  const postUser = (newUser) => {
    newUser.SubscriptionDate = new Date().toISOString();
    
    fetch(`https://localhost:7005/api/User`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ ...newUser })
    }
    )
  }

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    userValues,
  });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = async () => {
  //   navigate('/dashboard', { replace: true });
  // };

  // onSubmit={handleSubmit(onSubmit)}
  return (
    <FormProvider methods={methods} >
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

          <TextField required id="outlined-required" label="Ad" value={userValues.Name}
            onChange={(e) => setUserValues({ ...userValues, Name: e.target.value })} />

          <TextField required label="Soyad" id="outlined-required" value={userValues.Surname}
            onChange={(e) => setUserValues({ ...userValues, Surname: e.target.value })} />

        </Stack>

        <TextField required label="Ata adı" id="outlined-required" value={userValues.FatherName}
          onChange={(e) => setUserValues({ ...userValues, FatherName: e.target.value })} />

        <TextField required label="Ünvan" id="outlined-required" value={userValues.Address}
          onChange={(e) => setUserValues({ ...userValues, Address: e.target.value })} />

        <TextField label="Əlavə ünvan" id="outlined-required" value={userValues.AddressDescription}
          onChange={(e) => setUserValues({ ...userValues, AddressDescription: e.target.value })} />

       

        <LoadingButton fullWidth size="large" type="submit" variant="contained"
          onClick={() => postUser(userValues)}
        >
          Qeydiyyat

        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
