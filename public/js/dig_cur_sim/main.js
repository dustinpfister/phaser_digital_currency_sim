

// Create Graph
var createGraph = function (game) {

    // add a graphics object to the world
    var gfx = game.data.gfx = game.add.graphics(10, 30);

    gfx.lineStyle(3, 0x00ff00);
    //gfx.drawPolygon([0, -100, 100, 0, 0, 100, -50, 100, -50, 50, -100, 50, -100, -50, -50, -50, -50, -100, 0, -100]);

};

var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.state.add('demo', {

    create: function () {

        game.data = game.data || {

            dollars: 0,
            portfolio: new Portfolio()
        };

        game.data.dc = new DigiCur({
                name: 'dogeCoin',
                baseRate: 0.0005,
                maxRate: 0.092,
                maxHistory: 60
            });

        createGraph(game);

        game.data.dc.drawToGfx(game.data.gfx);

        game.data.disp = game.add.text(10, 10, 'foo', {
                fill: 'white',
                font: '15px courier'
            });

    },

    update: function () {

        var dc = game.data.dc,
        port = game.data.portfolio;

        dc.tick();
        dc.drawToGfx(game.data.gfx);

        port.buyCheck(dc);

        game.data.disp.text = 'Dollars: ' + port.dollars.toFixed(2)

    }

});

game.state.start('demo');
