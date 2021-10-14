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

  if(dashboard.status == "error"){
    window.location.assign("/login")
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
  }

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
  if(balance.status == "error"){
    window.location.assign("/login")
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
  }
  balance.status === "success" && callback && callback(balance);
    return balance;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function EDIT_PROFILE(name, department, level, email, callback, onError) {
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
          level,
          email
        }),
      });
    user = await user.json();
    if(user.status == "error"){
      window.location.assign("/login")
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
    }

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
    if(user.status == "error"){
      window.location.assign("/login")
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
    }

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
    if(user.status == "error"){
      window.location.assign("/login")
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
    }

    user.status === "success" && callback && callback(user);

    //if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}


export async function VIRTUAL_ACCOUNT(callback, onError) {
  try {
    let virtual_account = await fetch(`${BASE_URL}/user/virtual/account`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
      }
    });
  virtual_account = await virtual_account.json();
  if(virtual_account.status == "error"){
    window.location.assign("/login")
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
  }
  virtual_account.status === "success" && callback && callback(virtual_account);
    return virtual_account;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function TOPUP(amount, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/user/topup/paystack`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
          amount
        }),
      });
    user = await user.json();
    if(user.status == "error"){
      window.location.assign("/login")
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
    }

    user.status === "success" && callback && callback(user);

    //if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}


export async function LOAD(ticket_number, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/user/load/ticket`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
          ticket_number
        }),
      });
    user = await user.json();
    if(user.status == "error"){
      window.location.assign("/login")
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
    }

    user.status === "success" && callback && callback(user);

    //if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}


export async function GENERATE(amount, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/user/generate/ticket`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
          amount
        }),
      });
    user = await user.json();
    if(user.status == "error"){
      window.location.assign("/login")
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
    }

    user.status === "success" && callback && callback(user);

    //if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function HISTORY(callback, onError) {
  try {
    let history = await fetch(`${BASE_URL}/user/topup/history`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
      }
    });
  history = await history.json();
  if(history.status == "error"){
    window.location.assign("/login")
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
  }
  history.status === "success" && callback && callback(history);
    return history;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}


export async function TICKETS(callback, onError) {
  try {
    let tickets = await fetch(`${BASE_URL}/user/tickets`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
      }
    });
  tickets = await tickets.json();
  if(tickets.status == "error"){
    window.location.assign("/login")
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
  }
  tickets.status === "success" && callback && callback(tickets);
    return tickets;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}



export async function SAVE_VIRTUAL_ACCOUNT(bvn, bank_name, bank_code, account_name, account_number, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/user/save/vaccount`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
          bvn,
          bank_code,
          bank_name,
          account_name,
          account_number
        }),
      });
    user = await user.json();
    if(user.status == "error"){
      window.location.assign("/login")
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
    }

    user.status === "success" && callback && callback(user);

    //if (user.status === "error") throw user;

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
