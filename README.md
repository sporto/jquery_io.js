IO
===

An utility for marshalling data from / to:

- forms
- json
- object
- query strings

Convert a form
----------

### To a JavaScript object

	io.form('.form').object();

### To a query string

	io.form('.form').query();

### To a json string

	io.form('.form').json();

Convert Query strings
------------

### To a JavaScript object

	io.query('').object();

### To a json string

	io.query('').json();

Convert Json
--------

### To a JS object

	io.json('').object();

### To a query string

	io.json('').query();

Convert JavaScript Objects
-----------

### To a query string

	io.object().query();

### To a json string

	io.object().json();

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