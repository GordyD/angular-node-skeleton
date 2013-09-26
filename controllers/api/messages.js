var data = [
	{
		id: 0,
		name: 'Gordon',
		message: 'We are going to be awesome at this Hackathon. I am going to angular the f**k out of our hack idea'
	},
	{
		id: 1,
		name: 'Jonathan',
		message: 'I think so too, I am going to mash the s**t out of some apis!'
	},
	{
		id: 2,
		name: 'Duylam',
		message: 'And I am going to magic up some super spectacular designs that will BLOW your mind'
	},
	{
		id: 3,
		name: 'Sara',
		message: 'And I am going to write some of the most sexy HTML5 you have ever seen, these designs are going to come to life!'
	}
];

exports.collection = function (req, res) {
	res.json(data);
};

exports.get = function (req, res) {
	if (data.length <= req.params.id) {
		res.status(404);
		res.json({error: 'This entry does not exist'});
	} else {
		res.json(data[req.params.id]);
	}
};

exports.create = function(req, res) {
};

exports.edit = function(req, res) {
};

exports.delete = function(req, res) {
};
