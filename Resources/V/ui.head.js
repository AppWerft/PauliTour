function getStar() {
	var redstar = Ti.UI.createImageView({
		right : -5,
		top : -35,
		width : 130,
		height : 130,
		opacity : 0.9,
		image : 'assets/redstar.png'
	});

	redstar.add(Ti.UI.createLabel({
		textAlign : 'center',
		top : '39%',
		text : "jede Tour\n15 €",
		font : {
			fontFamily : 'MoondogZero'
		},
		color : 'white'
	}));
	return redstar;
}

function createHead(title) {
	var logo = Ti.UI.createImageView({
		image : 'assets/logo.png',
		height : 60,
		width : 320,
		top : 0
	});
	logo.add(Ti.UI.createLabel({
		height : 20,
		width : 200,
		right : 10,
		textAlign : 'right',
		text : title,
		bottom : 5,
		color : 'white',
		font : {
			fontWeight : 'bold',
			fontSize : 13,
			fontFamily : 'MoondogZero'
		}
	}));
	logo.add(Ti.UI.createLabel({
		height : 20,
		width : 'auto',
		right : 5,
		text : 'ST.PAULI TOURIST OFFICE',
		top : 8,
		color : '#ddd',
		font : {
			fontWeight : 'bold',
			fontSize : 16,
			fontFamily : 'MoondogZero'
		}
	}));
	return logo;
}

function createBackHead(title) {
	var logo = Ti.UI.createImageView({
		image : '/assets/logoback.png',
		height : 60,
		width : 320,
		top : 0
	});
	logo.add(Ti.UI.createLabel({
		height : 20,
		width : 200,
		right : 10,
		textAlign : 'right',
		text : title,
		bottom : 5,
		color : 'white',
		font : {
			fontWeight : 'bold',
			fontSize : 16,
			fontFamily : 'MoondogZero'
		}
	}));
	logo.add(Ti.UI.createLabel({
		height : 20,
		width : 'auto',
		right : 5,
		text : 'ST.PAULI TOURIST OFFICE',
		top : 8,
		color : '#ddd',
		font : {
			fontWeight : 'bold',
			fontSize : 16,
			fontFamily : 'MoondogZero'
		}
	}));
	return logo;
}