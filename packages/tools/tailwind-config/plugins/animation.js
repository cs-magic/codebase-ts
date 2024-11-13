// plugins/animation.js - 自定义动画插件
const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    ".animate-fade-in": {
      animation: "fade-in 0.3s ease-in-out",
    },
    ".animate-slide-in": {
      animation: "slide-in 0.3s ease-out",
    },
    // 添加更多自定义动画...
  });
});
