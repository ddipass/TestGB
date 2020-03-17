'use strict';

// gitbook functions
module.exports = {
    book: {
        assets: './assets'
    },
    website: {
        assets: "./assets",
        js: [
          "jquery-albe-timeline.min.js",
        ],
        css: [
          "animate.min.css",
          "style-albe-timeline.css"
        ]
    },
    hooks: {
        init: function init() {
            // get input configs
            var _this$config$get = this.config.get('pluginsConfig.albetimeline'),
                type = _this$config$get.type;
        },
        "page:before": function pageBefore(page) {
            // get all code texts 
            var flows = page.content.match(/^```timeline((.*\n)+?)?```$/igm);
            // replace code blocks
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(flows[i], flows[i].replace(/^```timeline/, '{% timeline %}').replace(/```$/, '{% endtimeline %}'));
                }
            }
            return page;
        },
        "page:after": function pageAfter(page) {
            console.log("Timeline After Paging!");
        },
        // This is called after the book generation
        "finish": function finish() {
            console.log("Timeline Loading Finish!");
        }
    },
    blocks: {
        timeline: {
            process: function process(blk) {
                // get block switcher
                var data = '';
                var scripts = '';
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
                scripts += "$(document).ready(function () {" + 
                                "$(\'#myTimeline\').albeTimeline(" + bodyString + ", {" + 
                                    "formatDate: 'DD dd MMMM yyyy HH:mm:ss'" + 
                                "});" + 
                           "});";
                return "<div id=\"myTimeline\"></div><script>" + scripts + "</script>";
            }
        }
    }
};

    













