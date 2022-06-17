#!/usr/bin/env node
"use strict";

import { rejects } from "assert";
import { type } from "os";
import { allowedNodeEnvironmentFlags } from "process";

const args = process.argv.slice(2);
let data = {
    filepath: '',
    outputf: '',
    words: [],
    exps: []
}

const fs = require('fs');
const path = require('path');

let p: string = '';
interface flagtype {
    [key: string]: string | boolean;
}
let flags: flagtype = {};
for (let [arg, argval] of args.entries()) {
    if (!argval.startsWith('-')) continue;
    if (argval.startsWith("--")) flags[argval.slice(2)] = args[Number(arg) + 1];
    else if (argval.startsWith('-')) flags[argval.slice(1)] = true;
}
if ( new RegExp("^C:[/\\\\]").test(args[0])) p = args[0];
else if (args[0] === '') console.log("A file path must be provided!");
else p = path.join('./', args[0]);
data.filepath = p;
let file: any, config: any;
function readfile(path: string) {
    return new Promise<string>((resolve, reject) => {
        try {
            fs.readFile(path, "UTF8", function (err: any, data: any) {
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
            fs.open(path, "a+", function (err: any, fd: number) {
                fs.write(fd, data, 0, function (err: any, writtenbytes: number) {
                    if (err) {
                        console.error("An error occurred while writing the file");
                        reject(err);
                    }
                    resolve(String(writtenbytes));
                })
            });
        } catch (e) { }
    })
}
const compile = {
    start: async function () {
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
        if (flags.target == "es2015" || 
        flags.target == "es6" ||
        config.target == "es2015" ||
        config.target == "es6"
        ) compile.es2015();
    },
    es2015: async function () {
        data["words"] = file.split(new RegExp("\\s+")).forEach((element: string | any) => {
            element = element.split('{')
        });
        if (flags.strict || config.usestrict) await writefile(data.outputf, "\"use strict\";");
        console.log(data);
    }
};
const softwareinfo = {
    version: "0.0.0a",
    creator: "DepthScript (ItsTheWhale, Canned-Seagull23)",
    showVersion: function () {
        console.log(softwareinfo.version);
    }
}
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
}
if (flags.v) softwareinfo.showVersion();
else if (flags.h) showhelp.showCommands();
else compile.start();