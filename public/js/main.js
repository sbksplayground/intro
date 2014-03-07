/**
 * Created by balicekt on 04/03/14.
 */

$(document).ready(function ($) {

  var COLUMN_SHOW_COUNT = 4;
  var FIRST_SHOW_COLUMN = 2;

  var actualShowFirst = FIRST_SHOW_COLUMN;
  var actualShowLast = actualShowFirst + COLUMN_SHOW_COUNT;

  var parsed = null;
  var columnCount = 0;

  $.get('http://demo6031840.mockable.io', function (result, status) {
    parsed = result.parsed;
    showDashboard(parsed);

    columnCount = $("#dashboard-desc th").length; //pocet sloupcu s kteryma mohu pracovat

    $("#dashboard-body td:nth-child(n+"+actualShowLast+")").css("display", "none");
    $("#dashboard-desc th:nth-child(n+"+actualShowLast+")").css("display", "none");
  });



  /* ============================================================ */
  /* FUNCTIONS */

  /**
   * Smaze dashboard a vykresli novy
   *
   * @param json ktery se ma vypsat na dashboard
   */
  function showDashboard(json){
    $("#dashboard-body").html("");
    $.each(json, function (i, val) {
      $("#dashboard-body:last").append(returnRow(val));
    });
  }


  /**
   * Sortuje json podle zadane property
   *
   * @param jsonObject
   * @param property
   * @returns {*}
   */
  function sortJsonArrayByProperty(jsonObject, property) {
    var direct = jsonObject[0][property] <= jsonObject[1][property] ? -1 : 1;

    jsonObject.sort(function (a, b) {
      a = a[property];
      b = b[property];
      return ((a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0));
    });
    return jsonObject;
  }


  /**
   * Podle zadane hodnoty vlozi tridu ktera zobrazi cervene kolecko pokud je hodnota zaporna
   * a zelene kolecko pokud je hodnota kladne, pokud je hodnota 0 nevlozi se zadna trida
   *
   * @param value cislo
   * @returns {string}
   */
  function upDown(value) {
    if (parseFloat(value) < 0)
      return "class='arrow-down'";
    if (parseFloat(value) > 0)
      return "class='arrow-up'";
    return "";
  }


  /**
   * ze zadaneho objektu vytvori jeden radek dashboardu
   *
   * @param row radek ktery se ma zpracovat
   * @returns {string}
   */
  function returnRow(row) {
    return (
      "<tr>" +
        "<td class='name-info'> <div style='background-color: " + row.color_html + "'></div>" +
        "<img src='" + row.BD + "'/>" +
        "<h3>" + row.BC + "</h3></td>" +
        "<td class='fans vertical center'><p>" + row.AB + "</p></td>" +
        "<td class='fan-growth vertical right'><p " + upDown(row.AC) + ">" + row.AC + "</p></td>" +
        "<td class='rating-change vertical right'><p " + upDown(row.AH) + ">" + (parseFloat(row.AH) * 100).toFixed(4) + " %</p></td>" +
        "<td class='comment-count vertical center'><p>" + row.AM + "</p></td>" +
        "<td class='share-count vertical center'><p>" + row.AN + "</p></td>" +
        "<td class='question-count vertical center'><p>" + row.AR + "</p></td>" +
        "</tr>");
  }


  /* ============================================================ */
  /* EVENTS */

  $(".arrow-change").click(function () {
    showDashboard(sortJsonArrayByProperty(parsed, $(this).attr("role")));

    $("#dashboard-body td:nth-child(n+"+(actualShowLast)+")").css("display", "none");
    $("#dashboard-body td:nth-child(-n+"+(actualShowFirst-1)+")").css("display", "none");
    $(".name-info").show();
  });

  $("#right-arrow").click(function () {
    if(actualShowLast <= columnCount){ //mohu posoupnout jeste doprava
      $("#dashboard-body td:nth-child("+actualShowLast+")").css("display", "table-cell");
      $("#dashboard-desc th:nth-child("+actualShowLast+")").css("display", "table-cell");
      $("#dashboard-body td:nth-child("+actualShowFirst+")").css("display", "none");
      $("#dashboard-desc th:nth-child("+actualShowFirst+")").css("display", "none");
      actualShowLast++;
      actualShowFirst++;
    }
    else
      console.log("jiz nemohu vice doprava");
  });

  $("#left-arrow").click(function () {
    if(actualShowFirst > FIRST_SHOW_COLUMN){ //mohu posoupnout jeste doprava
      actualShowLast--;
      actualShowFirst--;
      $("#dashboard-body td:nth-child("+actualShowFirst+")").css("display", "table-cell");
      $("#dashboard-desc th:nth-child("+actualShowFirst+")").css("display", "table-cell");
      $("#dashboard-body td:nth-child("+actualShowLast+")").css("display", "none");
      $("#dashboard-desc th:nth-child("+actualShowLast+")").css("display", "none");
    }
    else
      console.log("jiz nemohu vice doleva");
  });

});