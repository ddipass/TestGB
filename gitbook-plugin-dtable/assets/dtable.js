
// auto container indexing
var _uuidCounter = 0;

// auto container naming
function uuid() {
    return "dtable-container-".concat(++_uuidCounter);
}

// gen url table
function urlTable(target, url, option) {
    $.getJSON(url, function(data) {
        if (option.set == "Trans") {
            if (option.hasOwnProperty('color')) {
                transTable(target, data, option.color);
            } else {
                transTable(target, data);
            }
        } else {
            if (option.hasOwnProperty('color')) {
                orignTable(target, data, option.color);
            } else {
                orignTable(target, data);
            }
        }
    });
    //var t = setTimeout(urlTable, 500, url, option);
}

// gen local table
function genTable(target, json, option) {
    if (option.set == "Trans") {
        if (option.hasOwnProperty('color')) {
            transTable(target, json, option.color);
        } else {
            transTable(target, json);
        }
    } else {
        if (option.hasOwnProperty('color')) {
            orignTable(target, json, option.color);
        } else {
            orignTable(target, json);
        }
    }
    //var t = setTimeout(genTable, 500, target, json, option);
}

function orignTable(target, json, bcolor = "rgb(9, 40, 86)" ) {
    var script = '';
    var data = {};
    var color = [];
    // loop over all keys
    for (let line of json) {
        for (let key in line) {
            data[key] = [];
        }
    }
    // push caption
    for (let key in data) {
        data[key].push(key);
    }
    // push all values
    for (let line of json) {
        for (let key in data) {
            if (key in line) {
                data[key].push(line[key]);
            } else {
                data[key].push('N/A');
            }
        }
    }
    // set row
    script += "<div class=\"dtable-row\">";
    // set new list
    for (let key in data) {
        script += "<div class=\"dtable-col\">";
        data[key].forEach(genColume);
        function genColume(item, index) {   
            if (item.includes('/rgb')) {
                tvalue = item.split('/rgb');
                // auto indexing container
                var id = uuid();
                script += "<div class=\"" + target.replace('#', '') + "-ext\" id=\"" + id + "\">";
                script += "<p id=\"dtable-line\">" + tvalue[0] + "</p>";
                script += "</div>";
                color.push({ id: "#" + id, background: tvalue[1] });
            } else {
                script += "<div class=\"" + target.replace('#', '') + "-ext\">";
                script += "<p id=\"dtable-line\">" + item + "</p>";
                script += "</div>";
            }
        }
        script += "</div>";
    }
    script += "</div>";
    $(target).html(script);
    // set background
    $(target.replace('#', '.') + "-ext").css("background-color", bcolor);
    $(target.replace('#', '.') + "-ext").css("padding", '1px');
    $(target.replace('#', '.') + "-ext").css("margin", '1px');
    $(target.replace('#', '.') + "-ext").css("border-radius", '5px');
    // set color
    color.forEach(genColor);
    function genColor(item, index){
        $(item.id).css("background-color", "rgb" + item.background);
    }

}

function transTable(target, json, bcolor = "rgb(9, 40, 86)") {

    var script = '';
    var data = {};
    var color = [];
    // loop over all keys
    for (let line of json) {
        for (let key in line) {
            data[key] = [];
        }
    }
    // push all values
    for (let line of json) {
        for (let key in data) {
            if (key in line) {
                data[key].push(line[key]);
            } else {
                data[key].push('N/A');
            }
        }
    }
    // generate tables
    for (let key in data) {
        script += "<div class=\"dtable-row\">";
        script += "<div class=\"" + target.replace('#', '') + "-ext\"><p id=\"dtable-line\">" + key + "</p></div>";
        data[key].forEach(genElements); 
        function genElements(item, index) {   
            if (item.includes('/rgb')) {
                tvalue = item.split('/rgb');
                // auto indexing container
                var id = uuid();
                script += "<div class=\"" + target.replace('#', '') + "-ext\" id=\"" + id + "\">";
                script += "<p id=\"dtable-line\">" + tvalue[0] + "</p>";
                script += "</div>";
                color.push({ id: "#" + id, background: tvalue[1] });
            } else {
                script += "<div class=\"" + target.replace('#', '') + "-ext\">";
                script += "<p id=\"dtable-line\">" + item + "</p>";
                script += "</div>";
            }
        }
        script += "</div>";
    }
    $(target).html(script);
    // set background
    $(target.replace('#', '.') + "-ext").css("background-color", bcolor);
    $(target.replace('#', '.') + "-ext").css("display", 'table-cell');
    $(target.replace('#', '.') + "-ext").css("padding", '1px');
    $(target.replace('#', '.') + "-ext").css("border-radius", '5px');
    // set color
    color.forEach(genColor);
    function genColor(item, index){
        $(item.id).css("background-color", "rgb" + item.background);
    }
}

