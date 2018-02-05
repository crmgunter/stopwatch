const Stopwatch = {
    tickClock: function(){
      if (Stopwatch.isRunning) {
        setTimeout(Stopwatch.tickClock, 10); // trigger next clock tick
        Stopwatch.advanceTenMillisecs();
        AppController.handleClockTick();
      }
    },
    isRunning: false,
    mins: 0,
    secs: 0,
    millisecs: 0,
    laps: [],
    // DO NOT EDIT ABOVE THIS LINE
    advanceTenMillisecs: function(){
        this.millisecs += 10;
        if(this.millisecs >= 1000){
            this.millisecs -= 1000;
            this.secs++
        }
        if(this.secs >= 60){
            this.secs -= 60;
            this.mins ++
        }
      // Your Code Here
    },
    reset: function(){
        this.mins = 0
        this.secs = 0
        this.millisecs = 0
        this.laps = [];
      
    },
    start: function(){
        if(!this.isRunnning){
            this.isRunning = true;
            this.tickClock();
        }
      
    },
    stop: function(){
        if(this.isRunning === true){
            this.isRunning = false;
        }
      
    },
    lap: function(){
        if(this.isRunning){
            this.laps.push({
              mins: this.mins,
              secs: this.secs,
              millisecs: this.millisecs 
            })
        }
      // Your Code Here
    }
  };
  
  /// User Interface ///
  const ViewEngine = {
    updateTimeDisplay: function(mins, secs, millisecs){
     $('#mins').html(mins)
     $('#secs').html(secs)
     $('#millisecs').html(millisecs)
        // Your Code Here
    },
    updateLapListDisplay: function(){
        $('#lap-list').html('')
        for(i = 0; i < Stopwatch.laps.length; i ++){
            $('#lap-list').append(`<li>${Stopwatch.laps[i].mins} mins, ${Stopwatch.laps[i].secs} secs, ${Stopwatch.laps[i].millisecs} millisecs</li>`)
        }
        // Your Code Here
    },
  };
  const ViewHelpers = {
    zeroFill: function(number, length){
      // Your Code Here
    },
  };
  
  /// Top-Level Application Code ///
  const AppController = {


    handleClockTick: function(){
      let mins = Stopwatch.mins;
      let secs = Stopwatch.secs;
      let millisecs = Stopwatch.millisecs;

        ViewEngine.updateTimeDisplay(mins, secs, millisecs);
      
       
    },
    handleClickStart: function() {
      if (!Stopwatch.isRunning){
          Stopwatch.start()
      }
    },
    handleClickStopReset: function(){
        if(Stopwatch.isRunning){
            Stopwatch.stop();
        } else {
            Stopwatch.reset();
            ViewEngine.updateTimeDisplay(Stopwatch.mins, Stopwatch.secs, Stopwatch.millisecs)
            $('#lap-list').html('')
        }
      // Your Code Here
    },
    handleClickLap: function(){
      if(Stopwatch.isRunning){
          Stopwatch.lap();
          ViewEngine.updateLapListDisplay();
      }
    }
  };
  
  window.onload = function(){
      $('#start').on('click', AppController.handleClickStart);
      $('#stop').on('click', AppController.handleClickStopReset);
      $('#lap').on('click', AppController.handleClickLap);
      // Attach AppController methods to the DOM as event handlers here.
  };

  

  $('body').css('background', 'blue')