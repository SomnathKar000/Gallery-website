const reducer = (state, action) => {
  if (action.type === "CHANGE_MODE") {
    let mode = "light";
    if (mode === state.mode) {
      mode = "dark";
    }

    return { ...state, mode };
  }
  if (action.type === "UPDATE_USER_DATA") {
    let user = action.payload;
    return { ...state, user };
  }
  if (action.type === "LOGOUT_ACTION") {
    let user = "";
    return { ...state, user };
  }
  if (action.type === "FETCH_ALL_IMAGED") {
    const images = action.payload;
    return {
      ...state,
      images,
      searched_images: images,
      image_loading_status: false,
      image_loading_err: false,
    };
  }
  if (action.type === "IMAGE_LOADING_START") {
    return { ...state, image_loading_status: true };
  }
  if (action.type === "IMAGE_LOADING_ERROR") {
    return { ...state, image_loading_status: false, image_loading_err: true };
  }
  if (action.type === "DELETE_IMAGE") {
    const id = action.payload;
    const images = state.images.filter(({ _id }) => id !== _id);
    return { ...state, searched_images: images, images };
  }
  if (action.type === "ADD_IMAGE") {
    const image = action.payload;
    const images = [image, ...state.images];
    return {
      ...state,
      images,
      searched_images: images,
      single_image_upload_status: false,
      single_image_upload_eror: false,
    };
  }
  if (action.type === "SINGLE_IMAGR_UPLOAD_START") {
    return {
      ...state,
      single_image_upload_status: true,
      single_image_upload_eror: false,
    };
  }
  if (action.type === "SINGLE_IMAGR_UPLOAD_ERROR") {
    return {
      ...state,
      single_image_upload_status: false,
      single_image_upload_eror: true,
    };
  }
  if (action.type === "OPEN_ALERT") {
    const { msg, type } = action.payload;
    const alert = {
      open: true,
      msg: msg,
      type: type,
    };

    return { ...state, alert };
  }
  if (action.type === "CLOSE_ALERT") {
    const alert = { ...state.alert, open: false };
    return { ...state, alert };
  }
  if (action.type === "UPDATE_IMAGE") {
    const { id, title } = action.payload;
    const images = state.images.map(({ _id, name, image }) => {
      if (_id === id) {
        name = title;
      }
      return { _id, name, image };
    });
    return { ...state, images, searched_images: images };
  }
  if (action.type === "SEARCH_IMAGES") {
    let name = action.payload;

    let tempImages = [...state.images];
    tempImages = tempImages.filter((item) =>
      item.name.toLowerCase().startsWith(name.toLowerCase())
    );
    console.log(tempImages);
    return { ...state, searched_images: tempImages };
  }

  return { ...state };
};

export default reducer;
