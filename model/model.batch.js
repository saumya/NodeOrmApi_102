//
// Batch : Nov 2018, Dec 2018
//
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// Sequelize.Model.init(attributes, options)

const getBatchModel = function(sequelize){

	class Batch extends Model {}

	Batch.init({
		name: Sequelize.STRING,
	},{
		sequelize: sequelize,
		modelName: 'batch',
		timestamps: true
	});

	return Batch;
}

module.exports = getBatchModel;