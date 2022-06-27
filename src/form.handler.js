import SCANNING from "./config/scanning";
import ScanningService from "./services/scanning";
import { pattern } from "./config/regex";

export const onSubmit = ({ values, setHasResult, setIsLoading, setResult }) => {
  setIsLoading(true);
  const payloads = values?.payloads?.split("\n");
  const body = {
    target_url: values?.target_url,
    cookies: values?.cookies,
    payloads,
  };
  if (values.type === SCANNING.TYPE.DOM) {
    ScanningService.postDom(body)
      .then((res) => {
        setResult(res?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  if (values.type === SCANNING.TYPE.REFLECTED) {
    ScanningService.postReflected(body)
      .then((res) => {
        setResult(res?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  if (values.type === SCANNING.TYPE.STORED) {
    ScanningService.postStored(body)
      .then((res) => {
        setResult(res?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  setHasResult(true);
};

export const getArrayFromString = (params = "") => {
  const tmp = pattern.GET_ARRAY_IN_STRING;
  tmp.lastIndex = 0;
  return tmp.exec(params)?.[0];
};

export const getTimeFromString = (params = "") => {
  const tmp = pattern.GET_TIME;
  tmp.lastIndex = 0;
  return tmp.exec(params)?.[0];
};
