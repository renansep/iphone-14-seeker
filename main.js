const checkAvailability = require('./check_availability');
const models            = require('./constants/models');
const sleep             = require('system-sleep')

// function check() {  
//     for (const model in models) {
//         sleep(5000)
//         checkAvailability(model);
//     }
//     check();
// }

// check();

function check() {
    checkAvailability('');  
    sleep(5000);
    check();
}

check();

// cron.schedule('0 * * * * *', () => {
//     checkAvailability('MQ8V3LL/A');
// });

// cron.schedule('15 * * * * *', () => {
//     checkAvailability('MQ8U3LL/A');
// });

// cron.schedule('30 * * * * *', () => {
//     checkAvailability('MQ8T3LL/A');
// });

// cron.schedule('45 * * * * *', () => {
//     checkAvailability('MQ8W3LL/A');
// });