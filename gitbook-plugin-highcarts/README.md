# gitbook-plugin-highcharts

Using [Highcharts](http://www.highcharts.com/) chart library in Gitbook.

## Config

### Chart Library

Config in `book.json`:

```json
{
  "plugins": [ "highcharts" ],
  "pluginsConfig": {
      "highcharts": {
          "type": "default"
      }
  }
}
```

### Example for [Highcharts](http://www.highcharts.com/)

You **SHOULD NOT** specify the `renderTo` property for the chart.

```
{% chart %}
{
    "chart": {
        "type": "bar"
    },
    "title": {
        "text": "Fruit Consumption"
    },
    "xAxis": {
        "categories": ["Apples", "Bananas", "Oranges"]
    },
    "yAxis": {
        "title": {
            "text": "Fruit eaten"
        }
    },
    "series": [{
        "name": "Jane",
        "data": [1, 0, 4]
    }, {
        "name": "John",
        "data": [5, 7, 3]
    }]
}
{% endchart %}
```
### Example of refreshing Clock for gitbook 

```
{% highcharts %}
{
    "switcher": "clock"
}
{% endhighcharts %}
```
```
{% highcharts %}
{
    "switcher": "wordcloud",
    "title": {
        "text": "wordcloud"
    },
    "input": {
        "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum erat ac justo sollicitudin, quis lacinia ligula fringilla. Pellentesque hendrerit, nisi vitae posuere condimentum, lectus urna accumsan libero, rutrum commodo mi lacus pretium erat. Phasellus pretium ultrices mi sed semper. Praesent ut tristique magna. Donec nisl tellus, sagittis ut tempus sit amet, consectetur eget erat. Sed ornare gravida lacinia. Curabitur iaculis metus purus, eget pretium est laoreet ut. Quisque tristique augue ac eros malesuada, vitae facilisis mauris sollicitudin. Mauris ac molestie nulla, vitae facilisis quam. Curabitur placerat ornare sem, in mattis purus posuere eget. Praesent non condimentum odio. Nunc aliquet, odio nec auctor congue, sapien justo dictum massa, nec fermentum massa sapien non tellus. Praesent luctus eros et nunc pretium hendrerit. In consequat et eros nec interdum. Ut neque dui, maximus id elit ac, consequat pretium tellus. Nullam vel accumsan lorem."
    }
}
{% endhighcharts %}
```

```
{
   "chart":{
      "type":"funnel",
      "marginRight":100
   },
   "title":{
      "text":"销售漏斗",
      "x":-50
   },
   "plotOptions":{
      "series":{
         "dataLabels":{
            "enabled":true,
            "crop":false,
            "overflow":"none",
            "format":"<b>{point.name}</b> ({point.y:,.0f})",
            "color":"black",
            "softConnector":true
         },
         "neckWidth":"30%",
         "neckHeight":"25%"
      }
   },
   "legend":{
      "enabled":false
   },
   "series":[
      {
         "name":"用户",
         "data":[
            [
               "访问网站",
               15654
            ],
            [
               "下载产品",
               4064
            ],
            [
               "询价",
               1987
            ],
            [
               "发送合同",
               976
            ],
            [
               "成交",
               846
            ]
         ]
      }
   ]
}
```


Getting Start with [Highcharts](http://www.highcharts.com/docs/getting-started/your-first-chart).
