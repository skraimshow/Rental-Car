const { calculateRentalPrice } = require('./rentalPrice');

describe('calculateRentalPrice', () => {
    test('Driver under 18', () => {
        const result = calculateRentalPrice('LocationA', 'LocationB', '2023-06-01', '2023-06-05', 'Compact', 17);
        expect(result).toBe("Driver too young - cannot quote the price");
    });

    test('Driver 18-21 can only rent Compact', () => {
        const result = calculateRentalPrice('LocationA', 'LocationB', '2023-06-01', '2023-06-05', 'Racer', 19);
        expect(result).toBe("Drivers 21 y/o or less can only rent Compact vehicles");
    });

    test('High season pricing', () => {
        const result = calculateRentalPrice('LocationA', 'LocationB', '2023-06-01', '2023-06-10', 'Compact', 30);
        expect(result).toBe('$345.00');
    });

    test('Racer in high season for driver under 25', () => {
        const result = calculateRentalPrice('LocationA', 'LocationB', '2023-06-01', '2023-06-05', 'Racer', 24);
        expect(result).toBe('$207.00');
    });

    test('Renting for more than 10 days in low season', () => {
        const result = calculateRentalPrice('LocationA', 'LocationB', '2023-02-01', '2023-02-15', 'Compact', 30);
        expect(result).toBe('$405.00');
    });

    test('driver exactly 18', () => {
        const result = calculateRentalPrice('LocationA', 'LocationB', '2023-06-01', '2023-06-05', 'Compact', 18);
        expect(result).toBe('$103.50');
    });

    test('driver exactly 21', () => {
        const result = calculateRentalPrice('LocationA', 'LocationB', '2023-06-01', '2023-06-05', 'Compact', 21);
        expect(result).toBe('$120.75');
    });

    test('driver exactly 25 with Racer in high season', () => {
        const result = calculateRentalPrice('LocationA', 'LocationB', '2023-06-01', '2023-06-05', 'Racer', 25);
        expect(result).toBe('$215.62');
    });
});
