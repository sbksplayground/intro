/**
 * Created by root on 3/4/14.
 */
var G_completeData = null;
var G_columnCode = null;
var G_sortOrder = new Array();

function renderContent(parsedArray){
  G_completeData = parsedArray;
  jQuery.each(G_completeData, function(i, obj){    //nefunguje $.each(parse......
    renderRow(obj);
  });
};

function renderRow(rowObject){
  var mainTable = $('#maintab');

  var content = '<tr>';

  //name
  content += '<td><div class="color_mark" style="background-color: '+rowObject['color_html']+'"></div></td><td><img src="'+rowObject['BD']+'"></td><td>'+rowObject['BC']+'</td>';

  //fan count
  content += '<td class="right">'+rowObject['AB']+'</td>';

  //fan change
  if(rowObject['AC'] > 0)
    content += '<td class="right"><p class="change_up">+'+rowObject['AC']+'</p></td>';
  else if(rowObject['AC'] < 0)
    content += '<td class="right"><p class="change_down">'+rowObject['AC']+'</p></td>';
  else
    content += '<td class="right"><p>'+rowObject['AC']+'</p></td>';

  //fan percent change
  if(rowObject['AD'] > 0)
    content += '<td class="right"><p class="change_up">+'+rowObject['AD']+'</td>';
  else if(rowObject['AD'] < 0)
    content += '<td class="right"><p class="change_down">'+rowObject['AD']+'</td>';
  else
    content += '<td class="right">'+rowObject['AD']+'</td>';

  //story letters
  content += '<td class="right">'+rowObject['AE']+'</td>';

  //storytellers change
  if(rowObject['AF'] > 0)
    content += '<td class="right"><p class="change_up">+'+rowObject['AF']+'</td>';
  else if(rowObject['AF'] < 0)
    content += '<td class="right"><p class="change_down">'+rowObject['AF']+'</td>';
  else
    content += '<td class="right">'+rowObject['AF']+'</td>';

  content += '</tr>';

  mainTable.append(content);
};

function sortByCode(code){
  G_columnCode = code;
  G_sortOrder[G_columnCode] = G_sortOrder[G_columnCode] === 0 ? 1 : 0; //set ascending/descending
  G_completeData.sort(sorter);
  $("#maintab").find("tr:gt(0)").remove();
  renderContent(G_completeData);
};

function sorter(x, y){
  var val1 = x[G_columnCode];
  var val2 = y[G_columnCode];
  var result = ((val1 < val2) ? 1 : ((val1 > val2) ? -1 : 0));
  return G_sortOrder[G_columnCode] === 1 ? result : result * (-1);
};


$(document).ready(function ($) {
    //var postContainer = $('#post');
    var btn = $('#btn');
    btn.click(function () {
    $.get('/data', function (post, status) {
    //postContainer.find('p').text(JSON.stringify(post));
    //console.log(post);
    renderContent(post.parsed);
    });
  //btn.remove();
  });
});