import React from "react";
import { Box, Typography, IconButton, Stack, Divider, Link, Container, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
    const linkStyle = {
        color: "rgba(255,255,255,0.8)",
        fontSize: "0.95rem",
        textDecoration: "none",
        fontWeight: 400,
        transition: "all 0.3s ease",
        display: "block",
        "&:hover": {
            color: "#E6CCB2",
            transform: "translateX(5px)",
            textDecoration: "none"
        }
    };

    const headerStyle = {
        fontWeight: 700,
        mb: 2,
        color: '#E6CCB2',
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "0.9rem"
    };

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#5C3216",
                color: "white",
                pt: 8,
                pb: 4,
                mt: "auto",
                borderTop: "1px solid rgba(255,255,255,0.05)"
            }}
        >
            <Container maxWidth="xl">

                <Grid container spacing={4} alignItems="flex-start">

                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
                        <Typography variant="h4" sx={{ fontFamily: '"Playwrite AU TAS", cursive', mb: 2 }}>
                            Sienna
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.8, color: "rgba(255,255,255,0.7)", maxWidth: { xs: "100%", md: "300px" }, mx: { xs: "auto", md: 0 } }}>

                            Complete your style with trendy, chic, and high-quality fashion products. Discover the new season now.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                ml: 25,
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "center",
                                gap: { xs: 5, sm: 8, md: 10 },
                                textAlign: { xs: "center", sm: "left" }
                            }}
                        >
                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1" sx={headerStyle}>
                                    Explore
                                </Typography>
                                <Link href="/" sx={linkStyle}>Home</Link>
                                <Link href="/NewCollections" sx={linkStyle}>New Collections</Link>
                                <Link href="/sales" sx={linkStyle}>On Sale</Link>
                                <Link href="/favorites" sx={linkStyle}>My Favorites</Link>
                            </Stack>

                            <Stack spacing={1.5}>
                                <Link href="/woman" underline="none">
                                    <Typography variant="subtitle1" sx={{ ...headerStyle, cursor: 'pointer', "&:hover": { opacity: 0.8 } }}>
                                        Woman
                                    </Typography>
                                </Link>
                                <Link href="/category/dress" sx={linkStyle}>Dresses</Link>
                                <Link href="/category/blouse" sx={linkStyle}>Blouses</Link>
                                <Link href="/category/woman-pants" sx={linkStyle}>Pants</Link>
                                <Link href="/category/skirt" sx={linkStyle}>Skirts</Link>
                                <Link href="/category/bag" sx={linkStyle}>Bags</Link>
                            </Stack>

                            <Stack spacing={1.5}>
                                <Link href="/man" underline="none">
                                    <Typography variant="subtitle1" sx={{ ...headerStyle, cursor: 'pointer', "&:hover": { opacity: 0.8 } }}>
                                        Man
                                    </Typography>
                                </Link>
                                <Link href="/category/man-tshirt" sx={linkStyle}>T-Shirts</Link>
                                <Link href="/category/man-pants" sx={linkStyle}>Pants</Link>
                                <Link href="/category/man-outerwear" sx={linkStyle}>Outerwear</Link>
                                <Link href="/category/man-shoes" sx={linkStyle}>Shoes</Link>
                                <Link href="/category/man-accessories" sx={linkStyle}>Accessories</Link>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ mt: 15, ml: 25, display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                        <Stack spacing={2} alignItems={{ xs: "center", md: "flex-end" }}>
                            <Typography variant="subtitle1" sx={{ ...headerStyle, mb: 0 }}>
                                Follow Us
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {[<FacebookIcon />, <InstagramIcon />, <TwitterIcon />, <EmailIcon />].map((icon, index) => (
                                    <IconButton
                                        key={index}
                                        sx={{
                                            color: "white",
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                backgroundColor: "#E6CCB2",
                                                color: "#5C3216",
                                                transform: "translateY(-3px)"
                                            }
                                        }}
                                    >
                                        {icon}
                                    </IconButton>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, backgroundColor: "rgba(255,255,255,0.1)" }} />

                <Typography variant="body2" sx={{ textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                    © {new Date().getFullYear()} Sienna Fashion. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;