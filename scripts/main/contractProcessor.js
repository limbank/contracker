const path = require('path');
const fs = require('fs-extra');
const Lumberjack = require('./lumberjack.js');
const jack = new Lumberjack();

class contractProcessor {
    constructor(data) {
        this.home = data.home;
        //this.filename = data.filename;

        this.dir = path.join(this.home, "contracts");
        this.files = [];
        this.processed = [];

        fs.ensureDir(this.dir, err => {
            this.readDirectory(data.ready);
        });
    }
    readDirectory(callback) {
        fs.readdir(this.dir, (err, files) => {
            this.files = files.filter(file => path.extname(file) === '.json');
            this.processed = [];

            this.getFiles(this.files, () => {
                if (callback && typeof callback == "function") callback(this.processed);
            });
        });
    }
    getFiles(files, callback) {
        fs.readJson(path.join(this.dir, files[0]), (err, packageObj) => {
            if (err) return jack.log(err);

            this.processed.push(packageObj);

            if (files.length > 1) {
                files.shift();
                this.getFiles(files, callback);
            }
            else {
                if (callback && typeof callback == "function") callback();
            }
        });
    }
}

module.exports = contractProcessor;