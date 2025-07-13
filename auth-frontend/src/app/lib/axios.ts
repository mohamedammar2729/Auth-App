import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.LOCAL_BACKEND_URL
    : process.env.PROD_BACKEND_URL;
// we are using http only cookies, so we used withCredentials to true
// then all the cookies will be sent with the request to the backend with credentials
axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // config.baseURL is containing the base URL of the backend
    // config.url is the endpoint we are hitting
    console.log(
      'Sending request to backend: ',
      config.baseURL! + config.url,
      'RequestData:',
      JSON.stringify(config.data)
      // config.data is the data we are sending in the request
    );

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    console.log(
      'Sending request to backend: ',
      response.config.baseURL + response.config.url!,
      'ResponseData:',
      JSON.stringify(response.data)
    );
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
