'use strict';

// auto container indexing
var _ctnCounter = 0;

// auto container naming
function ctn() {
    return "ezcomments-".concat(++_ctnCounter);
}

// Name Card Funtion
function ftn_namecards(id, json) {
    var scripts = '';
    // set color
    json.data.forEach(genCards);
    function genCards(item, index){
        scripts +=  "<div class=\"ezcomments-card\">" + 
                        "<img src=\"" + item.url + "\" style=\"width:100%\">" + 
                        "<h4 class=\"ezcomments-name\">" + item.name + "</h4>" + 
                        "<p class=\"ezcomments-title\">" + item.title + "</p>" + 
                        "<p>" + item.corp + "</p>" + 
                    "</div>"
    }
    return "<div class=\"ezcomments-row\" id=\"" + id + "\">" + scripts + "</div>";
}

// Comments Funtion
function ftn_comments(id, json) {
    var scripts = '';
    // set color
    json.data.forEach(genComments);
    function genComments(item, index){
        scripts += "<div class=\"ezcomments-cf\">" + 
                       "<div class=\"ezcomments-img\"><img src=\"" + item.url + "\"></div>" + 
                       "<h4>" + item.comments + "</h4>" + 
                       "<p class=\"ezcomments-light\">" + item.name + "<br>" + item.corp + "<br>" + item.date + "</p>" + 
                   "</div>"
    }
    return "<div class=\"ezcomments-ctn\" id=\"" + id + "\">" + scripts + "</div>";
}

// Briefing Funtion
function ftn_brief(id, json) {
    var scripts = '';
    // set color
    json.data.forEach(genBrief);
    function genBrief(item, index){
        scripts += "<div class=\"ezcomments-cf\">" + 
                       "<div class=\"ezcomments-img-brief\"><img src=\"" + item.url + "\"></div>" + 
                       "<h4>" + item.brief + "</h4>" + 
                       "<p class=\"ezcomments-light-brief\">" + item.name + "<br>" + item.corp + "<br>" + item.date + "</p>" + 
                   "</div>"
    }
    return "<div class=\"ezcomments-ctn-brief\" id=\"" + id + "\">" + scripts + "</div>";
}

// gitbook functions
module.exports = {
    book: {
        assets: './assets'
    },
    website: {
        assets: "./assets",
        js:  [  ],
        css: [ 'ezcomments.css' ]
    },
    hooks: {
        init: function init() {
            // get input configs
            var _this$config$get = this.config.get('pluginsConfig.ezcomments'),
                type = _this$config$get.tyep;
        },
        "page:before": function pageBefore(page) {
            // get all code texts 
            var flows = page.content.match(/^```ezcomments((.*\n)+?)?```$/igm);
            // replace code blocks
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(flows[i], flows[i].replace(/^```ezcomments/, '{% ezcomments %}').replace(/```$/, '{% endezcomments %}'));
                }
            }
            return page;
        },
        "page:after": function pageAfter(page) {
            console.log("EZComments After Paging!");
        },
        // This is called after the book generation
        "finish": function finish() {
            console.log("EZComments Loading Finish!");
        }
    },
    blocks: {
        ezcomments: {
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
                if (json.type == "comments") {
                    scripts  = ftn_comments(id, json)
                } else if (json.type == "brief") {
                    scripts  = ftn_brief(id, json)
                } else {
                    scripts  = ftn_namecards(id, json)
                }
                return scripts;
            }
        }
    }
};




