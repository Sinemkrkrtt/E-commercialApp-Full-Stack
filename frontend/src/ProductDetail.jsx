import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Grid, Button, IconButton, Divider,
    Stack, Rating, Accordion, AccordionSummary, AccordionDetails, Chip,
    Snackbar, Alert
} from "@mui/material";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';

function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state;


    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);


    const [openSnackbar, setOpenSnackbar] = useState(false);


    useEffect(() => {
        if (product) {
            const storedFavs = JSON.parse(localStorage.getItem('myFavorites') || '[]');
            const exists = storedFavs.find(item => item.id === product.id);
            setIsFavorite(!!exists);
        }
    }, [product]);


    const toggleFavorite = () => {
        const storedFavs = JSON.parse(localStorage.getItem('myFavorites') || '[]');
        let updatedFavs;

        if (isFavorite) {
            updatedFavs = storedFavs.filter(item => item.id !== product.id);
        } else {
            updatedFavs = [...storedFavs, product];
        }

        localStorage.setItem('myFavorites', JSON.stringify(updatedFavs));
        setIsFavorite(!isFavorite);
    };


    const handleAddToCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('myCart') || '[]');
        let updatedCart = [...storedCart];

        const existingItemIndex = updatedCart.findIndex(item =>
            item.id === product.id && item.selectedSize === selectedSize
        );

        if (existingItemIndex > -1) {
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart.push({
                ...product,
                quantity: quantity,
                selectedSize: selectedSize || "Standard"
            });
        }

        localStorage.setItem('myCart', JSON.stringify(updatedCart));
        console.log(`${quantity} x ${product.name} (${selectedSize}) sepete eklendi.`);


        setOpenSnackbar(true);
    };


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    if (!product) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">Product data not found.</Typography>
                <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Return to Home</Button>
            </Box>
        );
    }

    const lowerName = product.name ? product.name.toLowerCase() : "";

    const isShoe = (
        lowerName.includes("shoe") || lowerName.includes("sneaker") || lowerName.includes("boot") ||
        lowerName.includes("flat") || lowerName.includes("sandal") || lowerName.includes("heel") ||
        lowerName.includes("platform") || lowerName.includes("stiletto")
    );

    const isAccessory = (
        lowerName.includes("bag") || lowerName.includes("watch") || lowerName.includes("glass") ||
        lowerName.includes("ring") || lowerName.includes("neck") || lowerName.includes("hat") ||
        lowerName.includes("cap") || lowerName.includes("beanie") || lowerName.includes("belt") ||
        lowerName.includes("scarf") || lowerName.includes("glove") || lowerName.includes("wallet") ||
        lowerName.includes("tie") || lowerName.includes("chain") || lowerName.includes("bracelet") ||
        lowerName.includes("beret") || lowerName.includes("earmuff") || lowerName.includes("cuff") ||
        lowerName.includes("hood") || lowerName.includes("clip") || lowerName.includes("hair") ||
        lowerName.includes("pin") || lowerName.includes("cardholder")
    );

    const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const shoeSizes = ["37", "38", "39", "40", "41", "42", "43"];
    const currentSizes = isShoe ? shoeSizes : clothingSizes;

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <Box sx={{
            backgroundColor: "#fff",
            height: { xs: "auto", md: "100vh" },
            overflow: { xs: "visible", md: "hidden" }
        }}>

            <Grid container sx={{ height: "100%" }}>
                <Grid item xs={12} md={6} sx={{
                    height: { xs: "60vh", md: "100%" },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    backgroundColor: "#fff"
                }}>
                    <Box sx={{
                        width: "600px",
                        height: "90vh",
                        backgroundColor: "#f4f4f4",
                        borderRadius: "8px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}>
                        <Chip
                            label="SIENNA"
                            sx={{
                                position: "absolute", top: 20, left: 20, bgcolor: "#fff", color: "#000",
                                fontWeight: "bold", borderRadius: "4px", height: "24px",
                                fontSize: "0.75rem", letterSpacing: 1, zIndex: 2
                            }}
                        />
                        <Box
                            component="img"
                            src={product.img}
                            alt={product.name}
                            sx={{
                                maxWidth: "90%",
                                maxHeight: "90%",
                                objectFit: "contain",
                                transition: "transform 0.5s ease",
                                "&:hover": { transform: "scale(1.05)" }
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{
                    height: { xs: "auto", md: "100%" },
                    overflowY: { xs: "visible", md: "auto" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: { xs: 4, md: 8 },
                    px: { xs: 3, md: 6 },
                    pb: 10
                }}>

                    <Box sx={{ width: "100%", maxWidth: "600px" }}>

                        <Typography variant="h3" sx={{
                            fontSize: { xs: 32, md: 48 },
                            fontWeight: 400,
                            mb: 2,
                            fontFamily: '"Playwrite AU TAS", cursive',
                            color: "#1a1a1a",
                            lineHeight: 1.2,
                        }}>
                            {product.name}
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                            <Rating value={4.5} precision={0.5} readOnly size="medium" sx={{ color: "#C9703D" }} />
                            <Typography variant="body2" sx={{ color: "#666", textDecoration: "underline", cursor: "pointer" }}>
                                (128 Reviews)
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 4, width: "100%" }}>
                            <Typography variant="h3" sx={{
                                color: "#1a1a1a",
                                fontWeight: 700,
                                fontSize: { xs: "2rem", md: "2.5rem" },
                                fontFamily: "sans-serif"
                            }}>
                                {product.price}
                            </Typography>
                        </Stack>

                        <Divider sx={{ mb: 5, width: "100%" }} />
                        {!isAccessory && (
                            <Box sx={{ mb: 5, width: "100%" }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                                        {isShoe ? "SELECT SHOE SIZE" : "SELECT SIZE"}
                                    </Typography>
                                    <Button
                                        startIcon={<StraightenOutlinedIcon sx={{ fontSize: 18 }} />}
                                        sx={{ textTransform: 'none', color: "#666", fontSize: 13, p: 0, "&:hover": { bgcolor: "transparent", color: "#000" } }}
                                    >
                                        {isShoe ? "Size Guide" : "Size Chart"}
                                    </Button>
                                </Stack>

                                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                                    {currentSizes.map((size) => (
                                        <Button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            sx={{
                                                minWidth: isShoe ? "50px" : "60px",
                                                flex: isShoe ? "0 1 auto" : 1,
                                                height: "50px",
                                                borderRadius: "0",
                                                border: "1px solid",
                                                borderColor: selectedSize === size ? "#E4B18EFF" : "#e0e0e0",
                                                color: selectedSize === size ? "#fff" : "#000",
                                                backgroundColor: selectedSize === size ? "#D2A47CFF" : "transparent",
                                                fontSize: "1rem",
                                                transition: "all 0.2s",
                                                "&:hover": {
                                                    backgroundColor: selectedSize === size ? "#333" : "#f5f5f5",
                                                    borderColor: "#1A1A1AFF"
                                                }
                                            }}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </Stack>
                                {!selectedSize && <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                                    Please select a {isShoe ? "shoe size" : "size"}.
                                </Typography>}
                            </Box>
                        )}

                        {isAccessory && (
                            <Box sx={{ mb: 5 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1, color: "#666", mt: 9, mb: 5 }}>
                                    ONE SIZE (STANDARD)
                                </Typography>
                            </Box>
                        )}

                        <Stack direction="row" spacing={2} sx={{ mb: 4, width: "100%" }}>
                            <Box sx={{
                                display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', px: 1, height: "56px", flexGrow: 0
                            }}>
                                <IconButton size="small" onClick={handleDecrease}><RemoveIcon fontSize="small" /></IconButton>
                                <Typography sx={{ px: 3, fontWeight: 600, fontSize: "1.1rem" }}>{quantity}</Typography>
                                <IconButton size="small" onClick={handleIncrease}><AddIcon fontSize="small" /></IconButton>
                            </Box>

                            <IconButton
                                onClick={toggleFavorite}
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "0",
                                    width: "56px",
                                    height: "56px",
                                    color: "#333",
                                    transition: "0.2s",
                                    "&:hover": { backgroundColor: "#1a1a1a", color: "#fff", borderColor: "#1a1a1a" }
                                }}
                            >
                                {isFavorite ? <FavoriteIcon sx={{ color: "#C9703D" }} /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Stack>

                        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mb: 6 }}>
                            <Button
                                variant="contained"
                                onClick={handleAddToCart}
                                disabled={!isAccessory && !selectedSize}
                                sx={{
                                    backgroundColor: "#73411F",
                                    color: "#fff",
                                    height: "60px",
                                    minWidth: "240px",
                                    px: 4,
                                    fontSize: "1.1rem",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    borderRadius: "0",
                                    boxShadow: "none",
                                    letterSpacing: 0.5,
                                    "&:hover": { backgroundColor: "#5a3216", boxShadow: "0 5px 15px rgba(115, 65, 31, 0.3)" },
                                    "&:disabled": { backgroundColor: "#ccc", color: "#fff" }
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>

                        <Box sx={{ borderTop: '1px solid #eee', width: "100%" }}>
                            <Accordion disableGutters elevation={0} sx={{ '&:before': { display: 'none' }, borderBottom: '1px solid #eee', bgcolor: 'transparent' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: 0.5 }}>PRODUCT DETAILS</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 0, pt: 0 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                        {isShoe ? (
                                            "100% Genuine Leather. Orthopedic sole structure provides all-day comfort. Non-slip sole feature available."
                                        ) : isAccessory ? (
                                            "Produced with premium materials and craftsmanship. The perfect finishing touch for your outfits."
                                        ) : (
                                            "100% Organic Cotton. Breathable special texture and modern cut. Made in Turkiye."
                                        )}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion disableGutters elevation={0} sx={{ '&:before': { display: 'none' }, borderBottom: '1px solid #eee', bgcolor: 'transparent' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: 0.5 }}>DELIVERY & RETURNS</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ px: 0, pt: 0 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                        Your orders are shipped within 24 hours. You have the right to unconditional return within 30 days for unused products.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%', bgcolor: '#2e7d32' }}
                >
                    Added to cart successfully!
                </Alert>
            </Snackbar>

        </Box>
    );
}

export default ProductDetail;