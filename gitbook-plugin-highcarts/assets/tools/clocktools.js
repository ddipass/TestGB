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

// Add some life
var chartFunction = function(chart) {
    setInterval(function() {
        // get new date
        var now = getNow();
        var hour = chart.get('hour'),
            minute = chart.get('minute'),
            second = chart.get('second'),
            // run animation unless we're wrapping around from 59 to 0
            animation = now.seconds === 0 ? false : {
                easing: 'easeOutElastic'
            };

        // Cache the tooltip text
        chart.tooltipText = pad(Math.floor(now.hours), 2) + ':' +
            pad(Math.floor(now.minutes * 5), 2) + ':' +
            pad(now.seconds * 5, 2);
        // update
        hour.update(now.hours, true, animation);
        minute.update(now.minutes, true, animation);
        second.update(now.seconds, true, animation);
    }, 1000);
};

// Extend jQuery with some easing (copied from jQuery UI)
$.extend($.easing, {
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
});