import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import man from "./assets/man.png";
import woman from "./assets/woman.png";
import newCollections from './assets/newCollections.png';
import sales from './assets/sales.png';

function Categories() {
    const navigate = useNavigate();
    return (
        <div>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    marginTop: 15,
                    marginBottom: 4,
                    fontFamily: '"Playwrite AU TAS", cursive',
                }}
            >
            </Typography>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "470px 300px 300px",
                    gridTemplateRows: "400px 400px",
                    gap: "8px",
                    marginLeft: "205px",
                }}
            >
                <Box sx={{
                    backgroundColor: "#B6885D",
                    backgroundImage: `url(${woman})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    gridColumn: "1",
                    cursor: "pointer"
                }}
                    onClick={() => navigate('/woman')}
                ></Box>

                <Box sx={{
                    backgroundColor: "#B6885D",
                    backgroundImage: `url(${man})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    gridColumn: "2",
                    cursor: "pointer"
                }}
                    onClick={() => navigate('/man')}
                ></Box>

                <Box
                    sx={{
                        backgroundColor: "#B6885D",
                        backgroundImage: `url(${newCollections})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        gridColumn: "3",
                        gridRow: "1 / span 2",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate('/NewCollections')}
                ></Box>

                <Box
                    sx={{
                        backgroundColor: "#B6885D",
                        backgroundImage: `url(${sales})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        gridColumn: "1 / span 2",
                        cursor: "pointer"
                    }}
                    onClick={() => navigate('/sales')}
                ></Box>
            </div>

            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    marginTop: 12,
                    marginBottom: 5,
                    fontFamily: '"Playwrite AU TAS", cursive',
                }}
            >
            </Typography>
        </div>
    );
}

export default Categories;