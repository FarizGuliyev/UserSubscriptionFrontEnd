import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  TextField,
  Autocomplete,
  Box,
  Button,
  Typography,
} from '@mui/material';

// components
import { FormProvider } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Ad daxil edin'),
    lastName: Yup.string().required('Soyad daxil edin'),
    fatherName: Yup.string().required('Ata adını daxil edin'),
  });

  const [isHouseOpen, setIsHouseOpen] = useState(false);

  const [isApartmentOpen, setIsApartmentOpen] = useState(false);

  const [isButtonsOpen, setIsButtonsOpen] = useState(true);

  // --------------------------------RegionGet----------------------------------
  const [regionList, setRegionList] = useState([]);

  const getAllRegions = async () => {

    const response = await fetch('https://localhost:7005/api/Region');

    response.json().then((res) => setRegionList(res));
  };

  useEffect(() => {
    getAllRegions();
  }, []);

  // --------------------------------CityGet---------------------------------- 
  const [cityList, setCityList] = useState([]);

  const getAllCities = async (Id) => {

    const response = await fetch(`https://localhost:7005/api/City/${Id}`);

    response.json().then((res) => setCityList(res));
  };

  // --------------------------------VillageGet---------------------------------- 
  const [villageList, setVillageList] = useState([]);

  const getAllVillages = async (Id) => {

    const response = await fetch(`https://localhost:7005/api/Village/${Id}`);

    response.json().then((res) => setVillageList(res));
  };

  // --------------------------------StreetGet---------------------------------- 
  const [streetList, setStreetList] = useState([]);

  const getAllStreets = async (Id) => {

    const response = await fetch(`https://localhost:7005/api/Street/${Id}`);

    response.json().then((res) => setStreetList(res));
  };

  // --------------------------------StreetGetByCityId---------------------------------- 

  const getAllStreetsByCityId = async (Id) => {

    const response = await fetch(`https://localhost:7005/ByCity/${Id}`);

    response.json().then((res) => setStreetList(res));
  };

  // --------------------------------ApartmentGet----------------------------------
  const [apartmentList, setApartmentList] = useState([]);

  const getAllApartments = async (Id) => {

    const response = await fetch(`https://localhost:7005/api/Apartment/${Id}`);

    response.json().then((res) => setApartmentList(res));
  };

  // --------------------------------ApartmentGetByVillageId----------------------------------
  const getAllApartmentsByVillage = async (Id) => {

    const response = await fetch(`https://localhost:7005/Apartment/ByStreet/${Id}`);

    response.json().then((res) => setApartmentList(res));
  };

  // --------------------------------FloorGet----------------------------------
  const [floorList, setFloorList] = useState([]);

  const getAllFloors = async (Id) => {

    const response = await fetch(`https://localhost:7005/api/Floor/${Id}`);

    response.json().then((res) => setFloorList(res));
  };

  // --------------------------------FlatGet----------------------------------
  const [flatList, setFlatList] = useState([]);

  const getAllFlats = async (Id) => {

    const response = await fetch(`https://localhost:7005/api/Flat/${Id}`);

    response.json().then((res) => setFlatList(res));
  };

  // --------------------------------FlatGetByStreetId----------------------------------
  const getAllFlatsByStreetId = async (Id) => {

    const response = await fetch(`https://localhost:7005/Flat/ByStreet/${Id}`);

    response.json().then((res) => setFlatList(res));
  };

  // --------------------------------SubscriptionGet----------------------------------
  const [subList, setSubList] = useState([]);

  const getAllSubs = async () => {
    const response = await fetch('https://localhost:7005/api/SubscriptionType');
    response.json().then((res) => setSubList(res));
  };

  useEffect(() => {
    getAllSubs();
  }, []);

  // --------------------------------UserPost----------------------------------
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

  // -------------------------------------------------------------------------
  const [userValues, setUserValues] = useState({
    Name: '',
    Surname: '',
    FatherName: '',
    SubscriptionDate: '',
    Debt: 0,
    SubscriptionTypeId: null,
    "subName": '',
    "regionName": "",
    RegionId: null,
    "cityName": "",
    CityId: null,
    "villageName": "",
    VillageId: null,
    "streetName": "",
    StreetId: null,
    "apartmentName": "",
    ApartmentId: null,
    "floorName": "",
    FloorId: null,
    FlatId: null,
    HouseName: "",
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    userValues,
  });


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


        <Typography variant="h5">Abunəlik:</Typography>
        {/* ----------------------------------SubscriptionType--------------------------------- */}
        <Autocomplete
          id=""
          sx={{ width: 480 }}
          options={subList}
          value={userValues}
          onChange={(e, nv) => {
            setUserValues({
              ...userValues, SubscriptionTypeId: nv.id, subName: nv.subName,
            })
          }}

          autoHighlight
          getOptionLabel={(option) => {
            return option.subName ? option.subName : ""

          }}
          renderOption={(props, option) => (
            <Box component="li"  {...props}>
              {option.subName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Abunəlik paketi *"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }} />
          )} />


        <Typography variant="h5">Ünvan:</Typography>
        {/* -----------------------------------Region------------------------------------- */}
        <Autocomplete
          id=""
          sx={{ width: 480 }}
          options={regionList}
          value={userValues}
          onChange={(e, nv) => {
            if (nv === null) {
              setUserValues({
                ...userValues, regionName: "",
              })
            }
            setUserValues({
              ...userValues, regionName: nv.regionName, RegionId: nv.id,
              cityName: "", villageName: "", streetName: "",
              apartmentName: "", floorName: "",
              houseName: "", FloorId: null, FlatId: null, ApartmentId: null
            })
            getAllCities(nv.id);
            getAllVillages(0)
            getAllStreets(0)
            setIsButtonsOpen(false)
            setIsApartmentOpen(false)
            setIsHouseOpen(false)
          }}

          autoHighlight
          getOptionLabel={(option) => {
            return option.regionName ? option.regionName : ""

          }}
          renderOption={(props, option) => (
            <Box component="li"  {...props}>
              {option.regionName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Rayon *"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }} />
          )} />

        {/* -----------------------------------City-------------------------------------  */}

        {userValues.RegionId !== null &&
          <Autocomplete
            id=""
            sx={{ width: 480 }}
            options={cityList}
            value={userValues}
            onChange={(e, nv) => {
              if (nv === null) {
                setUserValues({
                  ...userValues, cityName: "", CityId: 0,
                })
              }
              setUserValues({
                ...userValues, cityName: nv.cityName, CityId: nv.id, villageName: "",
                streetName: "", apartmentName: "", floorName: "", houseName: "",
                FloorId: null, FlatId: null, ApartmentId: null
              })
              getAllStreetsByCityId(nv.id)
              getAllVillages(nv.id);
              setIsButtonsOpen(false)
              setIsApartmentOpen(false)
              setIsHouseOpen(false)
            }}

            autoHighlight
            getOptionLabel={(option) => {
              return option.cityName ? option.cityName : ""

            }}
            renderOption={(props, option) => (
              <Box component="li"  {...props}>
                {option.cityName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Şəhər *"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }} />
            )} />
        }
        {/* --------------------------------------Village---------------------------------- */}
        {userValues.CityId !== null &&
          <Autocomplete
            id=""
            sx={{ width: 480 }}
            options={villageList}
            value={userValues}
            onChange={(e, nv) => {
              if (nv === null) {
                setUserValues({
                  ...userValues, villageName: "", VillageId: 0,
                })
              }
              setUserValues({
                ...userValues, villageName: nv.villageName, VillageId: nv.id, streetName: "",
                apartmentName: "", floorName: "", houseName: "", FloorId: null, FlatId: null, ApartmentId: null
              })
              setIsApartmentOpen(false)
              setIsHouseOpen(false)
              setIsButtonsOpen(false);
              getAllStreets(nv.id);
            }}

            autoHighlight
            getOptionLabel={(option) => {
              return option.villageName ? option.villageName : ""

            }}
            renderOption={(props, option) => (
              <Box component="li"  {...props}>
                {option.villageName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kənd/Qəsəbə *"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }} />
            )} />
        }
        {/* -----------------------------------Street------------------------------------- */}
        {userValues.CityId !== null &&
          <Autocomplete
            id=""
            sx={{ width: 480 }}
            options={streetList}
            value={userValues}
            onChange={(e, nv) => {
              if (nv === null) {
                setUserValues({
                  ...userValues, streetName: "", StreetId: 0,
                })
              }
              setUserValues({
                ...userValues, streetName: nv.streetName, StreetId: nv.id, apartmentName: "",
                floorName: "", houseName: "", FloorId: null, FlatId: null, ApartmentId: null
              })
              setIsButtonsOpen(true);
              setIsApartmentOpen(false);
              setIsHouseOpen(false);
              getAllFlatsByStreetId(nv.id);
              if (userValues.VillageId !== null) {
                getAllApartments(nv.id);
              } else { getAllApartmentsByVillage(nv.id) }
            }}

            autoHighlight
            getOptionLabel={(option) => {
              return option.streetName ? option.streetName : ""

            }}
            renderOption={(props, option) => (
              <Box component="li"  {...props}>
                {option.streetName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Küçə *"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }} />
            )} />
        }

        {/* -----------------------------------Buttons------------------------------------- */}
        {userValues.StreetId !== null && isButtonsOpen &&
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

            <Button fullWidth size="large" type="submit" variant="contained"
              onClick={() => {
                setIsApartmentOpen(true)
                setIsButtonsOpen(false)
              }}>
              Bina Evi
            </Button>

            <Button fullWidth size="large" type="submit" variant="contained"
              onClick={() => {
                setIsHouseOpen(true)
                setIsButtonsOpen(false)
              }} >
              Həyət Evi
            </Button>
          </Stack>
        }

        {/* -----------------------------------Apartment------------------------------------- */}
        {isApartmentOpen &&
          <Autocomplete
            id=""
            sx={{ width: 480 }}
            options={apartmentList}
            value={userValues}
            onChange={(e, nv) => {
              if (nv === null) {
                setUserValues({
                  ...userValues, apartmentName: "", ApartmentId: 0,
                })
              }
              setUserValues({
                ...userValues, apartmentName: nv.apartmentName, ApartmentId: nv.id,
                floorName: "", houseName: ""
              })
              getAllFloors(nv.id);
              getAllFlats(0);
            }}

            autoHighlight
            getOptionLabel={(option) => {
              return option.apartmentName ? option.apartmentName : ""

            }}
            renderOption={(props, option) => (
              <Box component="li"  {...props}>
                {option.apartmentName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Bina *"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }} />
            )} />
        }

        {/* -----------------------------------Floor------------------------------------- */}
        {userValues.ApartmentId !== null && isApartmentOpen &&
          <Autocomplete
            id=""
            sx={{ width: 480 }}
            options={floorList}
            value={userValues}
            onChange={(e, nv) => {
              if (nv === null) {
                setUserValues({
                  ...userValues, floorName: "", FloorId: 0,
                })
              }
              setUserValues({
                ...userValues, floorName: nv.floorName, FloorId: nv.id, houseName: ""
              })
              getAllFlats(nv.id);
            }}

            autoHighlight
            getOptionLabel={(option) => {
              return option.floorName ? option.floorName : ""

            }}
            renderOption={(props, option) => (
              <Box component="li"  {...props}>
                {option.floorName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Mərtəbə *"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }} />
            )} />
        }

        {/* -----------------------------------Flat------------------------------------- */}
        {userValues.FloorId !== null && isApartmentOpen &&
          <Autocomplete
            id=""
            sx={{ width: 480 }}
            options={flatList}
            value={userValues}
            onChange={(e, nv) => {
              if (nv === null) {
                setUserValues({
                  ...userValues, houseName: "", FlatId: 0,
                })
              }
              setUserValues({
                ...userValues, houseName: nv.houseName, FlatId: nv.id,
              })
            }}

            autoHighlight
            getOptionLabel={(option) => {
              return option.houseName ? option.houseName : ""

            }}
            renderOption={(props, option) => (
              <Box component="li"  {...props}>
                {option.houseName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Mənzil *"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }} />
            )} />
        }

        {/* ---------------------------------HouseAddress----------------------------------- */}
        {isHouseOpen &&
          <Autocomplete
            id=""
            sx={{ width: 480 }}
            options={flatList}
            value={userValues}
            onChange={(e, nv) => {
              if (nv === null) {
                setUserValues({
                  ...userValues, houseName: "", FlatId: 0,
                })
              }
              setUserValues({
                ...userValues, houseName: nv.houseName, FlatId: nv.id,
              })
            }}

            autoHighlight
            getOptionLabel={(option) => {
              return option.houseName ? option.houseName : ""

            }}
            renderOption={(props, option) => (
              <Box component="li"  {...props}>
                {option.houseName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ev Ünvanı *"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }} />
            )} />
        }

        < Button fullWidth size="large" type="submit" variant="contained"
          onClick={() => {
            postUser(userValues)
          }}
        >
          Qeydiyyat
        </Button>
      </Stack >
    </FormProvider>
  );
}
