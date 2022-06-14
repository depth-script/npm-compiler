#!/usr/bin/env node
"use strict";

const args = process.argv.slice(2);

const fs = require('fs');
const path = require('path');
let p: string;
if (RegExp("^C:/").test(args[0])) p = args[0];
else p = path.join(__dirname, '../', args[0]);
const filepath: string = p;
fs.readFile(filepath, "UTF8", (err, data) => {
    if (err) {
        console.log(`An error occurred`);
    }
    file = data;
})
let file: String;
console.log(file)
