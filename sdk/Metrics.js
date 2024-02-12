class Metrics {
  config = { source: "", url: "", apiKey: "" };
  meta = {};
  constructor({ source = "", url = "", apiKey = "" }) {
    this.config.url = url;
    this.config.apiKey = apiKey; // Set your API key here
    this.config.source = source;
    if (!this.config.url) {
      console.error("Metrics URL is not defined");
      throw new Error("Metrics URL is not defined");
    }
    if (!this.config.source) {
      console.error("Metrics Source is not defined");
      throw new Error("Metrics Source is not defined");
    }
  }

  trackEvent(event) {
    this.withUTM();
    try {
      fetch(this.config.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          source: this.config.source,
          event: event,
          meta: this.meta,
        }),
      }).catch((error) => {
        console.error(error);
        throw new Error("Oops! Something went wrong!");
      });
    } catch (error) {
      console.error(error.message);
    }
    this.meta = {};
    return this;
  }

  withUTM(request = {}) {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      for (const [key, value] of queryParams) {
        if (key.startsWith("utm_")) {
          request[key] = value;
        }
      }
    }
    this.meta = { ...this.meta, ...request };
    return this;
  }

  withMeta(meta = {}) {
    this.meta = { ...this.meta, ...meta };
    return this;
  }

  wantedSignup() {
    return this.trackEvent("wanted_signup");
  }

  signedUp() {
    return this.trackEvent("signedup");
  }

  wantedSubscribe() {
    return this.trackEvent("wanted_subscribe");
  }

  subscribed() {
    return this.trackEvent("subscribed");
  }

  cancelledSubscription() {
    return this.trackEvent("cancelled_subscription");
  }

  accountClosed() {
    return this.trackEvent("account_closed");
  }
}

export default Metrics;
