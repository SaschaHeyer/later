var later = require('../index');

// create the new modifier
later.modifier.month = later.modifier.m = function(period, values) {
  if(period.name !== 'month') {
    throw new Error('Month modifier only works with months!');
  }

  return {
    name:     'reIndexed ' + period.name,
    range:    period.range,
    val:      function(d) { return period.val(d) - 1; },
    isValid:  function(d, val) { return period.isValid(d, val+1); },
    extent:   function(d) { return [0, 11]; },
    start:    period.start,
    end:      period.end,
    next:     function(d, val) { return period.next(d, val+1); },
    prev:     function(d, val) { return period.prev(d, val+1); }
  };
};


var sched = {schedules: [{M_m: [2]}]},
    next = later.schedule(sched).next(1, new Date(2013, 3, 21));

console.log(next.toUTCString());
// Sat, 01 Mar 2014 00:00:00 GMT