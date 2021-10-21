import { SERVER_ROOT,  DEFAULT_HEADER } from "../urls";
// const User = require('../models/user')
const fetch = require("node-fetch");

export const PAYLOAD_TYPES = {
  REGISTER_USER: "REGISTER_USER",
  LOGIN_USER: "LOGIN_USER",
};

export const register = (new_user) => {

  return async (dispatch) => {

    const url = SERVER_ROOT + "/user/register"

    const request = {
      method: "post",
      body: JSON.stringify(new_user),
      headers:  DEFAULT_HEADER(),
    }

    const result = {}

    const response = await fetch(url, request);
    result.status = response.status;

    if (response.status === 200){
      const msg = await response.json()
      result.user = msg.user;
      dispatch({ type: PAYLOAD_TYPES.REGISTER_USER, payload: msg.user });
    }else{
      const msg = await response.text();
      result.error = msg;
    }

    return result;
  }
}

export const resendActivation = async (userId) => {

  const url = SERVER_ROOT + "/user/resend-activation"

  const request = {
    method: "post",
    body: JSON.stringify({userId: userId}),
    headers:  DEFAULT_HEADER(),
  }

  const result = {}

  const response = await fetch(url, request);

  result.status = response.status;
  const text = await response.text();
  result.text = text;

  return result;
}

export const login = (user) => {

  return async (dispatch) => {
    const url = SERVER_ROOT + "/user/login"

    const request = {
      method: "post",
      body: JSON.stringify(user),
      headers:  DEFAULT_HEADER(),
    }

    const result = {}

    const response = await fetch(url, request);
    result.status = response.status;

    if (response.status === 200 || response.status === 201){
      const msg = await response.json()
      result.user = msg.user;
      dispatch({ type: PAYLOAD_TYPES.LOGIN_USER, payload: msg.user });
    }else{
      const msg = await response.text();
      result.error = msg;
    }

    return result;

  }
}

export const resetPassword = async (email) => {

  const url = SERVER_ROOT + "/user/forgot-password"

  const request = {
    method: "post",
    body: JSON.stringify(email),
    headers:  DEFAULT_HEADER(),
  }

  const result = {}

  const response = await fetch(url, request);

  result.status = response.status;
  const text = await response.text();
  result.text = text;

  return result;
}

export const getUser = async (userId) => {
  const url = SERVER_ROOT + "/user/get-user/" + userId
  console.log("getting user", userId)
  const request = {
    method: "get",
    headers:  DEFAULT_HEADER(),
  }
  
  const result = {}

  const response = await fetch(url, request);
  result.status = response.status;
  if (response.status === 200){
    const msg = await response.json();
    result.user = msg;
  }else{
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}

export const getUsername = async (userId) => {
  const url = SERVER_ROOT + "/user/get-username/" + userId
  console.log("getting user", userId)
  const request = {
    method: "get",
    headers:  DEFAULT_HEADER(),
  }
  
  const result = {}

  const response = await fetch(url, request);
  result.status = response.status;
  if (response.status === 200){
    const msg = await response.json();
    result.user = msg;
  }else{
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}

export const getUserByName = async (username) => {
  const url = SERVER_ROOT + "/user/get-user-by-name/" + username

  const request = {
    method: "get",
    headers:  DEFAULT_HEADER(),
  }

  const result = {}

  const response = await fetch(url, request);
  result.status = response.status;

  if (response.status === 200){
    const msg = await response.json();
    result.user = msg;
  }else{
    const msg = await response.text();
    result.error = msg;
  }

  return result;
}

export const editData = async (userData) => {
        const response = await fetch(
            SERVER_ROOT + "/user/edit-prof",
            {
                method: "POST",
                headers:  DEFAULT_HEADER(),
                body: JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    status: userData.status,
                    bio: userData.bio,
                    password: userData.password,
                    description: userData.description,
                    profilePic: userData.profilePic
                }),
            }
        );


        const result = {}
        if (response.status === 200){
          const msg = await response.json();
          console.log(msg);
          result.user = msg.user;
          result.status = 200;
        }else{
          const msg = await response.text();
          console.log(msg);
          result.error = msg;
        }
        return result;
}
    

export const updateACS = async (userID, change) => {
  console.log("change is", change)
  const response = await fetch(
      SERVER_ROOT + "/profile/update-acs",
      {
          method: "POST",
          headers:  DEFAULT_HEADER(),
          body: JSON.stringify({
              userID: userID,
              change: change
          }),
      }
  );
  const result = {}
  if (response.status === 200){
    const msg = await response.json();
    console.log(msg);
    result.user = msg.user;
    result.status = 200;
  }else{
    const msg = await response.text();
    console.log(msg);
    result.error = msg;
  }
  return result;
}


