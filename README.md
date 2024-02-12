# Sample SaaS Metrics SDK

![SaaS Metrics](https://github.com/maxkostinevich/saas-metrics-sdk/assets/10295466/be98f2ca-c9dd-47e2-9841-2a1292d6bf69)

Proof of concept of simple saas metrics sdk implementation.

Contains Javascript SDK samples and server mockup written on javascript.

## Usage

First you need to import and init SDK as follows:

```
import Metrics from "./sdk/Metrics.js";

// Example usage:
const metrics = new Metrics({
  source: "<YOUR CLIENT ID>", // Your client id or email
  url: "<TRACKING_SERVER_URL>", // URL of the tracking server script, for example "https://your-tracking-service.com/api/event/track"
  apiKey: "", // Your API Key (hardcoded to "my_secret_token" in the example)
});
```

Then you can track events by calling methods defined in Metrics.js, for example:

```
metrics.withUTM({ utm_source: "twitter" }).wantedSignup();
metrics.signedUp();
metrics.withMeta({ plan: "Pro Yearly", price: 89.99 }).subscribed();
metrics
  .withMeta({ reason: "Do not need it anymore" })
  .cancelledSubscription()
  .accountClosed();
```

Please note: all SDK methods such as `wantedSignup()`, `signedUp()` and other are provided for example purposes only. Feel free to modify these for your own needs. You can keep all tracked events in Redis/Cloudflare KV/or any other database of your choice.

## Running examples

First you need to run server mockup by running `node server.js`;

Then you can run example script by running `node example.js`

---

2024 (c) [maxico.dev](https://maxico.dev/) - All rights reserved
