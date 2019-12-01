//
// This is attendance sheet
//
// 
//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// Sequelize.Model.init(attributes, options)
// ref: https://sequelize.org/v5/manual/data-types.html

const getPresentModel = function(sequelize){

	class Present extends Model {}

	Present.init({
		nameOfPerson: Sequelize.STRING,
		date: Sequelize.DATEONLY,
		isOnMorning: Sequelize.BOOLEAN,
		isOnEvening: Sequelize.BOOLEAN,
		isAbsent: Sequelize.BOOLEAN,
		isCalled: Sequelize.BOOLEAN,
		callResponse: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'present',
		timestamps: true
	});

	return Present;
}

module.exports = getPresentModel;