var PointCalibrate = 0;
var CalibrationPoints = {};
const TOTAL_MAE_TARGETS = 9;
var MAEResults = [];

/**
 * Clear the canvas and the calibration button.
 */
function ClearCanvas() {
  $('.Calibration').hide();
  var canvas = document.getElementById('plotting_canvas');
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

function PauseGazer() {}

/**
 * Show the instruction of using calibration at the start up screen.
 */
function PopUpInstruction() {
  ClearCanvas();
  // hack: easy way to get the query string without jquery
  const urlParams = new URLSearchParams(window.location.search);
  const clicks = urlParams.get('clicks');
  swal({
    title: 'Calibration',
    text:
      'Please click on each of the 9 points on the screen. You must click on each point ' +
      clicks +
      ' time(s) till it goes yellow. This will calibrate your eye movements.',
    buttons: {
      cancel: false,
      confirm: true,
    },
  }).then((isConfirm) => {
    ShowCalibrationPoint();
    // hide face preview
    webgazer.showVideo(false);
    webgazer.showFaceFeedbackBox(false);
    webgazer.showFaceOverlay(false);
  });
}
/**
 * Show the help instructions right at the start.
 */
function helpModalShow() {
  $('#helpModal').modal('show');
}

/**
 * Load this function when the index page starts.
 * This function listens for button clicks on the html page
 * checks that all buttons have been clicked 5 times each, and then goes on to measuring the precision
 */
$(document).ready(function () {
  ClearCanvas();
  helpModalShow();
  $('.Calibration').click(function () {
    // click event on the calibration buttons

    var id = $(this).attr('id');

    if (!CalibrationPoints[id]) {
      // initialises if not done
      CalibrationPoints[id] = 0;
    }
    CalibrationPoints[id]++; // increments values

    const urlParams = new URLSearchParams(window.location.search);
    const calibrationClicks = urlParams.get('clicks');
    if (CalibrationPoints[id] == calibrationClicks) {
      //only turn to yellow after 5 clicks
      $(this).css('background-color', 'yellow');
      $(this).prop('disabled', true); //disables the button
      PointCalibrate++;
    } else if (CalibrationPoints[id] <= calibrationClicks) {
      //Gradually increase the opacity of calibration points when click to give some indication to user.
      var opacity = 0.2 * CalibrationPoints[id] + 0.2;
      $(this).css('opacity', opacity);
    }

    //Show the middle calibration point after all other points have been clicked.
    if (PointCalibrate == 8) {
      $('#Pt5').show();
    }

    if (PointCalibrate >= 9) {
      // last point is calibrated
      //using jquery to grab every element in Calibration class and hide them except the middle point.
      $('.Calibration').hide();
      $('#Pt5').show();

      // clears the canvas
      var canvas = document.getElementById('plotting_canvas');
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      // notification for the measurement process
      swal({
        title: 'Calculating measurement',
        text: "Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.",
        closeOnEsc: false,
        allowOutsideClick: false,
        closeModal: true,
      }).then((isConfirm) => {
        // makes the variables true for 5 seconds & plots the points
        $(document).ready(function () {
          store_points_variable(); // start storing the prediction points

          sleep(5000).then(() => {
            stop_storing_points_variable(); // stop storing the prediction points
            var past50 = get_points(); // retrieve the stored points

            var windowHeight = $(window).height();
            var windowWidth = $(window).width();

            // Calculate the position of the point the user is staring at
            var staringPointX = windowWidth / 2;
            var staringPointY = windowHeight / 2;

            var targetCoordinates = [staringPointX, staringPointY];
            var gazeLimit = $.urlParam('gazeLimit');
            var mae = calculateMae(past50, gazeLimit, targetCoordinates);

            var precision_measurement = calculatePrecision(past50);
            var accuracyLabel =
              '<a>Accuracy | ' + precision_measurement + '%</a>';
            document.getElementById('Accuracy').innerHTML = accuracyLabel; // Show the accuracy in the nav bar.
            swal({
              title: 'Accuracy',
              text:
                '\n Your accuracy measure is ' +
                precision_measurement +
                '% \n' +
                " Your MAE with '" +
                gazeLimit +
                "' gaze points is " +
                mae.toFixed(2) +
                'px',
              icon: 'info',
              allowOutsideClick: false,
              buttons: {
                cancel: 'Recalibrate',
                confirm: true,
              },
            }).then((isConfirm) => {
              if (isConfirm) {
                //clear the calibration & hide the last middle button
                ClearCanvas();
                startMAEValidation();
              } else {
                //use restart function to restart the calibration
                ClearCalibration();
                ClearCanvas();
                ShowCalibrationPoint();
              }
            });
          });
        });
      });
    }
  });
});

function startMAEValidation() {
  // we include an extra "target" to run the displayMaePoints function one more time
  // and calculate the last target MAE and hide it.
  MAEResults = [];

  displayLoading();

  var prediction = webgazer.getCurrentPrediction();
  if (prediction) {
    var x = prediction.x;
    var y = prediction.y;
    console.log('x&y', { x, y });
  }

  for (let i = 1; i <= TOTAL_MAE_TARGETS + 1; i++) {
    displayMAEPoints(i);
  }
}

function displayLoading() {
  var sec = 3;
  document.getElementById('countDown').innerHTML = sec + 1;
  $('#loadingMAE').show();
  var countDown = setInterval(function () {
    document.getElementById('countDown').innerHTML = sec;
    sec--;
    if (sec == -1) {
      clearInterval(countDown);
      $('#loadingMAE').hide();
    }
  }, 1000);
}

function displayMAEPoints(i) {
  var gazeLimit = $.urlParam('gazeLimit');
  setTimeout(function () {
    var currentTargetId = '#m' + i;

    // there must be at least one target display in order to calculate the MAE
    if (i > 1) {
      // ensure that we calculate the mae of the targets that we display
      var targetToProcessId = i - 1;
      if (targetToProcessId <= TOTAL_MAE_TARGETS) {
        var targetToProcessSelector = '#m' + targetToProcessId;

        stop_storing_points_variable(); // stop storing the prediction points
        var past50 = get_points(); // retrieve the stored points

        var targetCoordinates = getCenterCoordinates(
          $(targetToProcessSelector)
        );
        var mae = calculateMae(past50, gazeLimit, targetCoordinates);

        MAEResults.push({
          target: targetToProcessId,
          mae: mae.toFixed(2),
        });
      }

      $(targetToProcessSelector).hide();
      ClearCanvas();
    }

    // prevent to displays any extra targets
    if (i > TOTAL_MAE_TARGETS) {
      displayMAEResults(MAEResults);
      return;
    }

    $(currentTargetId).show();
    $(currentTargetId).text(i);
    store_points_variable(); // start storing the prediction points
  }, 5000 * i);
}

function displayMAEResults(res) {
  var table = document.createElement('table');
  table.setAttribute('id', 'maeTable');
  table.setAttribute('class', 'maeTable');

  var headers = ['target', 'MAE'];
  var thead = document.createElement('thead');

  table.appendChild(thead);

  for (var i = 0; i < headers.length; i++) {
    thead
      .appendChild(document.createElement('th'))
      .appendChild(document.createTextNode(headers[i]));
  }

  var body = document.createElement('tbody');

  res.forEach(function (r) {
    var row = document.createElement('tr');

    var targetCell = document.createElement('td');
    targetCell.appendChild(document.createTextNode(r.target));

    var maeCell = document.createElement('td');
    maeCell.appendChild(document.createTextNode(r.mae));

    row.appendChild(targetCell);
    row.appendChild(maeCell);

    body.appendChild(row);
  });

  table.appendChild(body);

  swal({
    title: 'MAE Results',
    content: table,
    closeModal: false,
    closeOnEsc: true,
    closeOnClickOutside: true,
    buttons: {
      confirm: {
        text: 'Copy to Clipboard',
        closeModal: false,
      },
    },
  }).then(function () {
    copyTableToClipboard(document.getElementById('maeTable'));
    swal.stopLoading();
    event.preventDefault();
  });
}

function getCenterCoordinates($this) {
  var offset = $this.offset();
  var width = $this.width();
  var height = $this.height();

  var centerX = offset.left + width / 2;
  var centerY = offset.top + height / 2;
  return [centerX, centerY];
}

function copyTableToClipboard(el) {
  var body = document.body,
    range,
    sel;
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    sel.removeAllRanges();
    try {
      range.selectNodeContents(el);
      sel.addRange(range);
    } catch (e) {
      range.selectNode(el);
      sel.addRange(range);
    }
    document.execCommand('copy');
  } else if (body.createTextRange) {
    range = body.createTextRange();
    range.moveToElementText(el);
    range.select();
    range.execCommand('Copy');
  }
}

/**
 * Show the Calibration Points
 */
function ShowCalibrationPoint() {
  $('.Calibration').show();
  $('#Pt5').hide(); // initially hides the middle button
}

/**
 * This function clears the calibration buttons memory
 */
function ClearCalibration() {
  window.localStorage.clear();
  $('.Calibration').css('background-color', 'red');
  $('.Calibration').css('opacity', 0.2);
  $('.Calibration').prop('disabled', false);

  CalibrationPoints = {};
  PointCalibrate = 0;
}

// sleep function because java doesn't have one, sourced from http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
