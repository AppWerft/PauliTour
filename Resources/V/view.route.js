view.getRoutenButton = ( function(_view) {
		Ti.App.addEventListener('start:routing', function(e) {
			var routewin = Ti.UI.createWindow();
			routewin.addEventListener('close', function() {
				routewin = null
			});
			tabGroup.activeTab.open(routewin)
			var logo = createBackHead('Anfahrt zum Office');
			logo.addEventListener('click', function() {
				routewin.close();
			});
			routewin.add(logo);
			var ai = Ti.UI.createActivityIndicator({
				width : 250,
				height : 'auto',
				borderRadius : 5,
				borderWidth : 1,
				font : {
					fontSize : 10
				},
				borderColor : 'red',
				color : '#000',
				backgroundColor : 'yellow',
				style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
				message : "Berechne Route zum St.Pauli Tourist Office.",
			});
			routewin.add(ai);
			ai.show();
			ctrl.route.getRoute(e.position, function(e) {
				var tv = Ti.UI.createTableView({
					top : 60,
					bottom : 20,
					backgroundColor : 'black'
				});
				setTimeout(function() {
					ai.animate(Ti.UI.createAnimation({
						right : -200
					}));
				}, 1000);
				routewin.add(Ti.UI.createLabel({
					bottom : 0,
					height : 20,
					color : 'gray',
					text : e.route.copyrights,
					font : {
						fontSize : 12
					}
				}));
				var steps = [];
				var route = e.route.legs[0].steps;
				var map = Ti.Map.createView({
					height : 260,
					width : '100%',
					regionFit : true,
					userLocation : true,
					mapType : Titanium.Map.STANDARD_TYPE,
					region : {
						latitude : (e.route.bounds.northeast.lat + e.route.bounds.southwest.lat) / 2,
						longitude : (e.route.bounds.northeast.lng + e.route.bounds.southwest.lng) / 2,
						latitudeDelta : Math.abs(e.route.bounds.northeast.lat - e.route.bounds.southwest.lat),
						longitudeDelta : Math.abs(e.route.bounds.northeast.lng - e.route.bounds.southwest.lng)
					}

				});
				var office = Titanium.Map.createAnnotation({
					image : '/assets/paulipin.png',
					latitude : 53.5526999,
					longitude : 9.9607801
				});
				map.addAnnotation(office);
				var i = 0;
				//northeast
				//southwest
				map.addRoute({
					name : 'routezuuns',
					points : ctrl.route.decodeLine(e.route.overview_polyline.points),
					color : "orange",
					width : 5
				});
				for( i = 0; i < route.length; i++) {
					steps[i] = Ti.UI.createTableViewRow({});
					steps[i].add(Ti.UI.createLabel({
						height : 'auto',
						color : 'white',
						top : 10,
						left : 10,
						right : 10,
						bottom : 10,
						font : {
							fontFamily : 'MoondogZero',
							fontSize : 18,
						},
						textAlign : 'left',
						text : route[i].html_instructions.replace(/<div/ig, "\n<div").replace(/(<([^>]+)>)/ig, '').replace(/^\s+|\s+$/g, "")
					}));
				}
				steps[i + 1] = Ti.UI.createTableViewRow();
				steps[i + 1].add(map);
				routewin.add(tv);
				tv.setData(steps);
				tv.scrollToIndex(i);
			});
		});

	}());
