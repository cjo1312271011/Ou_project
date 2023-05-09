import axios from "axios";

const ip = "http://localhost";
const port = 8080;

export const imgPrefix = `${ip}:${port}/images`;
export const sendEquip = (weightObj) => {
  const url = new URL(`${ip}:${port}/equip/gain`);
  return axios.post(url, weightObj);
};

export const genImgUrl = (name) => {
  return `${imgPrefix}/${name}`;
};

export const userLogin = (username, password) => {
  const obj = { username, password };
  const param = new URLSearchParams(obj).toString();
  const url = new URL(`${ip}:${port}/user/login`);
  url.search = new URLSearchParams(param);
  return axios.get(url);
};

export const userRegister = (username, password) => {
  const obj = { username, password };
  const param = new URLSearchParams(obj).toString();
  const url = new URL(`${ip}:${port}/user/registry`);
  url.search = param;
  return axios.get(url);
};

export const getCpuList = (page, pageSize) => {
  const url = `${ip}:${port}/manager/Cpu/findByPage`;
  return axios.get(url, { params: { page, pageSize } });

  // return new Promise((resolve) => {
  //   resolve({
  //     data: {
  //       data: {
  //         cpuList: [
  //           {
  //             cpuId: 1,
  //             cpuName: "cpu",
  //             cpuPrice: 1000,
  //             cpuTag: "50,80,50,50,50",
  //             cpuImage: "https://th.bing.com/th?id=OIP",
  //           },
  //         ],
  //       },
  //     },
  //   });
  // });
};

export const getFittingsList = () => {};

export const fuzzyQueryFittingsList = () => {};

export const addFittings = () => {};

export const updateFittings = () => {};

export const deleteFittings = () => {};
