import SCANNING from "./config/scanning";
import ScanningService from "./services/scanning";

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
    ScanningService.postReflected(body)
      .then((res) => {
        setResult(res?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  setHasResult(true);
};
