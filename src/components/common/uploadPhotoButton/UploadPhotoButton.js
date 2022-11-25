import { useState } from "react";

import Button from "@mui/material/Button";
import CommonButton from "../commonButton/CommonButton";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { color } from "@mui/system";

export default function UploadPhotoButton({
  uploadImage,
  setImageSelected,
  handleSubmit,
}) {
  // Select and preview image before uploading
  const [imageSRC, setImageSRC] = useState("");

  function showPreview(event) {
    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.getElementById("file-preview");
      preview.src = src;
      preview.style.display = "block";
      setImageSelected(event.target.files[0]);
      setImageSRC(preview.src);
    }
  }

  // Upload Selected image

  return (
    <Stack spacing={4}>
      <Box>
        <img id="file-preview" style={{ maxWidth: "200px" }} />
      </Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        {!imageSRC ? (
          <Button
            variant="contained"
            component="label"
            endIcon={<PhotoCamera />}
          >
            Select Image
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              id="file"
              onChange={showPreview}
            />
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            upload
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
