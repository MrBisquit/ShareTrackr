/**
 * ShareTrackr - V1.0.0
 * Author - MrBisquit
 * License - MIT
 * GitHub - https://github.com/mrbisquit/sharetrackr
 * NPM - https://npmjs.com/package/sharetrackr
 */

const express = require("express");
const Router = express.Router();

const functions = {
    analytics : require('./functions/analytics.js'),
    links : require('./functions/links.js'),
}

let config = {
    save : function(data) { console.error("REQUIRED Save function is missing.") },
    load : function() { console.error("REQUIRED Load function is missing.") }
};

let analytics = functions.analytics.fetchAnalyticData();

Router.use((req, res, next) => {
    next();
});

Router.get("/:id/", (req, res, next) => {
    if(functions.links.exists(req.params.id)) {
        var geoip = require('geoip-lite');

        var ip = req.ip;
        var geo = geoip.lookup(ip);

        var useragent = require('express-useragent');

        var source = req.headers['user-agent'];
        var ua = useragent.parse(source);

        functions.links.addView(req.params.id, geo.country, { mobile : ua.isMobile, desktop : ua.isDesktop, tablet : ua.isTablet, tv : ua.isSmartTV }, ua.os, ua.browser);

        return res.redirect(functions.links.getLink(req.params.id).link_data.redirect);
    }

    next();
});

class ShareTrackr {
    constructor(config) {
        if(typeof config.save == undefined) return console.error("REQUIRED Save function is missing.");
        if(typeof config.load == undefined) return console.error("REQUIRED Load function is missing.");

        this.config = {
            save : config.save,
            load : config.load,
        };
    }
}

module.exports = {
    mw : Router,
    ShareTrackr : ShareTrackr,
    config : config,
    links : functions.links,
    analytics : functions.analytics
}