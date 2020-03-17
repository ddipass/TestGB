'use strict';

// auto container indexing
var _uuidCounter = 0;

function uuid() {
    return "plugin-highcharts-".concat(++_uuidCounter);
}

// 获取当前时间
function getNow() {
    var now = new Date();
    return {
        hours: now.getHours() + now.getMinutes() / 60,
        minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
        seconds: now.getSeconds() * 12 / 60
    };
}

// Pad numbers
function pad(number, length) {
    // Create an array of the remaining length + 1 and join it with 0's
    return new Array((length || 2) + 1 - String(number).length).join(0) + number;
}

// https://www.runoob.com/highcharts/highcharts-guage-clock.html
// render clock
function render_clock(body) {
    // base parameters
    var now = getNow();
    var chart = {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200
    };
    var credits = {
        enabled: false
    };
    var title = {
        text: 'Highcharts Clock'
    };
    // default background
    var pane = {
        background: [{}, {
            // reflex for supported browsers
            backgroundColor: {
                radialGradient: {
                    cx: 0.5,
                    cy: -0.4,
                    r: 1.9
                },
                stops: [
                    [0.5, 'rgba(255, 255, 255, 0.2)'],
                    [0.5, 'rgba(200, 200, 200, 0.2)']
                ]
            }
        }]
    };
    // the value axis
    var yAxis = {
        labels: {
            distance: -20
        },
        min: 0,
        max: 12,
        lineWidth: 0,
        showFirstLabel: false,
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 5,
        minorTickPosition: 'inside',
        minorGridLineWidth: 0,
        minorTickColor: '#666',
        tickInterval: 1,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        title: {
            text: 'HClock',
            style: {
                color: '#BBB',
                fontWeight: 'normal',
                fontSize: '8px',
                lineHeight: '10px'
            },
            y: 10
        }
    };
    // the size of pins
    var series = [{
        data: [{
            id: 'hour',
            y: now.hours,
            dial: {
                radius: '60%',
                baseWidth: 4,
                baseLength: '95%',
                rearLength: 0
            }
        }, {
            id: 'minute',
            y: now.minutes,
            dial: {
                baseLength: '95%',
                rearLength: 0
            }
        }, {
            id: 'second',
            y: now.seconds,
            dial: {
                radius: '100%',
                baseWidth: 1,
                rearLength: '20%'
            }
        }],
        animation: false,
        dataLabels: {
            enabled: false
        }
    }];
    // format func
    var tooltip = {
        formatter: function() {
            return this.series.chart.tooltipText;
        }
    };

    // finilize data
    var json = {};
    json.chart = chart;
    json.credits = credits;
    json.title = title;
    json.pane = pane;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.series = series;

    // auto indexing container
    var id = uuid();
    // generate figures
    var scripts = "new Highcharts.chart(\'".concat(id, "\',").concat(JSON.stringify(json), ", chartFunction);");
    return "<div>\n                    <div id=\"".concat(id, "\"></div>\n                    <script>").concat(scripts, "</script>\n                </div>");
}

// render map chart
function render_map(body) {
    // auto indexing container
    var id = uuid();
    var scripts = "$.getJSON(\'" + body.input.dataurl + "\', function(data) {" + 
                        "var mapData = Highcharts.geojson(Highcharts.maps[\'" + body.input.module + "\']);" + 
                        "Highcharts.each(data, function(d) {" +
                            "if (d.code === 'UK') {" +
                                "d.code = 'GB';" +
                            "}" +
                        "});" +
                        "var json = {};" +
                        "json.credits = { text: 'HOLDING FUTURE'};" + 
                        "json.title = { text: \'" + body.input.title + "\'};" +
                        "json.subtitle = { text: \'" + body.input.subtitle + "\'};" +
                        "json.chart = {" +
                            "borderWidth: 1" +
                        "};" +
                        "json.legend = {" +
                            "enabled: false" +
                        "};" +
                        "json.mapNavigation = {" +
                            "enabled: true," +
                            "buttonOptions: {" +
                                "verticalAlign: 'bottom'" +
                            "}" +
                        "};" +
                        "json.series = [{" + 
                            "name: 'Countries'," + 
                            "color: '#E0E0E0'," + 
                            "mapData: mapData," +
                            "enableMouseTracking: false" +
                        "}, {" + 
                            "type: 'mapbubble'," + 
                            "name: \'" + body.input.series.name + "\'," + 
                            "mapData: mapData," + 
                            "data: data," + 
                            "joinBy: " +  body.input.series.joinBy + "," +
                            "minSize: " + body.input.series.minSize + "," +
                            "maxSize: \'" + body.input.series.maxSize + "\'," +
                            "tooltip: { pointFormat: \"" + body.input.series.tooltip.pointFormat + "\"}"+ 
                        "}];" +
                        "new Highcharts.mapChart(\'".concat(id, "\',") + " json);" + 
                  "})";
    return "<div>\n<div id=\"".concat(id, "\"></div>\n<script>").concat(scripts, "</script>\n</div>");
}

// render map chart
function render_map_us(body) {
    // auto indexing container
    var id = uuid();
    var scripts = "$.getJSON(\'" + body.input.dataurl + "\', function(data) {" + 
                        "var countiesMap  = Highcharts.geojson(Highcharts.maps[\'" + body.input.module + "\']);" +
                        "var lines = Highcharts.geojson(Highcharts.maps[\'" + body.input.module + "\'], 'mapline');" + 
                        "Highcharts.each(countiesMap, function(mapPoint) {" +
                            "mapPoint.name = mapPoint.name + ', ' + mapPoint.properties['hc-key'].substr(3, 2);" + 
                        "});" +
                        "var json = {};" +
                        "json.credits = { text: 'HOLDING FUTURE'};" + 
                        "json.title = { text: \'" + body.input.title + "\'};" +
                        "json.subtitle = { text: \'" + body.input.subtitle + "\'};" +
                        "json.chart = { borderWidth: 1,  marginRight: 50 };" +
                        "json.mapNavigation = { enabled: true };" +
                        "json.plotOptions = { mapline: { showInLegend: false, enableMouseTracking: false }};" + 
                        "json.colorAxis = { dataClasses: [{ from: 0, to: 2, color: \"#F1EEF6\"  }, " + 
                                                         "{ from: 2, to: 4, color: \"#D4B9DA\"  }, " +
                                                         "{ from: 4, to: 6, color: \"#C994C7\"  }, " + 
                                                         "{ from: 6, to: 8, color: \"#DF65B0\"  }, " + 
                                                         "{ from: 8, to: 10, color: \"#DD1C77\" }, " + 
                                                         "{ from: 10, color: \"#980043\"        }] }; " +
                        "json.series = [{ mapData: countiesMap," +
                                        " data: data," +
                                        " joinBy: [ 'hc-key', 'code' ]," +
                                        " name: \'" + body.series[0].name + "\',"  +
                                        " tooltip: { valueSuffix: '%' }," + 
                                        " borderWidth: 0.5," + 
                                        " states:{ hover: { color: '#bada55' }}" +  
                                    "}, {" + 
                                        " type: 'mapline'," + 
                                        " name: \'" + body.series[1].name + "\',"  +
                                        " data: [lines[0]]," + 
                                        " color: 'white'" + 
                                    "}, {" + 
                                        " type: 'mapline'," + 
                                        " name: \'" + body.series[2].name + "\',"  +
                                        " data: [lines[1]]," + 
                                        " color: 'gray'" + 
                        "}];" + 
                        "json.legend = { layout: 'vertical', align: 'right', floating: true," + 
                                        "valueDecimals: 0, valueSuffix: '%'," + 
                                        "backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)'," + 
                                        "symbolRadius: 0, symbolHeight: 14 };" +
                        "json.legend.title = " +  JSON.stringify(body.legend.title).slice(1,-1) + ";" +
                        "new Highcharts.mapChart(\'".concat(id, "\',") + " json);" + 
                  "});";
    return "<div>\n<div id=\"".concat(id, "\"></div>\n<script>").concat(scripts, "</script>\n</div>");
}

// render map chart
function render_geomap(body) {
    // auto indexing container
    var id = uuid();
    // generate script
    var scripts = "";
    // get geomap
    scripts += "$.getJSON(\'" + body.input.geomap + "\', function (geojson) {" + 
                    "var json = " + JSON.stringify(body) + ";" + 
                    "var states = Highcharts.geojson(geojson, 'map');" + 
                    "var rivers = Highcharts.geojson(geojson, 'mapline');" + 
                    "var cities = Highcharts.geojson(geojson, 'mappoint');" + 
                    "var specialCityLabels = json.specialCityLabels;" +
                    "console.log(specialCityLabels);";
                    "$.each(cities, function () {" + 
                        "if (specialCityLabels.hasOwnProperty(this.name)) {" + 
                            "this.dataLabels = specialCityLabels[this.name];" + 
                        "}" +
                    "});";
    scripts += "json.mapNavigation = { enabled: true, buttonOptions: { verticalAlign: 'bottom' } };" + 
               "json.series = [{  name: 'States and territories'," + 
                                 "data: states," + 
                                 "color: Highcharts.getOptions().colors[2]," + 
                                 "states: { hover: { color: Highcharts.getOptions().colors[4] } }," + 
                                 "dataLabels: { enabled: true, format: '{point.name}', style: {  width: '80px' } }," + 
                                 "tooltip: { pointFormat: '{point.name}' } }, " + 
                              "{  name: 'Rivers'," + 
                                 "type: 'mapline'," + 
                                 "data: rivers," + 
                                 "color: Highcharts.getOptions().colors[0]," + 
                                 "tooltip: { pointFormat: '{point.properties.NAME}' } }, " + 
                              "{  name: 'Cities'," + 
                                 "type: 'mappoint'," + 
                                 "data: cities," + 
                                 "color: 'black'," + 
                                 "marker: { radius: 2 }," + 
                                 "dataLabels: { align: 'left', verticalAlign: 'middle' }," + 
                                 "animation: false," + 
                                 "tooltip: { pointFormat: '{point.name}' }" + 
                              "}];";
    scripts += "new Highcharts.mapChart(\'".concat(id, "\',") + " json);";
    scripts += "});";
    // redner figure
    return "<div>\n<div id=\"".concat(id, "\"></div>\n<script>").concat(scripts, "</script>\n</div>");
}

// render plot chart
// http://www.highcharts.com/docs/getting-started/your-first-chart
function render_chart(body) {
    // auto indexing container
    var id = uuid();
    // function tooltips
    if (typeof body.func_tooltip == "undefined") {
        // Assign value to the property here
        var func_tooltip = " ";
    } else {
        var func_tooltip = ", " + body.func_tooltip;
    };
    // function runscripts
    if (typeof body.run_scripts == "undefined") {
        // Assign value to the property here
        var run_scripts = " ";
    } else {
        var run_scripts = body.run_scripts;
    };
    // generate figures
    try {
        body.chart = body.chart || {};
        body.credits = { text: "HOLDING FUTURE" };
        var scripts = "var json = " + JSON.stringify(body).replace(/.$/," ") + 
                      func_tooltip + "};" + run_scripts + 
                      "new Highcharts.chart(\'".concat(id, "\',") + " json);";
    } catch (e) {
        console.error(e);
    }
    // return figures
    return "<div>\n<div id=\"".concat(id, "\"></div>\n<script>").concat(scripts, "</script>\n</div>");
}

// https://www.highcharts.com.cn/demo/highcharts/annotations
function render_area(body) {
    // auto indexing container
    var id = uuid();
    // adding credit
    body.credits = { text: "HOLDING FUTURE" };
    // set body run_tooltip
    var run_scripts = "var json = " + JSON.stringify(body) + ";";
    // get elevation data / annotation data
    run_scripts += "$.getJSON(\'" + body.input.annourl + "\', function(annoData) {" + 
                   "$.getJSON(\'" + body.input.dataurl + "\', function(elevationData) {" +
                        "json.annotations = annoData;" +
                        "json.series = [{ data: elevationData, " +
                                        " lineColor: Highcharts.getOptions().colors[1]," +
                                        " color: Highcharts.getOptions().colors[2]," +
                                        " fillOpacity: 0.5," + 
                                        " name: '海拔'," + 
                                        " marker: { enabled: false }," + 
                                        " threshold: null" + 
                                        "}];" + 
                        "new Highcharts.chart(\'".concat(id, "\',") + " json);" +
                   "});" +
                   "});";
    // loging
    run_scripts += "console.log(json);"
    // return figures
    return "<div>\n<div id=\"".concat(id, "\"></div>\n<script>").concat(run_scripts, "</script>\n</div>");
}

// gitbook functions
module.exports = {
    book: {
        assets: './assets'
    },
    hooks: {
        init: function init() {
            // get input configs
            var _this$config$get = this.config.get('pluginsConfig.highcharts'),
                type = _this$config$get.type;
        },
        "page:before": function pageBefore(page) {
            // get all code texts 
            var flows = page.content.match(/^```highcharts((.*\n)+?)?```$/igm);
            // replace code blocks
            if (flows instanceof Array) {
                for (var i = 0, len = flows.length; i < len; i++) {
                    page.content = page.content.replace(flows[i], flows[i].replace(/^```highcharts/, '{% highcharts %}').replace(/```$/, '{% endhighcharts %}'));
                }
            }
            return page;
        },
        "page:after": function pageAfter(page) {
            console.log("Highcarts After Paging!");
        },
        // This is called after the book generation
        "finish": function finish() {
            console.log("Highcarts Loading Finish!");
        }
    },
    blocks: {
        highcharts: {
            process: function process(blk) {
                // get block switcher
                var body = '';
                // catch json from markdown
                try {
                    // get string in {% chart %}
                    var bodyString = blk.body.trim();
                    // this is pure JSON
                    body = JSON.parse(bodyString);
                    // test switcher
                    body.switcher = body.switcher || {};
                } catch (e) {
                    console.error(e);
                };
                if (body.switcher == 'clock') {
                    // render figures
                    var render = render_clock(body);
                    return render;
                } else if (body.switcher == 'wordcloud') {
                    // render figures
                    var element = body.input.data;
                    var title = body.title.text;
                    var data = element.split(/[,\. ]+/g)
                        .reduce(function(arr, word) {
                            var obj = arr.find(function(obj) {
                                return obj.name === word;
                            });
                            if (obj) {
                                obj.weight += 1;
                            } else {
                                obj = {
                                    name: word,
                                    weight: 1
                                };
                                arr.push(obj);
                            }
                            return arr;
                        }, []);
                    // finilize data
                    var json = {};
                    json.credits = { text: "HOLDING FUTURE" };
                    json.series = [{
                        type: 'wordcloud',
                        data: data
                    }];
                    json.title = {
                        text: title
                    };
                    // render world cloud
                    var render = render_chart(json);
                    return render;
                } else if (body.switcher == 'heatmap') {
                    // set new dict
                    var json = body;
                    // prepare data
                    json.credits = { text: "HOLDING FUTURE" };
                    json.chart = {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 1
                    };
                    json.legend = {
                        align: 'right',
                        layout: 'vertical',
                        margin: 0,
                        verticalAlign: 'top',
                        y: 25,
                        symbolHeight: 280
                    };
                    // prepare data
                    json.responsive = {
                        rules: [{
                            condition: {
                                maxWidth: 1000
                            },
                            chartOptions: {
                                yAxis: {
                                    labels: {
                                        formatter: function() {
                                            return this.value.charAt(0);
                                        }
                                    }
                                }
                            }
                        }]
                    };
                    // render world cloud
                    var render = render_chart(json);
                    return render;
                } else if (body.switcher == 'area') {
                    // render figures
                    var render = render_area(body);
                    return render;
                } else if (body.switcher == 'map') {
                    // render figures
                    var render = render_map(body);
                    return render;
                } else if (body.switcher == 'map_us') {
                    // render figures
                    var render = render_map_us(body);
                    return render;
                } else if (body.switcher == 'geomap') {
                    // render figures
                    var render = render_geomap(body);
                    return render;
                } else {
                    // render figures
                    var render = render_chart(body);
                    return render;
                }
            }
        }
    }
};













