ctrl.stations = ( function() {
	var api = {};
	var getDistance = function(lat1, lon1, lat2, lon2) {
		var R = 6371000;
		// m (change this constant to get miles)
		var dLat = (lat2 - lat1) * Math.PI / 180;
		var dLon = (lon2 - lon1) * Math.PI / 180;
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return Math.round(d);
	};
	var conn = Ti.Database.install('/M/pauli.sqlite', 'pauli20');

	api.getStations = function(userlocation, callback) {
		var resultSet = conn.execute('SELECT * FROM `stations`');
		var stations = [];
		while(resultSet.isValidRow()) {
			var item = {};
			item['id'] = resultSet.fieldByName('id');
			item['title'] = resultSet.fieldByName('title');
			item['subtitle'] = resultSet.fieldByName('subtitle');
			item['latlng'] = resultSet.fieldByName('latlng');
			item['kategorie'] = resultSet.fieldByName('kategorie');
			item['url'] = resultSet.fieldByName('url');
			item['logo'] = resultSet.fieldByName('logo');
			item['email'] = resultSet.fieldByName('email');
			item['telefon'] = resultSet.fieldByName('telefon');
			stations.push(item);
			resultSet.next();
		}
		resultSet.close();
		if(userlocation) {
			Ti.Geolocation.purpose = "Recieve User Location";
			Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.getCurrentPosition(function(e) {
				if(e.error) {
					var mylat = 53.5;
					var mylng = 10;
				} else {
					var mylat = e.coords.latitude;
					var mylng = e.coords.longitude;
				}
				for(var i = 0; i < stations.length; i++) {
					if(stations[i].latlng) {
						stations[i].dist = getDistance(stations[i].latlng.split(',')[0], stations[i].latlng.split(',')[1], mylat, mylng);
						stations[i].lat = stations[i].latlng.split(',')[0];
						stations[i].lng = stations[i].latlng.split(',')[1];
					}
				}
				stations.sort(function(a, b) {
					if(a.dist < b.dist) {
						return -1;
					}
					if(a.dist > b.dist) {
						return 1;
					}
					return 0;
				});
				if(callback != null) {
					callback({
						"stations" : stations,
						"myposition" : {
							"lat" : mylat,
							"lng" : mylng
						},
						"dist" : getDistance(53.5526999, 9.9607801,mylat, mylng),
						"office" : {
							"lat" : 53.5526999,
							"lng" : 9.9607801
						}
					});
				}
			});
		} else {
			if(callback != null) {
				callback({
					"stations" : stations
				});
			}
		}

	};
	return api;
}());
