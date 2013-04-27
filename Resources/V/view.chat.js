view.chat = ( function() {

		var api = {};

		api.createChatWindow = function() {
			var win1 = Titanium.UI.createWindow({

				barColor : 'black',
				navBarHidden : true,
				backgroundColor : '#fff'
			});

			win1.add(createHead('St.Pauli-Tresenlegende'));
			var container = Ti.UI.createScrollView({
				top : 50,
				height : Ti.UI.FILL || 'auto',
				width : Ti.UI.FILL || '100%',
				layout : 'vertical',
				contentHeight : Ti.UI.SIZE || 'auto',
				backgroundColor : 'black',
			});
			win1.add(container);
			container.add(Ti.UI.createLabel({
				top : 10,
				left : 10,
				bottom : 10,
				height : Ti.UI.SIZE,
				right : 10,
				text : L('CHAT_teaser'),
				color : 'white',
				font : {
					fontFamily : 'MoondogZero',
					fontSize : 16
				}
			}));

			var url = 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/276730_253657294752817_332803284_n.jpg';
			var img = Ti.UI.createImageView({
				top : 10,
				width : 320,
				height : 240,
				bottom : 10,
				image : url
			});
			container.add(img);
			container.add(Ti.UI.createLabel({
				top : 10,
				left : 10,
				bottom : 10,
				height : Ti.UI.SIZE,
				right : 10,
				text : L('CHAT1'),
				color : 'white',
				font : {
					fontFamily : 'MoondogZero',
					fontSize : 16
				}
			}));
			var yt = 'HRCPGvyW5D8';
			var movieUrl = "http://www.youtube.com/embed/" + yt + "?fs=1&autoplay=0";
			var online = (Ti.Network.networkType == Ti.Network.NETWORK_WIFI || Ti.Network.networkType == Ti.Network.NETWORK_LAN) ? true : false;
			if (online)
				container.add(Ti.UI.createWebView({
					url : movieUrl,
					top : 10,
					width : 320,
					height : 240
				}));
			return win1;
		}
		return api;
	}());
