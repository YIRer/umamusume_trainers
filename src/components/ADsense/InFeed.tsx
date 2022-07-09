import React, { useEffect } from "react";

const InFeed = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("AdvertiseError", err);
      }
    }
  }, []);

  return (
    <ins
    className="adsbygoogle"
    style={{
      display: "block",
    }}
    data-ad-format="fluid"
    data-ad-layout-key="-fb+5w+4e-db+86"
    data-ad-client="ca-pub-6261389729177556"
    data-ad-slot="9320024386"
  ></ins>
  );
};

export default InFeed;
