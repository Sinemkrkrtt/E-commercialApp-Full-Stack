import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Link,
    InputAdornment,
    IconButton,
    Snackbar,
    Alert,
    CircularProgress
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import siennaLogo from './assets/sienna_logo.png';


const brandColor = "#5D3A29";
const brandHoverColor = "#3E2723";
const bgColor = "#f5f0ed";

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);


        if (!formData.fullName || !formData.email || !formData.password) {
            setSnackbar({ open: true, message: 'Please fill in all fields.', severity: 'warning' });
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setSnackbar({ open: true, message: 'Password must be at least 6 characters.', severity: 'warning' });
            setLoading(false);
            return;
        }

        try {

            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {

                const userToSave = { fullName: formData.fullName, email: formData.email };
                localStorage.setItem('user', JSON.stringify(userToSave));

                setSnackbar({ open: true, message: 'Account created! Redirecting to Home...', severity: 'success' });

                setTimeout(() => {
                    navigate('/');
                }, 1500);

            } else {

                setSnackbar({ open: true, message: data.error || 'Registration failed.', severity: 'error' });
            }

        } catch (error) {
            console.error("Error:", error);
            setSnackbar({ open: true, message: 'Server connection error.', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const customInputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: '#fafafa',
            transition: 'all 0.3s ease',
            '& fieldset': { borderColor: '#e0e0e0', borderWidth: '1px' },
            '&:hover fieldset': { borderColor: brandColor },
            '&.Mui-focused fieldset': { borderColor: brandColor, borderWidth: '2px' },
            '&.Mui-focused': { backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }
        },
        '& .MuiInputLabel-root': {
            color: '#888',
            '&.Mui-focused': { color: brandColor, fontWeight: 600 }
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: '#bbb', transition: 'color 0.3s' },
        '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': { color: brandColor }
    };

    return (
        <Box sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor,
        }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 5 },
                    display: 'flex',
                    width: 520,
                    height: 'auto',
                    minHeight: 650,
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 5,
                    boxShadow: '0px 20px 40px rgba(93, 58, 41, 0.08)',
                    backgroundColor: '#fff',
                    border: '1px solid rgba(255,255,255,0.8)'
                }}
            >
                <Box
                    component="img"
                    src={siennaLogo}
                    alt="Sienna Logo"
                    sx={{
                        mt: -5,
                        width: '450px',
                        height: 'auto',
                        mb: 0,
                        mixBlendMode: 'multiply'
                    }}
                />

                <Typography component="h1" variant="h6" sx={{ fontWeight: 500, color: '#666', mb: 3, mt: -8, fontSize: '1rem', letterSpacing: 0.5 }}>
                    Create your account
                </Typography>

                <Box component="form" noValidate onSubmit={handleRegister} sx={{ width: '80%' }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="name"
                        autoFocus
                        value={formData.fullName}
                        onChange={handleChange}
                        sx={customInputStyle}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={customInputStyle}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={customInputStyle}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            mt: 4,
                            py: 1.8,
                            bgcolor: '#976135FF',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 3,
                            boxShadow: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: brandHoverColor,
                                boxShadow: '0 8px 20px rgba(93, 58, 41, 0.25)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                    </Button>

                    <Box sx={{ mt: 4, textAlign: 'center', mb: 2 }}>
                        <Typography variant="body2" sx={{ color: '#888' }}>
                            Already have an account?{' '}
                            <Link
                                component={RouterLink}
                                to="/loginPage"
                                variant="body2"
                                sx={{
                                    color: brandColor,
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    position: 'relative',
                                    pb: '2px',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '100%',
                                        height: '2px',
                                        bottom: 0,
                                        left: 0,
                                        backgroundColor: brandColor,
                                        transform: 'scaleX(0)',
                                        transformOrigin: 'bottom right',
                                        transition: 'transform 0.3s ease-out'
                                    },
                                    '&:hover::after': {
                                        transform: 'scaleX(1)',
                                        transformOrigin: 'bottom left'
                                    }
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box>
    );
}

export default RegisterPage;