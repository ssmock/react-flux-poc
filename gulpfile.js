/// <vs BeforeBuild='build-clean-js' />
var gulp = require("gulp");
var gutil = require("gulp-util");
var runSequence = require("run-sequence");
var del = require("del");

// For "bare" tasks.  Basically, we just call webpack as a function.
var webpack = require("webpack");

// For common chunks, like vendor.
var commonsChunk = webpack.optimize.CommonsChunkPlugin;

function getWebpackConfig(options) {
    return {
        entry: {
            // Our "lib" entry point.  Also a common chunk; see plugins, below.
            //lib: ["underscore", "director", "whatwg-fetch", "react"],
            // Modules.
            main: "./src/core/main.js"
        },
        output: {
            path: __dirname + "/dist",
            publicPath: "dist/",
            filename: "[name].bundle.js"
        },
        //plugins: [
        //    new commonsChunk(
        //        "lib",
        //        "lib.js")
        //],
        resolve: {
            modulesDirectories: ["node_modules"] //, "src/core"]
        },
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    };
}

function getWebpackConfigForAutoUpdate() {
    var config = getWebpackConfig();

    config.watch = true;

    return config;
}

function getWebpackConfigForProduction() {
    var config = getWebpackConfig();

    config.plugins.push(new webpack.optimize.UglifyJsPlugin());

    return config;
}

function getWebpackCallback(caption, callback) {
    return function (err, stats) {
        if (err) throw new gutil.PluginError(caption, err);

        gutil.log(caption, stats.toString({
            // output options
        }));

        if (callback) callback();
    };
}

gulp.task("clean", function (callback) {
    del(["./dist/**/*"], callback);
});

// Non-minified build
gulp.task("build-js", function (callback) {
    webpack(
		getWebpackConfig(),
		getWebpackCallback("webpack", callback));
});

gulp.task("build-clean-js", function (callback) {
    runSequence("clean", "build-js", callback);
});

// Minified build
gulp.task("prod-build-js", function (callback) {
    webpack(
		getWebpackConfigForProduction(),
		getWebpackCallback("webpack (prod build)", callback));
});

gulp.task("prod-build-clean-js", function (callback) {
    runSequence("clean", "prod-build-js", callback);
});

// Non-minified build in watch mode
gulp.task("build-watch-js", function (callback) {
    webpack(
		getWebpackConfigForAutoUpdate(),
		getWebpackCallback("webpack"));
});