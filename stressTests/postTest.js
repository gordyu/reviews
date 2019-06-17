import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  vus: 1,
  duration: "10s"
};

var data = JSON.stringify({
	"id" : `${__VU}`,
	"imagePath" : "placeholder",
	"name" : "Ulises", "postDate" : 2019, "review" : "no tan impresionado", "accuracyRating" : 4.283, "communicationRating" : 4.428, "cleanlinessRating" : 3.173, "locationRating" : 2.087, "checkinRating" : 2.076, "valueRating" : 4.528 }

)

export default function() {
  let res = http.post("http://www.localhost:3003/reviews", data);
  check(res, {
    "success": (r) => r.status == 201
  });
};