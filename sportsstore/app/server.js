/**
 * Created by dseet on 4/25/2014.
 */
var connect = require('connect');
connect.createServer(connect.static(".")).listen(3000);
console.log('Server running at http://localhost:3000/')
