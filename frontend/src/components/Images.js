import React from "react";
import Image from "./Image";
import { Box, Typography, Skeleton, CircularProgress } from "@mui/material";
import style from "styled-components";
import { useGallleryContext } from "../contexts/galleryContext";

const Images = () => {
  const { searched_images, image_loading_status, image_loading_err } =
    useGallleryContext();
  if (image_loading_err) {
    return <Typography>There was an error</Typography>;
  }
  if (image_loading_status) {
    return <Skeleton variant="rectangular" width={410} height={410} />;
  }

  return (
    <Wrapper>
      <Box className="images">
        {searched_images.map((data, index) => {
          return <Image data={data} key={index} />;
        })}
      </Box>
    </Wrapper>
  );
};

const Wrapper = style.div`
.images{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:1rem;
  
}
@media screen and (max-width:950px){
  .images{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1rem;
  
}
@media screen and (max-width:650px){
  .images{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:1rem;
  
}

@media screen and (max-width:450px){
  .images{
    display:flex;
    flex-direction:column;
    align-items:center;
   }
}

`;

export default Images;
