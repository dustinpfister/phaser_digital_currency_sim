var Portfolio = function () {

    this.dollars = 10;
    this.buyRateDollars = 10;
    this.maxBuyPoints = 1;
    this.coins = {};

};

// check the given digital currency
// and if it is low, buy
Portfolio.buyCheck = function (digiCur) {

    // if no buy points array create one
    if (!this.coins[digiCur.name]) {
        this.coins[digiCur.name] = {
            buyPoints: []
        }
    }

    var per = digiCur.rate / (digiCur.maxRate - digiCur.baseRate),
    coin = this.coins[digiCur.name];

    // if low
    if (per <= 0.33) {

        // if buy points is less than max, and there is money, buy
        if (coin.buyPoints.length < this.maxBuyPoints && this.dollars >= this.buyRateDollars) {

            coin.buyPoints.push({

                amount: this.buyRateDollars * digiCur.rate,
                rate: digiCur.rate

            });

        }

    }

};
