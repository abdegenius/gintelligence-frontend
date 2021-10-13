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

export async function DASHBOARD(callback, onError) {
  try {
    let dashboard = await fetch(`${BASE_URL}/user/dashboard`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
      }
    });
  dashboard = await dashboard.json();

  dashboard.status === "success" && callback && callback(dashboard);

    return dashboard;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}


export async function BALANCE(callback, onError) {
  try {
    let balance = await fetch(`${BASE_URL}/user/balance`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
      }
    });
  balance = await balance.json();
  balance.status === "success" && callback && callback(balance);
    return balance;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function EDIT_PROFILE(name, department, level, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/user/profile/edit`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
          name,
          department,
          level
        }),
      });
    user = await user.json();

    user.status === "success" && callback && callback(user);

    //if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}


export async function CONTACT(address, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/user/profile/contact`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
          address
        }),
      });
    user = await user.json();

    user.status === "success" && callback && callback(user);

    //if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}


export async function SECURITY(old_password, password, password_again, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/user/profile/security`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
          address
        }),
      });
    user = await user.json();

    user.status === "success" && callback && callback(user);

    //if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
