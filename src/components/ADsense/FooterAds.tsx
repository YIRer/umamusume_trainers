import React from "react";
import { isDev } from "../../constants";

const FooterADs = () => {
  if (isDev) {
    return null;
  }

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
