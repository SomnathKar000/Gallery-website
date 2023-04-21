import { useContext, createContext, useReducer, useEffect } from "react";
import reducer from "../reducers/galleryReducer";
import axios from "axios";

const initialState = {
  alert: {
    open: false,
    msg: "Enter valid details",
    type: "info",
  },
  user: "",
  images: [],
  mode: "light",
  image_loading_status: false,
  image_loading_err: false,
  single_image_upload_status: false,
  single_image_upload_eror: false,
  searched_images: [],
};
const GalleryContext = createContext();

export const GalleryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const changeMode = () => {
    dispatch({ type: "CHANGE_MODE" });
  };
  const createUser = async (email, password, userName) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_HOST + "/api/v1/create-user",
        {
          email,
          password,
          userName,
        }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        return true;
      }
    } catch (err) {
      openAlert(err.response.data.msg, "error");
      console.log(err);
      return false;
    }
  };
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_HOST + "/api/v1/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        openAlert(response.data.msg, "success");
        return true;
      }
    } catch (err) {
      console.log(err);
      openAlert(err.response.data.msg, "error");
      return false;
    }
  };
  const getUser = async () => {
    let token = localStorage.getItem("token");
    try {
      if (token) {
        const response = await axios.post(
          process.env.REACT_APP_HOST + "/api/v1/get-user",
          {
            token,
            success: true,
          }
        );
        if (response.data.success) {
          dispatch({
            type: "UPDATE_USER_DATA",
            payload: response.data.user.username,
          });
        }
      }
    } catch (err) {
      openAlert(err.response.data.msg, "error");
      localStorage.removeItem("token");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT_ACTION" });
  };

  const uploadImage = async (data) => {
    dispatch({ type: "SINGLE_IMAGR_UPLOAD_START" });
    try {
      const response = await axios.post(
        process.env.REACT_APP_HOST + "/api/v1/images/create-image",
        data
      );
      if (response.data.success) {
        openAlert(response.data.msg, "success");
        dispatch({ type: "ADD_IMAGE", payload: response.data.NewImage });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      openAlert(err.response.data.msg, "error");
      console.log(err);
      dispatch({ type: "SINGLE_IMAGR_UPLOAD_ERROR" });
    }
  };

  const GetAllImages = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "IMAGE_LOADING_START" });
      const response = await axios.post(
        process.env.REACT_APP_HOST + "/api/v1/images",
        {
          token,
          success: true,
        }
      );
      if (response.data.success) {
        dispatch({ type: "FETCH_ALL_IMAGED", payload: response.data.images });
        console.log(response.data.images);
      } else {
        dispatch({ type: "IMAGE_LOADING_ERROR" });
      }
    }
  };
  const DeleteImage = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_HOST}/api/v1/images/delete-images/${id}`,
        {
          token,
          success: true,
        }
      );
      if (response.data.success) {
        dispatch({ type: "DELETE_IMAGE", payload: id });
        openAlert(response.data.msg, "success");
      }
    } catch (err) {
      openAlert(err.response.data.msg, "error");

      console.log(err);
    }
  };

  const EditImage = async (id, title) => {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${process.env.REACT_APP_HOST}/api/v1/images/updatae-image/${id}`,
      {
        token,
        title,
      }
    );
    if (response.data.success) {
      openAlert(response.data.msg, "success");
      dispatch({ type: "UPDATE_IMAGE", payload: { id, title } });
    } else {
      openAlert(response.data.msg, "error");
      console.log(response);
    }
  };

  const SearchImages = (name) => {
    dispatch({ type: "SEARCH_IMAGES", payload: name });
  };

  const openAlert = (msg, type) => {
    dispatch({ type: "OPEN_ALERT", payload: { msg, type } });
  };
  const handleCloseAlert = (event, reason) => {
    dispatch({ type: "CLOSE_ALERT" });

    if (reason === "clickaway") {
      return;
    }
  };

  useEffect(() => {
    getUser();
    GetAllImages();
  }, [localStorage.getItem("token")]);
  return (
    <GalleryContext.Provider
      value={{
        ...state,
        changeMode,
        createUser,
        loginUser,
        getUser,
        logOut,
        uploadImage,
        DeleteImage,
        openAlert,
        handleCloseAlert,
        EditImage,
        SearchImages,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallleryContext = () => {
  return useContext(GalleryContext);
};
