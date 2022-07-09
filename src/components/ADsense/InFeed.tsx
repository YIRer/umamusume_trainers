import React from "react";
import { isDev } from "../../constants";

const InFeed = () => {
  if (isDev) {
    return null;
  }

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
