/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'rncq13xn',
				name: 'appearanceMode',
				type: 'select',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					values: ['light', 'dark', 'system']
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

		// remove
		collection.schema.removeField('rncq13xn');

		return dao.saveCollection(collection);
	}
);
