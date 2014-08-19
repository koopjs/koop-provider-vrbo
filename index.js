exports.name = 'vrbo';
exports.pattern = '/:minx/:miny/:maxx/:maxy';
exports.controller = require('./controller');
exports.routes = require('./routes');
exports.model = require('./models/vrbo.js');  
