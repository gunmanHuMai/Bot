"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Logger = void 0;
var events_1 = require("events");
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger(format) {
        if (format === void 0) { format = 'yyyy/mm/dd HH:MM:ss.l'; }
        var _this = _super.call(this) || this;
        _this.logs = [];
        _this.format = format;
        _this.formatTokens = _this.parseFormatTokens();
        _this.setListener();
        return _this;
    }
    Logger.prototype.getFormatTime = function () {
        var now = new Date();
        var timeValues = {
            'yyyy': String(now.getFullYear()),
            'mm': String(now.getMonth() + 1).padStart(2, '0'),
            'dd': String(now.getDate()).padStart(2, '0'),
            'HH': String(now.getHours()).padStart(2, '0'),
            'hh': String(now.getHours() % 12 || 12).padStart(2, '0'),
            'MM': String(now.getMinutes()).padStart(2, '0'),
            'ss': String(now.getSeconds()).padStart(2, '0'),
            'l': String(now.getMilliseconds()).padStart(3, '0')
        };
        var formattedTime = this.format;
        this.formatTokens.forEach(function (token) {
            var value = timeValues[token] || '';
            formattedTime = formattedTime.replace(token, value);
        });
        if (this.formatTokens.includes('hh')) {
            var period = Number(timeValues['HH']) < 12 ? 'AM' : 'PM';
            formattedTime = formattedTime + " " + period;
        }
        return "[" + formattedTime + "]";
    };
    Logger.prototype.parseFormatTokens = function () {
        var timeTokenRegex = /(yyyy|mm|dd|HH|hh|MM|ss|l)/g;
        var matches = this.format.match(timeTokenRegex);
        return matches ? Array.from(new Set(matches)) : [];
    };
    Logger.prototype.addLog = function (message) {
        this.logs.push(message);
    };
    Logger.prototype.setListener = function () {
        var _this = this;
        Logger.on('api', function (message) {
            var msg = _this.getFormatTime() + " [api] " + message;
            _this.addLog(msg);
            console.log(msg);
        });
        this.on('error', function (message) {
            var msg = _this.getFormatTime() + " [error] " + message;
            _this.addLog(msg);
            console.log(msg);
        });
        this.on('lavashark', function (message) {
            var msg = _this.getFormatTime() + " [lavashark] " + message;
            _this.addLog(msg);
            console.log(msg);
        });
        this.on('localNode', function (message) {
            var msg = _this.getFormatTime() + " [localNode] " + message;
            _this.addLog(msg);
            console.log(msg);
        });
        this.on('log', function (message) {
            var msg = _this.getFormatTime() + " " + message;
            _this.addLog(msg);
            console.log(msg);
        });
        this.on('discord', function (message) {
            var msg = _this.getFormatTime() + " [discord] " + message;
            _this.addLog(msg);
            console.log(msg);
        });
    };
    return Logger;
}(events_1.EventEmitter));
exports.Logger = Logger;
