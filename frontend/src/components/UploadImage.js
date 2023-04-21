import React, { useCallback, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DropzoneArea } from "material-ui-dropzone";
import { useGallleryContext } from "../contexts/galleryContext";
import { Snackbar, Alert, FormControl, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

// Style for the dropzone
const dropzoneStyle = {
  border: "2px dashed grey",
  padding: "20px",
  textAlign: "center",
  marginBottom: "16px",
};

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const {
    uploadImage,
    single_image_upload_status,
    alert,
    openAlert,
    handleCloseAlert,
  } = useGallleryContext();

  // Handler for file changes
  const handleFileChange = useCallback((files) => {
    setFile(files[0]);
  }, []);

  // Handler for form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (title <= 2) {
      openAlert("Please enter a valid title", "error");
      return;
    }
    let token = localStorage.getItem("token");
    // Convert the file to a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result.split(",")[1];

      const data = {
        image: base64Image,
        title: title,
        token: token,
      };

      uploadImage(data);
    };

    setFile(null);
    setTitle("");
  };

  return (
    <Wrapper>
      <FormControl
        component="form"
        onSubmit={handleFormSubmit}
        sx={{ width: "100%" }}
      >
        {/* Input for the title */}
        <TextField
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "100%", marginBottom: 3 }}
          label="Title"
        />

        {/* Dropzone for the image */}
        <DropzoneArea
          style={dropzoneStyle}
          filesLimit={1}
          acceptedFiles={["image/*"]}
          dropzoneText={"Drag and drop an image here or click"}
          onChange={handleFileChange}
        />

        {/* Submit button */}
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "100%", marginTop: 3 }}
        >
          Submit
        </Button>
      </FormControl>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={single_image_upload_status}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 3rem 10rem;

  @media screen and (max-width: 650px) {
    margin: 1rem;
  }
`;

export default UploadImage;
