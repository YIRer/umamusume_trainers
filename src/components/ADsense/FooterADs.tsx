import React, { useEffect } from "react";

const FooterADs = () => {
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
    data-ad-format="autorelaxed"
    data-ad-client="ca-pub-6261389729177556"
    data-ad-slot="2124060646"
  ></ins>
  );
};

export default FooterADs;
