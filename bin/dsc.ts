#!/usr/bin/env node
"use strict";

import { rejects } from "assert";
import { allowedNodeEnvironmentFlags } from "process";

const args = process.argv.slice(2);

const fs = require('fs');
const path = require('path');
let p: string;
if (RegExp("^C:[/\\\\]").test(args[0])) p = args[0];
else if (args[0] === '') console.log("A file path must be provided!");
else p = path.join(__dirname, '../', args[0]);
const filepath: string = p;
let file: any;
function readfile() {
    return new Promise<String>((resolve, reject) => {
        fs.readFile(filepath, "UTF8", function (err, data) {
            if (err) {
                console.log("An error occurred");
                console.error(err)
                reject(err);
            }
            resolve(data);
        });
    })
}
(async () => {
    file = await readfile();
    console.log(file)
})();