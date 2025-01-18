import { getCLS, getFID, getLCP, getFCP, getTTFB } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getFCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
