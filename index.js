var animate = require('./lib/animate').AnimateLED;

exports.init = function (opts) {
    return new animate(opts);
}
