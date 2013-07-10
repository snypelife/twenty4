!function (win, $, undef) {

  var doc = win.document
    , PI = Math.PI
    , floor = Math.floor

    //Constructor
    , Twenty4 = function (target, settings) {      
    var cd = doc.getElementById('countdown')
      , expiry = settings.end.split('-') || cd.getAttribute('data-expiry').split('-')
      , expiryYear = expiry[0]
      , expiryMonth = parseInt(expiry[1], 10) - 1
      , expiryDay = expiry[2]
      , expires = +new Date(expiryYear, expiryMonth, expiryDay)
      , timeLeft = expires - (+new Date())
      , day = floor(timeLeft / 8.64e7)
      , hour = floor((timeLeft % 8.64e7) / 3.6e6)
      , min = floor((timeLeft % 3.6e6) / 6e4)
      , sec = floor((timeLeft % 6e4) / 1e3)
      , direction = settings.direction === 'cw' ? false : true

      , init = function () {
          var t = []

          for (var i = 0; i < settings.timer.length; i++) {
            t.push(new Timer({
              id: settings.timer[i].id
            , color: settings.timer[i].color
            , lineWeight: settings.lineWeight
            , type: settings.timer[i].type
            , title: settings.timer[i].title
           }))
          }

          setInterval(function () {
            update(t)
          }, 1000)
        }

      , Timer = function (ops) {

          var timer = doc.createElement('div')
            , timerCanvas = doc.createElement('canvas')
            , timerDisplay = doc.createElement('div')
            , timerTitle = doc.createElement('div')
            , ctx = timerCanvas.getContext('2d')
            , numer = 0
            , denom = 0

          this.timerValue = doc.createElement('div')

          this.settings = ops

          this.draw = function () {
            switch (this.settings.type) {
              case 'day':
                numer = day
                denom = 365
                break
              case 'hour':
                numer = hour
                denom = 24
                break
              case 'minute':
                numer = min
                denom = 60
                break
              case 'second':
                numer = sec
                denom = 60
                break
              default:
                throw new Error()
            }

            ctx.clearRect(0, 0, settings.width, settings.height)
            ctx.beginPath()

            ctx.strokeStyle = this.settings.color

            ctx.arc( (settings.width / 2), (settings.height / 2), 85, degToRad(0), degToRad( -perToDeg(numer / denom) ), direction )

            ctx.lineWidth = this.settings.lineWeight
            ctx.stroke()

            this.timerValue.innerHTML = numer
          }      

          timerCanvas.id = this.settings.id
          timerCanvas.width = settings.width
          timerCanvas.height = settings.height

          timer.className = 'timer'
          timerCanvas.className = 'timer-canvas'
          timerDisplay.className = 'timer-display'
          this.timerValue.className = 'timer-value'
          timerTitle.className = 'timer-title'

          timerTitle.innerHTML = this.settings.title

          timer.appendChild(timerCanvas)
          timerDisplay.appendChild(this.timerValue)
          timerDisplay.appendChild(timerTitle)
          timer.appendChild(timerDisplay)

          target.appendChild(timer)
          
          this.draw()
        }

      , update = function (timers) {
          timeLeft -= 1000; 
          day = floor(timeLeft / 8.64e7, 10)
          hour = floor((timeLeft % 8.64e7) / 3.6e6, 10)
          min = floor((timeLeft % 3.6e6) / 6e4, 10)
          sec = floor((timeLeft % 6e4) / 1e3, 10)

          for (var i = 0; i < timers.length; i++) {
            timers[i].draw()
          }
        }

      init()
    }

  , perToDeg = function (per) {
        return floor((per * 100) * 3.6)
    }

  , degToRad = function (deg) {
        return (deg - 90) * (PI / 180)
    }

  $.fn.twenty4 = function (settings) {
    var t = new Twenty4(this[0], settings)
  }


}(window, jQuery, undefined)
