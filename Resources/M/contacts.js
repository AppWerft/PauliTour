var image = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + 'assets/contaktlogo.png').read();

var contacts = [{
	image : image,
	URL : {
		"homepage" : ['http://vladi.de']
	},
	phone : {
		"work" : ['004940338989']
	},
	email : {
		"work" : ['info@vladi.de']
	},
	lastName : 'Vladi Private Islands GmbH, Hamburg',
	kind : Ti.Contacts.CONTACTS_KIND_ORGANIZATION,
	address : {
		"work" : [{
			"Street" : 'Ballindamm 7',
			"City" : 'Hamburg',
			"Country" : 'Germany',
			"ZIP" : '20095'
		}]
	}},{
	image : image,
	URL : {
		"homepage" : ['http://vladi.de']
	},
	phone : {
		"work" : ['1 902 423 3202 ']
	},
	email : {
		"work" : ['info@vladi.de']
	},
	lastName : 'Vladi Private Islands (Canada) Limited',
	kind : Ti.Contacts.CONTACTS_KIND_ORGANIZATION,
	address : {
		"work" : [{
			"Street" : '1601 Lower Water Street',
			"City" : 'Halifax',
			"Country":'Canada'
		}]
	}},{
	image : image,
	URL : {
		"homepage" : ['http://vladi.de']
	},
	phone : {
		"work" : ['64 4 922 0600']
	},
	email : {
		"work" : ['info@vladi.de']
	},
	lastName : 'Vladi Private Islands "Pacific" Limited',
	kind : Ti.Contacts.CONTACTS_KIND_ORGANIZATION,
	address : {
		"work" : [{
			"Street" : 'OLD BANK ARCADE PO Box 5373 ',
			"City" : 'Wellington',
			"Country" : 'New Zealand'
		}]
	}

}];
