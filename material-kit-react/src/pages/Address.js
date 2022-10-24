import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { styled } from '@mui/material/styles';

import {
    Box,
    Tab,
    Container,
} from '@mui/material';

import Page from '../components/Page';
import Logo from '../components/Logo';

import Region from './Region';
import City from './City';
import Village from './Village';
import Street from './Street';
import Apartment from './Apartment';
import Floor from './Floor';
import Flat from './Flat';

export default function Address() {

    const RootStyle = styled('div')(({ theme }) => ({
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
        },
    }));

    const HeaderStyle = styled('header')(({ theme }) => ({
        top: 0,
        zIndex: 1,
        lineHeight: 0,
        width: '100px',
        height: '110px',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        padding: theme.spacing(1),
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            alignItems: 'flex-end',

        },
    }));

    const ContentStyle = styled('div')(({ theme }) => ({
        maxWidth: 1900,
        margin: 'auto',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(5, 0),
    }));


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page title="Register">
            <RootStyle>
                <HeaderStyle>
                    <Logo />
                </HeaderStyle>
                <Container>
                    <ContentStyle>
                        <Box sx={{ width: '1200px', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{
                                    borderBottom: 3, borderColor: 'divider',
                                    padding: (2)
                                }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="İqtisadi Rayon" value="1" />
                                        <Tab label="Şəhər" value="2" />
                                        <Tab label="Qəsəbə/Kənd" value="3" />
                                        <Tab label="Küçə" value="4" />
                                        <Tab label="Bina" value="5" />
                                        <Tab label="Mərtəbə" value="6" />
                                        <Tab label="Mənzil(Bina)" value="7" />

                                    </TabList>
                                </Box>
                                <TabPanel value="1"><Region /></TabPanel>
                                <TabPanel value="2"><City /> </TabPanel>
                                <TabPanel value="3"><Village /></TabPanel>
                                <TabPanel value="4"><Street /></TabPanel>
                                <TabPanel value="5"><Apartment /></TabPanel>
                                <TabPanel value="6"><Floor /></TabPanel>
                                <TabPanel value="7"><Flat /></TabPanel>

                            </TabContext>
                        </Box>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>

    );
}
