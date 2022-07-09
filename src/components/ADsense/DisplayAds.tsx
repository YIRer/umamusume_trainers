import React, { useEffect } from "react";
import { isDev } from "../../constants";

const InFeed = () => {
  useEffect(() => {
    if (!isDev) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("AdvertiseError", err);
        }
      }
    }
  }, []);

  if (isDev) {
    return null;
  }

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "block",
      }}
      data-ad-client="ca-pub-6261389729177556"
      data-ad-slot="5549403982"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default InFeed;
