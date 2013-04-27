view.intro = ( function() {
		var api = {};
		var world;
		api.addWalls = function() {

			world.leftWall = world.addBody(Ti.UI.createView({
				backgroundColor : "transparent",
				width : 2,
				left : -10,
				height : 540,
				bottom : 0
			}), {
				density : 10.0,
				friction : 0.3,
				restitution : 0.4,
				type : "static"
			});
			world.rightWall = world.addBody(Ti.UI.createView({
				backgroundColor : "transparent",
				width : 1,
				right : -10,
				height : 540,
				bottom : 0
			}), {
				density : 12.0,
				friction : 0.3,
				restitution : 0.4,
				type : "static"
			});
			world.topWall = world.addBody(Ti.UI.createView({
				backgroundColor : "transparent",
				width : 700,
				height : 2,
				top : -50
			}), {
				density : 12.0,
				friction : 0.3,
				restitution : 0.4,
				type : "static"
			});
			world.bottomWall = world.addBody(Ti.UI.createView({
				backgroundColor : "transparent",
				width : 700,
				height : 2,
				bottom : 20,
				transform : Ti.UI.create2DMatrix().rotate(20 * Math.random() - 10)
			}), {
				density : 12.0,
				friction : 0.3,
				restitution : 1.4,
				type : "static"
			});

		};
		api.createIntroWindow = function() {
			function degreeToRadians(x) {
				return (Math.PI * x / 180.0);
			}

			var window = Titanium.UI.createWindow({
				backgroundColor : 'black',
				navBarHidden : true,
			});
			var container = Ti.UI.createView({
				width : '100%',
				height : '100%',
			});
			var Box2D = require('ti.box2d');
			world = Box2D.createWorld(container);
			window.add(container);
			window.open();
			this.addWalls();

			var skullbody = {};
			Ti.include('/V/parts.js');
			var skullpartRefs = {};
			var position = {
				"x" : 24 * Math.random() + 190,
				"y" : 50 + 10 * Math.random()
			};
			for(var i = 0; i < parts.length; i++) {
				var part = parts[i];
				var left = position.x + part.x;
				var top = position.y + part.y;
				skullpartRefs[part.name] = world.addBody(Ti.UI.createImageView({
					image : '/assets/skull/' + part.name + '.png',
					width : part.w,
					left : left,
					transform : Ti.UI.create2DMatrix().rotate(part.r),
					top : top,
					height : part.h
				}), {
					density : 10 * part.d,
					friction : 0.7,
					restitution : 0.6,
					transform : Ti.UI.create2DMatrix().rotate(part.r),
					type : "dynamic",
					angle : degreeToRadians(part.r)
				});
			}

			world.start();
			var skulljoins = {};
			/*skulljoins.lu = world.createJoint(skullparts.o, skullparts.lu, {
			 enableLimit : true,
			 upperAngle : 0,
			 lowerAngle : 0,
			 enableMotor : false,
			 jointPoint : [-3,-2],
			 basePoint :0,
			 collideConnected : true
			 });*/

			var herz = Ti.UI.createImageView({
				image : '/assets/skull/herz.png',
				width : 130,
				left : 4 * Math.random() + 10,
				top : 40 * Math.random() - 50,
				height : 130
			});
			var herzbody = world.addBody(herz, {
				density : 3,
				friction : 0.3,
				restitution : 0.4,
				type : "dynamic"
			});
			world.setGravity(0, -9.91);
			Ti.Gesture.addEventListener('orientationchange', function(e) {
				if(e.orientation == Titanium.UI.LANDSCAPE_LEFT) {
					world.setGravity(9.91, 0);
				} else if(e.orientation == Titanium.UI.LANDSCAPE_RIGHT) {
					world.setGravity(-9.91, 0);
				} else if(e.orientation == Titanium.UI.UPSIDE_PORTRAIT) {
					world.setGravity(0, 9.91);
				} else if(e.orientation == Titanium.UI.PORTRAIT) {
					world.setGravity(0, -9.91);
				}
			});
			return window;
		}
		return api;
	}());
