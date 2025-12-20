import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, CardMedia, IconButton, Button, Container,
    Divider, Stack, TextField, Checkbox, FormControlLabel, Tooltip, Paper, Chip
} from "@mui/material";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isGiftWrap, setIsGiftWrap] = useState(false);

    const navigate = useNavigate();

    const brandFont = '"Playwrite AU TAS", cursive';
    const brandColor = "#73411F";
    const bgLight = "#FAFAFA";

    useEffect(() => {
        try {
            const storedCart = JSON.parse(localStorage.getItem('myCart') || '[]');
            setCartItems(storedCart);
        } catch (error) {
            setCartItems([]);
        }
    }, []);

    const parsePrice = (price) => {
        if (!price) return 0;
        if (typeof price === 'number') return price;
        return parseFloat(price.replace('$', ''));
    };

    const subtotal = cartItems.reduce((acc, item) => {
        const itemPrice = parsePrice(item.price);
        const itemQuantity = item.quantity || 1;
        return acc + (itemPrice * itemQuantity);
    }, 0);

    const shipping = subtotal > 100 ? 0 : 15.00;

    const giftWrapCost = isGiftWrap ? 5.00 : 0;
    const total = subtotal + shipping + giftWrapCost;

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('myCart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
    };

    const handleQuantityChange = (id, delta) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = (item.quantity || 1) + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('myCart', JSON.stringify(updatedCart));
    };

    if (cartItems.length === 0) {
        return (
            <Box sx={{
                minHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fcfcfc"
            }}>
                <Stack alignItems="center" spacing={3} sx={{ textAlign: "center", maxWidth: "500px", px: 3 }}>
                    <Box sx={{
                        width: "150px", height: "150px", borderRadius: "50%", border: "3px dashed #D8D8D8FF",
                        display: "flex", alignItems: "center", justifyContent: "center", mb: 1, backgroundColor: "#fff"
                    }}>
                        <ShoppingBagOutlinedIcon sx={{ fontSize: 78, color: "#D1AD8C" }} />
                    </Box>
                    <Typography variant="h3" sx={{ fontFamily: brandFont, color: "#412307FF", fontWeight: 500 }}>
                        Your Bag is Empty
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#A7A6A6FF", lineHeight: 1.6, fontSize: "1rem", maxWidth: "90%" }}>
                        Looks like you haven't made your choice yet. Start exploring our new collection!
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.9rem !important" }} />}
                        sx={{
                            borderColor: "#412307FF", color: "#412307FF", borderWidth: "1.5px", textTransform: "none",
                            borderRadius: "0", padding: "16px 48px", fontSize: "1rem", letterSpacing: 1, fontWeight: 600,
                            "&:hover": { backgroundColor: "#5C351FFF", color: "#fff", borderColor: "#1a1a1a", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
                            transition: "all 0.3s ease"
                        }}
                    >
                        START SHOPPING
                    </Button>
                </Stack>
            </Box>
        );
    }

    return (
        <Box sx={{
            height: "100vh",
            backgroundColor: bgLight,
            py: { xs: 2, md: 4 },
            overflow: "hidden"
        }}>
            <Container maxWidth="xl" sx={{ height: "100%" }}>
                <Box sx={{ mb: 2 }}></Box>
                <Divider sx={{ mb: 4 }}>
                    <Chip
                        label={`${cartItems.length} ITEMS`}
                        sx={{ bgcolor: "#fff", border: "1px solid #e0e0e0", fontWeight: 700, color: brandColor, px: 1 }}
                    />
                </Divider>

                <Grid container spacing={4} sx={{ height: "calc(100% - 100px)" }}>
                    {/* --- SOL KOLON --- */}
                    <Grid item xs={12} lg={8} sx={{ height: "100%" }}>
                        <Box sx={{
                            height: "110%", overflowY: "auto", pr: 2,
                            "&::-webkit-scrollbar": { width: "6px" },
                            "&::-webkit-scrollbar-track": { background: "transparent" },
                            "&::-webkit-scrollbar-thumb": { backgroundColor: "#dcdcdc", borderRadius: "10px" },
                            "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#b0b0b0" }
                        }}>
                            <Stack spacing={3} pb={4}>
                                {cartItems.map((item) => (
                                    <Paper
                                        key={item.id}
                                        elevation={0}
                                        sx={{
                                            display: 'flex', p: 3, width: 750, borderRadius: 4, alignItems: "center", bgcolor: "#fff",
                                            transition: "transform 0.2s, box-shadow 0.2s", border: "1px solid transparent",
                                            "&:hover": { boxShadow: "0 10px 30px rgba(0,0,0,0.04)", borderColor: "#f0f0f0", transform: "translateY(-1px)" }
                                        }}
                                    >
                                        <Box onClick={() => navigate(`/product/${item.id}`, { state: item })} sx={{ width: 120, height: 150, flexShrink: 0, cursor: "pointer", overflow: "hidden", borderRadius: 3, bgcolor: "#f4f4f4" }}>
                                            <CardMedia component="img" image={item.img} alt={item.name} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.3s", "&:hover": { transform: "scale(1.1)" } }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1, ml: 4, display: "flex", flexDirection: "column", justifyContent: "space-between", height: 140 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontFamily: brandFont, fontSize: "1.25rem", fontWeight: 600, color: "#222", cursor: "pointer", lineHeight: 1.2 }} onClick={() => navigate(`/product/${item.id}`, { state: item })}>
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: "#888", mt: 1, fontSize: "0.9rem" }}>
                                                        Size: <span style={{ color: "#333", fontWeight: 500 }}>{item.selectedSize || "Standard"}</span>
                                                    </Typography>
                                                </Box>
                                                <Tooltip title="Remove Item">
                                                    <IconButton onClick={() => handleRemoveItem(item.id)} sx={{ color: "#aaa", "&:hover": { color: "#d32f2f", bgcolor: "#fee" } }}>
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: 2 }}>
                                                <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#F5F5F5", borderRadius: "50px", px: 1, py: 0.5 }}>
                                                    <IconButton size="small" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1} sx={{ color: "#555" }}>
                                                        <RemoveIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                    <Typography sx={{ px: 2, fontSize: "1rem", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
                                                        {item.quantity || 1}
                                                    </Typography>
                                                    <IconButton size="small" onClick={() => handleQuantityChange(item.id, 1)} sx={{ color: "#555" }}>
                                                        <AddIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                </Box>
                                                <Typography variant="h5" sx={{ fontWeight: 700, color: brandColor, fontFamily: brandFont }}>
                                                    {item.price}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Paper elevation={0} sx={{
                            p: 4, bgcolor: "#fff", width: 470, borderRadius: 4, boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
                            border: "1px solid rgba(0,0,0,0.03)", height: "fit-content"
                        }}>
                            <Typography variant="h5" sx={{ fontFamily: brandFont, mb: 3, fontWeight: 700, color: "#222" }}>
                                Order Summary
                            </Typography>
                            <Divider sx={{ mb: 4 }}></Divider>

                            <Stack spacing={2.5} sx={{ mb: 4 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>Subtotal</Typography>
                                    <Typography fontWeight={600} sx={{ fontSize: "1rem" }}>${subtotal.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>Shipping Estimate</Typography>
                                    <Typography fontWeight={600} color={shipping === 0 ? "success.main" : "text.primary"}>
                                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                    </Typography>
                                </Box>

                                {isGiftWrap && (
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>Gift Wrap</Typography>
                                        <Typography fontWeight={600} sx={{ fontSize: "1rem" }}>$5.00</Typography>
                                    </Box>
                                )}

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography color="text.secondary" sx={{ fontSize: "1rem" }}>Tax Estimate</Typography>
                                    <Typography fontWeight={600} color="text.disabled">—</Typography>
                                </Box>
                            </Stack>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: "block", color: "#888", letterSpacing: 1 }}>
                                    PROMO CODE
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <TextField
                                        placeholder="Enter Code" size="small" fullWidth
                                        sx={{ bgcolor: "#FAFAFA", "& .MuiOutlinedInput-root": { borderRadius: 2, '& fieldset': { borderColor: '#eee' } } }}
                                    />
                                    <Button variant="outlined" sx={{ borderColor: brandColor, color: brandColor, borderRadius: 2, textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: brandColor, color: "#fff" } }}>
                                        Apply
                                    </Button>
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4, p: 2, bgcolor: "#FFFAF5", borderRadius: 2, border: "1px dashed #E4B18E" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={isGiftWrap}
                                            onChange={(e) => setIsGiftWrap(e.target.checked)}
                                            sx={{ color: brandColor, '&.Mui-checked': { color: brandColor } }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <CardGiftcardIcon sx={{ color: brandColor }} />
                                            <Typography variant="body2" sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#444" }}>
                                                Add Gift Wrap <span style={{ color: "#888", fontWeight: 400 }}>(+$5.00)</span>
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </Box>

                            <Divider sx={{ my: 3, borderColor: "#eee" }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
                                <Typography variant="h6" fontWeight={700} color="#333">Total</Typography>
                                <Typography variant="h4" fontWeight={700} color={brandColor} sx={{ fontFamily: brandFont }}>
                                    ${total.toFixed(2)}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                endIcon={<ArrowForwardIosIcon sx={{ fontSize: "1rem !important" }} />}
                                sx={{
                                    bgcolor: brandColor, color: "#fff", py: 2.2, textTransform: "none", fontSize: "1.1rem", borderRadius: 3,
                                    fontWeight: 600, mb: 4, boxShadow: "0 8px 25px rgba(115, 65, 31, 0.25)",
                                    "&:hover": { bgcolor: "#5a3216", transform: "translateY(-2px)", boxShadow: "0 12px 30px rgba(115, 65, 31, 0.35)" },
                                    transition: "all 0.3s ease"
                                }}
                            >
                                Proceed to Checkout
                            </Button>

                            <Stack spacing={2} justifyContent="center" alignItems="center">
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#4caf50", bgcolor: "#f0fdf4", px: 2, py: 0.5, borderRadius: 10 }}>
                                    <VerifiedUserOutlinedIcon fontSize="small" />
                                    <Typography variant="caption" fontWeight={600} sx={{ fontSize: "0.75rem" }}>SSL Secure Payment</Typography>
                                </Box>

                                <Stack direction="row" spacing={1.5} sx={{ color: "#cfcfcf" }}>
                                    <Tooltip title="Visa"><CreditCardIcon fontSize="medium" /></Tooltip>
                                    <Tooltip title="Mastercard"><CreditCardIcon fontSize="medium" /></Tooltip>
                                    <Tooltip title="Amex"><CreditCardIcon fontSize="medium" /></Tooltip>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Cart;