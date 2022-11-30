import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UpdatePlantModal from "../components/Modals/updatePlant/UpdatePlantModal";

// GraphQL
import { useQuery } from "@apollo/client";
import { GET_PLANT } from "../graphql/queries/plantQueries";
import { GET_OWNER_PLANT_IDS } from "../graphql/queries/ownerQueries";

// Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { dpr } from "@cloudinary/url-gen/actions/delivery";

// MUI

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { borderRadius } from "@mui/system";
import { Update } from "@mui/icons-material";

export default function PlantProfile() {
  let { plantId } = useParams();
  const navigate = useNavigate();

  const ownerFromCookies = Cookies.get("owner");

  // const [allIds, setAllIds] = useState([]);

  // graphql
  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: {
      plantId: plantId,
    },
  });

  const { data: plantIds } = useQuery(GET_OWNER_PLANT_IDS, {
    variables: { ownerId: ownerFromCookies },
  });

  //  TO DO navigate to a 404 page if plant id doesn't exist
  // useEffect(() => {

  // }, []);

  if (loading) return <h1>... Loading</h1>;
  if (error) return <p>... Error loading clients: {error.message} ...</p>;

  // cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  const plantImage = cld.image(data.plant.public_id, {
    transformation: [{ dpr: "2.0" }],
  });
  const plant = data.plant;
  const plantImageURL = plantImage.toURL();
  const date = Date(data.plant.createdAt).slice(0, 15);

  return (
    <Box
      style={{ marginLeft: "250px", display: "flex", flexDirection: "column" }}
    >
      <Box>
        <img
          src={plantImageURL}
          alt={plant.commonName}
          style={{ maxWidth: "400px", maxHeight: "300px" }}
        />
      </Box>
      <UpdatePlantModal />
      <List sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          mr="50px"
          sx={{
            border: "solid 1px #999",
            borderRadius: "16px",
            minWidth: "200px",
            padding: "20px",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Common Name:
          </Typography>
          <Typography variant="body2">
            {plant.commonName ? plant.commonName : "none"}
          </Typography>
          <Divider />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Family Name
          </Typography>
          <Typography variant="body2">
            {plant.familyName ? plant.familyName : "none"}
          </Typography>
          <Divider />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Scientific Name
          </Typography>
          <Typography variant="body2">
            {plant.scientificName ? plant.scientificName : "none"}
          </Typography>
        </Box>
        <Box
          sx={{
            border: "solid 1px #999",
            borderRadius: "16px",
            padding: "20px",
            minWidth: "200px",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Health
          </Typography>
          <Typography variant="body2">
            {plant.healthRating ? plant.healthRating : "none"}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Substrate
          </Typography>
          <Typography variant="body2">
            {plant.substrate ? plant.substrate : "none"}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Notes
          </Typography>
          <Typography variant="body2">
            {plant.notes ? plant.notes : "none"}
          </Typography>
        </Box>
      </List>
    </Box>
  );
}
