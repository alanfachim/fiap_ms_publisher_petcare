"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
class Location {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.isValid();
    }
    isValid() {
        if (!this.latitude) {
            throw new Error('Latitude não informada');
        }
        else if (this.latitude < -90 || this.latitude > 90) {
            throw new Error('Latitude inválida');
        }
        if (!this.longitude) {
            throw new Error('Longitude não informada');
        }
        else if (this.longitude < -180 || this.longitude > 180) {
            throw new Error('Longitude inválida');
        }
    }
    distance(location) {
        const R = 6371e3; // metres
        const φ1 = this.latitude * Math.PI / 180;
        const φ2 = location.latitude * Math.PI / 180;
        const Δφ = (location.latitude - this.latitude) * Math.PI / 180;
        const Δλ = (location.longitude - this.longitude) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
exports.Location = Location;
//# sourceMappingURL=Location.js.map