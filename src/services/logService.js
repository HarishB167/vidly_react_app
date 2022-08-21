import Raven from "raven-js";

function init() {
  Raven.config(
    "https://b34234b0744d4f489b4bafb85e1ff26b@o524432.ingest.sentry.io/6196240",
    {
      release: "1-0-0",
      environment: "development-test",
    }
  ).install();
}

function log(error) {
  Raven.captureException(error);
}

export default { init, log };
