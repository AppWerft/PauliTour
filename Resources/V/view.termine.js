view.termine = ( function() {
		var api = {};
		api.createTermineWindow = function() {
			var terminwindow = Titanium.UI.createWindow({
				navBarHidden : true,
			});
			terminwindow.add(createHead('nächste Touren'));
			var termineListe = Ti.UI.createTableView({
				backgroundColor : 'black',
				height : '100%',
				top : 60
			});
			var termine = ctrl.termine.getNext(165);
			var rows = [];
			for(var i = 0; i < termine.length; i++) {
				var image;
				var text;
				switch (termine[i].t) {
					case 'KT':
						text = "St. Pauli Kieztour", image = '/assets/kiez.JPG';
						break;
					case 'GT':
						text = "St. Pauli – Grenzgang bis Gentrifikation", image = '/assets/grenzgang.JPG';
						break;
					case 'ST':
						text = "Sanftpauli – der Live Reiseführer", image = '/assets/grenzgang.JPG';
						break;	
					case 'RT':
						text = "St. Pauli Ralleyquiz", image = '/assets/grenzgang.JPG';
						break;		
					case 'MT':
						text = "St. Pauli Mucketour", image = '/assets/grenzgang.JPG';
						break;		
					case 'KR':
						text = "St. Pauli Krimitour", image = '/assets/grenzgang.JPG';
						break;		

						
				}
				var img = Ti.UI.createImageView({
					left : 0,
					width : 66,
					height : 100,
					image : image
				});
				var skull = Ti.UI.createImageView({
					image : '/assets/skull.png',
					right : 5,
					width : 30,
					height : 22
				});
				var title = Ti.UI.createLabel({
					left : 80,
					top : 10,
					height : 'auto',
					color : 'white',
					font : {
						fontSize : 15,
						fontFamily : 'MoondogZero'
					},
					text : termine[i].d + '  ' + termine[i].z
				});
				var text = Ti.UI.createLabel({
					left : 80,
					right : 10,
					bottom : 10,
					color : '#ff0000',
					height : 'auto',
					font : {
						fontFamily : 'MoondogZero',
						fontSize : 18,
					},

					text : text
				});
				rows[i] = Ti.UI.createTableViewRow({
					height : 100,
					item : {
						"title" : text.text,
						"zeit" : title.text,
						"day" : termine[i].day,
						"img" : img.image,
						"type" : termine[i].t,
						"startdate" : termine[i].startdate,
						"enddate" : termine[i].enddate,
						"wd" : termine[i].wd
					}
				});
				rows[i].add(img);
				rows[i].add(title);
				rows[i].add(text);
				rows[i].add(skull);
			}
			termineListe.setData(rows);
			termineListe.addEventListener('click', function(e) {
				var item = e.rowData.item;
				var detailwindow = Ti.UI.createWindow({
				});
				detailwindow.addEventListener('close', function() {
					detailwindow = null;
				});
				tabGroup.activeTab.open(detailwindow);

				var logo = createBackHead(item.title);
				logo.addEventListener('click', function() {
					detailwindow.close();
				});
				detailwindow.add(logo);
				var container = Ti.UI.createScrollView({
					top : 100,
					height : Ti.UI.FILL || 'auto',
					width : Ti.UI.FILL || '100%',
					layout : 'vertical',
					contentHeight :Ti.UI.SIZE || 'auto'
				});
				detailwindow.add(container);
				var title = Ti.UI.createLabel({
					text : item.zeit,
					height : 30,
					top : 70,
					left : 10,
					color : 'red',
					font : {
						fontFamily : 'MoondogZero',
						fontSize : 20
					}
				});
				var calendarButton = Ti.UI.createImageView({
					image : '/assets/calendar.png',
					top : 60,
					right : 10,
					width : 40,
					height : 50
				});
				var anfahrtButton = Ti.UI.createImageView({
					image : '/assets/anfahrt.png',
					top : 60,
					right : 60,
					width : 50,
					height : 50,
					opacity : 0
				});
				var ai = Ti.UI.createActivityIndicator({
					top : 60,
					right : 60,
					width : 50,
					height : 50,
					style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
				});
				detailwindow.add(ai);
				ai.show();
				ctrl.route.getPosition(function(e) {
					var position = e.myposition;
					anfahrtButton.position = position;
					ai.hide();
					anfahrtButton.animate(Ti.UI.createAnimation({
						opacity : 1,
						duration : 700
					}));
					anfahrtButton.addEventListener('click', function() {
						Ti.App.fireEvent('start:routing',{position:position});
					});
					//view.getRoutenButton(anfahrtButton);
					view.getRoutenButton(ai);
				});
				var day = Ti.UI.createLabel({
					text : item.day,
					height : 'auto',
					color : 'black',
					opacity : 0.7,
					bottom : 7,
					font : {
						fontSize : 22,
						fontWeight : 'bold'
					}
				});
				var wd = Ti.UI.createLabel({
					text : item.wd,
					height : 'auto',
					color : 'white',
					top : 6,
					font : {
						fontSize : 7
					}
				});
				calendarButton.add(day);
				calendarButton.add(wd);
				calendarButton.addEventListener('click', function() {
					var dialog = Ti.UI.createOptionDialog({
						options : ['Im Kalender merken', 'Office anrufen (Festnetz)', 'Office anrufen (Handy)', 'Kontakt speichern', 'Strompost', 'Abbruch'],
						cancel : 5,
						title : 'Es gibt viele Möglichkeiten uns zu kontakten. Wählen Sie eine aus:'
					});
					dialog.show();
					dialog.addEventListener('click', function(e) {
						switch (e.index) {
							case 0:
								var Calendar = require('com.ti.calendar');
								var event = Calendar.createItem({
									title : item.title,
									startDate : item.startdate,
									endDate : item.enddate,
									location : 'Hamburg, Wohlwillstraße 1'
								});
								var p = event.saveEvent();
								break;
							case 1:
								Ti.Platform.openURL('tel://+494098234483');
								break;
							case 2:
								Ti.Platform.openURL('tel://+491734595920');
								break;
							case 3:
								var contacts = [{
									image : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'assets/appicon.png').read(),
									URL : {
										"homepage" : ['http://www.pauli-tourist.de']
									},
									phone : {
										"work" : ['0049404098234483']
									},
									email : {
										"work" : ['info@pauli-tourist.de']
									},
									lastName : 'St.Pauli Tourist Office',
									kind : Ti.Contacts.CONTACTS_KIND_ORGANIZATION,
									address : {
										"work" : [{
											"Street" : 'Wohlwillstraße 1',
											"City" : 'Hamburg',
											"Country" : 'Germany',
											"ZIP" : '20359'
										}]
									}
								}];
								Ti.Contacts.createPerson(contacts[0]);
								break;
							case 4:
								var email = Ti.UI.createEmailDialog();
								email.subject = "Kiet Toure";
								email.toRecipients = ['info@pauli-tourist.de'];
								email.messageBody = '';
								email.open();
						}
					});

				});
				detailwindow.add(calendarButton);
				detailwindow.add(anfahrtButton);

				var img = Ti.UI.createImageView({
					top : 10,
					width : 300,
					height : 400,
					bottom:10,
					image : item.img
				});
				var key = item.type + '_full';
				var full = L(key);
				//container.add(img);
				container.add(Ti.UI.createLabel({
					top : 10,
					left : 10,
					bottom: 10,
					right : 10,
					text : full,
					color : 'white',
					font : {
						fontFamily : 'MoondogZero',
						fontSize : 16
					}
				}));
				container.add(Ti.UI.createLabel({
					top : 10,
					left : 10,
					bottom: 10,
					right : 10,
					text :  "\n\nTreffpunkt: Wohlwillstrasse 1\nKosten: 15 EUR/Person\n",
					color : 'yellow',
					font : {
						fontFamily : 'MoondogZero',
						fontSize : 16
					}
				}));
				

			});
			terminwindow.add(termineListe);
			termineListe.addEventListener('scroll', function() {
				redstar3.top = 40;
				redstar3.animate(Ti.UI.createAnimation({
					opacity : 0
				}));
				;
			});
			termineListe.addEventListener('scrollEnd', function() {
				redstar3.show();
				redstar3.top = 20;
			});
			var redstar3 = getStar();
			terminwindow.add(redstar3);
			return terminwindow;

		}
		return api;
	}());
