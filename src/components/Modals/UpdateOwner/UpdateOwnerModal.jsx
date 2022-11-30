import { useMutation } from "@apollo/client";
import { useForm } from "../../../utilities/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

// MUI
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/system/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { modalStyles } from "../modalStyles";

import { UPDATE_OWNER } from "../../../graphql/mutations/ownerMutations";

export default function UpdateOwnerModal({ owner }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 01 The custom hook below takes as parameters a callback and an initial state object, in this case, with empty values
  const { onChange, onSubmit, values } = useForm(updateOwnerCallback, {
    id: owner.id,
    userName: owner.userName ? owner.userName : "",
    firstName: owner.firstName ? owner.firstName : "",
    lastName: owner.lastName ? owner.lastName : "",
    email: owner.email ? owner.email : "",
    avatar: "",
  });

  //   02 the GraphQL Mutation takes the 'values' from the custom hook as its variables
  const [updateOwner] = useMutation(UPDATE_OWNER, {
    variables: { updateOwnerInput: { ...values } },
    update: (cache, { data }) => {
      const cacheId = cache.identify(data.owner);
      cache.modify({
        fields: {
          userName: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
          firstName: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
          lastName: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
          email: (existingFieldData, { toReference }) => {
            return [...existingFieldData, toReference(cacheId)];
          },
        },
      });
    },
  });

  //   03 This callback runs the GraphQL Mutation hook inside it
  function updateOwnerCallback() {
    console.log("callback hit");
    console.log({ values });
    updateOwner();
  }

  function onSubmitAndClose(event) {
    onSubmit(event);
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Stack spacing={2} paddingBottom={2}>
            <TextField
              label="User Name"
              name="userName"
              defaultValue={owner.userName}
              onChange={onChange}
              required
            />
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              defaultValue={owner.firstName}
              onChange={onChange}
            />
            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              defaultValue={owner.lastName}
              onChange={onChange}
            />
            <TextField
              type="email"
              label="Email"
              id="email"
              name="email"
              defaultValue={owner.email}
              onChange={onChange}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={(event) => {
              onSubmitAndClose(event);
            }}
          >
            Update Now
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
