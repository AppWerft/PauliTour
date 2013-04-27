for(var i = 0; i < locations.length; ) {
	var dist = locations[i].dist;
	Ti.API.log(dist);
	var opacity = (dist<1000) ? 0.8 : (400 / dist).toFixed(2);
	var scale = (dist < 1000 ) ? 0.7 : (400 / dist).toFixed(2);
	var tmatrix = Ti.UI.create2DMatrix().scale(scale);
	var horizAngle = Bearing(currLocation, locations[i]);
	if(dist > maxDist) {
		maxDist = dist;
	}
	switch(locations[i].kategorie) {
		case 1:
			bg = '#ff0000';
			break;
		case 2:
			bg = '#3333ff';
			break;
		case 3:
			bg = '#ff00ff';
			break;
	}
	var viewPlace = Ti.UI.createView({
		height : 30,
		width : 210,
		x : 0,
		name : locations[i].name,
		loc : {
			lat : locations[i].lat,
			lng : locations[i].lng
		},
		opacity : opacity,
		scale : scale,
		top : 150,
		color : 'black',
		borderWidth : 2,
		borderRadius : 6,
		borderColor : bg,
		backgroundColor : 'white',
		transform : tmatrix
	});

	var bkgLocView = Ti.UI.createButton({
		height : 30,
		width : 229,
		id : locations[i].id
	});

	var msgNameLbl = Ti.UI.createLabel({
		text : locations[i].title,
		color : "#000",
		textAlign : "center",
		width : 200,
		top : 5,
		left : 5,
		font : {
			fontSize : 12.5,
			fontFamily : "Neogrey"
		},
		height : 'auto'
	});
	viewPlace.add(msgNameLbl);
	viewPlace.hide();
	overlayView.add(viewPlace);
	i++;
	locViews.push(viewPlace);
};