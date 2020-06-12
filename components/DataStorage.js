import Datastore from '../node_modules/react-native-local-mongodb';

export const storeDataAsync = async (pData) => {
    var db = new Datastore({
        filename: "../DataStore/locations.db", autoload: true
    });

    return await db.insertAsync(pData);
};