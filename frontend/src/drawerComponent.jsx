import { Drawer, Box, List, ListItemButton, ListItemText, Collapse, IconButton } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import DrawerLink from "./drawerLink";
import { useNavigate } from "react-router-dom";

const brandColor = "#5D3A29";
const brandAccent = "#CA7403FF";
const brandLight = "#F9F8F6";
const hoverBg = "rgba(93, 58, 41, 0.08)";

function DrawerComponent({ isDrawerOpen, toggleDrawer }) {
  const [openWoman, setOpenWoman] = useState(false);
  const [openMan, setOpenMan] = useState(false);

  const handleWomanClick = () => setOpenWoman(!openWoman);
  const handleManClick = () => setOpenMan(!openMan);

  const navigate = useNavigate();

  const womanCategories = [
    { name: "Blouse", path: "/category/blouse" },
    { name: "Dress", path: "/category/dress" },
    { name: "Pants", path: "/category/woman-pants" },
    { name: "Skirt", path: "/category/skirt" },
    { name: "Shorts", path: "/category/woman-shorts" },
    { name: "Outerwear", path: "/category/woman-outerwear" },
    { name: "Bag", path: "/category/bag" },
    { name: "Shoes", path: "/category/woman-shoes" },
    { name: "Accessories", path: "/category/woman-accesories" },
  ];
  const manCategories = [
    { name: "Tops", path: "/category/man-tshirt" },
    { name: "Bottoms", path: "/category/man-pants" },
    { name: "Outerwear", path: "/category/man-outerwear" },
    { name: "Shoes", path: "/category/man-shoes" },
    { name: "Accessories", path: "/category/man-accessories" }
  ];

  const listItemStyle = {
    my: 0.5,
    mx: 2,
    borderRadius: 2,
    transition: "all 0.3s ease",
    color: "#4A4A4A",
    "&:hover": {
      backgroundColor: hoverBg,
      color: brandColor,
      transform: "translateX(5px)",
    },
    "& .MuiSvgIcon-root": {
      color: brandAccent,
      transition: "color 0.3s",
    },
    "&:hover .MuiSvgIcon-root": {
      color: brandColor,
    }
  };

  const subItemStyle = {
    fontSize: 15,
    fontWeight: 500,
    color: "#666",
    ml: 1,
    my: 0.2,
    "&:hover": {
      color: brandColor,
      fontWeight: 700,
      bgcolor: "transparent",
      "& .MuiSvgIcon-root": {
        color: brandColor
      }
    }
  };

  const iconStyle = { fontSize: 24, mr: 1 };

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: 340,
          backgroundColor: brandLight,
          borderRight: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "5px 0 25px rgba(0,0,0,0.05)"
        }
      }}
    >
      <Box role="presentation" sx={{ pb: 4 }}>

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
          pb: 2,
          position: "relative"
        }}>
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "#999",
              "&:hover": { color: brandColor }
            }}
          >
            <CloseIcon />
          </IconButton>


        </Box>
        <List sx={{ pt: 2, mt: 2 }}>

          <DrawerLink
            text="Home"
            path="/"
            startIcon={<HomeFilledIcon sx={{ fontSize: 22, mr: -1 }} />}
            sx={{ ...listItemStyle, fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}
          />

          <ListItemButton onClick={handleWomanClick} sx={listItemStyle}>
            <FemaleIcon sx={iconStyle} />
            <ListItemText
              primary="Woman"
              primaryTypographyProps={{ fontSize: 17, fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}
            />
            {openWoman ? <ExpandLess sx={{ color: brandColor }} /> : <ExpandMore sx={{ color: "#999" }} />}
          </ListItemButton>

          <Collapse in={openWoman} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ mb: 1 }}>
              {womanCategories.map(item => (
                <DrawerLink
                  key={item.name}
                  text={item.name}
                  path={item.path}
                  startIcon={<KeyboardArrowRightIcon sx={{ ml: 6, color: brandAccent, fontSize: 20 }} />}
                  sx={subItemStyle}
                />
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={handleManClick} sx={listItemStyle}>
            <MaleIcon sx={iconStyle} />
            <ListItemText
              primary="Man"
              primaryTypographyProps={{ fontSize: 17, fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}
            />
            {openMan ? <ExpandLess sx={{ color: brandColor }} /> : <ExpandMore sx={{ color: "#999" }} />}
          </ListItemButton>

          <Collapse in={openMan} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ mb: 1 }}>
              {manCategories.map(item => (
                <DrawerLink
                  key={item.name}
                  text={item.name}
                  path={item.path}
                  startIcon={<KeyboardArrowRightIcon sx={{ ml: 6, color: brandAccent, fontSize: 20 }} />}
                  sx={subItemStyle}
                />
              ))}
            </List>
          </Collapse>
          <Box sx={{ my: 2, borderTop: "1px solid rgba(0,0,0,0.06)", mx: 3 }} />

          <DrawerLink
            text="New Collections"
            path="/NewCollections"
            startIcon={<AutoAwesomeIcon sx={{ fontSize: 22, mr: -1 }} />}
            sx={listItemStyle}
          />
          <DrawerLink
            text="On Sale"
            path="/sales"
            startIcon={<LoyaltyIcon sx={{ fontSize: 22, mr: -1 }} />}
            sx={{
              ...listItemStyle,
              color: "#D32F2F",
              "& .MuiSvgIcon-root": { color: "#D32F2F" },
              "&:hover": { bgcolor: "#FFF0F0", color: "#B71C1C", transform: "translateX(5px)" }
            }}
          />

        </List>
      </Box>
    </Drawer>
  );
}

export default DrawerComponent; 