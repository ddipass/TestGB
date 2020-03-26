'use strict';

// auto container indexing
var _dgGallery_Counter1 = 0;

// auto container indexing
var _dgGallery_Counter2 = 0;

// auto container naming
function dgBox_gen() {
    return "dgBox-".concat(++_dgGallery_Counter1);
}

// auto container naming
function dgCap_gen() {
    return "dgCap-".concat(++_dgGallery_Counter2);
}

// gitbook functions
module.exports = {
    book: {
        assets: './assets'
    },
    website: {
        assets: "./assets",
        css: [ "/css/dgGallery.css" ],
        js: [ "/js/dgGallery.js" ]
    },
    hooks: {
        init: function init() {
            // get input configs
            var _this$config$get = this.config.get('pluginsConfig.dgGallery');
            //var type = _this$config$get.type;
        },
        "page:before": function pageBefore(page) {
            // get all code texts 
            var flows = page.content.match(/^```dgGallery((.*\n)+?)?```$/igm);
            // replace code blocks
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(flows[i], flows[i].replace(/^```dgGallery/, '{% dgGallery %}').replace(/```$/, '{% enddgGallery %}'));
                }
            }
            return page;
        },
        "page:after": function pageAfter(page) {
            console.log("dgGallery After Paging!");
        },
        // This is called after the book generation
        "finish": function finish() {
            console.log("dgGallery Loading Finish!");
        }
    },
    blocks: {
        dgGallery: {
            process: function process(blk) {
                // get block switcher
                var json = '';
                var scripts = '';
                var dgBid = dgBox_gen();
                var dgCid = dgCap_gen();
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
                if (json['type'] == "caption-left") {
                    // Render Pictures
                    scripts +=  "<div class=\"dgTable\">" + 
                                    "<blockquote class=\"dgCaption-left\">" + 
                                        "<div class=\"dgDiv-left\" id=\"" + dgCid + "\"></div>" +            
                                    "</blockquote>" + 
                                    "<div class=\"dgGallery dgRight\" id=\"" + dgBid + "\"></div>" + 
                                "</div>";
                    // Caption 01
                    scripts += "<script>" + "$( document ).ready(function() {" + 
                                    "dgJPEGfeed(\"" + dgBid + "\", \"" + json.url + "\", " + JSON.stringify(json.post) + ");" + 
                                    "dgCaption(\"" + dgCid + "\", " + JSON.stringify(json.caption) + ");" + 
                               "});" + "</script>";
                    // Return
                    return scripts;
                } else if (json['type'] == "caption-right") {
                    // Render Pictures
                    scripts +=  "<div class=\"dgTable\">" + 
                                    "<div class=\"dgGallery dgLeft\" id=\"" + dgBid + "\"></div>" + 
                                    "<blockquote class=\"dgCaption-right\">" + 
                                        "<div class=\"dgDiv-right\" id=\"" + dgCid + "\"></div>" +           
                                    "</blockquote>" + 
                                "</div>";
                    // Caption 02
                    scripts += "<script>" + "$( document ).ready(function() {" + 
                                    "dgJPEGfeed(\"" + dgBid + "\", \"" + json.url + "\", " + JSON.stringify(json.post) + ");" + 
                                    "dgCaption(\"" + dgCid + "\", " + JSON.stringify(json.caption) + ");" + 
                               "});" + "</script>";
                    // Return
                    return scripts;
                } else {
                    // Render Pictures
                    scripts +=  "<div class=\"dgTable\">" + 
                                    "<div class=\"dgGallery\" id=\"" + dgBid + "\">" + 
                                    "</div>" + 
                                "</div>";
                    // Caption 03
                    scripts += "<script>" + "$( document ).ready(function() {" + 
                                    "dgJPEGfeed(\"" + dgBid + "\", \"" + json.url + "\", " + JSON.stringify(json.post) + ");" + 
                               "});" + "</script>";
                    // Return
                    return scripts;
                }
            }
        }
    }
};


