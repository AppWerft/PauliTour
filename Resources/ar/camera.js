/**
 * Appcelerator Titanium Platform
 * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 **/

Ti.include("math.js");
Ti.include("../V/ui.head.js");

var win = Ti.UI.currentWindow;

var logo = createBackHead('Pauli-Rundblick');
logo.addEventListener('click', function() {
	Ti.Media.hideCamera();
	win.close();
});
var locations = win.locations;
var currLocation = win.currLocation || {
	lat : 53.5447956,
	lng : 9.9761868
};

var currBearing = 0;
var ok = false;
var viewAngleX = ToRad(15);
var locViews = [];
var maxDist = 0;

var displayCaps = Ti.Platform.displayCaps;
var centerX = displayCaps.platformWidth / 2;
var centerY = displayCaps.platformHeight / 2 - 50;

var overlayView = Ti.UI.createView();

if(Ti.Platform.model != "Simulator") {

	var bottombar = Ti.UI.createImageView({
		bottom : 0,
		height : 60,
		width : 320,
		image : 'bottombar.png'
	});
	bottombar.addEventListener('click', function(e) {
		var index = e.x / 104;
		if(index < 2) {
			Ti.Media.hideCamera();
			win.tabGroup.setActiveTab(index);
		} else
			win.close();
	});
	overlayView.add(logo);
} else {
	var bg = Ti.UI.createImageView({
		top : 0,
		height : '100%',
		width : 320,
		image : '/ar/bg.png'
	});
	overlayView.add(bg);
}
//End of the header items

Ti.include('createviews.js');

var targetView = Ti.UI.createView({
	height : 103,
	width : 98,
	top : 50,
	right : 0
});

var targetImg = Ti.UI.createButton({
	backgroundImage : "images/target.png",
	height : 103,
	width : 99,
	opacity : 0.8,
	touchEnabled : false
});

var circleView = Ti.UI.createView({
	height : 60,
	width : 60,
	borderRadius : 30,
	top : 70,
	right : 19,
	opacity : 0.4
});
targetView.add(targetImg);
overlayView.add(targetView);
overlayView.add(circleView);

/*
 This function adds all of the radar points onto the screen in their appropriate
 positions. Earlier we calculated the maxDist so that these will plot properly.
 This gets run only once when the AR view is opened.
 */
function MapLocations() {
	for(var i = 0; i < locations.length; ) {
		var dist = locations[i].dist;
		//	if (dist>1000) continue;
		var horizAngle = Bearing(currLocation, locations[i]);
		var ro = 32 * dist / maxDist;
		var centerX = 28 + ro * Math.sin(horizAngle);
		var centerY = 28 - ro * Math.cos(horizAngle);
		var circView = Ti.UI.createView({
			height : 4,
			width : 4,
			backgroundColor : "yellow",
			borderRadius : 2,
			top : centerY - 2,
			left : centerX - 2
		});
		circleView.add(circView);
		i++;
	}
};

Ti.include('updateviews.js');

MapLocations();

if(Ti.Platform.model == "Simulator") {

	//Add a slider if we are in the simulator
	var slider = Ti.UI.createSlider({
		min : 0,
		max : 10,
		value : 0,
		width : 300,
		bottom : 20
	});

	slider.addEventListener("change", function(e) {
		currBearing = ToRad(e.value * 36);
		UpdateView();
		circleView.transform = Ti.UI.create2DMatrix().rotate(ToDeg(-currBearing));
	});

	overlayView.add(slider);
	win.add(overlayView);

} else {
	//Create the heading event to monitor the direction we are facing
	Ti.Geolocation.addEventListener("heading", function(e) {
		currBearing = ToRad(e.heading.magneticHeading);
		ok = true;
	});
	//This is the update for moving all of the elements on the screen and rotating the radar screen
	setInterval(function() {
		if(!ok) {
			return;
		}
		UpdateView();
		circleView.transform = Ti.UI.create2DMatrix().rotate(ToDeg(-currBearing));
	}, 60);
	//This is the last part of the puzzle, launch the camera and add the overlayView!

	//Titanium.UI.currentWindow.tabGroup.addEventListener('focus', function(e) {
	function openCamera() {
		Ti.Media.showCamera({
			success : function(event) {
			},
			cancel : function() {
			},
			error : function(error) {
				var a = Titanium.UI.createAlertDialog({
					title : 'Camera'
				});
				if(error.code == Titanium.Media.NO_CAMERA) {
					a.setMessage('Please run this test on device');
				} else {
					a.setMessage('Unexpected error: ' + error.code);
				}
				a.show();
			},
			overlay : overlayView,
			showControls : false, // don't show system control
			autohide : false 	// tell the system not to auto-hide and we'll do it ourself
		});

	}


	overlayView.add(bottombar);
	win.addEventListener('open', openCamera);
	Ti.UI.currentTab.addEventListener('focus', openCamera);
}