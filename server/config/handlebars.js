var hbs = require('hbs')
var fs = require('fs');
var template = fs.readFileSync('views/request.html', 'utf8');

hbs.registerHelper('json', function(obj) {
  return JSON.stringify(obj);
});

hbs.registerPartial('request', template);

module.exports = hbs