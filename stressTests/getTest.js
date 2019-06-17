import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  vus: 10,
  duration: "10m"
};

// export default function() {
//   let res = http.get("http://www.localhost:3003/reviews/133445");

// };
export default function() {
  let res = http.get("http://localhost:3003/reviews");
  check(res, {
    "success": (r) => r.status == 200
  });
};