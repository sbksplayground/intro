function JsonObject(map, data) {
    this.map = (map || null);
    this.data = (data || null);
    this.asc = false;
}

JsonObject.prototype.setData = function(data) {
    this.data = data;
};

JsonObject.prototype.setMap = function (map) {
    this.map = map;
};

JsonObject.prototype.show = function() {
    //alert("show");
    
    var option = function (value, text) {return '<option value="'+value+'">'+text+"</option>";};
    var select = function (array) {
        var options = "";
        for (var k in array){
           options += option(k,k);
        }
        return "<select>" + options + "</select>";
    };
    var table = "<table>";
    var endTable = "</table>";
    var thead = "<thead>";
    var endThead = "</thead>";
    var tbody = "<tbody>";
    var endTbody = "</tbody>";
    var tr = "<tr>";
    var endTr = "</tr>";
    var th = "<th>";
    var endTh = "</th>";
    var td = "<td>";
    var tdrc = "<td class='right center'>";
    var endTd = "</td>";
    //window.alert(jsObj.data.map.AA);
    //var key = jsObj.map["A" + String.fromCharCode(65)];
    //key = jsObj.map["AC"];
    var item = this.data[0];
    var countItem = this.data.length;
    var head = tr + th + countItem + " Facebook pages" + endTh + endTr
            + tr + th + "Name" + endTh + th + '<button id="fcount">Fans</button>' + endTh + th + "Interactions" + endTh 
            + th + "Local Fans" + select(item.BH) + endTh 
            + th + '<button id="lcount">Likes</button>' + endTh 
            + th + "Comments" + endTh + endTr;
    var content = table + thead + head + endThead + tbody;
    for (var i = 0; i < countItem; i++) {
        item = this.data[i];
        content += tr;
        content += td + "<div class='vline' style='background-color:" + item.color_html + "'></div>"
                + '<div class="picture"><img src="' + item.BD + '"/></div>'
                + "<span class='name'>" + item.BC + "</span>"
                + "<br /><i>" + item.BB + "</i>"
                + endTd;
        content += tdrc + item.AB + endTd;
        content += tdrc + item.AK + endTd;
        content += tdrc  + endTd;
        content += tdrc + item.AL + endTd;
        content += tdrc + item.AM + endTd;
        content += endTr + "\n";
    }
    return content + endTbody + endTable;
};

JsonObject.prototype.sort = function(by_key, asc) {
    //alert("sort "+asc);
    var length = this.data.length;
    var by = "AB";  
    by = by_key;
    if(typeof(asc) !== "boolean"){
        alert(asc+" neni boolean");
        return;
    }
    this.asc = asc;
    if (asc) {
        for (var i = 0; i < length / 2; i++) {

            var swapped = false;
            for (var j = i; j < length - i - 1; j++) {

                if (this.data[j][by] > this.data[j + 1][by]) {

                    var tmp = this.data[j];
                    this.data[j] = this.data[j + 1];
                    this.data[j + 1] = tmp;
                    swapped = true;
                }

            }

            for (var j = length - 2 - i; j > i; j--) {

                if (this.data[j][by] < this.data[j - 1][by]) {

                    var tmp = this.data[j];
                    this.data[j] = this.data[j - 1];
                    this.data[j - 1] = tmp;
                    swapped = true;
                }

            }

            if (!swapped) {
                break;
            }
        }
    } else {
        for (var i = 0; i < length / 2; i++) {

            var swapped = false;
            for (var j = i; j < length - i - 1; j++) {

                if (this.data[j][by] < this.data[j + 1][by]) {

                    var tmp = this.data[j];
                    this.data[j] = this.data[j + 1];
                    this.data[j + 1] = tmp;
                    swapped = true;
                }

            }

            for (var j = length - 2 - i; j > i; j--) {

                if (this.data[j][by] > this.data[j - 1][by]) {

                    var tmp = this.data[j];
                    this.data[j] = this.data[j - 1];
                    this.data[j - 1] = tmp;
                    swapped = true;
                }

            }

            if (!swapped) {
                break;
            }
        }
    }

 //alert("serazeno");
};
