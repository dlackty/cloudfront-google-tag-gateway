import cf from "cloudfront";

// Configuration - Replace with your Google Tag Gateway domain
const GOOGLE_TAG_GATEWAY_DOMAIN = "G-12345.fps.goog";

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Check if request is for /metrics/* path
  if (uri.startsWith("/metrics/")) {
    var country = request.headers["cloudfront-viewer-country"]
      ? request.headers["cloudfront-viewer-country"].value
      : "US";
    var region = request.headers["cloudfront-viewer-country-region"]
      ? request.headers["cloudfront-viewer-country-region"].value
      : "CA";

    cf.updateRequestOrigin({
      domainName: GOOGLE_TAG_GATEWAY_DOMAIN,
      customOriginConfig: {
        port: 443,
        protocol: "https",
        sslProtocols: ["TLSv1.2"],
      },
      customHeaders: {
        "x-forwarded-country": country,
        "x-forwarded-region": region,
      },
    });
  }

  return request;
}
