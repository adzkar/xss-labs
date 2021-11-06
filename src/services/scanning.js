import baseService from "./baseServices";
import REST from "../config/rest";

function postReflected(body) {
  return baseService.post(REST.REFLECTED, body);
}

function postDom(body) {
  return baseService.post(REST.DOM, body);
}

function postStored(body) {
  return baseService.post(REST.STORED, body);
}

export default {
  postReflected,
  postDom,
  postStored,
};
