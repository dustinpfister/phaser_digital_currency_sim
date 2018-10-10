
// Digital Currency Class
var DigiCur = function (opt) {

    opt = opt || {};

    this.name = opt.name || 'floppyCoint';
    this.baseRate = opt.baseRate || 0.001;
    this.maxRate = opt.maxRate || 0.25;
    this.maxHistory = opt.maxHistory || 10;
    this.tickNum = 0;
    this.history = [];
    this.rate = this.baseRate;

    this.tick(this.maxHistory);

};

// tick the currency
DigiCur.prototype.tick = function (count) {

    var len;

    count = count || 1;
    while (count--) {

        this.rate = this.baseRate + Math.random() * (this.maxRate - this.baseRate);

        // push ne history object
        this.history.push({
            tickNum: this.tickNum,
            rate: this.rate
        });

        // history length
        len = this.history.length;

        // step tick number
        this.tickNum += 1;

    }

    // purge old history
    if (len > this.maxHistory) {
        this.history = this.history.splice(len - this.maxHistory, this.maxHistory);
    }

};

// draw to the given phaser graphics object
DigiCur.prototype.drawToGfx = function (gfx, port) {

    gfx.clear();
    gfx.lineStyle(3, 0x00ff00);

    var points = [],
    digi = this;

    this.history.forEach(function (tick, i) {

        var x = 10 + i * (240 / digi.maxHistory),
        y = 120 - (tick.rate / digi.maxRate) * 50;

        // if we have a portfolio
        if (port) {

            for (var coinName in port.coins) {

                port.coins[coinName].buyPoints.forEach(function (bp) {

                    if (bp.tickNum === tick.tickNum) {

                        gfx.drawCircle(x, y, 10);

                    }

                });
            }
        }

        points.push(x, y);

    })

    gfx.drawPolygon(points);

};
