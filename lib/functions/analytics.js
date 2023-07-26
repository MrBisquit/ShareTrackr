/**
 * ShareTrackr - V1.0.0
 * Author - MrBisquit
 * License - MIT
 * GitHub - https://github.com/mrbisquit/sharetrackr
 * NPM - https://npmjs.com/package/sharetrackr
 */

const main = require('../ShareTrackr.js');

const functions = {
    analytics : require('./functions/analytics.js'),
    links : require('./functions/links.js'),
}

let analytics = main.config.load().analytics;

class links {
    addView(id) {

    }
    fetchAnalyticData() {
        let data = main.config.load();
        return data.analytics;
    }
}

module.exports = {
    links : new links()
}