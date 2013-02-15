(function(window) {

	// form
	// query
	// object
	// json

	var instance = function () {
		var self = {};
		var _source;

		function makeReceiver(kind) {
			return function (source) {
				_source = source;
				return responders[kind];
			}
		}

		function jsonToObject(obj) {
			return JSON.parse(obj)
		}

		function objectToJson(obj) {
			return JSON.stringify(obj)
		}

		function objectToQuery(obj) {
			return jQuery.param(obj)
		}

		function returnSource() {
			return _source;
		}

		var responders = {
			json: {
				object: function () {
					return jsonToObject(_source);
				},
				query: function () {
					var obj = jsonToObject(_source)
					return objectToQuery(obj);
				},
				json: returnSource
			},
			object: {
				object: returnSource,
				query: function () {
					return objectToQuery(_source);
				},
				json: function () {
					return objectToJson(_source);
				}
			},
			query: {
				object: function () {
					//can.deparam("foo=bar&person[age]=3")
					return 'TO DO';
				},
				query: returnSource,
				json: function () {
					return 'TO DO';
				}
			},
			form: {
				object: function () {
					// $('form').serializeArray();
					//=> [{name: "first_name", value: "Sam"}, {name: "last_name", value: "Sample"}]

					// Also see
					// http://bitovi.com/blog/2010/06/convert-form-elements-to-javascript-object-literals-with-jquery-formparams-plugin.html
					return 'TO DO';
				},
				query: function () {
					return $(_source).serialize();
				},
				json: function () {
					return 'TO DO';
				}
			}
		}

		self.form = makeReceiver('form');
		self.query = makeReceiver('query');
		self.json = makeReceiver('json');
		self.object = makeReceiver('object');

		return self;
	}

	var io = (function () {
		var self = {};

		function makeInstanceFactory(kind) {
			return function (source) {
				return instance()[kind](source);
			}
		}

		self.json = makeInstanceFactory('json');
		self.query = makeInstanceFactory('query');
		self.form = makeInstanceFactory('form');
		self.object = makeInstanceFactory('object');

		return self;
	}());

	window.io = io;

}(this));