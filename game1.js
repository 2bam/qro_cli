var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Boot = /** @class */ (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Boot.prototype.preload = function () {
        this.load.baseURL = 'https://2bam.github.io/qro_cli/';
        this.load.crossOrigin = 'anonymous';
        this.load.image('preloadBar', 'assets/loader.png');
    };
    Boot.prototype.create = function () {
        //  Unless you specifically need to support multitouch I would recommend setting this to 1
        this.input.maxPointers = 1;
        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;
        if (this.game.device.desktop) {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else {
            //  Same goes for mobile settings.
        }
        //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.stage.scale.minWidth = 480;
        //this.stage.scale.minHeight = 260;
        //this.stage.scale.maxWidth = 1024;
        //this.stage.scale.maxHeight = 768;
        //this.stage.scale.forceLandscape = true;
        //this.stage.scale.pageAlignHorizontally = true;
        this.game.state.start('Preloader', true, false);
    };
    return Boot;
}(Phaser.State));
var Preloader = /** @class */ (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preloader.prototype.preload = function () {
        //  Set-up our preloader sprite
        this.preloadBar = this.add.sprite(20, 250, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);
        //  Load our actual games assets
        this.load.image('tetas', 'assets/tetas.png');
        this.load.image('titlepage', 'assets/titlepage.jpg');
        this.load.image('logo', 'assets/logo.png');
        //this.load.audio('music', 'assets/title.mp3', true);
        this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
        this.load.image('level1', 'assets/level1.png');
    };
    Preloader.prototype.create = function () {
        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMainMenu, this);
    };
    Preloader.prototype.startMainMenu = function () {
        this.game.state.start('Login', true, false);
    };
    return Preloader;
}(Phaser.State));
var MainMenu = /** @class */ (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMenu.prototype.create = function () {
        this.background = this.add.sprite(0, 0, 'titlepage');
        this.background.alpha = 0;
        this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
        this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
        this.input.onDown.addOnce(this.fadeOut, this);
    };
    MainMenu.prototype.fadeOut = function () {
        this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startGame, this);
    };
    MainMenu.prototype.startGame = function () {
        this.game.state.start('Level1', true, false);
    };
    return MainMenu;
}(Phaser.State));
var Level1 = /** @class */ (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Level1.prototype.create = function () {
        this.background = this.add.sprite(0, 0, 'level1');
        //this.music = this.add.audio('music', 1, false);
        //this.music.play();
        this.player = new Player(this.game, 130, 284);
    };
    return Level1;
}(Phaser.State));
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(game, x, y) {
        var _this = _super.call(this, game, x, y, 'simon', 0) || this;
        _this.anchor.setTo(0.5, 0);
        _this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
        game.physics.arcade.enable(_this);
        game.add.existing(_this);
        return _this;
    }
    Player.prototype.update = function () {
        this.body.velocity.x = 0;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.body.velocity.x = -150;
            this.animations.play('walk');
            if (this.scale.x == 1) {
                this.scale.x = -1;
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.body.velocity.x = 150;
            this.animations.play('walk');
            if (this.scale.x == -1) {
                this.scale.x = 1;
            }
        }
        else {
            this.animations.frame = 0;
        }
    };
    return Player;
}(Phaser.Sprite));
/// <reference path='Boot.ts' />
/// <reference path='Preloader.ts' />
/// <reference path='MainMenu.ts' />
/// <reference path='Level1.ts' />
/// <reference path='Player.ts' />
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this, 500, 760, Phaser.AUTO, 'content', null) || this;
        _this.state.add('Boot', Boot, false);
        _this.state.add('Preloader', Preloader, false);
        _this.state.add('Login', Login, false);
        _this.state.add('Hunt', Hunt, false);
        //this.state.add('MainMenu', MainMenu, false);
        //this.state.add('Level1', Level1, false);
        _this.state.start('Boot');
        return _this;
    }
    return Game;
}(Phaser.Game));
/// <reference path='Game.ts' />
var ms;
window.onload = function () {
    if (1) {
        var sg = new Game();
    }
    else {
        //
        var scanner_1 = new Instascan.Scanner({
            //video: document.getElementById('preview')
            video: null,
            scanPeriod: 5
        });
        scanner_1.addListener('scan', function (content, image) {
            console.log(content);
            alert(content);
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                scanner_1.start(cameras[0]).then(function (x) {
                    //console.log("x", cameras[0]._stream);
                    //console.log("vid", game.vid);
                    //game.stream = cameras[0]._stream;
                    //game.vid.videoStream = cameras[0]._stream;
                    //game.vid.video = document.getElementById('preview') as HTMLVideoElement;
                    ms = cameras[0]._stream;
                    var sg = new Game();
                    //console.log("camstart", sg, sg.vid);
                });
            }
            else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }
};
//const SERVER: string = "http://localhost:6470";
//const SERVER: string = "http://192.168.1.6:6470";
var SERVER = "https://arcane-garden-75478.herokuapp.com"; //WITHOUT ENDING '/'
function commGet(url, onLoad, onError) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    var data = null;
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            //var data = JSON.parse(request.responseText);
            data = request.responseText;
            if (onLoad)
                onLoad(data);
        }
        else {
            // We reached our target server, but it returned an error
            onError(request.statusText, request.responseText);
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
        onError(request.statusText, '');
    };
    request.send();
}
var Hunt = /** @class */ (function (_super) {
    __extends(Hunt, _super);
    function Hunt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hunt.prototype.preload = function () {
    };
    Hunt.prototype.create = function () {
        var constraints = {
            audio: false,
            video: {
                mandatory: {
                    //sourceId: this.id,
                    minWidth: 600,
                    maxWidth: 800,
                    minAspectRatio: 1.6
                },
                optional: []
            }
        };
        //TODO: Due to a bug in IE11 you cannot play a video texture to a Sprite in WebGL. For IE11 force Canvas mode.
        var vid = this.vid = this.add.video();
        //this.vid.videoStream = ms;
        //this.vid.video = document.getElementById('preview') as HTMLVideoElement;
        //vid.startMediaStream(false, 600);
        this.createScanner(vid);
        //var logo = this.game.add.sprite(this.game.world.centerX + 400, this.game.world.centerY, 'logo');
        //logo.anchor.setTo(0.5, 0.5);
        //var vs = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        ////this.vid.add(vs);
        //vs.anchor.setTo(40, 0.5);
        //vs.scale.setTo(0.25);
        var game = this.game;
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        //  The Text is positioned at 0, 100
        var text = game.add.text(this.game.world.centerX, 200, "QR hunt!", style);
        this.lbl_user = game.add.text(this.game.world.centerX, 250, "#", style);
        this.lbl_user.anchor.set(0.5);
        var styleTiny = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle" };
        this.lbl_treasures = game.add.text(100, 400, "...", styleTiny);
        this.lbl_treasures.anchor.set(0, 0);
        this.lbl_rank = game.add.text(100, 300, "...", styleTiny);
        this.lbl_rank.anchor.set(0, 0);
        //  Centers the text
        text.anchor.set(0.5);
        text.align = 'center';
        //vid.addToWorld();
        //var spr = vid.addToWorld(this.game.world.centerX, this.game.world.centerY);
        //  Create our Timer
        var timer = game.time.create(false);
        timer.loop(5000, this.onStatusUpdate.bind(this), this);
        timer.start();
        this.onStatusUpdate();
        //this.createScanner();
    };
    Hunt.prototype.createScanner = function (vid) {
        var self = this;
        //
        var scanner = this.scanner = new Instascan.Scanner({
            //  video: document.getElementById('preview')
            video: null
            //, backgroundScan : true
            //  'video': video
            ,
            'scanPeriod': 1
        });
        scanner.addListener('scan', function (content, image) {
            console.log('FOUND TREASURE ' + content);
            //TODO: Check response
            commGet(SERVER + '/found-treasure/' + encodeURIComponent(content), function (r) { self.onStatusUpdate(); }, function (r, s) { });
        });
        /*var vms = vid.videoStream as MediaStream;
        var cam = new Instascan.Camera(vms.id, 'Phaser stream');
        cam._stream = vms;
        scanner.start(cam).then(c => {
            console.log("Scanner started ok");
        });*/
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]).then(function () {
                    vid.onAccess.add(function () {
                        var spr = vid.addToWorld();
                        spr.anchor.setTo(0.5, 0);
                        spr.position.setTo(self.game.world.centerX, 10);
                        spr.scale.setTo(0.33);
                        //self.createScanner(vid);
                    });
                    //console.log("x", cameras[0]._stream);
                    //console.log("vid", game.vid);
                    //game.stream = cameras[0]._stream;
                    //game.vid.videoStream = cameras[0]._stream;
                    //game.vid.video = document.getElementById('preview') as HTMLVideoElement;
                    //ms = cameras[0]._stream;
                    //var asd = document.getElementById('preview');
                    //var videoElement = document.createElement("video");
                    //vid.videoStream = cameras[0]._stream;
                    //vid.video = x.video;//document.getElementById('preview') as HTMLVideoElement;
                    //vid.video = document.createElement("video");
                    //vid.video.setAttribute('autoplay', 'autoplay');
                    //vid.video.width = 400;
                    //vid.video.height = 400;
                    //(vid as any).getUserMediaSuccess(cameras[0]._stream);  //HACK: to set stream!
                    //console.log("camstart");
                    //(vid as any).connectToMediaStream(scanner.video, cameras[0]._stream);
                    var v = document.createElement("video");
                    v.setAttribute('autoplay', 'autoplay');
                    v.width = 400;
                    v.height = 400;
                    vid.video = scanner.video;
                    vid.getUserMediaSuccess(cameras[0]._stream); //HACK: to set stream!
                    //vid.startMediaStream(false);
                    //(vid as any).connectToMediaStream(v, scanner.video.srcObject);
                });
            }
            else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    };
    Hunt.prototype.onStatusUpdate = function () {
        var _this = this;
        //TODO: Make everything json and move JSON.parse to commGet
        commGet(SERVER + '/status', function (r) {
            var j = JSON.parse(r);
            if (j.uid >= 0) {
                _this.lbl_user.text = String(j.uid);
                _this.lbl_treasures.text = String(j.treasures);
            }
            else {
                _this.lbl_user.text = 'Not logged in';
                //this.game.state.start('Login');
            }
        }, function (a, b) { });
        commGet(SERVER + '/rank', function (r) {
            var j = JSON.parse(r);
            _this.lbl_rank.text = String(j.ranking);
        }, function (a, b) { });
    };
    return Hunt;
}(Phaser.State));
//var LabelButton = function (game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
//    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);    //Style how you wish...
//    this.style = { 'font': '10px Arial', 'fill': 'black' };
//    this.anchor.setTo(0.5, 0.5);
//    this.label = new Phaser.Text(game, 0, 0, label, this.style);    //puts the label in the center of the button
//    this.label.anchor.setTo(0.5, 0.5);
//    this.addChild(this.label);
//    this.setLabel(label);    //adds button to game
//    game.add.existing(this);
//};
//LabelButton.prototype = Object.create(Phaser.Button.prototype);
//LabelButton.prototype.constructor = LabelButton;
//LabelButton.prototype.setLabel = function (label) { this.label.setText(label); };
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.create = function () {
        this.btn_login = this.game.add.button(this.game.world.centerX, 500, 'tetas', this.onLoginClick, this, 2, 1, 0);
        this.btn_login.anchor.set(0.5);
        this.btn_login.scale.set(0.5);
        var style = { font: "bold 22px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.lbl_user = this.game.add.text(this.game.world.centerX, 250, "#", style);
        this.lbl_user.anchor.set(0.5);
        //text.setTextBounds(0, 100, 800, 100);
        console.log("lbl", this.lbl_user);
        commGet(SERVER + '/status', this.onCommLoad.bind(this), this.onCommError.bind(this));
    };
    Login.prototype.onLoginClick = function () {
        var _this = this;
        //this.game.state.start('Hunt', true, false);
        commGet(SERVER + '/new-user', function (x) { console.log('Response new-user:' + x); _this.game.state.start('Hunt'); }, function (s, r) { _this.lbl_user.text = 'NEW USER ERR! '; });
    };
    Login.prototype.onCommLoad = function (response) {
        console.log("lbl2", this.lbl_user);
        console.log("Comm response=", response);
        var j = JSON.parse(response);
        if (j && j.uid && j.uid >= 0)
            this.game.state.start('Hunt');
        else
            this.lbl_user.text = 'Hello new user!';
    };
    Login.prototype.onCommError = function (status, response) {
        this.lbl_user.text = 'ERR! ' + status + ' ' + response;
    };
    return Login;
}(Phaser.State));
//# sourceMappingURL=game1.js.map