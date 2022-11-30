// Component dependencies
import Axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// GraphQL
import { useMutation } from "@apollo/client";
import {
  ADD_PLANT,
  UPDATE_PLANT,
} from "../../graphql/mutations/plantMutations";
import { TextField, Button, Container, Stack, Grid } from "@mui/material";

// Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

import Box from "@mui/material/Box";
import UploadPhotoButton from "../common/uploadPhotoButton/UploadPhotoButton";

const PlantPhotoUpload = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [publicId, setPublicID] = useState("");
  //   const [commonName, setCommonName] = useState("");

  const owner = Cookies.get("owner");
  const navigate = useNavigate();

  const [addPlant] = useMutation(ADD_PLANT, {
    variables: {
      plantInput: {
        // commonName,
        owner,
        public_id: publicId,
      },
    },
  });

  const [updatePlant] = useMutation(UPDATE_PLANT, {
    variables: {
      updatePlantInput: {
        // commonName,
        owner,
        public_id: publicId,
      },
    },
  });

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("upload_preset", "PlantUrbanus");
    formData.append("file", imageSelected);

    await Axios.post(
      "https://api.cloudinary.com/v1_1/cordovez/image/upload/",
      formData
    )
      .then((response) => {
        setPublicID(response.data.public_id);
      })
      .then(addPlant);
  };

  // cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  const plantImage = cld.image(publicId);
  plantImage.resize(fill().width(250).height(250));

  async function handleSubmit() {
    await uploadImage();
    navigate("/plants");
    window.location.reload();
  }

  //   function showPreview(event) {
  //     if (event.target.files.length > 0) {
  //       const src = URL.createObjectURL(event.target.files[0]);
  //       const preview = document.getElementById("file-preview");
  //       preview.src = src;
  //       preview.style.display = "block";
  //     }
  //   }
  //   function handlePhotoUpload(event) {
  //     setImageSelected(event.target.files[0]);
  //     showPreview(event);
  //   }
  console.log();
  return (
    <Box marginLeft="250px">
      <UploadPhotoButton
        uploadImage={uploadImage}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        handleSubmit={handleSubmit}
      />
    </Box>

    //   <Stack spacing={6} paddingBottom={2}>
    // {/* <Box>
    //   <img id="file-preview" style={{ maxWidth: "200px" }} />
    // </Box>
    // <input
    //   type="file"
    //   id="file"
    //   accept="image/*"
    //   onChange={handlePhotoUpload}
    // />
    // <Button
    //   variant="contained"
    //   onClick={uploadImage}
    //   size="small"
    //   sx={{ width: "120px" }}
    // >
    //   Add Plant
    // </Button> */}
    //   </Stack>
    // </Box>
  );
};
export default PlantPhotoUpload;
