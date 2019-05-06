var mysql = require('mysql');

module.exports = {

	connect : function() {
		return new Promise (function(resolve, reject) {
			var conn = mysql.createConnection({
				host    : 'db4free.net',
				user    : 'csma_client',
				password: '123456789',
				database: 'csma_test'
			});
			conn.connect(function(err) {
				if (err) reject(10002);
				resolve(conn);
			});
		});
	}
}