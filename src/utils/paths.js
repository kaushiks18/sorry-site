// Utility to get the correct path for assets in GitHub Pages
export const getAssetPath = (path) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/sorry-site' : '';
  return `${basePath}${path}`;
};
