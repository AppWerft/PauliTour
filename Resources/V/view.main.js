view.main = ( function() {
		var api = {};
		api.createMainWindow = function() {
			Ti.API.log(Ti.Locale.currentLanguage);
			var mainwindow = Titanium.UI.createWindow({
				navBarHidden : true
			});
			var anims = {
				"gal_is_up" : true
			};
			mainwindow.add(createHead(L('head_tours')));
			var tv = Ti.UI.createTableView({
				top : 60,
				separatorColor : 'black',
				backgroundColor : 'black'
			});
			mainwindow.add(tv);
			var galerie = Ti.UI.createScrollView({
				height : 60,
				bottom : 0,
				width : '100%',
				contentWidth : 'auto',
				layout : 'horizontal'
			});

			var gi = [{
				f : 'DSC_0970.jpg'
			}, {
				f : 'DSC_0971.jpg'
			}, {
				f : 'DSC_0973.jpg'
			}, {
				f : 'DSC_0974.jpg'
			}, {
				f : 'DSC_0975.jpg'
			}, {
				f : 'DSC_0976.jpg'
			}, {
				f : 'DSC_0977.jpg'
			}, {
				f : 'DSC_0981.jpg'
			}, {
				f : 'DSC_0983.jpg'
			}, {
				f : 'DSC_0988.jpg'
			}, {
				f : 'DSC_0991.jpg'
			}, {
				f : 'DSC_0992.jpg'
			}, {
				f : 'DSC_0993.jpg'
			}, {
				f : 'DSC_0995.jpg'
			}, {
				f : 'DSC_0996.jpg'
			}];
			var galimages = [];
			var views = [];
			for (var i = 0; i < gi.length; i++) {
				galimages[i] = Ti.UI.createImageView({
					image : '/assets/fotos/' + gi[i].f,
					height : 60,
					width : 90,
					right : 2,
					borderRadius : 5,
					borderColor : '#777'
				});
				galimages[i].addEventListener('click', function(e) {
					var galwin = Ti.UI.createWindow();
					tabGroup.activeTab.open(galwin);
					galwin.addEventListener('close', function() {
						galwin = null;
					});
					var logo = createBackHead('Kiez-Photostrecke');
					logo.addEventListener('click', function() {
						galwin.close();
					});
					galwin.add(logo);
					var container = Ti.UI.createScrollableView({
						height : 370,
						bottom : 0,
						showPagingControl : true
					});
					var images = [];
					var path = Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator + 'assets' + Ti.Filesystem.separator + 'photos';
					var imgDirectory = Ti.Filesystem.getFile(path);
					var imagesArray = imgDirectory.getDirectoryListing();
					for ( i = 0; i < imagesArray.length; i++) {
						var url = '/assets/photos/' + imagesArray[i];
						images.push(Ti.UI.createImageView({
							width : '100%',
							height : 'auto',
							image : url,
							bottom : 0
						}));
					}
					container.views = images;
					galwin.add(container);

				});
				views[i] = Ti.UI.createImageView({
					image : '/assets/fotos/' + gi[i].f,
					height : 240,
					width : 320
				});
				galerie.add(galimages[i])
			}
			mainwindow.add(galerie);
			var rows = [];
			var img = [];

			rows[0] = Ti.UI.createTableViewRow({
				height : 250
			});
			var vorlauf = Ti.UI.createLabel({
				text : L('MOIN'),
				color : 'white',
				height : 250,
				left : 5,
				right : 10,
				font : {
					fontSize : 16,
					fontFamily : 'MoondogZero'
				}
			});
			rows[0].add(vorlauf);
			rows[1] = Ti.UI.createTableViewRow({
				item : {
					"title" : L('KT_title'),
					"fulltext" : L('KT_full'),
					"teaser" : L('KT_teaser')
				},
				height : 'auto'
			});
			rows[1].add(Ti.UI.createLabel({
				left : 115,
				text : L('KT_title'),
				top : 3,
				height : 20,
				color : 'red',
				font : {
					fontSize : 20,
					fontWeight : 'bold',
					fontFamily : 'MoondogZero'
				}
			}));
			rows[1].add(Ti.UI.createLabel({
				left : 115,
				text : L('KT_teaser'),
				top : 30,
				right : 15,
				bottom : 10,
				height : 'auto',
				color : 'white',
				font : {
					fontSize : 16,
					fontFamily : 'MoondogZero'
				}
			}));
			var skull = Ti.UI.createImageView({
				image : '/assets/skull.png',
				height : 36,
				width : 28,
				right : 2
			});
			var img1 = Ti.UI.createImageView({
				image : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/assets/kiez.JPG').read(),
				width : 100,
				height : 144,
				left : 0,
				top : 10
			});
			rows[1].add(img1);
			rows[1].add(skull);
			rows[2] = Ti.UI.createTableViewRow({
				height : 'auto'
			});
			rows[2].add(Ti.UI.createLabel({
				left : 120,
				text : L('GT_title'),
				top : 3,
				height : 'auto',
				color : 'red',
				font : {
					fontSize : 20,
					fontWeight : 'bold',
					fontFamily : 'MoondogZero'
				}
			}));
			rows[2].add(Ti.UI.createLabel({
				left : 120,
				text : L('GT_full'),
				top : 80,
				right : 10,
				height : 'auto',
				color : 'white',
				font : {
					fontSize : 16,
					fontFamily : 'MoondogZero'
				}
			}));
			var img2 = Ti.UI.createImageView({
				image : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/assets/grenzgang.JPG').read(),
				width : 100,
				height : 144,
				left : 0,
				top : 10
			});
			rows[2].add(img2);
			rows[3] = Ti.UI.createTableViewRow({
				height : 'auto'
			});
			rows[3].add(Ti.UI.createLabel({
				left : 120,
				text : L('MT_title'),
				top : 3,
				height : 'auto',
				color : 'red',
				font : {
					fontSize : 20,
					fontWeight : 'bold',
					fontFamily : 'MoondogZero'
				}
			}));
			rows[3].add(Ti.UI.createLabel({
				left : 120,
				text : L('MT_full'),
				top : 50,
				right : 10,
				height : 'auto',
				color : 'white',
				font : {
					fontSize : 16,
					fontFamily : 'MoondogZero'
				}
			}));

			var img3 = Ti.UI.createImageView({
				image : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/assets/mucke.JPG').read(),
				width : 100,
				height : 144,
				left : 0,
				top : 10
			});
			rows[3].add(img3);

			rows[4] = Ti.UI.createTableViewRow({
				height : 'auto'
			});
			rows[4].add(Ti.UI.createLabel({
				left : 120,
				text : 'St.Pauli Bar Tour',
				top : 3,
				height : 'auto',
				color : 'red',
				font : {
					fontSize : 20,
					fontWeight : 'bold',
					fontFamily : 'MoondogZero'
				}
			}));
			rows[4].add(Ti.UI.createLabel({
				left : 120,
				text : "Wir starten mit einer kurzen knackigen geschichtlichen Einführung. Entsprechend eurer Vorlieben steuern wir 3 - 4 Bars & Kneipen an, die auf jeden Fall einzigartig sind, ob schrill, urig, laut, gemütlich oder … \n\n" + "Selbstverständlich können wir den Startpunkt, den Endpunkt und alle Stopps dazwischen ganz nach euren Wünschen gestalten. Unsere Guides selbst sind jedes Wochenende im Viertel unterwegs, kennen alle Geheimtipps – und teilen sie mit euch!" + "Ruft uns einfach an, oder schreibt uns eine Mail. Wir schicken euch ein individuelles Angebot, das perfekt zu eurem Anlass passt.",
				top : 30,
				right : 10,
				height : 'auto',
				color : 'white',
				font : {
					fontSize : 15,
					fontFamily : 'MoondogZero'
				}
			}));

			var img4 = Ti.UI.createImageView({
				image : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/assets/schnaps.JPG').read(),
				width : 100,
				height : 144,
				left : 0,
				top : -10
			});
			rows[4].add(img4);
			tv.setData(rows);
			tv.addEventListener('scroll', function(_e) {
				var height = _e.contentSize.height - _e.size.height;
				if (_e.contentOffset.y < 50 || _e.contentOffset.y + 50 > height) {
					if (anims.gal_is_up == false) {
						var goUp = Ti.UI.createAnimation({
							bottom : 0,
							duration : 500
						});
						galerie.animate(goUp);
						anims.gal_is_up = true;
						goUp.addEventListener('complete', function() {

						});
					}
				} else {
					if (anims.gal_is_up) {
						var goDown = Ti.UI.createAnimation({
							bottom : -60,
							duration : 500
						});
						galerie.animate(goDown);
						anims.gal_is_up = false;
						goDown.addEventListener('complete', function() {

						});

					}
				}
				if (_e.contentOffset.y < 100) {
					radioContainer.animate(Ti.UI.createAnimation({
						duration : 100,
						opacity : 1
					}));
				} else {
					radioContainer.animate(Ti.UI.createAnimation({
						duration : 100,
						opacity : 0
					}));
				}
			});
			tv.addEventListener('click', function(e) {
				if (e.rowData.item) {
					var item = e.rowData.item;
					var detailwindow = Ti.UI.createWindow();
					var logo = createBackHead(item.title);
					logo.addEventListener('click', function() {
						detailwindow.close();
					});
					detailwindow.add(logo);
					var container = Ti.UI.createScrollView({
						top : 60,
						height : '100%',
						width : '100%',
						layout : 'vertical',
						contentHeight : 'auto'
					});
					detailwindow.add(container);
					container.add(Ti.UI.createLabel({
						top : 10,
						left : 10,
						right : 10,
						text : item.fulltext,
						color : 'white',
						font : {
							fontFamily : 'MoondogZero',
							fontSize : 16
						}
					}));
					var zurphotostrecke = Ti.UI.createButton({
						height : 30,
						width : '90%',
						bottom : 80,
						top : 20,
						title : 'Fotostrecke Kieztour'
					});
					zurphotostrecke.addEventListener('click', function() {
						var galwin = Ti.UI.createWindow();
						var logo = createBackHead('Kiez-Photostrecke');
						logo.addEventListener('click', function() {
							galwin.close();
						});
						galwin.add(logo);
						var container = Ti.UI.createScrollableView({
							height : 370,
							bottom : 0,
							showPagingControl : true
						});
						var images = [];
						var path = Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator + 'assets' + Ti.Filesystem.separator + 'photos';
						var imgDirectory = Ti.Filesystem.getFile(path);
						var imagesArray = imgDirectory.getDirectoryListing();
						for ( i = 0; i < imagesArray.length; i++) {
							var url = '/assets/photos/' + imagesArray[i];
							images.push(Ti.UI.createImageView({
								width : '100%',
								height : 'auto',
								image : url,
								bottom : 0
							}));
						}
						container.views = images;
						galwin.add(container);
						tabGroup.activeTab.open(galwin);
					});
					container.add(zurphotostrecke);
					tabGroup.activeTab.open(detailwindow);
				}
			});
			var redstar2 = getStar();
			mainwindow.add(redstar2);
			redstar2.hide();
			Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
			var streamer = Ti.Media.createAudioPlayer({
				"url" : 'http://static.src.84.cdn.3qsdn.com:11000/;27538604009897stream.nsv',
				allowBackground : true
			});
			var radios = [];
			for (var i = 0; i < 6; i++) {
				radios.push('/assets/radio/radio' + i + '.png');
			}
			var radioContainer = Ti.UI.createView({
				width : 60,
				height : 90,
				right : 30,
				top : 85
			});
			var radioAnimatedView = Ti.UI.createImageView({
				width : 60,
				height : 77,
				right : 0,
				top : 0,
				duration : 300,
				hires : true,
				defaultImage : '/assets/radio/radio2.png',
				repeatCount : 0,
				images : radios,
				visible : false
			});
			radioAnimatedView.start();
			var radioPreView = Ti.UI.createButton({
				width : 60,
				top : 0,
				height : 77,
				backgroundImage : '/assets/radio/radio.png',
				visible : true
			});
			var ai = Titanium.UI.createActivityIndicator({
				width : 30,
				height : 30,
				bottom : 10
			});
			//			radioContainer.add(radioAnimatedView);
			radioContainer.add(radioPreView);
			radioContainer.add(ai);
			var comment = Ti.UI.createLabel({
				bottom : 20,
				height : 12,
				font : {
					fontSize : 9
				},
				color : 'white',
				textAlign : 'center'
			});

			radioContainer.add(comment);

			/*
			 * 0 init
			 * 1 starting
			 * 2 data waiting
			 * 3 waiting  queue
			 * 4 playing
			 * 5 Buffering
			 * 6 stopping
			 * 7 stopped
			 */
			streamer.addEventListener('change', function(e) {
				switch (e.state) {
					case 0:
						// init
						radioPreView.show();
						Ti.App.idleTimerDisabled = false;
						comment.setText('');
						break;
					case 3:
						ai.show();
						Ti.App.idleTimerDisabled = false;
						Ti.App.idleTimerDisabled = false;
						comment.setText('Warte …');
					case 4:
						ai.hide();
						Ti.App.idleTimerDisabled = true;
						comment.setText('♪♬♩♫');
						break;
				}
				//				comment.setText(e.description);
			});
			radioContainer.addEventListener('click', function() {
				if (streamer.playing || streamer.paused) {
					streamer.stop();
					comment.setText('ANGEHALTEN');
				} else {
					streamer.stop();
					streamer.start();
					//	Ti.Media.startMicrophoneMonitor();
					//	timeHandler = setInterval(showLevels, 10);
					comment.setText('GESTARTET');
				}

			});
			mainwindow.add(radioContainer);
			mainwindow.addEventListener('focus', function() {
				redstar2.animate(Ti.UI.createAnimation({
					top : 35,
					duration : 700
				}));
			});
			var aw = Ti.UI.createImageView({
				image : '/assets/AppWerft.png',
				width : 300,
				height : 124,
				bottom : 0
			});
			mainwindow.add(aw);
			setTimeout(function() {
				aw.hide();
			}, 5000);
			aw.animate(Ti.UI.createAnimation({
				bottom : 500,
				transform : Titanium.UI.create2DMatrix().scale(.01),
				opacity : 0,
				duration : 2000,
				delay : 1000
			}));
			return mainwindow;

		}
		return api;
	}());
