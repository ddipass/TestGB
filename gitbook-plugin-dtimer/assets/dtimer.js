// calcculate
function calcTime(city, offset) { 
    var d = new Date();
    var utc = d.getTime() + ( d.getTimezoneOffset() * 60000 );
    var nd = new Date( utc + (3600000 * offset));
    var line = nd.toLocaleString().split(",");
    var script = "<h3 id=\"timer-line\">" + '#' + city + " " + line[0] + "</h3>" + 
                 "<h1 id=\"timer-line\">" + line[1] + "</h1>";
    return  script;
}
// refresh calculates
function reCalcTime(target, json) {
    var script = '';
    script += "<div class=\"timer-background\">";
    for (let line of json) {
        script += "<div class=\"timer-container\">";
        script += calcTime(line.city, line.offset);
        script += "</div>";
    }
    script += "</div>";
    $(target).html(script);
    var t = setTimeout(reCalcTime, 500, target, json);
}