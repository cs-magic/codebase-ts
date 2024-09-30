const express = require("express");
const axios = require("axios");
const app = express();
const _ = require("lodash");

function capitalizeWords(str) {
  str = _.join(_.map(str.split("-"), _.capitalize), "-");
  str = str.replaceAll(/Cf/g, "CF");
  return str;
}

app.get("/api/subscribe", async (req, res) => {
  const target_url =
    "https://let.bnsubservdom.com/api/v1/client/subscribe?token=d0a451156361a39cfd8219490f1f65ce";

  try {
    const response = await axios.get(target_url);

    // 设置响应头
    for (const [key, value] of Object.entries(response.headers)) {
      res.setHeader(capitalizeWords(key), value);
    }

    // 设置内容类型和字符集
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Connection", "keep-alive");

    // 发送响应
    res.send(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
