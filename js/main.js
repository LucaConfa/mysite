window.onload = function() {

    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
           return null;
        }
        return decodeURI(results[1]) || 0;
    }

    var gazeLimit = parseInt($.urlParam('gazeLimit'));
    var error = null;
    var MAX_GAZE_LIMIT = 50;
    if (!gazeLimit) {
      error = "'gazeLimit' not found in query string";
    } else if (gazeLimit > MAX_GAZE_LIMIT) {
      error = "'gazeLimit' is higher than " + MAX_GAZE_LIMIT;
    }

    var calibrationClicks = $.urlParam('clicks');
    if (!calibrationClicks) {
      error = "'clicks' not found in query string";
    }

    if (error) {
      swal({
        title: "Error",
        text: error,
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        buttons: false,
        type: 'warning'
      });
    }

    var smoothingBufferX = []
    var smoothingBufferY = []
    var smoothingBufferLength = 1;

    var gazeDot = document.createElement('div');
    // gazeDot.style.display = 'block';
    gazeDot.style.display = 'none';
    gazeDot.id = 'smoothDot';
    gazeDot.style.position = 'fixed';
    gazeDot.style.zIndex = 99999;
    gazeDot.style.left = '-5px'; //'-999em';
    gazeDot.style.top  = '-5px';
    gazeDot.style.background = 'yellow';
    gazeDot.style.borderRadius = '100%';
    // gazeDot.style.opacity = '0.7';
    gazeDot.style.width = '10px';
    gazeDot.style.height = '10px';
    gazeDot.style["-webkit-backface-visibility"] = 'hidden';
    gazeDot.style.transform = 'translate3d(1px,1px,0)';
    document.body.appendChild(gazeDot);

    //start the webgazer tracker
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          if (data == null) {
            return;
          }
          // #<{(| data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) |)}>#
          // console.log('No cal', data.x, ' ', data.y);

          // console.log(clock);
          smoothingBufferX.push(data.x)
          smoothingBufferY.push(data.y)

          smoothingBufferX = smoothingBufferX.slice(
            (smoothingBufferX.length - smoothingBufferLength),
            smoothingBufferX.length
          );
          // console.log(smoothingBufferX);
          smoothingBufferY = smoothingBufferY.slice(
            (smoothingBufferY.length - smoothingBufferLength),
            smoothingBufferY.length
          );

          var total = (total, x) => {
            return (total || 0) + x
          };
          var smoothedX = (smoothingBufferX.reduce(total) / (smoothingBufferLength.toFixed(2)))
          var smoothedY = (smoothingBufferY.reduce(total) / (smoothingBufferLength.toFixed(2)))
          // console.log('cal', smoothedX, ' ', smoothedY);
          // gazeDot.style.transform = 'translate3d(' + smoothedX + 'px,' + smoothedY + 'px,0)';
          // #<{(| elapsed time in milliseconds since webgazer.begin() was called |)}>#
          // console.log(clock);
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */


    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};

window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    ClearCalibration();
    PopUpInstruction();
}

// pause webgaze
function Pause(){
  webgazer.pause();
}

// resume webgaze
function Resume(){
  webgazer.resume();
}
