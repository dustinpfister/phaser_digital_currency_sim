

var DigiCur = function (opt) {

    opt = opt || {};

    this.name = opt.name || 'floppyCoint';
    this.baseRate = opt.baseRate || 0.01;
    this.maxRate = opt.maxRate || 0.25;
    this.maxHistory = opt.maxHistory || 10;

    this.tickNum = 0;
    this.history = [];

};

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

var dc = new DigiCur({

        name: 'dogeCoin',
        baseRate: 0.0005,
        maxRate: 0.092

    });

dc.tick();
dc.tick();
dc.tick();
dc.tick();
dc.tick();
dc.tick();
dc.tick();
dc.tick();
dc.tick();
dc.tick();

console.log(dc);

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = game.data || {};

    }

});

game.state.start('demo');
