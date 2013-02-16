jQuery IO
===

A jQuery plug-in for transforming data between different formats:

- JavaScript objects
- html forms
- json strings
- query strings

Convert a form
----------

### To a JavaScript object

	io.form('.myForm').object();

	{
		user: {
			name: 'Sam',
			interests: ['1', '2']
		}
	}

### To a query string

	io.form('.myForm').query();

	'user%5Bname%5D=Sam&user%5Binterests%5D%5B%5D=1&user%5Binterests%5D%5B%5D=2'

### To a json string

	io.form('.form').json();

	'{"user":{"id":"1","name":"Sam","interests":["1","2","3"]}}'

Convert Query strings
------------

### To a JavaScript object

	var source = 'user%5Bname%5D=Sam&user%5Binterests%5D%5B%5D=1&user%5Binterests%5D%5B%5D=2';
	io.query(source).object();

	{
		user: {
			name: 'Sam',
			interests: ['1', '2']
		}
	}

### To a json string

	var source = 'user%5Bname%5D=Sam&user%5Binterests%5D%5B%5D=1&user%5Binterests%5D%5B%5D=2';
	io.query(source).json();

	'{"user":{"id":"1","name":"Sam","interests":["1","2","3"]}}'

Convert Json
--------

### To a JS object

	var source = '{"user":{"id":"1","name":"Sam","interests":["1","2","3"]}}';
	io.json(source).object();

	{
		user: {
			name: 'Sam',
			interests: ['1', '2']
		}
	}

### To a query string

	var source = '{"user":{"id":"1","name":"Sam","interests":["1","2","3"]}}';
	io.json(source).query();

	'user%5Bname%5D=Sam&user%5Binterests%5D%5B%5D=1&user%5Binterests%5D%5B%5D=2'

Convert JavaScript Objects
-----------

### To a query string

	var source = 	{
		user: {
			name: 'Sam',
			interests: ['1', '2']
		}
	}
	io.object(source).query();

	'user%5Bname%5D=Sam&user%5Binterests%5D%5B%5D=1&user%5Binterests%5D%5B%5D=2'

### To a json string

	var source = 	{
		user: {
			name: 'Sam',
			interests: ['1', '2']
		}
	}

	io.object(source).json();

	'{"user":{"id":"1","name":"Sam","interests":["1","2","3"]}}'

Limits
--------

Given a query like a=101, io cannot safely figure out if 101 is a number or a string, so it will just return a string if converted to an object. This is because a string like 10e2 would also be a valid number, so it may end making uninteted conversion.

Testing
-------

	npm init
	grunt

License
-------

Copyright (c) 2013 Sebastian Porto
Licensed under the MIT license.