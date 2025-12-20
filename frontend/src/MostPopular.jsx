import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, IconButton, Card, CardMedia, CardContent, Button, Chip } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useNavigate } from 'react-router-dom';

function MostPopular() {
    const [favorites, setFavorites] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const visibleCount = 4;

    useEffect(() => {

        const storedFavs = JSON.parse(localStorage.getItem('myFavorites') || '[]');
        setFavorites(storedFavs);


        const storedCart = JSON.parse(localStorage.getItem('myCart') || '[]');
        setCart(storedCart);

        fetch('http://localhost:5001/api/products')
            .then(response => response.json())
            .then(data => {
                const popularIds = [177, 178, 179, 180, 181, 182, 183, 184, 185, 186];
                const filteredPopular = data.filter(item => popularIds.includes(item.id));
                setProducts(filteredPopular);
            })
            .catch(error => console.error("Veri çekilemedi:", error));
    }, []);

    const toggleFavorite = (e, product) => {
        e.stopPropagation();
        let updatedFavorites;
        if (favorites.find(fav => fav.id === product.id)) {
            updatedFavorites = favorites.filter(fav => fav.id !== product.id);
        } else {
            updatedFavorites = [...favorites, product];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('myFavorites', JSON.stringify(updatedFavorites));
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        let updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity || 1) + 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
        localStorage.setItem('myCart', JSON.stringify(updatedCart));
        console.log("Sepete eklendi:", product.name);
    };

    const handleNext = () => {
        if (currentIndex + visibleCount < products.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { state: product });
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + visibleCount);

    return (
        <Box sx={{ textAlign: "center", mt: 8, mb: 12, position: "relative" }}>
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: '"Playwrite AU TAS", cursive',
                        color: "#222",
                        fontWeight: 600,
                        mb: 1
                    }}
                >
                    Most Popular
                </Typography>
                <Typography variant="body1" sx={{ color: "#888", fontStyle: "italic" }}>
                    Customer favorites selected just for you.
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", maxWidth: "1300px", mx: "auto", px: 2 }}>

                <IconButton
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    sx={{
                        width: 50, height: 50,
                        bgcolor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        color: "#333",
                        mr: 2,
                        "&:hover": { bgcolor: "#f5f5f5", color: "#000" },
                        "&:disabled": { opacity: 0.3 }
                    }}
                >
                    <ArrowBackIosIcon fontSize="small" sx={{ ml: 1 }} />
                </IconButton>

                <Grid container spacing={3} sx={{ flexGrow: 1, justifyContent: "center" }}>
                    {visibleProducts.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={3}>
                            <Card
                                onClick={() => handleProductClick(product)}
                                elevation={0}
                                sx={{
                                    borderRadius: 4,
                                    textAlign: "left",
                                    bgcolor: "#fff",
                                    height: "100%",
                                    minHeight: 460,
                                    width: 250,
                                    mx: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    cursor: "pointer",
                                    border: "1px solid transparent",
                                    transition: "all 0.3s ease",
                                    overflow: "hidden",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
                                        borderColor: "#f0f0f0"
                                    },
                                    "&:hover .product-image": {
                                        transform: "scale(1.08)"
                                    }
                                }}
                            >
                                <Chip
                                    label="BEST SELLER"
                                    size="small"
                                    sx={{
                                        position: "absolute", top: 15, left: 15, zIndex: 2,
                                        bgcolor: "#000000FF", color: "#fff", fontWeight: 700,
                                        fontSize: "0.65rem", borderRadius: 1, letterSpacing: 0.5
                                    }}
                                />
                                <IconButton
                                    sx={{
                                        position: "absolute", top: 10, right: 10, zIndex: 2,
                                        bgcolor: "rgba(255,255,255,0.8)",
                                        "&:hover": { bgcolor: "#fff", color: "#d32f2f" }
                                    }}
                                    onClick={(e) => toggleFavorite(e, product)}
                                >
                                    {favorites.find(fav => fav.id === product.id) ? (
                                        <FavoriteIcon sx={{ color: "#DB642DFF", fontSize: 22 }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ color: "#555", fontSize: 22 }} />
                                    )}
                                </IconButton>

                                <Box sx={{ height: 320, overflow: "hidden", bgcolor: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <CardMedia
                                        className="product-image"
                                        component="img"
                                        image={product.img}
                                        alt={product.name}
                                        sx={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                            transition: "transform 0.5s ease"
                                        }}
                                    />
                                </Box>
                                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 2.5 }}>

                                    <Box>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 600,
                                                color: "#333",
                                                fontFamily: '"Playwrite AU TAS", cursive',
                                                fontSize: "1rem",
                                                lineHeight: 1.3,
                                                mb: 0.5
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                                            Trending Now
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                        <Typography variant="h6" sx={{ color: "#73411F", fontWeight: 700, fontSize: "1.1rem" }}>
                                            {product.price}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={(e) => handleAddToCart(e, product)}
                                            size="small"
                                            sx={{
                                                minWidth: "40px",
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                p: 0,
                                                borderColor: "#e0e0e0",
                                                color: "#333",
                                                "&:hover": {
                                                    bgcolor: "#73411F",
                                                    color: "#fff",
                                                    borderColor: "#73411F"
                                                }
                                            }}
                                        >
                                            <ShoppingBagOutlinedIcon fontSize="small" />
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <IconButton
                    sx={{ color: "#8a5e3b", "&:hover": { color: "#231000FF" }, mx: 1 }}
                    onClick={handleNext}
                    disabled={currentIndex + visibleCount >= products.length}
                    style={{
                        width: 50, height: 50,
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        color: "#333",
                        marginLeft: 16,
                        opacity: currentIndex + visibleCount >= products.length ? 0.3 : 1
                    }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>

            </Box>
        </Box>
    );
}

export default MostPopular;