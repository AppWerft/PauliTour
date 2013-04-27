view.map = ( function() {
		
		var api = {};
		api.startVideo = function(win) {
			var dark = Ti.UI.createView({
				backgroundColor : 'black',
				opacity : 0.76,
				top:60
			});
			dark.addEventListener('click', function() {
				try {
					if(videoPlayer.playing) {
						videoPlayer.stop();
					}
					dark.hide();
					videoContainer.animate(Ti.UI.createAnimation({
						bottom : -180
					}));
				} catch(E) {
					Ti.API.debug(E);
				}
			});
			win.add(dark);
			var videoContainer = Ti.UI.createView({
				height : 180,
				width : 320,
				bottom:-180
			});
			var videoPlayer;
			if( typeof (videoPlayer) != 'object') {
				videoPlayer = Ti.Media.createVideoPlayer({
					width : 320,
					height : 180,
					backgroundColor : 'black',
					mediaControlStyle : Ti.Media.VIDEO_CONTROL_NONE,
					scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FIT
					//		scalingMode : Ti.Media.VIDEO_SCALING_MODE_FILL
				});

				win.add(videoContainer)
			}
			videoPlayer.addEventListener('complete', function(e) {
				videoContainer.animate(Ti.UI.createAnimation({
					duration : 800,
					bottom: -180
				}));
				dark.hide();

			});
			if(videoPlayer.playing) {
				videoPlayer.stop();
			}
			videoContainer.animate(Ti.UI.createAnimation({
				duration : 800,
				bottom : 0
			}));
			videoContainer.add(videoPlayer);
			var url = '/assets/pauli.mp4';
			videoPlayer.url = url;
			videoPlayer.play();
			videoContainer.animate(Ti.UI.createAnimation({
				duration : 1800,
				bottom : 0
			}));
		};
		api.createMapWindow = function() {
			var win1 = Titanium.UI.createWindow({
				title : 'Karte',
				barColor : 'black',
				navBarHidden : true,
				backgroundColor : '#fff'
			});

			win1.add(createHead('St.Pauli-Karte'));
			var map = Titanium.Map.createView({
				height : 370,
				width : '100%',
				top : 60,
				userLocation : true,
				mapType : Titanium.Map.STANDARD_TYPE,
				region : {
					latitude : 53.5526999,
					longitude : 9.9607801,
					latitudeDelta : 0.003,
					longitudeDelta : 0.003
				},
			});
			var office = Titanium.Map.createAnnotation({
				image : '/assets/paulipin.png',
				latitude : 53.5526999,
				longitude : 9.9607801,
				title : 'St.Pauli Tourist Office',
				subtitle : 'Wohlwillstraße 1',
				mp4 : '/assets/pauli.mp4'
			});
			ctrl.stations.getStations(true, function(e) {
				var pins = [];
				for(var i = 0; i < e.stations.length; i++) {
					var station = e.stations[i];
					if(!station.latlng) {
						continue;
					}
					switch (station.kategorie) {
						case 1 :
							image = 'assets/bier.png';
							break;
						case 2 :
							image = 'assets/shop.png';
							break;
						case 3 :
							image = 'assets/hotel.png';
							break;

					}
					pins[i] = Titanium.Map.createAnnotation({
						latitude : station.latlng.split(',')[0],
						longitude : station.latlng.split(',')[1],
						title : station.title,
						subtitle : station.subtitle,
						image : image,
						leftView : Ti.UI.createImageView({
							image : '/assets/logos/' + station.id + '.png',
							width : 80,
							defaultImage : '',
							height : 26
						}),
						rightButton : '/assets/right.png',
						station : station
					});
				}
				map.addAnnotations(pins);
			});
			map.addAnnotation(office);
			map.selectAnnotation(office);
			var self = this;
			map.addEventListener('click', function(e) {

				if(e.annotation.mp4 && (e.clicksource == 'title' || e.clicksource == 'subtitle')) {
					self.startVideo(win1);
					return;
				}

				if(e.clicksource == 'title' || e.clicksource == 'subtitle' || e.clicksource == 'rightButton') {
					var item = e.annotation.station || {};
					item.title = e.title;
					var options = [];
					var types = [];
					try {
						if(item.url) {
							options.push('Webseite');
							types.push('url');
						}
					} catch(E) {
					}
					try {
						if(item.email) {
							options.push('eMail');
							types.push('email');
						}
					} catch(E) {
					}
					try {
						if(item.telefon) {
							options.push('Telefon');
							types.push('telefon');
						}
					} catch(E) {
					}

					options.push('StreetView');
					types.push('sv');
					options.push('Schließen');
					var optionsDialogOpts = {
						options : options,
						cancel : options.length - 1,
						title : e.title
					};
					var dialog = Ti.UI.createOptionDialog(optionsDialogOpts);
					dialog.show();
					dialog.addEventListener('click', function(e) {
						if(types[e.index] == 'url') {
							var webwindow = Ti.UI.createWindow({
							});
							var logo = createBackHead(item.title);
							logo.addEventListener('click', function() {
								webwindow.close();
							});
							webwindow.add(logo);
							var gedulder = Ti.UI.createView({
								width : 270,
								height : 160,
								borderRadius : 5,
								borderColor : 'red',
								backgroundColor : 'black'
							});
							gedulder.add(Ti.UI.createImageView({
								width : 240,
								height : 80,
								top : 10,
								image : '/assets/logos/' + item.id + '.png'
							}));
							gedulder.add(Ti.UI.createLabel({
								width : 200,
								height : 60,
								bottom : 5,
								color : 'white',
								font : {
									fontSize : 15,
									fontFamily : 'MoondogZero'
								},
								text : 'Lade Webseite von ' + item.title
							}));

							var webview = Ti.UI.createWebView({
								top : 60,
								url : 'http://' + item.url
							});
							webview.addEventListener('load', function() {
								gedulder.animate(Ti.UI.createAnimation({
									right : -310,
									delay : 300
								}));
							});
							webwindow.add(webview);
							webwindow.add(gedulder);
							tabGroup.activeTab.open(webwindow);
						};
						if(types[e.index] == 'sv') {
							var webwindow = Ti.UI.createWindow({
								top : 60,
							});
							var logo = createBackHead(item.title);
							logo.addEventListener('click', function() {
								webwindow.close();
							});
							webwindow.add(logo);
							var webview = Ti.UI.createWebView({
								url : 'V/sv.html',
								top : 60
							});
							webwindow.add(webview);
							webview.addEventListener('load', function() {
								webview.evalJS('initSV(' + item.latlng + ');');
								webview.loaded = true;
							});
							tabGroup.activeTab.open(webwindow);
						};
						if(types[e.index] == 'telefon') {
							Ti.Platform.openURL('tel:' + item.telefon);
						};
					});
				}
			});

			var schild = Ti.UI.createImageView({
				image : '/assets/schild.png',
				top : 60,
				width : 323,
				height : 56,
				left : 1,
				opacity : 0.8
			});
			var strasse = Ti.UI.createLabel({
				color : '#ddd',
				left : 20,
				height : 25,
				right : 20,
				textAlign : 'left',
				shadowColor : '#999',
				shadowOffset : {
					x : 1,
					y : 1
				},
				font : {
					fontFamily : 'PilsenPlakat',
					fontSize : 22
				},
				text : ''
			});
			schild.add(strasse);
			Ti.Geolocation.purpose = "Recieve User Location";
			Ti.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.distanceFilter = 10;
			Titanium.Geolocation.addEventListener('location', function(g) {
				if (!g.success) return;
				Titanium.Geolocation.reverseGeocoder(g.coords.latitude, g.coords.longitude, function(evt) {
					schild.animate(Ti.UI.createAnimation({
						opacity : 1
					}));
					if (!evt.success) return;
					strasse.setText(evt.places[0].street);
				});
			});
			win1.add(map);
			win1.add(schild);
			return win1;
		}
		return api;
	}());
