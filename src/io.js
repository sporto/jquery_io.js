;(function(root, jQuery) {

	// form
	// query
	// object
	// json

	if (jQuery === undefined) throw new Error('jQuery is required');

	var numberMatcher = /^[\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?jQuery/;

	function isNumber( value ) {
		if (typeof value == 'number') {
			return true;
		}
		if (typeof value != 'string') {
			return false;
		}
		return value.match(numberMatcher);
	}

	// Conversions

	function stringToNumOrBool(value) {
		if (isNumber(value)) {
			return parseFloat(value);
		}
		if (value === 'true' || value === 'false') {
			return Boolean(value);
		}
		return value;
	}

	function jsonToObject(obj) {
		return JSON.parse(obj);
	}

	function objectToJson(obj) {
		return JSON.stringify(obj);
	}

	function objectToQuery(obj) {
		return jQuery.param(obj);
	}

	function queryToObject(query, convertNums) {
		var digitTest = /^\d+$/;
		var keyBreaker = /([^\[\]]+)|(\[\])/g;
		var queryTest = /([^?#]*)(#.*)?$/;
		var data = {};
		var pairs = null;
		var lastPart = null;

		convertNums = convertNums === undefined ? true : convertNums;

		var prep = function(str) {
			return decodeURIComponent( str.replace(/\+/g, " ") );
		};

		if ( query && queryTest.test( query )) {
			
			pairs = query.split('&'),
			
			jQuery.each(pairs, function(ix, pair) {

				var parts = pair.split('=');
				var key   = prep( parts.shift() );
				var value = prep( parts.join("="));
				var current = data;
				
				parts = key.match(keyBreaker);
		
				for (var j = 0, l = parts.length - 1; j < l; j++) {
					if (!current[parts[j]]) {
						// If what we are pointing to looks like an `array`
						current[parts[j]] = digitTest.test(parts[j+1]) || parts[j+1] == "[]" ? [] : {};
					}
					current = current[parts[j]];
				}
				lastPart = parts.pop();
				if ( lastPart == "[]" ) {
					current.push(value);
				} else {
					value = convertNums ? stringToNumOrBool(value) : value;
					current[lastPart] = value;
				}
			});
		}
		return data;
	}

	function formToObject(selector, convertNums) {
		var $ele = jQuery(selector);
		var ele = $ele[0];
		var elements = null;

		convertNums = convertNums === undefined ? true : convertNums;

		if (ele.nodeName.toLowerCase() == 'form' && ele.elements) {
			elements = jQuery.makeArray(ele.elements);
		} else {
			elements = jQuery("input[name], textarea[name], select[name]", ele);
		}

		return getObjectFromFormElements(elements, convertNums);
	}

	function getObjectFromFormElements(elements, convertNums) {
		var data = {};
		var current = null;
		var radioCheck = /radio|checkbox/i;
		var keyBreaker = /[^\[\]]+/g;

		jQuery.each(elements, function(ix, el) {
			var type = el.type && el.type.toLowerCase();
			//if we are submit, ignore
			if ((type == 'submit') || !el.name ) {
				return;
			}

			var key = el.name,
				value = $.data(el, "value") || $.fn.val.call([el]),
				isRadioCheck = radioCheck.test(el.type),
				parts = key.match(keyBreaker),
				write = !isRadioCheck || !! el.checked,
				//make an array of values
				lastPart;

			if ( convertNums ) {
				value = stringToNumOrBool(value);
			}

			// go through and create nested objects
			current = data;
			for ( var i = 0; i < parts.length - 1; i++ ) {
				if (!current[parts[i]] ) {
					current[parts[i]] = {};
				}
				current = current[parts[i]];
			}
			lastPart = parts[parts.length - 1];

			//now we are on the last part, set the value
			if ( lastPart in current && type === "checkbox" ) {
				if (!$.isArray(current[lastPart]) ) {
					current[lastPart] = current[lastPart] === undefined ? [] : [current[lastPart]];
				}
				if ( write ) {
					current[lastPart].push(value);
				}
			} else if ( write || !current[lastPart] ) {
				current[lastPart] = write ? value : undefined;
			}

		});
		return data;
	}

	// Instance returned by the first call
	var instance = function () {
		var self = {};
		var _source;

		function makeReceiver(kind) {
			return function (source) {
				_source = source;
				return responders[kind];
			};
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
					var obj = jsonToObject(_source);
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
					return queryToObject(_source);
				},
				query: returnSource,
				json: function () {
					return objectToJson(queryToObject(_source));
				}
			},
			form: {
				object: function () {
					return formToObject(_source);
				},
				query: function () {
					return jQuery(_source).serialize();
				},
				json: function () {
					return objectToJson(formToObject(_source));
				}
			}
		};

		self.form = makeReceiver('form');
		self.query = makeReceiver('query');
		self.json = makeReceiver('json');
		self.object = makeReceiver('object');

		return self;
	};

	// main library
	var io = (function () {
		var self = {};

		function makeInstanceFactory(kind) {
			return function (source) {
				return instance()[kind](source);
			};
		}

		self.json = makeInstanceFactory('json');
		self.query = makeInstanceFactory('query');
		self.form = makeInstanceFactory('form');
		self.object = makeInstanceFactory('object');

		return self;
	}());

	root.io = io;

}(this, jQuery));