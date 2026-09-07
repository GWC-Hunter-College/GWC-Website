const measurementId = "G-JPC9PNCJ87";
const productionHostnames = ["girlswhocodehunter.org", "www.girlswhocodehunter.org"];

// gtag queues Arguments objects in Google's standard data layer format.
declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initializeGoogleAnalytics() {
  if (
    !import.meta.env.PROD ||
    import.meta.env.MODE === "test" ||
    typeof window === "undefined" ||
    !productionHostnames.includes(window.location.hostname) ||
    document.getElementById("google-analytics")
  ) {
    return;
  }

  const dataLayer = (window.dataLayer = window.dataLayer || []);
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params -- gtag expects Arguments objects, not arrays.
    dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.id = "google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}
