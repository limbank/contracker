const path = require('path');
const fs = require('fs-extra');
const Tail = require('always-tail');

const Lumberjack = require('./lumberjack.js');
const jack = new Lumberjack();

class fileWatcher {
    constructor(data) {
        this.sp = data.sp;

        this.setupTail(this.sp.settings);
        this.tail;
        this.logfile;

        jack.log("Setting up event...");
        this.sp.on("write", (data)=> {
            jack.log("Settings updated!!!!");

            this.setupTail(data);
        });
    }
    removeTail() {
        if (!this.tail) return;
        
        try {
            this.tail.unwatch();
            this.tail.removeAllListeners(["line", "error"])
            delete this.tail;
        }
        catch(e) {
            jack.log("Erorr clearing tail:", e);
        }
    }
    setupTail(newData) {
        if (!newData.logfile) return;
        let f = path.resolve(newData.logfile);

        if (this.logfile == f) return jack.log("Already watching this file...");
        
        this.removeTail();

        this.logfile = f;

        this.tail = new Tail(this.logfile);

        this.tail.on("line", this.processLine);
        this.tail.on("error", this.processError);

        this.tail.watch();
    }
    processLine(line) {
        jack.log("Line: ", line);
    }
    processError(error) {
        jack.log('ERROR: ', error);
    }
    
}

module.exports = fileWatcher;