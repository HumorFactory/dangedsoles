/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// VARIABLES : Create global variables for Playable Canvas
///////////////////////////////////////////////////////////
var _playableCanvas = false; 
var _playableWidth = 0, _playableHeight = 0;
var _translateX = 0, _translateY = 0; // DEPRECATED - Translation is no longer used.
var _bgColorWindow, _bgColorPlayable;
var _bgDrawn, _bgRefresh;
var _mouseX, _mouseY;

// FUNCTION : setPlayableCanvasDefaults
////////////////////////////////////////
function setPlayableCanvasDefaults()
{
	_playableCanvas = false;
	_playableWidth = 750;  // standard = 1024  3:2
	_playableHeight = 500;  // standard = 768  3:2
	_translateX = 0;
	_translateY = 0;
	_bgColorWindow = '#000000';
	_bgColorPlayable = '#CCCCCC';
	_bgDrawn = false;
	_bgRefresh = true;
}

// FUNCTION : setupPlayableCanvas
//////////////////////////////////
function setupPlayableCanvas(pWidth = 750, pHeight = 500, bgColorP = '#CCCCCC', bgColorW = '#000000', bgRef = true)
{
	setPlayableCanvasDefaults();
	
	_playableCanvas = true;
	_playableWidth = pWidth;
	_playableHeight = pHeight;
	_bgColorWindow = bgColorW;
	_bgColorPlayable = bgColorP;
	_bgRefresh = bgRef;

	//_translateX = windowWidth/2 - _playableWidth/2;
	//_translateY = windowHeight/2 - _playableHeight/2;
	//createCanvas(windowWidth, windowHeight);
	
	createCanvas(_playableWidth, _playableHeight);
	background(_bgColorWindow);
}

// FUNCTION : startPlayableCanvas
//////////////////////////////////
function startPlayableCanvas()
{
	if (!_playableCanvas)
	{
		setPlayableCanvasDefaults();
		_playableCanvas = true;
	}
	
	//push();
	//translate(_translateX, _translateY);
	//mouseX = winMouseX - _translateX;
	//mouseY = winMouseY - _translateY;

	if (_bgDrawn == false)
	{
		background(_bgColorWindow);
		fill(_bgColorPlayable);
		noStroke();
		rectMode(CORNER);
		rect(0, 0, _playableWidth, _playableHeight);
		stroke(0);
	}
	
	_bgDrawn = !_bgRefresh; // If bgRefresh is true, set bgDrawn to false

}

// FUNCTION : endPlayableCanvas
////////////////////////////////
function endPlayableCanvas()
{
	if (_playableCanvas)
	{
		//pop();
	}
}

// FUNCTION : mouseInside
//////////////////////////
function mouseInside(x, y, w, h = 0, centered = false, ellipse = false)
{
	// If no height is provided, then set it to the width.
	if (h == 0)
	{
		h = w;
	}
	
	//let mX = winMouseX - _translateX;
	//let mY = winMouseY - _translateY;	
	
	let mX = mouseX;
	let mY = mouseY;
	
	// AREA : RECTANGULAR + NOT CENTERED
	if (!ellipse &&
			!centered &&
			mX >= x &&
		  mX <= x + w &&
		  mY >= y &&
		  mY <= y + h)
	{
		return true;
	}
	
	// AREA : RECTANGULAR + CENTERED
	if (!ellipse &&
			centered &&
			mX >= x - w/2 &&
		  mX <= x + w/2 &&
		  mY >= y - h/2 &&
		  mY <= y + h/2)
	{
		return true;
	}

	// AREA : ELLIPSE + CENTERED
	if (ellipse &&
			centered)
	{
		// LET'S DO SOME MATH -- Check to see if a point is within an ellipse!
		// Adapted from : https://math.stackexchange.com/questions/76457/check-if-a-point-is-within-an-ellipse
		let rx = w/2;
		let ry = h/2;
		let xvalue = ((mX-x) * (mX-x)) / (rx*rx);
		let yvalue = ((mY-y) * (mY-y)) / (ry*ry);
		let contained = ((xvalue + yvalue) <= 1.0);
		
		if (contained)
		{
			return true;
		}
	}

	// If we made it all the way here, then return false 
	// because the mouse is not in the defined area.
	return false;
}

// FUNCTION : mouseInsideEllipse
/////////////////////////////////
function mouseInsideEllipse(x, y, w, h = 0, centered = true)
{
	// If no height is provided, then set it to the width.
	if (h == 0)
	{
		h = w;
	}
	
	return mouseInside(x, y, w, h, centered, true)
}

// FUNCTION : mouseInsidePlayableCanvas
////////////////////////////////////////
function mouseInsidePlayableCanvas()
{
	 return mouseInside(0, 0, _playableWidth, _playableHeight, false, false);
}

// FUNCTION : showPlayableCanvasProperties
//////////////////////////////////////////
function showPlayableCanvasProperties()
{
	fill(255);
	stroke(0);
	strokeWeight(2);
	textSize(12);
	textAlign(LEFT, CENTER);
	//text("window: " + windowWidth + ", " + windowHeight, 10, 40);
	//text("playable: " + _playableWidth + ", " + _playableHeight, 10, 60);
	text(int(mouseX) + ", " + int(mouseY), 5, 10);
}

// FUNCTION : showPlayableCanvasGrid
// Adapted from : https://editor.p5js.org/owenroberts/sketches/S1N-5TAGQ
/////////////////////////////////////////////////////////////////////////
function showPlayableCanvasGrid() {
	let u = 20; // one unit = 20 px
	stroke(220);
	strokeWeight(1);
	for (let x = 0; x <= _playableWidth; x += u) {
		for (let y = 0; y <= _playableHeight; y += u) {
			line(x, 0, x, _playableHeight);
			line(0, y, _playableWidth, y);
		}
	}
  stroke(0); // reset stroke color to black
}


// FUNCTION : windowResized
///////////////////////////
function windowResized() {
  resizeCanvas(_playableWidth, _playableHeight, true);
	//_translateX = windowWidth/2 - _playableWidth/2;
	//_translateY = windowHeight/2 - _playableHeight/2;
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////