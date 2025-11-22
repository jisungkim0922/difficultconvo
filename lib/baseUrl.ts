import { headers } from "next/headers";
export function getBaseUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) return url.replace(/\/+$/,'');
  const proto = headers().get("x-forwarded-proto") ?? "http";
  const host  = headers().get("x-forwarded-host") ?? headers().get("host")!;
  return `${proto}://${host}`;
}
