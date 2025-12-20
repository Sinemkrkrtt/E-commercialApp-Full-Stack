import React from "react";
import { Box } from "@mui/material";
import sienna from './assets/sienna.png'


function HeroSection() {
    return (
        <Box
            sx={{
                width: 1500,
                height: 590,
                backgroundImage: `url(${sienna})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: 2,
                margin: "0 auto", // Ortalamak için
            }}
        />
    );
}

export default HeroSection;
