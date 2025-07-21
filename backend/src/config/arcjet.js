import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ENV } from "./env.js";

export const aj = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
   
    shield({ mode: "LIVE" }),

    
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
       
      ],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 10, 
      interval: 10,
      capacity: 15, 
    }),
  ],
});
{/* الهدف من الكود:
حماية التطبيق من:

الهجمات الإلكترونية.

البوتات الغير موثوقة.

المستخدمين الذين يرسلون عددًا كبيرًا من الطلبات (spam أو هجمات DDoS).

 */}
