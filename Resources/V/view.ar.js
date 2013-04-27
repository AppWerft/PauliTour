view.ar = ( function() {
	var api = {};
	api.createARWindow = function() {
		var win1 = Titanium.UI.createWindow({
			navBarHidden : true
		});
		win1.add(createHead('St.Pauli-Rundblick'));
		var rows = [];
		var stations = [];
		var currLocation;
		rows[0] = Ti.UI.createTableViewRow({
			height : 130
		});
		var toptitle = Ti.UI.createLabel({
			color : 'white',
			top : 5,
			left : 180,
			height : 'auto',
			font : {
				fontSize : 20,
				fontFamily : 'MoondogZero'
			},
			text : 'Eigener Standort'
		});
		rows[0].add(toptitle);
		var map = Titanium.Map.createView({
			height : 600,
			width : 800,
			top : 3,
			left : 3,
			anchorPoint : {
				x : 0,
				y : 0
			},
			borderRadius : 10,
			borderWidth : 1,
			transform : Titanium.UI.create2DMatrix().scale(.2),
			userLocation : true,
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
				latitude : 53.5526999,
				longitude : 9.9607801,
				latitudeDelta : 0.0005,
				longitudeDelta : 0.0005
			},
		});
		
		var office = Titanium.Map.createAnnotation({
			latitude : 53.5526999,
			longitude : 9.9607801,
		});
		rows[0].add(map);
		var skull = Ti.UI.createImageView({
			image : '/assets/skull.png',
			right : 2,
			width : 25,
			height : 20
		});
	
		rows[0].add(skull);
	
		var tv = Ti.UI.createTableView({
			height : '100%',
			top : 60,
			backgroundColor : 'black'
		});
		win1.add(tv);
		tv.addEventListener('click', function(e) {
			var arwindow = Ti.UI.createWindow({
				navBarHidden : true,
				url : '/ar/camera.js',
				locations : stations,
				currLocation : currLocation
			});
			tabGroup.activeTab.open(arwindow);
		});
		ctrl.stations.getStations(true, function(e) {
			stations = e.stations;
			var colors = ['#ff7777', '#6666ff', '#ff66ff'];
			currLocation = e.myposition;
			map.setLocation({
				latitude : currLocation.lat,
				longitude : currLocation.lng
			});
			map.animate(Ti.UI.createAnimation({
				left : 3,
				duration : 800
			}));
			for(var i = 0; i < e.stations.length; i++) {
				var station = e.stations[i];
				rows[i + 1] = Ti.UI.createTableViewRow({
					latlng : station.latlng,
					height : 60
				});
				var skull = Ti.UI.createImageView({
					image : '/assets/skull.png',
					right : 2,
					width : 25,
					height : 20
				});
				var logo = Ti.UI.createImageView({
					image : '/assets/logos/' + station.id + '.png',
					left : 0,
					defaultImage : '',
					borderWidth : 1,
					borderRadius : 5,
					top : 3,
					width : 90,
					height : 30
				});
				var dist = Ti.UI.createLabel({
					color : '#ccc',
					left : 5,
					bottom : 5,
					height : 'auto',
					font : {
						fontSize : 10,
						fontFamily : 'MoondogZero'
					},
					text : station.dist + ' m'
				});
				rows[i + 1].add(dist);
				rows[i + 1].add(logo);
				var title = Ti.UI.createLabel({
					color : colors[station.kategorie - 1],
					left : 100,
					right : 25,
					top : 5,
					bottom : 10,
					height : 'auto',
					font : {
						fontSize : 15,
						fontWeight : 'bold',
						fontFamily : 'MoondogZero'
					},
					text : station.title
				});
				rows[i + 1].add(title);
				rows[i + 1].add(skull);
			}
			tv.setData(rows);
		});
		return win1;
	}
	return api;
}());
