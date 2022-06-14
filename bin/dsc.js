#!/usr/bin/env node
"use strict";
var args = process.argv.slice(2);
var fs = require('fs');
var path = require('path');
var p;
if (RegExp("^C:[/\\\\]").test(args[0]))
    p = args[0];
else if (args[0] === '')
    console.log("A file path must be provided!");
else
    p = path.join(__dirname, '../', args[0]);
var filepath = p;
var file;
var read = new Promise(function (resolve) {
    fs.readFile(filepath, "UTF8", function (err, data) {
        if (err) {
            console.log("An error occurred");
            console.log(err);
        }
        file = data;
        resolve();
    });
}).then(function () {
    console.log(file);
});
