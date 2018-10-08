var Portfolio = function () {

    this.buyPoints = {};

};

// check the given digital currency
// and if it is low, buy
Portfolio.buyCheck = function (digiCur) {

    // if no buy points array create one
    if (!this.buyPoints[digiCur.name]) {
        this.buyPoints[digiCur.name] = []
    }

    var per = digiCur.maxRate - digiCur.baseRate;

};
