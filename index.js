/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

var spawn = require("cross-spawn");

function substitute(args) {
  var regexp = /\$([a-zA-Z_]+[a-zA-Z0-9_]+)/g;

  return args.map(function (arg) {
    return arg.replace(regexp, function (match) {
      return process.env[match.slice(1)];
    });
  });
}

var args = substitute(process.argv.slice(2));
var command = args.shift();
var proc = spawn.sync(command, args, { stdio: "inherit" });
process.exit(proc.status);
