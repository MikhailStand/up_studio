const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/teststudio",
        assetPrefix: "/teststudio/",
        trailingSlash: true,
      }
    : {}),
};
