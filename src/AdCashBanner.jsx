

import React, { useEffect } from "react";

export default function AdCashBanner() {
  useEffect(() => {
    if (window.aclib?.runBanner) {
      window.aclib.runBanner({
            zoneId: '12314426',
        });
    } else {
      console.error("AdCash library is not ready.");
    }
  }, []);

  return React.createElement("div", {
    className: "adcash-banner",
  });
}
