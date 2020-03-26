'use strict';

// auto container indexing
var _ctnCounter = 0;

// auto container naming
function ctn() {
    return "dtable-".concat(++_ctnCounter);
}

// gitbook functions
module.exports = {
    book: {
        assets: './assets'
    },
    website: {
        assets: "./assets",
        js:  [ 'dtable.js' ],
        css: [ 'dtable-styles.css' ]
    },
    hooks: {
        init: function init() {
            // get input configs
            var _this$config$get = this.config.get('pluginsConfig.dtable'),
                type = _this$config$get.tyep;
        },
        "page:before": function pageBefore(page) {
            // get all code texts 
            var flows = page.content.match(/^```dtable((.*\n)+?)?```$/igm);
            // replace code blocks
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(flows[i], flows[i].replace(/^```dtable/, '{% dtable %}').replace(/```$/, '{% enddtable %}'));
                }
            }
            return page;
        },
        "page:after": function pageAfter(page) {
            console.log("Digital Table After Paging!");
        },
        // This is called after the book generation
        "finish": function finish() {
            console.log("Digital Table Loading Finish!");
        }
    },
    blocks: {
        dtable: {
            process: function process(blk) {
                // get block switcher
                var json = '';
                var scripts = '';
                // auto indexing container
                var id = ctn();
                // catch json from markdown
                try {
                    // get string in {% chart %}
                    var bodyString = blk.body.trim();
                    // this is pure JSON
                    json = JSON.parse(bodyString);
                } catch (e) {
                    console.error(e);
                };
                // return
                //genTable("#dtable-02", json, 'Orign');
                //urlTable("#dtable-03", "http://localhost:8080/return/table.json", 'Orign');
                scripts  = "$(document).ready(function() {";
                if (json.type == 'url') {
                    scripts += "urlTable(\"#" + id + "\", \"" + json.data + "\", " + JSON.stringify(json.option) + ");";
                } else {
                    scripts += "var json = " + JSON.stringify(json.data) + ";" + 
                               "genTable(\"#" + id + "\", json, " + JSON.stringify(json.option) + ");";
                }
                scripts += "});"
                return "<div class=\"dtable\" id=\"" + id + "\"></div>" + "<script>" + scripts + "</script>";
            }
        }
    }
};




