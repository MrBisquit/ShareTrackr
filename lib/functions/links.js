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

let db_links = main.config.load().links;

class links {
    exists(id) {
        db_links = main.config.load().links;
        return typeof db_links[i] == undefined;
    }
    addView(id, country, device, os, browser) {
        if(!this.exists(id)) return;

        db_links = main.config.load().links;
        let link = db_links[id];

        if(typeof link.analyics.views_location.countries[country] == undefined) {
            link.analyics.views_location.countries[country] = 1;
        } else {
            link.analyics.views_location.countries[country] += 1;
        }

        if(typeof link.analyics.views_location.devices[device] == undefined) {
            link.analyics.views_location.devices[device] = 1;
        } else {
            link.analyics.views_location.devices[device] += 1;
        }

        if(typeof link.analyics.views_location.oss[os] == undefined) {
            link.analyics.views_location.oss[os] = 1;
        } else {
            link.analyics.views_location.oss[os] += 1;
        }

        if(typeof link.analyics.views_location.browsers[browser] == undefined) {
            link.analyics.views_location.browsers[browser] = 1;
        } else {
            link.analyics.views_location.browsers[browser] += 1;
        }

        db_links[id] = link;
        main.config.save();
        db_links = main.config.load().links;
    }

    addNew(data) {
        let linkdata = {
            link_id : (Math.random() + 1).toString(36).substring(7), // https://stackoverflow.com/a/8084248/16426057
            analytics : {
                views : 0,
                views_location : {
                    countries : {},
                    devices : {},
                    oss : {},
                    browsers : {},
                }
            },
            link_data : data
        }

        db_links[linkdata.link_id] = linkdata;
        main.config.save();
        db_links = main.config.load().links;

        return { link_id : linkdata.link_id };
    }

    getLink(id) {
        if(!this.exists(id)) return { };

        db_links = main.config.load().links;
        let link = db_links[id];

        return link;
    }
}

module.exports = new links();