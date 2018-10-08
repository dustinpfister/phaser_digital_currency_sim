
// Digital Currency Class
var DigiCur = function (opt) {

    opt = opt || {};

    this.name = opt.name || 'floppyCoint';
    this.baseRate = opt.baseRate || 0.01;
    this.maxRate = opt.maxRate || 0.25;
    this.maxHistory = opt.maxHistory || 10;
    this.tickNum = 0;
    this.history = [];

    this.tick(this.maxHistory);

};

// tick the currency
DigiCur.prototype.tick = function (count) {

    var len;

    count = count || 1;
    while (count--) {

        // push ne history object
        this.history.push({
            tickNum: this.tickNum,
            rate: this.baseRate + Math.random() * (this.maxRate - this.baseRate)
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
DigiCur.prototype.drawToGfx = function (gfx) {

    gfx.clear();
    gfx.lineStyle(3, 0x00ff00);

    var points = [],
    digi = this;

    this.history.forEach(function (tick, i) {

        var x = 50 + i * 25,
        y = 200 - (tick.rate / digi.maxRate) * 100;

        points.push(x, y);

    })

    gfx.drawPolygon(points);

};

// Create Graph
var createGraph = function (game) {

    // add a graphics object to the world
    var gfx = game.data.gfx = game.add.graphics(0, 0);

    gfx.lineStyle(3, 0x00ff00);
    //gfx.drawPolygon([0, -100, 100, 0, 0, 100, -50, 100, -50, 50, -100, 50, -100, -50, -50, -50, -50, -100, 0, -100]);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = game.data || {};

        game.data.dc = new DigiCur({
                name: 'dogeCoin',
                baseRate: 0.0005,
                maxRate: 0.092
            });

        createGraph(game);

        game.data.dc.drawToGfx(game.data.gfx);

        console.log(game.data.dc.history);

    },

    update: function () {}

});

game.state.start('demo');
