var member = require('../../lib/api/member.js');
var url = require('url');
/*
 * TripJoin  /user API
 */

exports.collection = function (req, res) {
	member.collection(req.query.facebook_id).then(
		function woo(result) {
			res.json({members: result.rows});
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.get = function (req, res) {
	member.get(req.params.id).then(
		function woo(result) {
			res.json({member: result.rows[0]});
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.create = function(req, res) {
	member.create(req.body.first_name, req.body.last_name, req.body.facebook_id, req.body.image_url).then(
		function woo(result) {
			res.json(result);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.edit = function(req, res) {
	member.edit(req.params.id, req.body.first_name, req.body.last_name, req.body.image_url).then(
		function woo(result) {
			res.json(result);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.delete = function(req, res) {
	member.delete(req.params.id).then(
		function woo(result) {
			res.json(true);
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};