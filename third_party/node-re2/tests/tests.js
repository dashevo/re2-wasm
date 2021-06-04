"use strict";


var unit = require("heya-unit");

var getRE2Class = require('../getRE2Class');

getRE2Class().then((RE2) => {
  global.RE2 = RE2;

  require("./test_general");
  require("./test_source");
  require("./test_exec");
  require("./test_test");
  require("./test_toString");
  require("./test_match");
  require("./test_replace");
  require("./test_search");
  require("./test_split");
  require("./test_invalid");
  require("./test_symbols");
  require("./test_prototype");
  require("./test_groups");

  unit.run();
});


