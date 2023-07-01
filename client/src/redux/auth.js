const init = {
  email: "",
  fullname: "",
  phone: "",
  address: "",
  avatar_url: "",
};

function userReducer(state = init, action) {
  //action adalah event yang terjadi
  if (action.type == "login") {
    return {
      ...state,
      id: action.payload.id,
      email: action.payload.email,
      fullname: action.payload.fullname,
      address: action.payload.address,
      avatar_url: action.payload.avatar_url,
      phone: action.payload.phone,
    };
  } else if (action.type == "logout") {
    return init;
  }
  // console.log(state);
  return state;
}

export default userReducer;
