var trip = require('../../lib/api/trip.js');
var location = require('../../lib/api/location.js');

/*
 * TripJoin /trip API
 */
exports.collection = function (req, res) {
	trip.collection().then(
		function woo(result) {
			console.log('awesome');
			res.json({trips: result.rows});
		},
		function ahh(err) {
			res.json(err);
		}
	);
};

exports.get = function (req, res) {
	trip.get(req.params.id).then(
		function woo(result) {
			res.json({trip: result.rows[0]});
		},
		function ahh(err) {
			res.json(err);
		}
	);
};

exports.create = function(req, res) {
	trip.create(1,req.body.month, req.body.year, req.body.duration, req.body.budget, req.body.image_url, req.body.description).then(
		function woo(result) {
			res.json(result);
		},
		function ahh(err) {
			res.json(err)
		}
	);
};

exports.edit = function(req, res) {
	trip.edit(req.params.id,req.body.month, req.body.year, req.body.duration, req.body.budget, req.body.image_url, req.body.description).then(
		function woo(result) {
			res.json(result);
		},
		function ahh(err) {
			res.json(err);
		}
	);
};

exports.delete = function(req, res) {
	trip.delete(req.params.id).then(
		function woo(result) {
			res.json(result);
		},
		function ahh(err) {
			res.json(err);
		}
	);
};