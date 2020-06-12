import Datastore from 'react-native-local-mongodb';

const STORAGE_KEY = 'locations';

export default class LocationService {
    static getDatastore() {
        return new Datastore({filename: STORAGE_KEY, autoload: true});
    }

    static async getAllAsync() {
        return await this.getDatastore().findAsync({});
    }

    static async getByIdAsync(id) {
        return await this.getDatastore().findOneAsync({_id: id});
    }

    static async addAsync(location) {
        // Location object must be passed
        return await this.getDatastore().insertAsync(location);
    }

    static async updateByIdAsync(id, name, notes) {
        // _id is assumed to exist in the passed object
        // This means that the passed arg is not a Location object, but an object returned from the Datastore.
        return await this.getDatastore().updateAsync({_id: id}, {$set: {name, notes}});
    }

    static async deleteByIdAsync(id) {
        return await this.getDatastore().removeAsync({_id: id});
    }
}