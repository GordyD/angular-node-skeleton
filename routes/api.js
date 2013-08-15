var db = require('../lib/db.js');

/*
 * TripJoin API
 */

exports.trips = function (req, res) {
	db.query('SELECT * FROM trips').then(
		function woo(result) {
			res.json({trips: result});
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.trip = function (req, res) {
	var id = req.params.id;
	if(id >= 0) {
		db.query('SELECT * FROM trips WHERE id = ' + id).then(
			function woo(result) {
				res.json({trip: result[0]});
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

exports.newTrip = function(req, res) {
	var insert = 'INSERT INTO trips (destination, month, year) VALUES($1,$2,$3)',
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

exports.editTrip = function(req, res) {
	var insert = 'UPDATE trips SET destination = $2, month = $3, year = $4 WHERE id = $1',
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

exports.deleteTrip = function(req, res) {
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