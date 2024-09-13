import { mountExtension } from "../utils/mount-extension";
import { waitParentElement } from "../utils/wait-parent-element";
import {
  exportElementInnerString,
  exportElementWrapperString,
  IFRAME_URL,
} from "../utils/const";
import { svg2png } from "../utils/svg2png";

import "../../dist/output.css";

console.log("Main script loaded");

// 创建下载按钮并监听消息
void waitParentElement().then((parentElement) => {
  mountExtension(parentElement);

  let exportButton;
  let svgData;

  exportButton = parentElement.querySelector("#export");
  if (exportButton) return; // 跳过，已有

  console.log("Download button creating");

  const _ = document.createElement("div");
  _.innerHTML = exportElementWrapperString;
  exportButton = _.firstChild;

  exportButton.disabled = true; // 初始状态为禁用
  exportButton.innerHTML = exportElementInnerString;

  // // enter - out
  // exportButton.onmouseenter = () => {
  //   console.log("-- onMouseEnter");
  //   exportButton.setAttribute("data-state", "delayed-open");
  //   document.body.insertAdjacentHTML("beforeend", triggerElementString);
  // };
  //
  // exportButton.onmouseout = () => {
  //   console.log("-- onMouseOut");
  //   exportButton.setAttribute("data-state", "closed");
  //   document.body.removeChild(document.body.lastChild);
  // };

  exportButton.addEventListener("click", () => {
    const fileName = document.querySelector(".fixed .sticky h3").textContent;
    svg2png(svgData.xml, `${fileName}.png`)
      .then((downloadId) =>
        console.log("File saved with download ID:", downloadId),
      )
      .catch((error) => console.error("Error:", error));
  });

  parentElement.insertAdjacentElement("afterbegin", exportButton);
  // const buttonContainer = document.createElement("div");
  // parentElement.insertAdjacentElement("afterbegin", buttonContainer);
  // ReactDOM.render(<Button />, buttonContainer);

  console.log("Download button created");

  // 监听来自 iframe 的消息
  window.addEventListener("message", (event) => {
    if (event.origin !== IFRAME_URL) return;

    switch (event.data.action) {
      // 当 svg 渲染好的时候就发回首页
      case "svg":
        if (!exportButton) return;

        exportButton.disabled = false;
        // exportButton.style.backgroundColor = '#4CAF50';
        console.log("Download button enabled");

        svgData = event.data.data;
        return;
    }
  });
});
