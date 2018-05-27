const withBundleAnalyzer = require(`@zeit/next-bundle-analyzer`);
const withCSS = require(`@zeit/next-css`);

module.exports = withCSS(withBundleAnalyzer({
    pageExtensions: [`jsx`, `js`],
    webpack: (config) => {
        config.resolve = {
            modules: [`./`, `node_modules`],
        };
        return config;
    },
    analyzeServer: [`server`, `both`].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: [`browser`, `both`].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: `static`,
            reportFilename: `../../bundles/server.html`,
        },
        browser: {
            analyzerMode: `static`,
            reportFilename: `../bundles/client.html`,
        },
    },
}));
