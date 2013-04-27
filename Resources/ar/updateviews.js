function UpdateView() {
	var onScreen = [];	//This array will hold the views that are actively on the viewable area of the screen
	
	for (var i = 0; i < locations.length; i++) {
		var horizAngle = Bearing(currLocation, locations[i]);
		var dist = Distance(currLocation, locations[i]);
		var relAngleH = horizAngle - currBearing;
		
		//This handy code cuts out a lot of overprocessing
		if (ToDeg(relAngleH) >= 90 && ToDeg(relAngleH) <= 270) {
			continue;
		}
		
		var xDelta = ComputeXDelta(relAngleH);
		var viewCenterX = xDelta * centerX + centerX;
		locViews[i].x = viewCenterX - 130;
		
		//This checks the right and left of the screen to see if the view is visible.
        if (locViews[i].x > displayCaps.platformWidth + 130 || (locViews[i].x + 130) < -229) {
            locViews[i].hide();
        } else {
			onScreen.push(locViews[i]);
            locViews[i].show();
        }
	}
	
	//This does all the hard work :) Pay attention here!
	/*
	All elements on screen now get a revised matrix for placement. They also
	get rerun through the various math functions. This is seperated out
	to give order to the items on screen. Otherise we would have a ton of overlay.
	I'm sure there is room for improvement here, but this is a great start.
	*/
	for (var j= 0; j < onScreen.length; j++) {			
		var totalDeep 		= 1;	//This variable determines how var to layer the items on the screen	
		var horizAngle1 	= Bearing(currLocation, onScreen[j].loc);
		var relAngleH1 		= horizAngle1 - currBearing;
		var xDelta1 		= ComputeXDelta(relAngleH1);
		var viewCenterX1	= xDelta1 * centerX + centerX;	//This is related to the global centerX & Y
		
		var t = Ti.UI.create2DMatrix().scale(onScreen[j].scale); //Grab the scale variable that we stored earlier
			t.tx = viewCenterX1 - 130;	//This sets our left and right movements
		
		onScreen[j].x = viewCenterX1;	//This helps with the comparison in the following conditionals
				
		for (var k=0; k < onScreen.length; k++) {
			if (viewCenterX1 == onScreen[k].x) {
				break;
			} else {
				/*
				This loop with the conditional looks for overlap on the location views. If it overlays, it adds 55px to the 
				overlaped one and pushes it down. Improvement here could be to cap the limit, tie this in with 
				the accelerometer, and also reset it. This is an area for performance improvements, but
				gives a simple example of what can be done for quick sorting.
				*/
				if ((onScreen[k].x < onScreen[j].x + 229) || (onScreen[k].x > onScreen[j].x - 229)) {	
						var ty = 30 * totalDeep;
							t.ty = ty;
						totalDeep++;
					} else {
						t.ty = 0;
						totalDeep--;
					}
	
				}				
		}
		//We perform the transformation after all of that!
		onScreen[j].transform = t;
	}
};



