/*
 * TripJoin API
 */

 var data = {
 	"trips": [
 		{
 			"destination": "Guam",
 			"month": 'May',
 			"year": "2014"
 		},
 		{
 			"destination": "Val D'Isere, France",
 			"month": 'December',
 			"year": "2013"
 		}
 	]
 };

exports.trips = function (req, res) {
	var trips = [];
	data.trips.forEach( function(trip, i) {
		trips.push({
			id: i,
			destination: trip.destination,
			month: trip.month,
			year: trip.year
		});
	})
	res.json({trips: trips});
};

exports.trip = function (req, res) {
	var id = req.params.id;
	if(id >= 0 && id < data.trips.length) {
		res.json({
			trip: data.trips[id]
		});
	} else {
		res.json(false);
	}
};

exports.newTrip = function(req, res) {
	data.trips.push(req.body);
	res.json(req.body);
};

exports.editTrip = function(req, res) {
	var id = req.params.id;

	if(id >= 0 && id < data.trips.length) {
		data.trips[id] = req.body;
		res.json(true);
	} else {
		res.json(false);
	}
};

exports.deleteTrip = function(req, res) {
	var id = req.params.id;

	if(id >= 0 && id < data.trips.length) {
		data.trips.splice(id, 1);
		res.json(true);
	} else {
		res.json(false);
	}
};