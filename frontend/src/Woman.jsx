import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Button } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

function Woman() {
    const [favorites, setFavorites] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const storedFavs = JSON.parse(localStorage.getItem('myFavorites') || '[]');
        setFavorites(storedFavs);

        const storedData = localStorage.getItem('womanProductsFixed');

        if (storedData) {
            setProducts(JSON.parse(storedData));
        } else {
            fetch('http://localhost:5001/api/products')
                .then(response => response.json())
                .then(data => {
                    const womanIds = [
                        30, 87, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
                        9, 21, 29, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
                        34, 18, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126,
                        20, 26, 32, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
                        1, 2, 12, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142,
                        5, 36, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160,
                        14, 24, 38, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
                        27, 28, 176, 11, 16, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206,
                    ];

                    let filteredWoman = data.filter(item => womanIds.includes(item.id));
                    filteredWoman = filteredWoman.sort(() => Math.random() - 0.5);
                    localStorage.setItem('womanProductsFixed', JSON.stringify(filteredWoman));

                    setProducts(filteredWoman);
                })
                .catch(error => console.error("Veri çekilemedi:", error));
        }
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


    const handleGoToDetail = (e, product) => {
        e.stopPropagation();
        navigate(`/product/${product.id}`, { state: product });
    };

    return (
        <Box sx={{ textAlign: "center", mt: 0, mb: 12, px: { xs: 2, md: 6 }, backgroundColor: "#fff", py: 3 }}>

            <Grid container spacing={3} justifyContent="center">
                {products.map((product, index) => (
                    <Grid item key={product.id || index} xs={6} sm={4} md={3}>

                        <Card
                            onClick={(e) => handleGoToDetail(e, product)}
                            elevation={0}
                            sx={{
                                borderRadius: 4,
                                textAlign: "left",
                                bgcolor: "#fff",
                                height: "100%",
                                minHeight: 460,
                                width: 300,
                                maxWidth: 250,
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
                            <IconButton
                                sx={{
                                    position: "absolute", top: 10, right: 10, zIndex: 2,
                                    bgcolor: "rgba(255,255,255,0.8)",
                                    "&:hover": { bgcolor: "#fff", color: "#DB642DFF" }
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
                                        Women's Collection
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
        </Box>
    );
}

export default Woman;