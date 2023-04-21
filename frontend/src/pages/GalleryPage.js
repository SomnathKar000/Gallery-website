import React, { useEffect } from "react";
import Images from "../components/Images";
import UploadImage from "../components/UploadImage";
import { useNavigate } from "react-router-dom";
import { useGallleryContext } from "../contexts/galleryContext";

const GalleryPage = () => {
  const { getUser } = useGallleryContext();
  const history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history("/login");
    } else {
      getUser();
    }
  }, []);
  return (
    <div>
      <UploadImage />
      <Images />
    </div>
  );
};

export default GalleryPage;
