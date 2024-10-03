import log from "@/lib/log";
import _ from "lodash";

const data = [
  { a: 1, k: false },
  { a: 2, k: true },
  { a: 0, k: true },
];

const data_ = _(data)
  .sortBy((g) => {
    console.log(g);
    return [-g.k, g.a];
  })
  .value();

log.info({ data, data_ });
