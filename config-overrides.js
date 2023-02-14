module.exports = function override(config, env) {
    config.resolve.fallback = {
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        timers: require.resolve("timers-browserify"),
        url: require.resolve("url"),
        zlib: require.resolve("browserify-zlib"),
    };
    return config;
};
