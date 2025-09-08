# CloudFront Google Tag Gateway

A CloudFront Function to route `/metrics/*` requests to [Google Tag Gateway for Advertisers](https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide) while preserving visitor geolocation information.

## Features

- Routes `/metrics/*` requests to Google Tag Gateway
- Automatically forwards visitor country and region information
- Uses CloudFront Functions 2.0 runtime for optimal performance
- Configurable Google Tag Gateway domain

## Setup

1. **Configure the domain**

   Edit `function.js` and replace the domain with your Google Tag Gateway endpoint:
   ```javascript
   const GOOGLE_TAG_GATEWAY_DOMAIN = 'YOUR-TAG-ID.fps.goog';
   ```

2. **Deploy to CloudFront**

   Create a CloudFront Function using the AWS Console, CLI, or Infrastructure as Code:

   ```bash
   aws cloudfront create-function \
     --name google-tag-gateway \
     --function-config Runtime=cloudfront-js-2.0 \
     --function-code fileb://function.js
   ```

3. **Associate with Distribution**

   Add the function to your CloudFront distribution's viewer-request event.

## How it Works

The function intercepts requests to `/metrics/*` paths and:

1. Extracts visitor country/region from CloudFront headers
2. Routes the request to your Google Tag Gateway domain
3. Adds `x-forwarded-country` and `x-forwarded-region` headers
4. Preserves all original query parameters and cookies

## Testing

Verify setup by navigating to: `https://yourdomain.com/metrics/healthy`

The page should display "ok" if configured correctly.

## License

MIT License - see LICENSE file for details.
