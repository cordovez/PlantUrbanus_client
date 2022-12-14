import Cookies from "js-cookie";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { GET_OWNER } from "../../graphql/queries/ownerQueries";
import { useQuery } from "@apollo/client";

import UpdateOwnerModal from "../Modals/UpdateOwner/UpdateOwnerModal";

const loggedInUser = Cookies.get("owner");
const OwnerProfileCard = () => {
  const { data, loading, error } = useQuery(GET_OWNER, {
    variables: { ownerId: loggedInUser },
  });

  if (loading) return <Skeleton />;
  if (error) return <p>... Error loading owner data: {error.message} ...</p>;
  const owner = data.owner;

  return (
    <Stack marginLeft="250px" spacing={2} sx={{ maxWidth: "70vw" }}>
      <TextField
        id="standard-read-only-input"
        label="User name"
        defaultValue={owner.userName ? owner.userName : ""}
        InputProps={{
          readOnly: true,
        }}
        variant={owner.userName ? "filled" : "standard"}
      />
      <TextField
        id="standard-read-only-input"
        label="First Name"
        defaultValue={owner.firstName ? owner.firstName : ""}
        InputProps={{
          readOnly: true,
        }}
        variant={owner.firstName ? "filled" : "standard"}
      />
      <TextField
        id="standard-read-only-input"
        label="Last Name"
        defaultValue={owner.lastName ? owner.lastName : ""}
        InputProps={{
          readOnly: true,
        }}
        variant={owner.lastName ? "filled" : "standard"}
      />
      <TextField
        id="standard-read-only-input"
        label="Email"
        defaultValue={owner.email ? owner.email : ""}
        InputProps={{
          readOnly: true,
        }}
        variant={owner.email ? "filled" : "standard"}
      />
      <UpdateOwnerModal owner={owner} />
    </Stack>
    // {/* </Box> */}
  );
};
export default OwnerProfileCard;
