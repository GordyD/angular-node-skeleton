var location = require('../../lib/api/location.js');
/*
 * TriJoin /location API
 */

exports.collection = function (req, res) {
	var offset = req.params.offset | 0;
	var limit = req.params.id | 10;
	var canonical = req.params.canonical | undefined;
	location.collection(canonical, offset, limit).then(
		function woo(result) {
			res.json({locations: result.rows});
		},
		function ahh(err) {
			res.json(err);
		}
	);
};

exports.get = function (req, res) {
	location.get(req.params.id).then(
		function woo(result) {
			res.json({location: result.rows[0]});
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

function parseGeoLocation(geolocation) {
	var location = [];
	return location;
}

exports.create = function(req, res) {
	if(!req.body.geoinfo) {
		res.json(false);
		return;
	}
	location.create(req.body.geoinfo).then(
		function woo(result) {
			res.json(result);
		},
		function ahh(err) {
			res.json(err);
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