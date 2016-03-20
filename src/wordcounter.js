var request = require("request"),
	cheerio = require("cheerio"),
	_ = require('lodash');

function wordcounter(url, callback) {
	'use strict';
	request(url, function(error, response, body) {

		var $page = cheerio.load(body),
				article = $page('body').text();

		var loadedText = clearTheParsedText(article),

				listedMixedWords = filterByLength(loadedText),

				sortedByCount = calculateByFrequency(listedMixedWords),

				unsortedJSON = transformDataToJSON(sortedByCount);

		callback(error, _.map(_.sortByOrder(unsortedJSON, 'quantity', 'asc'))
									.splice(-10));
	});
}


function transformDataToJSON(content) {
	'use strict';
	var output = [];

	_.forIn(content, function(value, key) {
		output.push({
			name: key,
			quantity: content[key]
		});
	});
	return output;
}

function calculateByFrequency(content) {
	'use strict';
	return _.reduce(content, function(countMap, word) {
		countMap[word] = ++countMap[word] || 1;
		return countMap;
	}, {});
}

function filterByLength(content) {
	'use strict';
	return _.filter(content.split(' '), function(n) {
		return n.length > 2 && n.length < 8;
	});
}

function clearTheParsedText(content) {
	'use strict';
	return content
		.replace(/\s+/g, " ")
		.replace(/[^a-zA-Z ]/g, "")
		.toLowerCase()
		.toString();
}

module.exports = wordcounter;
