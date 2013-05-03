/*!
 *   @authour: @snypelife;
 *   @description: countdown module;
 */

//Self invoked for encapsulation
!function (win, doc, $, _mod, undef) {
  'use strict';

  var Countdown = function () {
    var $countdown = $('#countdown'),
    $countdownDay,
    $countdownHour,
    $countdownMin,
    $countdownSec,
    cards = '',

    lang = $countdown.data('lang').toLowerCase(),

    duration = 1000,

  	expiry = $countdown.data('expiry').split('-'),
  	expiryYear = expiry[0],
  	expiryMonth = parseInt(expiry[1], 10) - 1,
  	expiryDay = expiry[2],
  	expires = +new Date(expiryYear, expiryMonth, expiryDay),

  	Time = function () {
  		var total = expires - (+new Date()),
  		day = parseInt(total / 8.64e7, 10),
  		hour = parseInt((total % 8.64e7) / 3.6e6, 10),
  		min = parseInt((total % 3.6e6) / 6e4, 10),
  		sec = parseInt((total % 6e4) / 1e3, 10);

  		this.nullify = function () {
  			total = day = hour = min = sec = null;
  			delete this.time;
  		}

  		this.time = {
  			days: day,
  			hours: hour,
  			mins: min,
  			secs: sec
  		}
  	},

  	update = function () {
  		var t = new Time();

  		$countdownDay.text(t.time.days);
  		$countdownHour.text(t.time.hours);
  		$countdownMin.text(t.time.mins);
  		$countdownSec.text(t.time.secs);
  		
  		t.nullify();
  		t = null;
  	};
  		
  	//build
  	for (var i = 0; i < 4; i += 1) {
  		var ids = ['countdown-day', 'countdown-hour', 'countdown-minute', 'countdown-second'],
  		titles = lang === 'fr' ? ['jours','heures','minutes','secondes'] : ['Days','Hours','Minutes','Seconds'];
  		cards += '<div class="card"><span id="' + ids[i] + '" class="value"></span><span class="title">' + titles[i] + '</span></div>';
  	}
  	
  	$countdown.append(cards);
    $countdownDay = $('#countdown-day');
    $countdownHour = $('#countdown-hour');
    $countdownMin = $('#countdown-minute');
    $countdownSec = $('#countdown-second');

  	//init
  	update();
  	setInterval(update, duration);
  };

  //init OnDOMLoaded
  $(Countdown);

}(window, document, jQuery, Modernizr, undefined);
