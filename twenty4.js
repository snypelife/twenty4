!function (win, $, undef) {

  var doc = win.document;


  function Twenty4(settings) {
    var cd = doc.getElementById('countdown'),
    expiry = cd.getAttribute('data-expiry').split('-'),
    expiryYear = expiry[0],
    expiryMonth = parseInt(expiry[1], 10) - 1,
    expiryDay = expiry[2],
    expires = +new Date(expiryYear, expiryMonth, expiryDay),
    timeLeft = expires - (+new Date());



    var init = function () {
      
    },

    Timer = function (ops) {
      var t = doc.querySelector(ops.id),
      ctx = t.getContext('2d');
      
      ctx.clearRect(0, 0, t.width, t.height);
      ctx.beginPath();
      ctx.strokeStyle = ops.color;
      
      ctx.shadowBlur    = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowColor = ops.glow;
      
      ctx.arc(94,94,85, deg(0), deg((360/glob.total)*(glob.total - glob.days)));

      ctx.lineWidth = 17;
      ctx.stroke();
      
      t.appendChild(doc.createTextNode(glob.days));      
    },

    setTime = function () {
      timeLeft -= 1000;

      var day = Math.floor(timeLeft / 8.64e7, 10),
      hour = Math.floor((timeLeft % 8.64e7) / 3.6e6, 10),
      min = Math.floor((timeLeft % 3.6e6) / 6e4, 10),
      sec = Math.floor((timeLeft % 6e4) / 1e3, 10);

    },

    update = function () {

    },

    deg = function (deg) {
        return (Math.PI / 180) * deg - (Math.PI/ 180) * 90;
    };
    
    
    glob.total   = Math.floor((glob.endDate - glob.startDate)/86400);
    glob.days    = Math.floor((glob.endDate - glob.now ) / 86400);
    glob.hours   = 24 - Math.floor(((glob.endDate - glob.now) % 86400) / 3600);
    glob.minutes = 60 - Math.floor((((glob.endDate - glob.now) % 86400) % 3600) / 60) ;
    
    if (glob.now >= glob.endDate) {
      return;
    }
    
    var clock = {
      set: {
        days: function () {
          var cdays = doc.querySelector('#canvas_days');
          var ctx = cdays.getContext('2d');
          ctx.clearRect(0, 0, cdays.width, cdays.height);
          ctx.beginPath();
          ctx.strokeStyle = glob.daysColor;
          
          ctx.shadowBlur    = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowColor = glob.daysGlow;
          
          ctx.arc(94,94,85, deg(0), deg((360/glob.total)*(glob.total - glob.days)));
          ctx.lineWidth = 17;
          ctx.stroke();
          $('.clock_days .val').text(glob.days);
        },
        
        hours: function () {
          var cHr = doc.querySelector('#canvas_hours');
          var ctx = cHr.getContext('2d');
          ctx.clearRect(0, 0, cHr.width, cHr.height);
          ctx.beginPath();
          ctx.strokeStyle = glob.hoursColor;
          
          ctx.shadowBlur    = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowColor = glob.hoursGlow;
          
          ctx.arc(94,94,85, deg(0), deg(15*glob.hours));
          ctx.lineWidth = 17;
          ctx.stroke();
          $('.clock_hours .val').text(24 - glob.hours);
        },
        
        minutes : function () {
          var cMin = doc.querySelector('#canvas_minutes');
          var ctx = cMin.getContext('2d');
          ctx.clearRect(0, 0, cMin.width, cMin.height);
          ctx.beginPath();
          ctx.strokeStyle = glob.minutesColor;
          
          ctx.shadowBlur    = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowColor = glob.minutesGlow;
          
          ctx.arc(94,94,85, deg(0), deg(6*glob.minutes));
          ctx.lineWidth = 17;
          ctx.stroke();
          $('.clock_minutes .val').text(60 - glob.minutes);
        },
        seconds: function () {
          var cSec = doc.querySelector('#canvas_seconds');
          var ctx = cSec.getContext('2d');
          ctx.clearRect(0, 0, cSec.width, cSec.height);
          ctx.beginPath();
          ctx.strokeStyle = glob.secondsColor;
          
          ctx.shadowBlur    = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.shadowColor = glob.secondsGlow;
          
          ctx.arc(94,94,85, deg(0), deg(6*glob.seconds));
          ctx.lineWidth = 17;
          ctx.stroke();
  
          $('.clock_seconds .val').text(60 - glob.seconds);
        }
      },
       
      start: function () {
          /* Seconds */
          var cdown = setInterval(function () {
              if ( glob.seconds > 59 ) {
                  if (60 - glob.minutes == 0 && 24 - glob.hours == 0 && glob.days == 0) {
                      clearInterval(cdown);
                      
                      /* Countdown is complete */
                      
                      return;
                  }
                  glob.seconds = 1;
                  if (glob.minutes > 59) {
                      glob.minutes = 1;
                      clock.set.minutes();
                      if (glob.hours > 23) {
                          glob.hours = 1;
                          if (glob.days > 0) {
                              glob.days--;
                              clock.set.days();
                          }
                      } else {
                          glob.hours++;
                      }
                      clock.set.hours();
                  } else {
                      glob.minutes++;
                  }
                  clock.set.minutes();
              } else {
                  glob.seconds++;
              }
              clock.set.seconds();
          }, 1000);
      }
    }
    clock.set.seconds();
    clock.set.minutes();
    clock.set.hours();
    clock.set.days();
    clock.start();
  }

  $.fn.twenty4 = function (settings) {

      console.log(this);
  };
}(window, jQuery, undefined);
