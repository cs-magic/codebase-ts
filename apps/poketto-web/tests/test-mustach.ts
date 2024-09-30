import Mustache from "mustache";

const s1 =
  "#Sleepy\n\nAre you feeling tired, {{userName}}? It's important to take breaks and rest when you need it. If there's anything specific you need" +
  " assistance with, just let me know when you're awake and ready.";

const s2 = "#Sleepy\n\nAre you feeling tired, {{userNa";

const d = { userName: "markshawn" };

const out = Mustache.render(s1, d);
console.log({ s1, d, out });

const out2 = Mustache.render(s2, d);
console.log({ s2, d, out2 });
