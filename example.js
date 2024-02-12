import Metrics from "./sdk/Metrics.js";

// Example usage:
const metrics = new Metrics({
  source: "john.doe@example.com",
  url: "http://127.0.0.1:3000/api/event/track",
  apiKey: "my_secret_token",
});

metrics.withUTM({ utm_source: "twitter" }).wantedSignup();
metrics.signedUp();
metrics.withMeta({ plan: "Pro Yearly", price: 89.99 }).subscribed();
metrics
  .withMeta({ reason: "Do not need it anymore" })
  .cancelledSubscription()
  .accountClosed();

// Another example:
const metrics2 = new Metrics({
  source: "jane@example.com",
  url: "http://127.0.0.1:3000/api/event/track",
  apiKey: "my_secret_token",
});

metrics2.wantedSignup().signedUp();
metrics2.withMeta({ plan: "Pro Yearly", price: 89.99 }).subscribed();
metrics2
  .withMeta({ reason: "Failed to charge credit card" })
  .cancelledSubscription();
metrics2
  .withMeta({ notes: "Account closed due to inactivity" })
  .accountClosed();
