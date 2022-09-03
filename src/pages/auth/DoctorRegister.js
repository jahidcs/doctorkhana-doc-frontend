import { TextField, Button, Box, Alert, Grid, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../../services/userAuthApi'

const genders = [
    {
        value: 'male',
        label: 'Male',
    },
    {
        value: 'female',
        label: 'Female',
    },
]

const DoctorRegister = () => {
    const [gender, setGender] = useState('male')
    const [server_error, setServerError] = useState({})
    const [error, setError] = useState({
        status: false,
        msg: '',
        type: '',
    })

    const navigate = useNavigate('/')
    const [registerDoctor, { isLoading }] = useRegisterUserMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            email: data.get('email'),
            phone: data.get('phone'),
            name: data.get('name'),
            gender: data.get('gender'),
            nid: data.get('nid'),
            bmdc: data.get('bmdc'),
            speciality: data.get('speciality'),
            qualification: data.get('qualification'),
            district: data.get('district'),
            role_id: 'doctor',
            password: data.get('password'),
            password2: data.get('password2'),
        }
        const res = await registerDoctor(actualData)
        if (res.error) {
            setServerError(res.error.data.errors)
            setError({ status: true, msg: `${server_error}`, type: 'error' })
        }
        if (res.data) {
            setError({ status: true, msg: 'Registration successful', type: 'success' })
            navigate('/')
        }
    }
    return (
        <div>
            <Box component="form" noValidate sx={{ mt: 1 }} id="doctor-register" onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item lg={6} sm={12} xs={12}>
                        <TextField margin="normal" required fullWidth id="email" name="email" label="Email Address" />
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                        <TextField margin="normal" required fullWidth id="phone" name="phone" label="Phone Number" />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item lg={4} sm={12} xs={12}>
                        <TextField margin="normal" required fullWidth id="name" name="name" label="Name" />
                    </Grid>
                    <Grid item lg={4} sm={7} xs={12}>
                        <TextField margin="normal" required fullWidth id="gender" select label="Gender" value={gender}>
                            {genders.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={4} sm={12} xs={12}>
                        <TextField margin="normal" required fullWidth id="district" name="district" label="District" />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item lg={6} sm={12} xs={12}>
                        <TextField margin="normal" required fullWidth id="nid" name="nid" label="NID number" />
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                        <TextField margin="normal" required fullWidth id="bmdc" name="bmdc" label="BMDC Number" />
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item lg={6} sm={12} xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="qualification"
                            name="qualification"
                            label="Qualification"
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="speciality"
                            name="speciality"
                            label="Speciality"
                        />
                    </Grid>
                </Grid>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password2"
                    name="password2"
                    type="password"
                    label="Confirm Password"
                />

                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            px: 5,
                        }}>
                        Register
                    </Button>
                </Box>
                {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            </Box>
        </div>
    )
}

export default DoctorRegister
