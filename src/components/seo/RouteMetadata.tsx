import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Only Home currently contains finished content. Keep the sitemap aligned when
// the placeholder pages become ready for indexing.
const RouteMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isHome = pathname === "/";
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    robots?.setAttribute("content", isHome ? "index, follow" : "noindex, follow");

    if (isHome) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = "https://girlswhocodehunter.org/";
    } else {
      // Placeholder and not-found pages must not advertise Home as their content.
      canonical?.remove();
    }
  }, [pathname]);

  return null;
};

export default RouteMetadata;
