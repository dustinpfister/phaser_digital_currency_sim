var Portfolio = function () {

    this.dollars = 10;
    this.buyRateDollars = 10;
    this.maxBuyPoints = 10;
    this.coins = {};

};

Portfolio.prototype.purgeOldBuyPoints = function () {

    var coins = this.coins,
    coinName;

    for (coinName in coins) {

        var buyPoints = coins[coinName].buyPoints;

        var i = buyPoints.length;
        while (i--) {

            if (buyPoints[i].amount === 0) {

                buyPoints.splice(i, 1);

            }

        }

    }

};

// check the given digital currency
// and if it is low, buy
Portfolio.prototype.buyCheck = function (digiCur) {

    // if no buy points array create one
    if (!this.coins[digiCur.name]) {
        this.coins[digiCur.name] = {
            buyPoints: []
        }
    }

    var per = digiCur.rate / (digiCur.maxRate - digiCur.baseRate),
    coin = this.coins[digiCur.name],
    port = this;

    // if low
    if (per <= 0.33) {

        // if buy points is less than max, and there is money, buy
        if (coin.buyPoints.length < this.maxBuyPoints && this.dollars >= this.buyRateDollars) {

            coin.buyPoints.push({

                amount: this.buyRateDollars / digiCur.rate,
                rate: digiCur.rate

            });

            this.dollars -= this.buyRateDollars;

        }

    }

    // if high
    if (per <= 0.66) {

        coin.buyPoints.forEach(function (buyPoint) {

            if (digiCur.rate > buyPoint.rate) {

                port.dollars += buyPoint.amount * digiCur.rate;
                buyPoint.amount = 0;

            }

        });

        this.purgeOldBuyPoints();

    }

};
