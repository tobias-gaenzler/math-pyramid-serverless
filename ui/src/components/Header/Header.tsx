import React from "react";
import "./Header.css";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PathConstants from "../../routes/pathConstants";
import { UserName } from "../UserName/UserName";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";

const Header: React.FC = () => (
    <AppBar position="static">
        <Toolbar className="header-toolbar">
            <div className="header-start">
                <IconButton
                    component={RouterLink}
                    to={PathConstants.PLAY}
                    size="large"
                    color="inherit"
                >
                    <Typography className="title" variant="h5" component="div">
                        MATH PYRAMID
                    </Typography>
                </IconButton>
                <IconButton
                    component={RouterLink}
                    to={PathConstants.PLAY}
                    size="large"
                    color="inherit"
                >
                    <PlayCircleOutlineOutlinedIcon />
                    <Typography variant="inherit" component="div">
                        <div className="play-button-text">Play</div>
                    </Typography>
                </IconButton>
            </div>
            <IconButton
                component={UserName}
                size="large"
                color="inherit"
            />
            <IconButton
                component={RouterLink}
                to={PathConstants.HELP}
                size="large"
                color="inherit"
            >
                <HelpOutlineIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
);

export default Header;
