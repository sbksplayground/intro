/**
 * Handles data and data manipulation
 */
function DataModel (data,headers)
{
  this.data = data;
  this.actualData = data;
  this.headerData = headers;
  return this;
}

DataModel.prototype = {

  rows: function ()
  {
    return Object.keys(this.actualData).length;
  },

  headers: function()
  {
    return this.headerData;
  },

  result: function ()
  {
    return this.actualData;
  },

  reset: function ()
  {
    this.actualData = this.data;
  },

  injectData: function(data) {
    for (var key in data)
       this.actualData.push(data[key]);
    // fire Change event
  },

  sortModel: function (sortFunction)
  {
    this.actualData = this.actualData.sort(sortFunction);
    // fire Change event
  },

  filterModel: function (filterFunction)
  {
    this.actualData = this.actualData.filter(filterFunction);
    // fire Change event
  }

};
