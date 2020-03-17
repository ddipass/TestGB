'use strict';


function preScripts() {
    // set scripts
    var scripts = "";
    // calcculate
    scripts += "function calcTime(city, offset) {" +
                    "var d = new Date();" + 
                    "var utc = d.getTime() + ( d.getTimezoneOffset() * 60000 );" + 
                    "var nd = new Date( utc + (3600000 * offset));" + 
                    "var line = nd.toLocaleString().split(\",\");" + 
                    "var script = \"<h4 id=\\\"timer-line\\\">\" + \'#\' + city + \"</h4>\" + " + 
                                 "\"<h4 id=\\\"timer-line\\\">\" + line[0] + \"</h4>\" + " +
                                 "\"<h2 id=\\\"timer-line\\\">\" + line[1] + \"</h2>\";" +
                    "return  script;" + 
                "}"
    // refresh calculates
    scripts +=  "function reCalcTime(target, json) {" + 
                    "var script = \'\';" + 
                    "script += \"<div class=\\\"timer-background\\\">\";" +
                    "for (let line of json) {" + 
                        "script += \"<div class=\\\"timer-container\\\">\";" +
                        "script += calcTime(line.city, line.offset);" + 
                        "script += \"</div>\";" + 
                    "}" + 
                    "script += \"</div>\";" + 
                    "$(target).html(script);" + 
                    "var t = setTimeout(reCalcTime, 500, target, json);" + 
                "}"
    // render results
    return scripts
}

// gitbook functions
module.exports = {
    book: {
        assets: './assets'
    },
    website: {
        assets: "./assets",
        js:  [ ],
        css: [ 'dtimer-styles.css' ]
    },
    hooks: {
        init: function init() {
            // get input configs
            var _this$config$get = this.config.get('pluginsConfig.dtimer'),
                type = _this$config$get.tyep;
        },
        "page:before": function pageBefore(page) {
            // get all code texts 
            var flows = page.content.match(/^```dtimer((.*\n)+?)?```$/igm);
            // replace code blocks
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(flows[i], flows[i].replace(/^```dtimer/, '{% dtimer %}').replace(/```$/, '{% endtimer %}'));
                }
            }
            return page;
        },
        "page:after": function pageAfter(page) {
            console.log("Digital Timer After Paging!");
        },
        // This is called after the book generation
        "finish": function finish() {
            console.log("Digital Timer Loading Finish!");
        }
    },
    blocks: {
        dtimer: {
            process: function process(blk) {
                // get block switcher
                var data = '';
                var scripts = preScripts();
                // catch json from markdown
                try {
                    // get string in {% chart %}
                    var bodyString = blk.body.trim();
                    // this is pure JSON
                    // data = JSON.parse(bodyString);
                } catch (e) {
                    console.error(e);
                };
                // return
                scripts +=  "var json = " + bodyString + ";" + 
                            "reCalcTime(\".dtimer\", json);";
                return "<div class=\"dtimer\"></div>" + "<script>" + scripts + "</script>";
            }
        }
    }
};


