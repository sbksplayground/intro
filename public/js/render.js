var app_render_prepare = function () {
    /**
     *  Add Renderers for dashboard header
     *  Proof of concept, some refactoring will be needed
     */

    dash.addHeaderRenderer('BC', function (data) {
        return '<td></td><td class="search"><input id="search" type="text" placeholder="Search for site"><button id="reset">Reset</button></td>';
    });

    dash.addHeaderRenderer('AB', function (data) {
        return pHeading('AB', 'Fans');
    });

   /** TODO: Refactor */
    dash.addHeaderRenderer('BH', function (data) {
        var CZ = dash.country=="CZ"? 'selected' : "";
        var GB = dash.country=="GB"? 'selected' : "";
        var US = dash.country=="US"? 'selected' : "";
        return '<td><a data-column="BH" data-sub="'+dash.country+'" href="">Local Fans</a><select>' +
            '       <option value="CZ" '+CZ+'>CZ</option>' +
            '       <option value="GB" '+GB+'>GB</option>' +
            '       <option value="US" '+US+'>US</option>' +
            '</select></td>';
    });

    dash.addHeaderRenderer('AC', function (data) {
        return pHeading('AC', 'Fan Growth');
    });

    dash.addHeaderRenderer('AG', function (data) {
        return pHeading('AG', 'Moving Average of Post ER');
    });

    dash.addHeaderRenderer('AK', function (data) {
        return pHeading('AK', 'Interactions');
    });

    dash.addHeaderRenderer('AE', function (data) {
        return pHeading('AE', 'People Talking About');
    });

    /**
     * Add Renderers for dashboard
     * Proof of concept, some refatoring will be needed
     */

    /** Picture */

    /** Site name */
    dash.addRenderer('BC', function (data) {
        return '<td class="picture"><img alt="" src="' + data['BD'] + '"/></td><td><dl><dt>' + data['BC'] + '</dt><dd>' + data['BB'] + '</dd></dl></td>';
    });

    /** Fan growth */
    dash.addRenderer('AC', function (data) {
        return '<td class="integer"><span>' + pNum(data['AC']) + '</span>' + pArrow(data['AD']) + '</td>';
    });
    /** growth */
    dash.addRenderer('AG', function (data) {
        return '<td class="integer"><span>' + pPerc(data['AG']) + '</span>' + pArrow(data['AH']) + '</td>';
    });

    dash.addRenderer('AK', function (data) {
        return '<td class="integer"><span>' + pNum(data['AK']) + '</span></td>';
    });

    /** growth */
    dash.addRenderer('AE', function (data) {
        return '<td class="integer"><span>' + pNum(data['AE']) + '</span>' + pArrow(data['AF']) + '</td>';
    });

    dash.addRenderer('BH', function (data) {
        var html = (data['BH'][dash.country]) ? pNum(data['BH'][dash.country]) : "N/A";
        return '<td class="local">' + html + '</td>';
    });

    dash.addRenderer('AB', function (data) {
        return '<td class="integer"><span>' + pNum(data['AB']) + '</span></td>';
    });
};