
// Digital Currency Class
var DigiCur = function (opt) {

    opt = opt || {};

    this.name = opt.name || 'floppyCoint';
    this.baseRate = opt.baseRate || 0.01;
    this.maxRate = opt.maxRate || 0.25;
    this.maxHistory = opt.maxHistory || 10;
    this.tickNum = 0;
    this.history = [];

};

// tick the currency
DigiCur.prototype.tick = function () {

    // history length
    var len = this.history.length;

    // push ne history object
    this.history.push({
        tickNum: this.tickNum,
        rate: this.baseRate + Math.random() * (this.maxRate - this.baseRate)
    });

    // purge old history
    if (len > this.maxHistory) {
        this.history = this.history.splice(len - this.maxHistory, this.maxHistory);
    }

    // step tick number
    this.tickNum += 1;

};

// draw to the given phaser graphics object
DigiCur.drawToGfx = function (gfx) {

    gfx.clear();

}

// Create Graph
var createGraph = function (game) {

    // add a graphics object to the world
    var gfx = game.data.gfx = game.add.graphics(game.world.centerX, game.world.centerY);

    gfx.lineStyle(3, 0x00ff00);
    gfx.drawPolygon([0, -100, 100, 0, 0, 100, -50, 100, -50, 50, -100, 50, -100, -50, -50, -50, -50, -100, 0, -100]);

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

    },

    update: function () {}

});

game.state.start('demo');
