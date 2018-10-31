module.exports = function(config) {
    config.set({
        frameworks: ["mocha", "chai"],
        files: [
            {
                pattern: "test/**/*.js",
                watched: true
            }
        ],
        preprocessors: {
            "test/**/*.js": ["rollup"]
        },
        rollupPreprocessor: {
            plugins: [
                require("rollup-plugin-node-resolve")(),
                require("rollup-plugin-babel")({
                    plugins: [
                        [
                            "@babel/plugin-proposal-object-rest-spread",
                            { loose: true, useBuiltIns: true }
                        ],
                        [
                            "@babel/plugin-transform-react-jsx",
                            {
                                pragma: "h"
                            }
                        ]
                    ]
                })
            ],
            output: {
                format: "iife", // Helps prevent naming collisions.
                name: "test", // Required for 'iife' format.
                sourcemap: "inline" // Sensible for testing.
            }
        },
        reporters: ["progress"],
        port: 9876, // karma web server port
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ["ChromeHeadless"],
        autoWatch: false,
        // singleRun: false, // Karma captures browsers, runs the tests and exits
        concurrency: Infinity
    });
};
