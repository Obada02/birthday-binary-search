const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Converts a date to a day number (1-365)
export const dateToDayNumber = (month, day) => {
    let dayNumber = 0;
    for (let i = 0; i < month - 1; i++) {
        dayNumber += monthDays[i];
    }
    dayNumber += day;
    return dayNumber;
};

// Converts a day number (1-365) to a date
export const dayNumberToDate = (dayNumber) => {
    let month = 1;
    while (dayNumber > monthDays[month - 1]) {
        dayNumber -= monthDays[month - 1];
        month++;
        if (month > 12) break;
    }
    const day = dayNumber;
    return { month, day };
};

// Formats the date into a readable string
export const formatDate = ({ month, day }) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[month - 1]} ${day}`;
};