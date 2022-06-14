#!/usr/bin/env node
"use strict";

const args = process.argv.slice(2);

const fs = require('fs');
const path = require('path');
let p: string;
if (RegExp("^C:[/\\\\]").test(args[0])) p = args[0];
else if (args[0] === '') console.log("A file path must be provided!");
else p = path.join(__dirname, '../', args[0]);
const filepath: string = p;
let file: String;
let read = new Promise<void>((resolve) => {
    fs.readFile(filepath, "UTF8", function (err, data) {
        if (err) {
            console.log("An error occurred");
            console.log(err)
        }
        file = data;
        resolve();
    });
}).then(() => {
      console.log(file);
  });