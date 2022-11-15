// Component dependencies
import Axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

// GraphQL
import { useMutation } from "@apollo/client";
import { ADD_PLANT } from "../graphql/mutations/plantMutations";
import {
  TextField,
  Button,
  Container,
  Stack,
  Alert,
  Input,
} from "@mui/material";

// Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

// hooks
import { useForm } from "../utilities/hooks";

export default function AddPlant() {
  const [imageSelected, setImageSelected] = useState("");
  const [publicId, setPublicID] = useState("");
  //   const [commonName, setCommonName] = useState("");

  const owner = Cookies.get("owner");

  //   function updatePlantCallback() {
  //     console.log("callback hit");
  //     updatePlant();
  //   }
  //   const { onChange, onSubmit, values } = useForm(addPlantCallback, {
  //     commonName: "",
  //     public_id: publicId,
  //     owner: owner,
  //   });

  const [addPlant] = useMutation(ADD_PLANT, {
    variables: {
      plantInput: {
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

  return !publicId ? (
    <Container maxWidth="sm">
      <Stack spacing={2} paddingBottom={2}>
        <input
          type="file"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        />
        <Button variant="contained" onClick={uploadImage}>
          Add Plant
        </Button>
      </Stack>
    </Container>
  ) : (
    <Container spacing={2} maxWidth="sm">
      <AdvancedImage cldImg={plantImage} />
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="commonName" name="commonName" />
      </Stack>
      <Button variant="contained">Register</Button>
    </Container>
  );
}
