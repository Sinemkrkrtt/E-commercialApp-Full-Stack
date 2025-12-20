import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Button, Stack, Chip, Divider } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const brandFont = '"Playwrite AU TAS", cursive';
    const brandColor = "#73411F";

    useEffect(() => {
        const storedFavs = JSON.parse(localStorage.getItem('myFavorites') || '[]');
        setFavorites(storedFavs);
    }, []);

    const handleRemoveFavorite = (e, productId) => {
        e.stopPropagation();
        const updatedFavorites = favorites.filter(item => item.id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('myFavorites', JSON.stringify(updatedFavorites));
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { state: product });
    };

    if (favorites.length === 0) {
        return (
            <Box sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fcfcfc"
            }}>
                <Stack
                    alignItems="center"
                    spacing={3}
                    sx={{
                        textAlign: "center",
                        maxWidth: "500px",
                        px: 3
                    }}
                >
                    <Box sx={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        border: "3px dashed #E0E0E0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        backgroundColor: "#fff"
                    }}>
                        <FavoriteBorderIcon sx={{ fontSize: 78, color: "#D1AD8CFF" }} />
                    </Box>

                    <Typography variant="h3" sx={{ fontFamily: brandFont, color: "#412307FF", fontWeight: 500 }}>
                        Your Favorites List is Empty
                    </Typography>

                    <Typography variant="body1" sx={{ color: "#AAA9A8FF", lineHeight: 1.6, fontSize: "1.1rem" }}>
                        It looks like you haven't added anything to your favorites yet.
                        Explore our collection and save your top picks!
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.9rem !important" }} />}
                        sx={{
                            borderColor: "#412307FF",
                            color: "#412307FF",
                            borderWidth: "1.5px",
                            textTransform: "none",
                            borderRadius: "0",
                            padding: "18px 48px",
                            fontSize: "1rem",
                            letterSpacing: 1,
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor: "#5C351FFF",
                                color: "#fff",
                                borderColor: "#1a1a1a",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
                            },
                            transition: "all 0.3s ease"
                        }}
                    >
                        DISCOVER NOW
                    </Button>
                </Stack>
            </Box>
        );
    }

    return (

        <Box sx={{ minHeight: "100vh", backgroundColor: "#fcfcfc", py: 5, px: { xs: 2, md: 6, lg: 8 } }}>

            <Box sx={{ mt: 0, mb: 4, display: 'flex', justifyContent: 'flex-start' }}>
                <Chip
                    icon={<FavoriteBorderIcon sx={{ "&&": { color: "#fff", fontSize: 20 } }} />}
                    label={`${favorites.length} Saved Items`}
                    sx={{
                        bgcolor: "#E4B18E",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        height: "40px",
                        paddingRight: 1,
                        boxShadow: "0 4px 12px rgba(228, 177, 142, 0.4)",
                        borderRadius: "8px"
                    }}
                />
            </Box>

            <Divider sx={{ mb: 5, borderColor: "#eee" }} />


            <Grid container spacing={4} justifyContent="flex-start">
                {favorites.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={2.4}>
                        <Card
                            onClick={() => handleProductClick(product)}
                            elevation={0}
                            sx={{
                                width: 230,
                                borderRadius: "16px",
                                textAlign: "left",
                                border: "1px solid #eee",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                cursor: "pointer",
                                overflow: "hidden",
                                backgroundColor: "#fff",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                                    borderColor: "transparent",
                                    "& .card-media-zoom": { transform: "scale(1.08)" },
                                    "& .delete-button": { opacity: 1, transform: "translateY(0)" }
                                },
                            }}
                        >
                            <IconButton
                                className="delete-button"
                                sx={{
                                    position: "absolute", top: 12, right: 12, zIndex: 2,
                                    backgroundColor: "rgba(255,255,255,0.95)",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    opacity: 0,
                                    transform: "translateY(-10px)",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "&:hover": { backgroundColor: "#fff", color: "#d32f2f" }
                                }}
                                onClick={(e) => handleRemoveFavorite(e, product.id)}
                            >
                                <DeleteOutlineIcon fontSize="small" />
                            </IconButton>

                            <Box sx={{ height: 320, overflow: "hidden", backgroundColor: "#f9f9f9", position: "relative" }}>
                                <CardMedia
                                    className="card-media-zoom"
                                    component="img"
                                    height="100%"
                                    image={product.img}
                                    alt={product.name}
                                    sx={{ objectFit: "cover", width: "100%", transition: "transform 0.5s ease" }}
                                />
                                {product.oldprice && (
                                    <Box sx={{ position: 'absolute', bottom: 12, left: 12, bgcolor: '#d32f2f', color: 'white', py: 0.5, px: 1.5, borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        SALE
                                    </Box>
                                )}
                            </Box>

                            <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                <Typography variant="h6" sx={{
                                    fontWeight: 600, color: "#3a3a3a", fontFamily: brandFont,
                                    mb: 1, fontSize: "1rem", lineHeight: 1.4,
                                    height: "2.8em", overflow: "hidden", textOverflow: "ellipsis"
                                }}>
                                    {product.name}
                                </Typography>

                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: "auto" }}>
                                    {product.oldprice && (
                                        <Typography variant="body2" sx={{ textDecoration: "line-through", color: "#999", fontFamily: brandFont }}>
                                            ${product.oldprice}
                                        </Typography>
                                    )}
                                    <Typography variant="h6" sx={{ color: brandColor, fontWeight: 700, fontFamily: brandFont }}>
                                        {product.price}
                                    </Typography>
                                </Stack>

                                <Button
                                    variant="text"
                                    fullWidth
                                    endIcon={<ArrowForwardIosIcon sx={{ fontSize: "12px !important" }} />}
                                    sx={{
                                        mt: 2, textTransform: "none", color: brandColor, fontWeight: 600,
                                        justifyContent: "space-between", padding: "6px 0",
                                        "&:hover": { backgroundColor: "transparent", textDecoration: "underline" }
                                    }}
                                >
                                    View Product
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Favorites;