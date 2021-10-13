import { connector, api } from "../index";
import axios from "axios"
import { __serialize, __deserialize } from '../../helpers/index'
const BASE_URL = api.BASE_URL;
let localToken = __deserialize('token')
if(!localToken){
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('token')
  window.location.assign('/login')
}
let token = localToken

export async function MAIN(name, callback, onError) {
  try {
    let data = await fetch(`${BASE_URL}/command/${name}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
      }
    });
  data = await data.json();

  if(data.status == "error"){
    window.location.assign("/login")
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
  }

  data.status === "success" && callback && callback(data);
    return data;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}


export async function SEND(message, callback, onError) {
    try {
      let msg = await fetch(`${BASE_URL}/user/new/request`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          },
          body: JSON.stringify({
            message
          }),
        });
      msg = await msg.json();
      if(msg.status == "error"){
        window.location.assign("/login")
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("token")
      }
  
      msg.status === "success" && callback && callback(msg);
  
      //if (user.status === "error") throw user;
  
      return msg;
    } catch (err) {
      onError && onError(err);
      return false;
    }
  }
  

export async function MESSAGES(callback, onError) {
    try {
      let msg = await fetch(`${BASE_URL}/user/requests`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          },
        });
      msg = await msg.json();
      if(msg.status == "error"){
        window.location.assign("/login")
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("token")
      }
  
      msg.status === "success" && callback && callback(msg);
  
      //if (user.status === "error") throw user;
  
      return msg;
    } catch (err) {
      onError && onError(err);
      return false;
    }
  }
  