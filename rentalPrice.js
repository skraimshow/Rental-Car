function calculateRentalPrice(pickup, dropoff, pickupDate, dropoffDate, carType, driverAge) {
    const carClass = getCarClass(carType);
    const rentalDays = calculateRentalDays(pickupDate, dropoffDate);
    const season = determineSeason(pickupDate, dropoffDate);

    if (driverAge < 18) {
        return "Driver too young - cannot quote the price";
    }

    if (driverAge <= 21 && carClass !== "Compact") {
        return "Drivers 21 y/o or less can only rent Compact vehicles";
    }

    let rentalPrice = driverAge * rentalDays;

    if (carClass === "Racer" && driverAge <= 25 && season === "High") {
        rentalPrice *= 1.5;
    }

    if (season === "High") {
        rentalPrice *= 1.15;
    }

    if (rentalDays > 10 && season === "Low") {
        rentalPrice *= 0.9;
    }
    return '$' + rentalPrice.toFixed(2);
}

function getCarClass(type) {
    switch (type) {
        case "Compact":
            return "Compact";
        case "Electric":
            return "Electric";
        case "Cabrio":
            return "Cabrio";
        case "Racer":
            return "Racer";
        default:
            return "Unknown";
    }
}

function calculateRentalDays(pickupDate, dropoffDate) {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    return Math.round(Math.abs((dropoff - pickup) / oneDayInMilliseconds)) + 1;
}

function determineSeason(pickupDate, dropoffDate) {
    const HIGH_SEASON_START = 4; // May (0-based month index)
    const HIGH_SEASON_END = 10; // October (0-based month index)

    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    const pickupMonth = pickup.getMonth();
    const dropoffMonth = dropoff.getMonth();

    if (
        (pickupMonth >= HIGH_SEASON_START && pickupMonth <= HIGH_SEASON_END) ||
        (dropoffMonth >= HIGH_SEASON_START && dropoffMonth <= HIGH_SEASON_END) ||
        (pickupMonth < HIGH_SEASON_START && dropoffMonth > HIGH_SEASON_END)
    ) {
        return "High";
    } else {
        return "Low";
    }
}

module.exports = {
    calculateRentalPrice
};
