//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// ref: https://sequelize.org/v5/manual/data-types.html
// Sequelize.Model.init(attributes, options)

// The table name in database is `persons` which corresponds to this Model
//
// batch_is_morning: true/false | Whether she has opted for morning / evening batch
// group_name: Nov 2018 | Stored in model.batch 
// table name is `people` which is generated automatically from `person`

const getPersonModel = function(sequelize){

	class Person extends Model {}

	Person.init({
		name: Sequelize.STRING,
		phone: Sequelize.INTEGER,
		batch_is_morning: Sequelize.BOOLEAN,
		group_name: Sequelize.STRING
	},{
		sequelize: sequelize,
		modelName: 'person',
		timestamps: true
	});

	return Person;
}

module.exports = getPersonModel;