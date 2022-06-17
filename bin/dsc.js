#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const args = process.argv.slice(2);
let data = {
    filepath: '',
    outputf: '',
    words: [],
    exps: []
};
const fs = require('fs');
const path = require('path');
let p = '';
let flags = {};
for (let [arg, argval] of args.entries()) {
    if (!argval.startsWith('-'))
        continue;
    if (argval.startsWith("--"))
        flags[argval.slice(2)] = args[Number(arg) + 1];
    else if (argval.startsWith('-'))
        flags[argval.slice(1)] = true;
}
if (new RegExp("^C:[/\\\\]").test(args[0]))
    p = args[0];
else if (args[0] === '')
    console.log("A file path must be provided!");
else
    p = path.join('./', args[0]);
data.filepath = p;
let file, config;
function readfile(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(path, "UTF8", function (err, data) {
                if (err) {
                    console.log("An error occurred while reading the file");
                    console.error(err);
                    reject(err);
                }
                resolve(data);
            });
        }
        catch (e) { }
    });
}
function writefile(path, data) {
    return new Promise((resolve, reject) => {
        try {
            fs.open(path, "a+", function (err, fd) {
                fs.write(fd, data, 0, function (err, writtenbytes) {
                    if (err) {
                        console.error("An error occurred while writing the file");
                        reject(err);
                    }
                    resolve(String(writtenbytes));
                });
            });
        }
        catch (e) { }
    });
}
const compile = {
    start: function () {
        return __awaiter(this, void 0, void 0, function* () {
            file = yield readfile(data.filepath);
            data.outputf = path.join("./", path.dirname(data.filepath), "/test.js");
            try {
                config = JSON.parse(yield readfile("./.dscconfig.json"));
            }
            catch (e) {
                config = JSON.parse(yield readfile(path.join("./", path.dirname(data.filepath), "/.dscconfig.json")));
            }
            ;
            console.log(file);
            console.log(config);
            console.log(flags);
            if (flags.target == "es2015" ||
                flags.target == "es6" ||
                config.target == "es2015" ||
                config.target == "es6")
                compile.es2015();
        });
    },
    es2015: function () {
        return __awaiter(this, void 0, void 0, function* () {
            data["words"] = file.split(new RegExp("\\s+"));
            if (flags.strict || config.usestrict)
                yield compile.usestrict();
            ;
            console.log(data);
        });
    },
    usestrict: function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield writefile(data.outputf, "\"use strict\";");
        });
    }
};
const softwareinfo = {
    version: "0.0.0a",
    creator: "DepthScript (ItsTheWhale, Canned-Seagull23)",
    showVersion: function () {
        console.log(softwareinfo.version);
    }
};
const showhelp = {
    showCommands: function () {
        console.log(`DepthScript Compiler (dsc) v0.0.0a

        -Main Commands-

          dsc
          Compiles any .ds files in the current directory
        
          dsc path_to_file
          Compiles the file specified by the path, and searches for any .dscconfig.json files
        
          dsc --init
          Creates a new .dscconfig.json in the current directory
        
        -Flags-

          -h
          Prints this help message

          --target
          Sets the target ECMAScript version for the compiler. Always overwrites .dscconfig.json
        
          --strict
          Uses strict mode when compiling. Always overwrites .dscconfig.json
    `);
    }
};
if (flags.v)
    softwareinfo.showVersion();
else if (flags.h)
    showhelp.showCommands();
else
    compile.start();
