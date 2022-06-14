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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var e_1, _a;
exports.__esModule = true;
var args = process.argv.slice(2);
var fs = require('fs');
var path = require('path');
var p;
var flags = {};
try {
    for (var _b = __values(args.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2), arg = _d[0], argval = _d[1];
        if (!argval.startsWith('-'))
            continue;
        if (argval.startsWith("--"))
            flags[argval.slice(2)] = args[Number(arg) + 1];
        else if (argval.startsWith('-'))
            flags[argval.slice(1)] = true;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
if (RegExp("^C:[/\\\\]").test(args[0]))
    p = args[0];
else if (args[0] === '')
    console.log("A file path must be provided!");
else
    p = path.join('./', args[0]);
var filepath = p;
var file, config;
function readfile(path) {
    return new Promise(function (resolve, reject) {
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
    return new Promise(function (resolve, reject) {
        try {
            fs.open(path, "a+", function (err, fd) {
                fs.write(fd, data, 0, data.length, "UTF8", function (err, writtenbytes) {
                    if (err) {
                        console.error("An error occurred while writing the file");
                        reject(err);
                    }
                    resolve(writtenbytes);
                });
            });
        }
        catch (e) { }
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, e_2, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, readfile(filepath)];
            case 1:
                file = _e.sent();
                _e.label = 2;
            case 2:
                _e.trys.push([2, 4, , 6]);
                _b = (_a = JSON).parse;
                return [4 /*yield*/, readfile("./.dscconfig.json")];
            case 3:
                config = _b.apply(_a, [_e.sent()]);
                return [3 /*break*/, 6];
            case 4:
                e_2 = _e.sent();
                _d = (_c = JSON).parse;
                return [4 /*yield*/, readfile(path.join("./", path.dirname(filepath), "/.dscconfig.json"))];
            case 5:
                config = _d.apply(_c, [_e.sent()]);
                return [3 /*break*/, 6];
            case 6:
                ;
                console.log(file);
                console.log(config);
                console.log(flags);
                return [2 /*return*/];
        }
    });
}); })();
