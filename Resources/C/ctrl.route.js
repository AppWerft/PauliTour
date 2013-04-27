ctrl.route = ( function() {
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
		api.decodeLine = function(encoded) {
			var len = encoded.length;
			var index = 0;
			var array = [];
			var lat = 0;
			var lng = 0;
			while(index < len) {
				var b;
				var shift = 0;
				var result = 0;
				do {
					b = encoded.charCodeAt(index++) - 63;
					result |= (b & 0x1f) << shift;
					shift += 5;
				} while (b >= 0x20);
				var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
				lat += dlat;

				shift = 0;
				result = 0;
				do {
					b = encoded.charCodeAt(index++) - 63;
					result |= (b & 0x1f) << shift;
					shift += 5;
				} while (b >= 0x20);
				var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
				lng += dlng;

				array.push([lat * 1e-5, lng * 1e-5]);
			}
			var points = [];
			for(var i = 0; i < array.length; i++) {
				points.push({
					"latitude" : array[i][0],
					"longitude" : array[i][1]
				});
			}
			return points;
		};
		api.getPosition = function(callback) {
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
				var office = [53.5528233, 9.9606333];
				var dist = getDistance(office[0], office[1], mylat, mylng);
				Titanium.Geolocation.reverseGeocoder(mylat, mylng, function(evt) {
					var myposition = evt.places[0];
					if(callback != null) {
						callback({
							"myposition" : myposition,
							"dist" : dist
						});
					}
				});
			});
		};
		api.getRoute = function(options, callback) {
			var url = 'https://maps.googleapis.com/maps/api/directions/json?language=de&region=de&sensor=true&origin=' + options.latitude + ',' + options.longitude + '&destination=53.5528233,9.9606333';
			xhr = Titanium.Network.createHTTPClient();
			xhr.open('GET', url);
			xhr.onload = function() {
				var route = JSON.parse(this.responseText);
				callback({
					"route" : route.routes[0]
				});
			};
			xhr.send();
		};
		return api;
	}());
