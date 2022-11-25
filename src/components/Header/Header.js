import Cookies from "js-cookie";
import { headerStyles } from "./styles";

// MUI
import CommonButton from "../common/commonButton/CommonButton";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import HelpIcon from "@mui/icons-material/Help";
import Divider from "@mui/material/Divider";

import { useQuery } from "@apollo/client";
import { GET_OWNER } from "../../graphql/queries/ownerQueries";

const Header = ({ title }) => {
  // Who is the owner:
  const loggedInOwner = Cookies.get("owner");

  const { data, loading, error } = useQuery(GET_OWNER, {
    variables: { ownerId: loggedInOwner },
  });

  // Styles

  if (loading) return <h1>... Loading</h1>;
  if (error) return <p>... Error loading clients: {error.message} ...</p>;

  const user = data.owner.userName;

  return (
    <Box sx={headerStyles.wrapper}>
      <Box sx={headerStyles.topRow}>
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          alt={`${user}`}
          sx={{ width: "150px", height: "150px" }}
        />
        <Box sx={headerStyles.rightColumn}>
          <h2>{user}</h2>
        </Box>
      </Box>

      <Typography variant="h1" sx={{ paddingTop: "20px" }}>
        <div>{title}</div>
      </Typography>
    </Box>
  );
};
export default Header;
