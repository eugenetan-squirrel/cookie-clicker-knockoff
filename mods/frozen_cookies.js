// Global Variables
var lastCompatibleVersion = 2.052;
if (Game.version > lastCompatibleVersion) {
    console.log(
        "WARNING: The Cookie Clicker version is newer than this version of Frozen Cookies."
    );
    console.log(
        "This version of Frozen Cookies has only been tested through Cookie Clicker version " +
            lastCompatibleVersion
    );
    console.log(
        "There may be incompatibilities, undesirable effects, bugs, shifts in reality, immoral behavior, and who knows what else."
    );
}

var baseUrl = "mods/frozen_cookies";
var FrozenCookies = {
    baseUrl: baseUrl,
    branch: "erb-",
    version: "2.052.8", // This should match the version in README.md and Steam info.txt
};

// Load external libraries and FC scripts in order
var script_list = [
    FrozenCookies.baseUrl + "/vendor/jquery-ui.min.js",
    FrozenCookies.baseUrl + "/vendor/jquery-ui.min.css",
    FrozenCookies.baseUrl + "/vendor/underscore-min.js",
    FrozenCookies.baseUrl + "/vendor/jcanvas.min.js",
    FrozenCookies.baseUrl + "/vendor/jquery.jqplot.min.js",
    FrozenCookies.baseUrl + "/vendor/jquery.jqplot.min.css",
    FrozenCookies.baseUrl + "/vendor/jqplot.canvasTextRenderer.min.js",
    FrozenCookies.baseUrl + "/vendor/jqplot.canvasAxisLabelRenderer.min.js",
    FrozenCookies.baseUrl + "/vendor/jqplot.canvasAxisTickRenderer.min.js",
    FrozenCookies.baseUrl + "/vendor/jqplot.trendline.min.js",
    FrozenCookies.baseUrl + "/vendor/jqplot.highlighter.min.js",
    FrozenCookies.baseUrl + "/vendor/jqplot.logAxisRenderer.min.js",
    FrozenCookies.baseUrl + "/vendor/jqplot.cursor.min.js",
    FrozenCookies.baseUrl + "/fc_preferences.js", // preferences must be loaded before the rest of the scripts
    FrozenCookies.baseUrl + "/cc_upgrade_prerequisites.js", // upgrade prerequisites, used in fc_main.js
    FrozenCookies.baseUrl + "/fc_main.js", // main logic
    FrozenCookies.baseUrl + "/fc_gods.js", // gods minigame and dragon options
    FrozenCookies.baseUrl + "/fc_spells.js", // spells minigame and autocasting
    FrozenCookies.baseUrl + "/fc_bank.js", // bank minigame
    FrozenCookies.baseUrl + "/fc_button.js", // button to open the Frozen Cookies menu
    FrozenCookies.baseUrl + "/fc_infobox.js", // infobox
];

FrozenCookies.loadInterval = setInterval(function () {
    if (Game && Game.ready) {
        clearInterval(FrozenCookies.loadInterval);
        FrozenCookies.loadInterval = 0;
        fcInit();
    }
}, 1000);

function loadScript(id) {
    if (id >= script_list.length) {
        registerMod("frozen_cookies"); // when the mod is registered, the save data is passed in the load function
    } else {
        var url = script_list[id];
        if (/\.js$/.exec(url)) {
            $.getScript(url, function () {
                loadScript(id + 1);
            });
        } else if (/\.css$/.exec(url)) {
            $("<link>")
                .attr({
                    rel: "stylesheet",
                    type: "text/css",
                    href: url,
                })
                .appendTo($("head"));
            loadScript(id + 1);
        } else {
            console.log("Error loading script: " + url);
            loadScript(id + 1);
        }
    }
}

function fcInit() {
    var jquery = document.createElement("script");
    jquery.setAttribute("type", "text/javascript");
    jquery.setAttribute("src", FrozenCookies.baseUrl + "/vendor/jquery-3.6.0.min.js");
    jquery.onload = function () {
        loadScript(0);
    };
    document.head.appendChild(jquery);
}
