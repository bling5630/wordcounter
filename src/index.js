var wordcounter = require('./wordcounter');

wordcounter('http://origo.hu', function(error, callback) {
	'use strict';
	console.log(callback);
});
