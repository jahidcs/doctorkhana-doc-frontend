import { Card, Grid, Tabs, Box, Tab } from '@mui/material'
import { useState } from 'react'
import pic1 from '../../../assets/images/pic1.png'
import DoctorLogin from './DoctorLogin'
import DoctorRegister from './DoctorRegister'

const TabPanel = (props) => {
    const { children, value, index } = props
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value == index && <Box>{children}</Box>}
        </div>
    )
}

const LoginReg = () => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <>
            <Grid container sx={{ height: '90vh' }}>
                <Grid
                    item
                    lg={7}
                    sm={5}
                    sx={{
                        backgroundImage: `url(${pic1})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: { xs: 'none', sm: 'block' },
                    }}></Grid>
                <Grid item lg={5} sm={7} xs={12}>
                    <Card sx={{ height: '100%', width: '100%' }}>
                        <Box sx={{ mx: 3, height: 530 }} s>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={value}
                                    textColor="primary"
                                    indicatorColor="primary"
                                    onChange={handleChange}>
                                    <Tab
                                        label="Login"
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                        }}></Tab>
                                    <Tab label="Register" sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <DoctorLogin />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <DoctorRegister />
                            </TabPanel>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginReg
