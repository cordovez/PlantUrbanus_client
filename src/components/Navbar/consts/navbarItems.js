// for tutorial see here: https://www.youtube.com/watch?v=uLSE7WtcrP0&list=PLDxCaNaYIuUlG5ZqoQzFE27CUOoQvOqnQ&index=2

// import PeopleIcon from "@mui/icons-material/People";
import SpaIcon from "@mui/icons-material/Spa";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const mainNavBarItems = [
  {
    id: 0,
    icon: <SpaIcon />,
    label: "My Plants",
    route: "plants",
  },
  {
    id: 1,
    icon: <AddPhotoAlternateIcon />,
    label: "Add Plant",
    route: "add-plant",
  },
  {
    id: 2,
    icon: <ManageAccountsIcon />,
    label: " Profile",
    route: "profile",
  },

  // {
  //   id: 4,
  //   icon: <PeopleIcon />,
  //   label: "Authentication",
  //   route: "route",
  // },
  // {
  //   id: 5,
  //   icon: <PeopleIcon />,
  //   label: "Authentication",
  //   route: "route",
  // },
];
