'use strict';

// gitbook functions
module.exports = {
    book: {
        assets: './assets'
    },
    website: {
        assets: "./assets",
        js: [
          "todo-script.js"
        ],
        css: [
          "todo-styles.css"
        ]
    },
    hooks: {
        init: function init() {
            // get input configs
            var _this$config$get = this.config.get('pluginsConfig.newtasks'),
                type = _this$config$get.tyep;
        },
        "page:before": function pageBefore(page) {
            // get all code texts 
            var flows = page.content.match(/^```newtasks((.*\n)+?)?```$/igm);
            // replace code blocks
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(flows[i], flows[i].replace(/^```newtasks/, '{% newtasks %}').replace(/```$/, '{% endnewtasks %}'));
                }
            }
            return page;
        },
        "page:after": function pageAfter(page) {
            console.log("New Tasks After Paging!");
        },
        // This is called after the book generation
        "finish": function finish() {
            console.log("New Tasks Loading Finish!");
        }
    },
    blocks: {
        newtasks: {
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
                scripts += "<div class=\"task-container\">" + 
                                "<ul class=\"task-ul\" id=\"task-list-items\"></ul>" + 
                                    "<form class=\"task-add-items\">" +
                                        "<input type=\"text\" class=\"task-control\" id=\"todo-list-item\" placeholder=\"What to do today?\">" + 
                                        "<button class=\"task-add\" type=\"submit\">Add to List</button>" + 
                                    "</form>" + 
                           "</div>";
                return scripts;
            }
        }
    }
};


