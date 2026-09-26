import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev-tools badge defaults to the bottom-left corner, which is exactly where the sidebar
  // keeps the signed-in user's avatar and sign-out button. Production is unaffected either way;
  // this just stops it covering them while developing.
  devIndicators: { position: "bottom-right" },
  // There is an unrelated package-lock.json further up this machine's home directory, and Next
  // picks the highest lockfile it can find as the workspace root. Left alone it traces files
  // from there, which is both slower and wrong.
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
