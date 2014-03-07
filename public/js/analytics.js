/*
 * Concrete dashboard impletentation
 * TODO: Element attributes rendering
 * TODO: Growth indicators rendering
 * TODO: Anchors & Images rendering
 */
function AnalyticsDashboard(dashboard, mountpoint,config) {
;
    this.model = model;
    this.mountpoint = mountpoint;
    this.renderers = [];
    this.headerRenderers = [];

    this.render = function () {
        this.mountpoint.html(this.renderTable());
    },

    this.renderTable = function () {
        return '<h1>'+this.model.rows()+' Facebook pages</h1>' +
            '<a href="#" id="more">Load more</a>' +
            '<table>'+
            this.renderHeader()+
            this.renderDash()+
            '</table>';
    };

    this.renderHeader = function() {
        var html = "<thead><tr>";
        var headers = this.model.headers();
        for (var key in config){
            html += this.renderHeadersProperly(key,headers);
        }
        html+='</tr></thead>'
        return html;
    },

    this.renderDash = function () {
        var html = "";
        var data =  this.model.result();
        for(var key in data)
            if(data.hasOwnProperty(key))
                html+='<tr>'+this.renderVal(data[key])+'</tr>';
        return html;
    },

    this.renderVal = function (data) {
        var html = "";
        for (var key in config)
                html += this.renderProperly(key,data);
        return html;
    };

    this.addRenderer = function (column,callback)
    {
        this.renderers[column] = callback;
    }

    this.renderProperly = function (key,data)
    {
        if(this.renderers[key])
            return this.renderers[key](data);
        else
            return "";
    }

    this.addHeaderRenderer = function (column,callback)
    {
        this.headerRenderers[column] = callback;
    }

    this.renderHeadersProperly = function (key,data)
    {
        if(this.headerRenderers[key])
            return this.headerRenderers[key](data);
        else{
            return "";
        }
    }
}

