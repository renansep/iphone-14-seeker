const axios  = require('axios');
const models = require('./constants/models');
const { exec } = require('child_process');
const { exit } = require('process');

module.exports = (model) => {
    // const modelName = models[model];

    // console.log(`Checking ${modelName} availability 🕑`);

    // return axios({
    //     method: 'get',
    //     responseType: 'json',
    //     url: `https://www.apple.com/shop/fulfillment-messages?pl=true&mts.0=regular&mts.1=compact&cppart=UNLOCKED/US&parts.0=${model}&location=33442`
    // })
    // .then(function (response) {
    //     const stores = response.data['body']['content']['pickupMessage']['stores'];
    //     for (const store of stores) {
    //         if (store['partsAvailability'][model]['pickupDisplay'] == 'available') {
    //             console.log(`${models[model]} available ✅`);
    //             exec('afplay sounds/iphone_found.mp3');
    //             break;
    //         }
    //     }

    //     console.log(`${modelName} unavailable ❌`);
    //     console.log(``);
    // });

    console.log(`${new Date().toISOString()} - Checking iPhone 14 Pro Max availability 🕑`);

    return axios({
        method: 'get',
        responseType: 'json',
        url: `https://www.apple.com/shop/pickup-message-recommendations?mts.0=regular&mts.1=compact&cppart=UNLOCKED/US&location=33442&store=R271&product=MQ8Q3LL/A`
    }).then(function (response) {
        const recommendedProducts = response.data['body']['PickupMessage']['recommendedProducts'];

        if (recommendedProducts.length > 0) {
            console.log(`Recommended products: ${recommendedProducts}`);
        }

        var foundValidProduct = false;

        for (const recommendedProduct of recommendedProducts) {
            if (models[recommendedProduct] != null) {
                exec(`say "${models[recommendedProduct]}"`);
                console.log(`${models[recommendedProduct]} available ✅`);
                foundValidProduct = true;
            }
        }

        if (foundValidProduct) {
            // exec('say -v Luciana "Encontrei um iPhone."');
        } else {
            console.log(`Nothing available ❌`);
        }

        console.log(``);
    }).catch(function (error) {
        exec('say -v Luciana "Deu ruim."');
    });
}