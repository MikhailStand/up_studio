const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/up_studio",
        assetPrefix: "/up_studio/",
        trailingSlash: true,
      }
    : {}),
};
