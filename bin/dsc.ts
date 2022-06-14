#!/usr/bin/env node
"use strict";

import { rejects } from "assert";
import { type } from "os";
import { allowedNodeEnvironmentFlags } from "process";

const args = process.argv.slice(2);

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
// for (let arg in args) {
//     let argval = args[arg];
//     if (!argval.startsWith('-')) continue;
//     if (argval.startsWith("--")) flags[argval.slice(2)] = args[Number(arg) + 1];
//     else if (argval.startsWith('-')) flags[argval.slice(1)] = true;
// }
if (RegExp("^C:[/\\\\]").test(args[0])) p = args[0];
else if (args[0] === '') console.log("A file path must be provided!");
else p = path.join('./', args[0]);
const filepath: string = p;
let file: any, config: any;
function readfile(path: string) {
    return new Promise<string>((resolve, reject) => {
        try {
            fs.readFile(path, "UTF8", function (err, data) {
                if (err) {
                    console.log("An error occurred");
                    console.error(err)
                    reject(err);
                }
                resolve(data);
            });
        } catch (e) { }
    })
}
(async () => {
    file = await readfile(filepath);
    try {
        config = JSON.parse(await readfile("./.dscconfig.json"));
    } catch (e) {
        config = JSON.parse(await readfile(path.join("./", path.dirname(filepath), "/.dscconfig.json")));
    };
    console.log(file);
    console.log(config);
    console.log(flags)
})();