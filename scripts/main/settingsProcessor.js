const path = require('path');
const fs = require('fs-extra');

const Lumberjack = require('./lumberjack.js');
const jack = new Lumberjack();

class settingsProcessor {
    constructor(data) {
        this.home = data.home;
        this.filename = data.filename;
        this.file = path.join(this.home, this.filename);
        this.settings = {};
        this.events = [];

        fs.ensureFile(this.file, err => {
            this.readSettings(data.ready);
        });
    }
    readSettings(callback) {
        fs.readJson(this.file, (err, packageObj) => {
            let returnData = {};

            if (!err) {
                this.settings = packageObj;
                returnData = packageObj;

                this.runEvents("read", returnData);
            }

            if (callback && typeof callback == "function") callback(returnData);
        });
    }
    writeSettings(settings = {}, callback) {
        this.settings = settings;

        fs.writeJson(this.file, settings, err => {
            if (err) return console.error(err);

            this.runEvents("write", settings);

            if (callback && typeof callback == "function") callback();
        });
    }
    runEvents(name, data) {
        jack.log("Running events...");
        //run event on read settings
        let readEvents = this.events.filter(function (e) {
            return e.name == name;
        });

        jack.log("Found", readEvents.length, "events with the tag", name, "from the total of", this.events.length, "events");

        for(let i = 0; i < readEvents.length; i++) {
            readEvents[i].callback(data);
        }
    }
    on(eventName, eventCallback) {
        this.events.push({
            name: eventName,
            callback: eventCallback
        });
    }
    off() {

    }
}

module.exports = settingsProcessor;