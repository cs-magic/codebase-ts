console.log("IFrame script loaded");
import { config } from "../config";

// 监视DOM变化
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // if (mutation.type !== 'childList') return

    const svgs = document.querySelectorAll("svg");
    svgs.forEach((svg) => {
      const { width, height } = svg.getBBox();
      console.log("Found SVG with dimensions:", width, "x", height);
      if (width < config.svgOutputMinWidth) return;
      try {
        console.log("-- sending svgFound");
        window.parent.postMessage(
          {
            action: "svg",
            data: {
              xml: new XMLSerializer().serializeToString(svg),
              width,
              height,
            },
          },
          "*",
        );
        console.log("-- sending svgFound ok");
        // 需要持续观察，因为可能一直变
        // observer.disconnect(); // 停止观察,避免重复发送消息
      } catch (e) {
        console.log("-- sending svgFound error");
        console.error(e);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
