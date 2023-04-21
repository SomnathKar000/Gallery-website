import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGallleryContext } from "../contexts/galleryContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Image = (props) => {
  const { DeleteImage, EditImage, openAlert } = useGallleryContext();
  const { image, name, _id } = props.data;
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(name);
  const titleChange = () => {
    if (newTitle.trim().length <= 3) {
      openAlert("Enter a valid title", "error");
      return;
    }
    EditImage(_id, newTitle);
    closeDialog();
    return;
  };
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setNewTitle(e.target.value);
  };

  return (
    <Box>
      <Card id={_id} sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            height="100%"
            width="100%"
            image={`data:image/png;base64,${image}`}
            alt={name}
            component="img"
          ></CardMedia>
          <CardContent>
            <Typography variant="h5">{name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions direction="row" sx={{ justifyContent: "space-between" }}>
          <Button
            flex={1}
            onClick={openDialog}
            color="inherit"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            flex={1}
            onClick={() => DeleteImage(_id)}
            color="inherit"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle sx={{ textAlign: "center" }}>Edit title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="New title"
            onChange={onChange}
            value={newTitle}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={titleChange}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Image;
