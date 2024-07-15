import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

addRxPlugin(RxDBDevModePlugin);

const todoSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string'
        },
        done: {
            type: 'boolean'
        },
        timestamp: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['id', 'name', 'done', 'timestamp']
};

const createDatabase = async () => {
    const db = await createRxDatabase({
        name: 'mydatabase',
        storage: getRxStorageDexie(),
        ignoreDuplicate: true 
    });

    await db.addCollections({
        todos: {
            schema: todoSchema
        }
    });

    return db;
};

export { createDatabase };