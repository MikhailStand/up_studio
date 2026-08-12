const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/vdohnovenie_v_puti",
        assetPrefix: "/vdohnovenie_v_puti/",
        trailingSlash: true,
      }
    : {}),
};
