var db = require('../../lib/db.js');

/*
 * TripJoin  /user API
 */

exports.collection = function (req, res) {
	db.query('SELECT * FROM user').then(
		function woo(result) {
			res.json({users: result.rows});
		},
		function ahh(err) {
			console.error(err);
			res.json(false);
		}
	);
};

exports.get = function (req, res) {
	var id = req.params.id;
	if(id > 0) {
		db.query('SELECT * FROM user WHERE id = ' + id).then(
			function woo(result) {
				res.json({user: result.rows[0]});
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
	var insert = 'INSERT INTO user (first_name, last_name, facebook_id, image_url) VALUES($1,$2,$3,$4)',
	params = [req.body.first_name, req.body.last_name, req.body.facebook_id, req.body.image_url];
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
	var insert = 'UPDATE user SET first_name = $2, last_name = $3, image_url = $4 WHERE id = $1',
	params = [req.params.id, req.body.first_name, req.body.last_name, req.body.image_url];
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
	var insert = 'DELETE FROM user WHERE id = $1',
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