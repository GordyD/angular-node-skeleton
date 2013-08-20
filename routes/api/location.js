var db = require('../../lib/db.js');

/*
 * TriJoin /location API
 */

exports.collection = function (req, res) {
	var offset = req.params.offset | 0;
	var limit = req.param.id | 10;
	db.query('SELECT * FROM location').then(
		function woo(result) {
			res.json({locations: result.rows});
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
		db.query('SELECT * FROM location WHERE id = ' + id).then(
			function woo(result) {
				res.json({location: result.rows[0]});
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

function parseGeoLocation(geolocation) {
	var location = [];
	return location;
}

exports.create = function(req, res) {
	if(!req.body.geolocation) {
		res.json(false);
		return;
	}
	var insert = 'INSERT INTO location (canonical, city, region, country, coordinates) VALUES($1,$2,$3,$4,$5)',
	params = [req.body.geolocation.name, req.body.geolocation.city, req.body.year];
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
	var insert = 'UPDATE location SET destination = $2, month = $3, year = $4 WHERE id = $1',
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
	var insert = 'DELETE FROM locations WHERE id = $1',
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