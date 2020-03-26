
function dgJPEGfeed(target, func_url, json_func) {
    $.post( func_url + "json", JSON.stringify(json_func) )
      .done(function( data ) {
        var resutls = "";
        resutls = JSON.parse(data);
        resutls.forEach((element) => {
            // Generate Elements
            var div = document.createElement('div');
            document.getElementById(target).appendChild(div);  
            div.setAttribute("class", "dgGallery-Sub");
            var link = document.createElement('a');
            link.setAttribute("href", func_url + element.file);
            link.setAttribute("data-lightbox", element.file);
            div.appendChild(link);
            var img = document.createElement('img');
            img.setAttribute("src", func_url + element.file);
            link.appendChild(img);
        });
      });
}

function dgCaption(target, json_func) {
    //json_func = JSON.parse(json_func);
    json_func.forEach(function(element) {
        Object.keys(element).forEach(function(key) {
            // Generate Elements
            var cons = document.createElement(key);
            document.getElementById(target).appendChild(cons);
            cons.innerHTML = element[key];
        });
    });
}

