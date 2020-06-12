export default class Location {
    name;
    notes;
    longitude;
    latitude;
    date;
    approxAddress;

    constructor(name, notes, longitude, latitude, date, approxAddress) {
        this.name = name;
        this.notes = notes;
        this.longitude = longitude;
        this.latitude = latitude;
        this.date = date;
        this.approxAddress = approxAddress;
    }
}