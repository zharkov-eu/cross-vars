/*
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * @author Evgeni Zharkov <zharkov.ev.u@yandex.ru>
 */

"use strict";

var spawn = require("cross-spawn");

function substitute(args) {
  var regexp = /^\$(.+)|^%(.+)%$/;

  return args.map((arg) => {
    var match = arg.match(regexp);
    return match ? process.env[match[1] || match[2]] : arg;
  });
}

var args = substitute(process.argv.slice(2));
var command = args.shift();
var proc = spawn.sync(command, args, { stdio: "inherit" });
process.exit(proc.status);