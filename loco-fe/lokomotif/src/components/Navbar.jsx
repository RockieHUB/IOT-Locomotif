import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const pages = ["Dashboard", "Locomotive", "Blog"];
const settings = ["Profile", "Logout"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC107", // Amber 500
      light: "#FFE082", // Amber 200
      dark: "#FFA000", // Amber 700
    },
  },
});

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Container>
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 2,
                height: { md: "2.5rem", lg: "3rem" }, // Responsive height
                maxHeight: "40px", // Maximum height
                width: "auto", // Maintain aspect ratio
              }}
              alt="Logo"
              src="src/assets/Logo-kereta.png"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOCOMOTIVE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiPaper-root": {
                    backgroundColor: "white",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: "#8FBC8F", // Match with Avatar color
                      "&:hover": {
                        backgroundColor: "#E8F5E9", // Light green background on hover
                        color: "#2E8B57", // Darker green text on hover
                      },
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              component="img"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                height: { xs: "2rem", sm: "2.5rem" }, // Responsive height
                maxHeight: "32px", // Maximum height
                width: "auto", // Maintain aspect ratio
              }}
              alt="Logo"
              src="src/assets/Logo-kereta.png"
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOCOMOTIVE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Avatar"
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      bgcolor: "#8FBC8F",
                      border: 2,
                      borderColor: "white",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": {
                    backgroundColor: "white",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    sx={{
                      color: "#8FBC8F", // Match with Avatar color
                      "&:hover": {
                        backgroundColor: "#E8F5E9", // Light green background on hover
                        color: "#2E8B57", // Darker green text on hover
                      },
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
