// Utility to get the correct path for assets
export const getAssetPath = (path) => {
  // Remove leading slash and let Next.js handle the basePath
  return path.startsWith('/') ? path.substring(1) : path;
};
