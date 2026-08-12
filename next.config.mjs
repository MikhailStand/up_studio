const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/vvis_studio",
        assetPrefix: "/vvis_studio/",
        trailingSlash: true,
      }
    : {}),
};
