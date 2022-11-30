import { useMutation } from "@apollo/client";
import { useForm } from "../../../utilities/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { UPDATE_PLANT } from "../../../graphql/mutations/plantMutations";

// MUI
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/system/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Label, PropaneRounded } from "@mui/icons-material";

import { modalStyles } from "../modalStyles";

const UpdatePlantModal = (props) => {
  const location = useLocation();
  const plantIdFromParams = useParams();
  // const [healthRating, setHealthRating] = useState(5);

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 01 The custom hook below takes as parameters a callback and an initial state object, in this case, with empty values
  const { onChange, onSubmit, values } = useForm(updatePlantCallback, {
    commonName: props.commonName ? props.commonName : "",
    datePurchased: "",
    familyName: props.familyName ? props.familyName : "",
    healthRating: "",
    scientificName: "",
    substrate: "SOIL",
    id: `${plantIdFromParams.plantId}`,
    notes: "",
  });

  //   02 the GraphQL Mutation takes the 'values' from the custom hook as its variables
  const [updatePlant] = useMutation(UPDATE_PLANT, {
    variables: {
      updatePlantInput: {
        ...values,
        healthRating: parseInt(values.healthRating),
      },
      update: (cache, { data }) => {
        const cacheId = cache.identify(data.plant);
        cache.modify({
          fields: {
            commonName: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
            datePurchased: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
            familyName: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
            healthRating: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
            scientificName: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
            substrate: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
            id: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
            notes: (existingFieldData, { toReference }) => {
              return [...existingFieldData, toReference(cacheId)];
            },
          },
        });
      },
    },
  });

  //   03 This callback runs the GraphQL Mutation hook inside it
  function updatePlantCallback() {
    console.log("callback hit");
    updatePlant();
  }

  function onSubmitAndClose(event) {
    onSubmit(event);
    handleClose();
    props.refetch();
  }
  // console.log("values: ", values);
  // console.log("health number: ", values.healthRating);

  //   04 the 'onChange' and 'onSubmit' functions used below in the return, have been imported from the custom hook (01)
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Edit Plant Info
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Stack spacing={2} paddingBottom={2}>
            <TextField
              label="commonName"
              name="commonName"
              defaultValue={props.commonName}
              onChange={onChange}
            />
            <InputLabel id="purchaseDate">Date Purchased</InputLabel>
            <TextField
              type="date"
              id="purchaseDate"
              // label="datePurchased"
              name="datePurchased"
              onChange={onChange}
            />
            <TextField
              label="familyName"
              name="familyName"
              defaultValue={props.familyName}
              onChange={onChange}
            />
            <TextField
              label="Health: (1= poorly, 5=thriving)"
              name="healthRating"
              onChange={
                onChange
                // (e) => {
                //   setHealthRating(e.target.value);
                // }
              }
              type="number"
            />
            {/* <label htmlFor="healthRating">
              Health: (1= poorly, 5=thriving)
            </label>
            <input
              type="number"
              id="healthRating"
              min="1"
              max="5"
              label="Health: (1= poorly, 5=thriving)"
              name="healthRating"
              onChange={onChange}
            /> */}
            <TextField
              label="scientificName"
              name="scientificName"
              onChange={onChange}
            />

            <InputLabel id="substrate">Substrate</InputLabel>
            <Select
              labelId="substrate"
              id="substrate"
              value="SOIL"
              label="substrate"
              name="substrate"
              onChange={onChange}
            >
              <MenuItem value={"SOIL"}>Soil</MenuItem>
              <MenuItem value={"LECA"}>Leca</MenuItem>
              <MenuItem value={"PON"}>Pon</MenuItem>
              <MenuItem value={"SPHAGNUM"}>Sphagnum</MenuItem>
              <MenuItem value={"CUSTOM"}>Custom Mix</MenuItem>
            </Select>

            <TextField
              multiline
              label="Notes"
              rows={4}
              name="notes"
              variant="filled"
              onChange={onChange}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={(event) => {
              onSubmitAndClose(event);
            }}
          >
            Register
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default UpdatePlantModal;
