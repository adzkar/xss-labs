import axios from "axios";

const createAxiosInterceptor = (url) => {
  const axiosCreate = axios.create({
    baseURL: url,
    headers: {
      Accept: "application/json",
      "Accept-Language": "es",
      "Content-Type": "application/json",
    },
  });

  axiosCreate.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      // if (error.response.status === 401) {
      //   setCookie('userData', '');
      //   window.location.replace('/');
      // }
      return Promise.reject(error);
    }
  );

  return axiosCreate;
};

const BaseService = createAxiosInterceptor(process.env.REACT_APP_REST_URL);

export default BaseService;
