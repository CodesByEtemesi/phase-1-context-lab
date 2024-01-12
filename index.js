/* Your Code Here */
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}


const testEmployee = ["Gray", "Worm", "Security", 1];
const employeeRecord = createEmployeeRecord(testEmployee);
console.log(employeeRecord);


function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employeeArray => createEmployeeRecord(employeeArray));
}

const twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
];

const employeeRecords = createEmployeeRecords(twoRows);

// Log the created employee records to the console
console.log(employeeRecords);



function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return this; // Return the updated employee record
}

// Example usage:
const bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
const updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400");
const newEvent = updatedBpRecord.timeInEvents[0];

// Log the created timeIn event to the console
console.log(newEvent);




function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return this; // Return the updated employee record
}

// Example usage:
// const bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
// const updatedBpRecord = createTimeOutEvent.call(bpRecord, "2015-02-28 1700");
// const newEvent = updatedBpRecord.timeOutEvents[0];

console.log(newEvent);


function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    if (!timeInEvent || !timeOutEvent) {
        // Handle the case where either timeInEvent or timeOutEvent is not found for the given date
        console.error("TimeInEvent or TimeOutEvent not found for the given date");
        return 0;
    }

    return timeOutEvent.hour/100 - timeInEvent.hour/100;
}

// Example usage:
const cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 10.00]);
createTimeInEvent.call(cRecord, "2044-03-15 0900");
createTimeOutEvent.call(cRecord, "2044-03-15 1100");

// Calculate and log the hours worked on the specified date
const workedHours = hoursWorkedOnDate.call(cRecord, "2044-03-15");
console.log(`Hours worked on 2044-03-15: ${workedHours}`);


// Assume that createEmployeeRecord, createTimeInEvent, createTimeOutEvent, and hoursWorkedOnDate are already defined

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payOwed = hoursWorked * this.payPerHour;
    return payOwed;
}

// Example usage:
// const cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
createTimeInEvent.call(cRecord, "2044-03-15 0900");
createTimeOutEvent.call(cRecord, "2044-03-15 1100");

// Calculate and log the wages earned on the specified date
const earnedWages = wagesEarnedOnDate.call(cRecord, "2044-03-15");
console.log(`Wages earned on 2044-03-15: $${earnedWages}`);




function createEmployeeRecords(srcArray) {
    return srcArray.map(employeeArray => createEmployeeRecord(employeeArray));
}

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
];

// const employeeRecords = createEmployeeRecords(src);

// Log the created employee records to the console
console.log(employeeRecords);




function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
}

// Example usage:
// let src = [
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150]
// ];

let emps = createEmployeeRecords(src);
let loki = findEmployeeByFirstName(emps, "Loki");

// Log the information of the found employee to the console
console.log(loki);





/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

