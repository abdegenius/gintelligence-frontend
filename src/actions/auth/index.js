import axios from "axios";
import { api } from "../index";

const BASE_URL = api.BASE_URL;

export async function LOG_USER_IN(phone, password, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        password,
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

export async function SIGN_USER_UP(email, name, phone, password, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          password,
          name,
          email
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
