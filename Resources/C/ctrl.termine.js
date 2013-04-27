ctrl.termine = ( function() {
		var api = {};
		api.getNext = function(count) {
			if(count == null)
				count = 30;
			var termine = [];
			var today = new Date.today();
			var monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
			var tage = {
				"Mon" : 'Montag',
				"Tue" : 'Dienstag',
				"Wed" : 'Mitttwoch',
				"Thu" : 'Donnerstag',
				"Fri" : 'Freitag',
				"Sat" : 'Sonnabend',
				"Sun" : 'Sonntag'
			};
			for( i = 0; i < count; i++) {
				var day = new Date().add(i).days();
				switch (i) {
					case 0:
						d = 'Heute';
						break;
					case 1:
						d = 'Morgen';
						break;
					case 2:
						d = 'Übermorgen';
						break;
					default:
						d = day.toString('dd') + '. ' + monate[day.toString('M') - 1] + ' ' + day.toString('yyyy')
				}
				var wd = day.toString('ddd');
				var monthday = day.toString('dd');
				if(wd == 'Mon' || wd=='Sat') {
					termine.push({
						"d" : d,
						"startdate" : new Date(day).clearTime().addHours(11),
						"enddate" : new Date(day).clearTime().addHours(13),
						"z" : '11:00 Uhr',
						"t" : 'ST',
						"wd" : tage[wd],
						"day" : monthday
					});
				}
				
				if(wd == 'Sat') {
					termine.push({
						"d" : d,
						"startdate" : new Date(day).clearTime().addHours(14),
						"enddate" : new Date(day).clearTime().addHours(14),
						"z" : '14:00 Uhr',
						"t" : 'RT',
						"wd" : tage[wd],
						"day" : monthday
					});
					termine.push({
						"d" : d,
						"startdate" : new Date(day).clearTime().addHours(14),
						"enddate" : new Date(day).clearTime().addHours(14),
						"z" : '14:00 Uhr',
						"t" : 'MT',
						"wd" : tage[wd],
						"day" : monthday
					});
					termine.push({
						"d" : d,
						"startdate" : new Date(day).clearTime().addHours(15),
						"enddate" : new Date(day).clearTime().addHours(17),
						"z" : '15:00 Uhr',
						"t" : 'GT',
						"wd" : tage[wd],
						"day" : monthday
					});
				}
				if(wd == 'Sat' || wd == 'Fri') {
					termine.push({
						"d" : d,
						"startdate" : new Date(day).clearTime().addHours(16),
						"enddate" : new Date(day).clearTime().addHours(18),
						"wd" : tage[wd],
						"z" : '16:00 Uhr',
						"t" : 'KT',
						"day" : monthday
					});
				}
				if(wd == 'Sat') {
					termine.push({
						"d" : d,
						"startdate" : new Date(day).clearTime().addHours(16),
						"enddate" : new Date(day).clearTime().addHours(18),
						"wd" : tage[wd],
						"z" : '16:00 Uhr',
						"t" : 'KR',
						"day" : monthday
					});
				}

				termine.push({
					"d" : d,
					"startdate" : new Date(day).clearTime().addHours(19),
					"wd" : tage[wd],

					"enddate" : new Date(day).clearTime().addHours(21),
					"z" : '19:00 Uhr',
					"t" : 'KT',
					"day" : monthday
				});
				if(wd == 'Fri' || wd == 'Sat') {
					termine.push({
						"d" : d,
						"wd" : tage[wd],
						"startdate" : new Date(day).clearTime().addHours(22),
						"enddate" : new Date(day).clearTime().addHours(23).addMinutes(59),
						"z" : '22:00 Uhr',
						"t" : 'KT',
						"day" : monthday
					});
				}
			}
			return termine;
		};
		return api;
	}());
