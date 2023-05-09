import axios from "axios";

const ip = "http://localhost";
const port = 8080;

const prefix = `${ip}:${port}`;

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

// export const getCpuList = (page, pageSize) => {
//   const url = `${ip}:${port}/manager/Cpu/findByPage`;
//   // return axios.get(url, { params: { page, pageSize } });

//   return new Promise((resolve) => {
//     resolve({
//       data: {
//         data: {
//           cpuList: [
//             {
//               cpuId: 1,
//               cpuName: "cpu",
//               cpuPrice: 1000,
//               cpuTag: "50,80,50,50,50",
//               cpuImage: "https://th.bing.com/th?id=OIP",
//             },
//           ],
//         },
//       },
//     });
//   });
// };

const firstUpper = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getFittingsList = (type, data) => {
  const formatType = firstUpper(type);
  const url = `${prefix}/manage/${formatType}/findByPage`;
  return axios.post(url, data);
};

export const fuzzyQueryFittingsList = (type, data) => {
  const formatType = firstUpper(type);

  const url = `${prefix}/manage/${formatType}/findlike`;
  return axios.post(url, data);
};

export const addFittings = (type, data) => {
  const formatType = firstUpper(type);

  const url = `${prefix}/manage/${formatType}/add`;

  return axios.post(url, data);
};

export const updateFittings = (type, data) => {
  const formatType = firstUpper(type);
  const url = `${prefix}/manage/${formatType}/update`;

  return axios.post(url, data);
};

export const deleteFittings = (type, data) => {
  const formatType = firstUpper(type);
  const url = `${prefix}/manager/${formatType}/delete`;
  return axios.post(url, data);
};

export const getUserData = (data) => {
  const url = `${prefix}/user/findByPage`;
  return axios.post(url, data);
};

export const fuzzyQueryUser = (data) => {
  const url = `${prefix}/user/findlike`;
  return axios.post(url, data);
};

export const deleteUser = (data) => {
  const url = `${prefix}/user/delete`;
  return axios.post(url, data);
};

export const updateUser = (data) => {
  const url = `${prefix}/user/upload`;
  return axios.post(url, data);
};
