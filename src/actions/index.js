import axios from "axios";
export const api = {
  BASE_URL: "https://gi.kidify.com.ng/api",
  FSI_KEY: "0KDc0NGPKaK9TJDW23qXKma6NzIKXfl81634140240"
};

export const connector = axios.create({
  baseURL: "https://gi.kidify.com.ng/api",
  timeout: 5000,
  transformResponse: axios.defaults.transformResponse.concat((data) => {
    return data;
  }),
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});

connector.interceptors.request.use(
  function (config) {
    let getTokenData = window.localStorage.getItem("token");
    let localToken = (getTokenData ? JSON.parse(getTokenData) : null);
    let token = (localToken == null ? null : localToken);
    config.headers = {
      ...config.headers,
    };
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


connector.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('token')
      window.location.assign('/login')
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);


