//
// Batch : Nov 2018, Dec 2018
// name: Day1, Day2
//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// Sequelize.Model.init(attributes, options)
// ref: https://sequelize.org/v5/manual/data-types.html

const getDayModel = function(sequelize){

	class Day extends Model {}

	Day.init({
		name: Sequelize.STRING,
		date: Sequelize.DATEONLY,
		batchName: Sequelize.STRING,
		batchId: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'day',
		timestamps: true
	});

	return Day;
}

module.exports = getDayModel;