import { Toolbar } from "@mui/material";

// reason for importing as component: https://bobbyhadz.com/blog/react-change-color-of-svg
// import { ReactComponent as PlantUrbanusLogo } from "../../assets/img/PlantUrbanusLogo.svg";
import PlantUrbanusLogo from "../../assets/img/PlantUrbanusLogo.svg";

// MaterialUI
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { mainNavBarItems } from "./consts/navbarItems";

import { navbarStyles } from "./styles";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <Grid item xs={4}>
      <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
        <Toolbar />
        <Box>
          {/* see note above regarding importing logo as a component */}
          <Link href="/plants">
            <img
              src={PlantUrbanusLogo}
              alt="PlantUrbanus"
              style={{
                maxWidth: "200px",
                padding: "20px",
              }}
            />
          </Link>

          {/* <PlantUrbanusLogo
            fill="blue"
            style={{
              maxWidth: "200px",
              maxHeight: "50px",
              // backgroundColor: "rgba(249, 9, 9, 1)",
            }}
          /> */}
        </Box>

        <Divider />
        <List>
          {mainNavBarItems.map((item, index) => (
            <ListItem
              key={item.id}
              disablePadding
              onClick={() => {
                navigate(item.route);
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
                <ListItemText sx={navbarStyles.text} primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List disablePadding>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>

            <ListItemText> Logout</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
    </Grid>
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Typography variant="h5" component="div">
    //         <Link to="/" style={{ textDecoration: "none", color: "white" }}>
    //           PlantUrbanus
    //         </Link>
    //       </Typography>
    //       <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
    //         {user ? (
    //           <>
    //             <Button
    //               onClick={onLogout}
    //               style={{ textDecoration: "none", color: "white" }}
    //             >
    //               Logout
    //             </Button>
    //           </>
    //         ) : (
    //           <>
    //             <Link
    //               to="/login"
    //               style={{
    //                 textDecoration: "none",
    //                 color: "white",
    //                 marginRight: "10px",
    //               }}
    //             >
    //               Login
    //             </Link>
    //             <Link
    //               to="/register"
    //               style={{ textDecoration: "none", color: "white" }}
    //             >
    //               Register
    //             </Link>
    //           </>
    //         )}
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}
