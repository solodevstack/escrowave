import { assertValue } from "./utils";

const siteUrl = assertValue(
  process.env.NEXT_PUBLIC_SITE_URL,
  "Missing environment variable: NEXT_PUBLIC_SITE_URL"
);

const enokiApiKey = assertValue(
  process.env.NEXT_PUBLIC_ENOKI_API_KEY,
  "Missing environment variable: NEXT_PUBLIC_ENOKI_API_KEY"
);

const googleClientId = assertValue(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  "Missing environment variable: NEXT_PUBLIC_GOOGLE_CLIENT_ID"
);

export { siteUrl, enokiApiKey, googleClientId };
