var logger = require('log4js').getLogger();

var led = require('../../LimitlessGEM/index');

function AnimateLED(opts) {
    this.con = new led.createSocket(opts);
    this.arr = [];
}

AnimateLED.prototype = Object.create({}, {
    reset: { value: function (){ this.arr = []; }},
	start: { value: function (){ this.arr.push(led.RGBW.ALL_ON); }},
	stop: { value: function (){ this.arr.push(led.RGBW.ALL_OFF); }},
    fade: {
        value: function (direction) {
			if (direction === 'in'){
				var i = 0 ;
				while(i <= 24){
					var foo = 'BRIGHTNESS_'+i;
					this.arr.push(led.RGBW[foo])
					i++;
				}	
			} else {
				var i = 24 ;
				while(i >= 0){
					var foo = 'BRIGHTNESS_'+i;
					this.arr.push(led.RGBW[foo]);
					i--;
				}
			}
        }
    },
    color: {
        value: function (color) {
            switch (color) {
                case 'violet':
                    this.arr.push(led.RGBW.SET_COLOR_TO_VIOLET);
                    break;
                case 'rblue':
                    this.arr.push(led.RGBW.SET_COLOR_TO_ROYAL_BLUE);
                    break;
                case 'bblue':
                    this.arr.push(led.RGBW.SET_COLOR_TO_BABY_BLUE);
                    break;
                case 'aqua':
                    this.arr.push(led.RGBW.SET_COLOR_TO_AQUA);
                    break;
                case 'mint':
                    this.arr.push(led.RGBW.SET_COLOR_TO_ROYAL_MINT);
                    break;
                case 'sgreen':
                    this.arr.push(led.RGBW.SET_COLOR_TO_SEAFOAM_GREEN);
                    break;
                case 'green':
                    this.arr.push(led.RGBW.SET_COLOR_TO_GREEN);
                    break;
                case 'lgreen':
                    this.arr.push(led.RGBW.SET_COLOR_TO_LIME_GREEN);
                    break;
                case 'yellow':
                    this.arr.push(led.RGBW.SET_COLOR_TO_YELLOW);
                    break;
                case 'orange':
                    this.arr.push(led.RGBW.SET_COLOR_TO_ORANGE);
                    break;
                case 'red':
                    this.arr.push(led.RGBW.SET_COLOR_TO_RED);
                    break;
                case 'pink':
                    this.arr.push(led.RGBW.SET_COLOR_TO_PINK);
                    break;
                case 'lavendar':
                    this.arr.push(led.RGBW.SET_COLOR_TO_LAVENDAR);
                    break;
                default:
                    this.arr.push(led.RGBW.ALL_SET_TO_WHITE);
            } 
        }
    },
    mcolor:{
        value: function (color){
            switch (color) {
                case 'red':
                    i=159;
                    j=179;
                    break;
                case 'green':
                    i=80;
                    j=112;
                    break;
                case 'blue':
                    i=16;
                    j=64;
                    break;
                case 'rainbow':
                default:
                    i=0;
                    j=240;
            }            
            while(i <= j){
                var foo = 'COLOR_'+i;
                this.arr.push(led.RGBW[foo])
                i++;
            }
        }
    },
    repeat:{
        value:function(r){

            // Mirror all the frames in the animation, to stay smooth
            l = this.arr.length
            while(l > 0){
                this.arr.push(this.arr[l-1])
                l--;
            }

            logger.info(this.arr.length+' Frames mirrored');

            // And repeat X times
            logger.info('Repeat '+r);
            _arr = this.arr;
            while(r > 0){
                this.arr = this.arr.concat(_arr);
                r--;
            }
        }
    },
    run:{
		value: function (){
            logger.info(this.arr.length+' Frames total');
			mcon = this.con;
            this.arr.forEach(function (cmd, index) {
                setTimeout(function () {
                   mcon.send(cmd);
                }, index * 100);
            });
		}
	}
});

exports.AnimateLED = AnimateLED;
