var path = require('path');
var express = require('express');

// const
var DIST_PATH = path.join(__dirname + '/public');

// app
var app = express();

app.use(express.static(DIST_PATH));

/*app.get('/post/1', function (req, res) {
	res.send({
		id: 1,
		date: Date.now(),
		title: 'První post',
		content: 'lorem ipsum et dolor sit amet'
	});
});*/

app.use('/data',function(req, res){
    //res.send(open());
    res.sendfile(path.join(DIST_PATH,'/data.json'));
});

app.listen(8080, function () {
	var addr = this.address();
	console.log('Express listening on http://%s:%d', addr.address, addr.port);
});
