import axios from "axios";

const ip = "http://localhost";
const port = 8080;

export const imgPrefix = `${ip}:${port}/images`
export const sendEquip = (price, tag, weightObj) => {
  const param = new URLSearchParams({ price, tag }).toString();
  const url = new URL(`${ip}:${port}/equip/gain`);
  url.search = new URLSearchParams(param);
  return axios.post(url, weightObj);
};

export const getRecommendList = () => {
  const url = `${ip}:8080/index`;
  return axios.get(url);
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
