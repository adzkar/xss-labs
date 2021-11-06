import SCANNING from "./config/scanning";
import ScanningService from "./services/scanning";

export const onSubmit = ({ values, setHasResult, setIsLoading, setResult }) => {
  setIsLoading(true);
  const payloads = values?.payloads?.split("\n")?.join(";");
  const body = {
    target_url: values?.target_url,
    cookies: values?.cookies,
    payloads,
  };
  if (values.type === SCANNING.TYPE.DOM) {
    console.log("here");
    ScanningService.postDom(body)
      .then((res) => {
        setResult(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  if (values.type === SCANNING.TYPE.REFLECTED) {
    ScanningService.postReflected(body)
      .then((res) => {
        setResult(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  if (values.type === SCANNING.TYPE.STORED) {
    ScanningService.postReflected(body)
      .then((res) => {
        setResult(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  setHasResult(true);
};
