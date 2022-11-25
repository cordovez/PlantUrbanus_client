import { useQuery } from "@apollo/client";
import { GET_OWNER_PLANTS } from "../graphql/queries/ownerQueries";
import Cookies from "js-cookie";
import generic from "../assets/img/teemu-paananen-OOE4xAnBhKo-unsplash.jpg";

// MUI
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

// Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
// import { Dpr } from "@cloudinary/url-gen/qualifiers/dpr";
// import { dpr } from "@cloudinary/url-gen/actions/delivery";

export default function OwnerPlants() {
  const loggedInOwner = Cookies.get("owner");
  const { data, loading, error } = useQuery(GET_OWNER_PLANTS, {
    variables: { ownerId: loggedInOwner },
  });

  // cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  if (loading) return <h1>... Loading</h1>;
  if (error) return <p>... Error loading clients: {error.message} ...</p>;

  const ownerPlants = data.owner.plants;
  const owner = data.owner.userName;

  return (
    <ImageList
      cols={3}
      sx={{ maxWidth: "600", height: "100%", marginLeft: "220px" }}
    >
      {ownerPlants.map((item) => (
        <ImageListItem key={item.id}>
          {!item.public_id ? (
            <img
              style={{ width: "200px", height: "200px" }}
              src={`${generic}`}
              // srcSet={`${generic}`}
              alt={item.commonName}
              loading="lazy"
            />
          ) : (
            // <ImageListItem key={item.id}>
            <a href={`${item.id}`}>
              <AdvancedImage
                style={{ width: "200px", height: "200px" }}
                cldImg={cld
                  .image(item.public_id)
                  .resize(fill().width(200).height(200))}
                // src={`${item.public_id}`}
                // srcSet={`${item.public_id}`}
                alt={item.commonName}
                loading="lazy"
              />
            </a>
            // </ImageListItem>
          )}

          <ImageListItemBar
            sx={{ width: "200px" }}
            title={item.commonName}
            subtitle={owner}
            actionIcon={
              <IconButton
                sx={{
                  color: "rgba(255, 255, 255, 0.54)",
                }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
