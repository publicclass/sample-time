var time = require('sample-time')
  , sample = require('publicclass-sample')
  , rAF = require('publicclass-request-animation-frame');

var fps = new sample;
var ms = new sample;
var started = +new Date();
console.log('running for ~5s...')
rAF(function r(){

  // spend some time
  time.begin(ms)
  var i = 1e5+(1e6*Math.random())|0;
  while(i){i--};
  time.end(ms)

  // adds a frame
  time.hz(fps)

  // run for 3s
  if( (+new Date) - started < 5000 ){
    rAF(r);
  } else {
    log('fps',fps)
    log('ms',ms)
  }
})

function log(name,a){
  console.log('%s:',name)
  console.log(' stddev: \t',sample.stddev(a))
  console.log(' mean: \t\t',sample.mean(a))
  console.log(' variance: \t',sample.variance(a))
  console.log(' sum: \t\t',sample.sum(a))
  console.log(' min: \t\t',sample.min(a))
  console.log(' max: \t\t',sample.max(a))
  console.log(' range: \t',sample.range(a))
  console.log(' count: \t',sample.count(a))
}