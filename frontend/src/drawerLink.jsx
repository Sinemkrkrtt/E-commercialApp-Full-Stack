import { ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function DrawerLink({ text, path, sx, startIcon }) {
    return (
        <ListItemButton
            component={Link}
            to={path}
            sx={{
                display: "flex",
                alignItems: "center",
                ...sx,
                "&.MuiButtonBase-root:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                },
            }}
        >
            {startIcon && <span style={{ marginRight: 8 }}>{startIcon}</span>}
            <ListItemText
                primary={text}
                primaryTypographyProps={{ sx: { ...sx } }}
            />
        </ListItemButton>
    );
}

export default DrawerLink;
