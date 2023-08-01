/*
 * This function calculates a measurement for how precise
 * the eye tracker currently is which is displayed to the user
 */
function calculatePrecision(past50Array) {
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();

  // Calculate the position of the point the user is staring at
  var staringPointX = windowWidth / 2;
  var staringPointY = windowHeight / 2;

  // Retrieve the last 50 gaze prediction points
  var x50 = past50Array[0];
  var y50 = past50Array[1];

  var precisionPercentages = new Array(50);
  calculatePrecisionPercentages(
    precisionPercentages,
    windowHeight,
    x50,
    y50,
    staringPointX,
    staringPointY
  );
  var precision = calculateAverage(precisionPercentages);

  // Return the precision measurement as a rounded percentage
  return Math.round(precision);
}

function getAvgPoint(points) {
  const sum = points.reduce((a, b) => a + b, 0);
  const avg = sum / points.length || 0;
  return avg;
}

function getDistance(staringPointX, staringPointY, x, y) {
  var xDiff = staringPointX - x;
  var yDiff = staringPointY - y;
  var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  return distance;
}

function calculateMae(past50Array, gazeLimit, targetCoordinates) {
  console.log('past50Array', past50Array);
  // Calculate the position of the point the user is staring at
  var staringPointX = targetCoordinates[0];
  var staringPointY = targetCoordinates[1];

  // Retrieve the last 50 gaze prediction points
  var x50 = past50Array[0];
  var y50 = past50Array[1];

  // var xMae = x50.slice(Math.max(x50.length - gazeLimit, 1));
  // var yMae = y50.slice(Math.max(y50.length - gazeLimit, 1));
  // We wont slice yet. We are going to test with 50 gaze points
  var xMae = x50;
  var yMae = y50;

  var xAvg = getAvgPoint(xMae);
  var yAvg = getAvgPoint(yMae);

  var mae = getDistance(staringPointX, staringPointY, xAvg, yAvg);
  return mae;
}
/*
 * Calculate percentage accuracy for each prediction based on distance of
 * the prediction point from the centre point (uses the window height as
 * lower threshold 0%)
 */
function calculatePrecisionPercentages(
  precisionPercentages,
  windowHeight,
  x50,
  y50,
  staringPointX,
  staringPointY
) {
  for (x = 0; x < 50; x++) {
    // Calculate distance between each prediction and staring point
    var xDiff = staringPointX - x50[x];
    var yDiff = staringPointY - y50[x];
    var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    // Calculate precision percentage
    var halfWindowHeight = windowHeight / 2;
    var precision = 0;
    if (distance <= halfWindowHeight && distance > -1) {
      precision = 100 - (distance / halfWindowHeight) * 100;
    } else if (distance > halfWindowHeight) {
      precision = 0;
    } else if (distance > -1) {
      precision = 100;
    }

    // Store the precision
    precisionPercentages[x] = precision;
  }
}

/*
 * Calculates the average of all precision percentages calculated
 */
function calculateAverage(precisionPercentages) {
  var precision = 0;
  for (x = 0; x < 50; x++) {
    precision += precisionPercentages[x];
  }
  precision = precision / 50;
  return precision;
}
