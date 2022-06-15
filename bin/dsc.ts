#!/usr/bin/env node
"use strict";

import { rejects } from "assert";
import { type } from "os";
import { allowedNodeEnvironmentFlags } from "process";

const args = process.argv.slice(2);
let data = {
    filepath: '',
    outputf: ''
}

const fs = require('fs');
const path = require('path');

let p: string;
interface flagtype {
    [key: string]: string | boolean;
}
let flags: flagtype = {};
for (let [arg, argval] of args.entries()) {
    if (!argval.startsWith('-')) continue;
    if (argval.startsWith("--")) flags[argval.slice(2)] = args[Number(arg) + 1];
    else if (argval.startsWith('-')) flags[argval.slice(1)] = true;
}
if (RegExp("^C:[/\\\\]").test(args[0])) p = args[0];
else if (args[0] === '') console.log("A file path must be provided!");
else p = path.join('./', args[0]);
data.filepath = p;
let file: any, config: any;
function readfile(path: string) {
    return new Promise<string>((resolve, reject) => {
        try {
            fs.readFile(path, "UTF8", function (err, data) {
                if (err) {
                    console.log("An error occurred while reading the file");
                    console.error(err)
                    reject(err);
                }
                resolve(data);
            });
        } catch (e) { }
    })
}
function writefile(path: string, data: string) {
    return new Promise<string>((resolve, reject) => {
        try {
            fs.open(path, "a+", function (err, fd) {
                fs.write(fd, data, 0, function (err, writtenbytes) {
                    if (err) {
                        console.error("An error occurred while writing the file");
                        reject(err);
                    }
                    resolve(writtenbytes);
                })
            });
        } catch (e) { }
    })
}
(async () => {
    file = await readfile(data.filepath);
    data.outputf = path.join("./", path.dirname(data.filepath), "/test.js");
    try {
        config = JSON.parse(await readfile("./.dscconfig.json"));
    } catch (e) {
        config = JSON.parse(await readfile(path.join("./", path.dirname(data.filepath), "/.dscconfig.json")));
    };
    console.log(file);
    console.log(config);
    console.log(flags);
    if (flags["target"] === "es2015" || 
    flags["target"] === "es6" ||
    config["target"] === "es2015" ||
    config["target"] === "es6"
    ) compile.es2015();
})();
const compile = {
    es2015: async function () {
        data["exps"] = file.split(';');
        if (flags["strict"] || 
        flags["strict"] ||
        config["usestrict"] ||
        config["usestrict"]
        ) await writefile(data.outputf, "\"use strict\";");
        console.log(data);
    }
}