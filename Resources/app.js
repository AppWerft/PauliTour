// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var ctrl = {};
var view = {};
Ti.include('C/date.js');
Ti.include('C/ctrl.stations.js');
Ti.include('C/ctrl.termine.js');
Ti.include('C/ctrl.route.js');
Ti.include('V/view.map.js');
Ti.include('V/view.chat.js');

Ti.include('V/view.main.js');
Ti.include('V/view.termine.js');
Ti.include('V/view.ar.js');
Ti.include('V/view.route.js');
Ti.include('V/view.intro.js');

Ti.include('/aw/ctrl.references.js');
Ti.include('/aw/view.references.js');

Ti.include('V/ui.head.js');

var introwindow = view.intro.createIntroWindow();

// create tab group
var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(Titanium.UI.createTab({
	icon : 'assets/tour.png',
	title : L('navi_tours'),
	window : view.main.createMainWindow()
}));
tabGroup.addTab(Titanium.UI.createTab({
	icon : '/assets/map.png',
	title : L('navi_map'),
	window : view.map.createMapWindow()
}));
tabGroup.addTab(Titanium.UI.createTab({
	icon : 'assets/group.png',
	title : L('navi_scheduler'),
	window : view.termine.createTermineWindow()
}));

tabGroup.addTab(Titanium.UI.createTab({
	icon : 'assets/chat.png',
	title : L('navi_chat'),
	window : view.chat.createChatWindow()
}));

/* tabGroup.addTab(Titanium.UI.createTab({
 icon : 'assets/radar.png',
 title : 'St.Pauli AR',
 window : view.ar.createARWindow()
 }));
*/

tabGroup.addTab(Titanium.UI.createTab({
	icon : 'assets/aw.png',
	title : L('navi_aw'),
	window : view.references.getWindow()
}));

var view = Ti.UI.createView({
	backgroundColor : 'transparent'
});
introwindow.add(view);
var hint = Ti.UI.createLabel({
	text : "Berührung des St.Pauli-Spiels\nstartet App",
	color : 'silver',
	height : 150,
	left : 5,
	opacity : 0.7,
	bottom : 0,
	textAlign : 'center',
	right : 10,
	font : {
		fontSize : 22,
		fontWeight:'bold',
		fontFamily : 'MoondogZero'
	}
});
view.add(hint);
view.addEventListener('click', function() {
	introwindow.close({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,
		duration : 1000
	});
	// open tab group
	tabGroup.open();
	
});

