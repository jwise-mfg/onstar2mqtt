const _ = require('lodash');
const convert = require('convert-units');

class Measurement {
    static CONVERTABLE_UNITS = [
        '°C',
        'km',
        'kPa',
        'km/l(e)'
    ];

    constructor(value, unit) {
        this.value = value;
        this.unit = Measurement.correctUnitName(unit);
        this.isConvertible = _.includes(Measurement.CONVERTABLE_UNITS, this.unit);
    }

    /**
     * Would be nice if GM used sane unit labels.
     * @param {string} unit
     * @returns {string}
     */
    static correctUnitName(unit) {
        switch (unit) {
            case 'Cel':
                return '°C';
            case 'kwh':
                return 'kWh';
            case 'KM':
                return 'km';
            case 'KPa':
                return 'kPa';
            case 'kmple':
                return 'km/l(e)';
            case 'volts':
            case 'Volts':
                return 'V';
            // these are states
            case 'Stat':
            case 'N/A':
                return undefined;

            default:
                return unit;
        }
    }

    /**
     *
     * @param {string|number} value
     * @param {string} unit
     * @returns {string|number}
     */
    static convertValue(value, unit) {
        switch (unit) {
            case '°C':
                value = convert(value).from('C').to('F');
                break;
            case 'km':
                value = convert(value).from('km').to('mi');
                break;
            case 'kPa':
                value = convert(value).from('kPa').to('psi');
                break;
            case 'km/l(e)':
                // km/L =  (1.609344 / 3.785411784) * MPG
                value = value / (1.609344 / 3.785411784);
                break;
        }
        return value;
    }

    /**
     *
     * @param {string} unit
     * @returns {string}
     */
    static convertUnit(unit) {
        switch (unit) {
            case '°C':
                return '°F';
            case 'km':
                return 'mi';
            case 'kPa':
                return 'psi';
            case 'km/l(e)':
                return 'mpg(e)';
            default:
                return unit;
        }
    }

    toString() {
        return `${this.value}${this.unit}`;
    }
}

module.exports = Measurement;