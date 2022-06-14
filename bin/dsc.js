#!/usr/bin/env node
"use strict";
var args = process.argv.slice(2);
var fs = require('fs');
var path = require('path');
var p;
if (RegExp("^C:/").test(args[0]))
    p = args[0];
else
    p = path.join(__dirname, '../', args[0]);
var filepath = p;
fs.readFile(filepath, "UTF8", function (err, data) {
    if (err) {
        console.log("An error occurred");
    }
    file = data;
});
var file;
console.log(file);
console.log(filepath)
