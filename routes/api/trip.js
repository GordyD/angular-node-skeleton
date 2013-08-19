var db = require('../../lib/db.js');

/*
 * TripJoin API
 */

exports.collection = function (req, res) {
	db.query('SELECT * FROM trip').then(
		function woo(result) {
			res.json({trips: result.rows});
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.get = function (req, res) {
	var id = req.params.id;
	if(id >= 0) {
		db.query('SELECT * FROM trip WHERE id = ' + id).then(
			function woo(result) {
				res.json({trip: result.rows[0]});
			},
			function ahh(err) {
				console.error(err);
				res.json(false);
			}
		);
	} else {
		res.json(false);
	}
};

exports.create = function(req, res) {
	var insert = 'INSERT INTO trip (destination, month, year) VALUES($1,$2,$3)',
	params = [req.body.destination, req.body.month, req.body.year];
	db.query(insert,params).then(
		function woo(result) {
			res.json(req.body);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.edit = function(req, res) {
	var insert = 'UPDATE trip SET destination = $2, month = $3, year = $4 WHERE id = $1',
	params = [req.params.id, req.body.destination, req.body.month, req.body.year];
	db.query(insert,params).then(
		function woo(result) {
			res.json(req.body);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.delete = function(req, res) {
	var insert = 'DELETE FROM trips WHERE id = $1',
	params = [req.params.id];
	db.query(insert,params).then(
		function woo(result) {
			res.json(true);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};