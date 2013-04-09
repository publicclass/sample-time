
var now = require('now')
  , sample = require('sample');

/**
 * Sample the rate as _number-of-times/second_.
 *
 * Useful for FPS counter.
 *
 * Example:
 *
 *    var sample = require('sample')
 *      , time = require('sample-time');
 *      , fps = new sample;
 *
 *    requestAnimationFrame(function render(){
 *      requestAnimationFrame(render);
 *      time.hz(fps);
 *    })
 *
 *
 * @param  {Sample} s a Sample instance on which to track the framerate.
 */
exports.hz = function(s){
  var n = now();

  // update frame count
  s.frames = (s.frames||0)+1;

  // create start time
  s.time = s.time || n;

  // a second has passed.
  // sample how many frames has passed.
  if( n > s.time + 1000 ){
    // calculate the framerate
    var hz = (s.frames*1000) / (n - s.time);

    // sample that framerate
    sample(s,hz);

    // reset time and frame count
    s.time = n;
    s.frames = 0;
  }
}

exports.begin = function(s){
  // set (start) time
  s.time = now()
}

exports.end = function(s){
  // store the time it took since sample.time
  if( typeof s.time !== 'number' ){
    throw new Error('no time was set on the sample. did you forget to time.begin()?')
  }
  sample(s,now()-s.time)
}

