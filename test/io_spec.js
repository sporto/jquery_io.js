describe('io', function () {

	var model = {
			id: 1,
			name: 'sam',
			locs: [1, 2, 3],
			foo: {
				a: 1
			}
		};
		var modelAsQuery = 'id=1&name=sam&locs%5B%5D=1&locs%5B%5D=2&locs%5B%5D=3&foo%5Ba%5D=1';
		var modelAsJson = '{"id":1,"name":"sam","locs":[1,2,3],"foo":{"a":1}}';

	// beforeEach(function () {

	// });

	// afterEach(function () {

	// });

	describe('.query', function () {

		it('responds to query', function() {
			expect(io.query).to.be.a('function');
		});

		var asQuery = io.query(modelAsQuery);

		describe('.object', function () {
			it('returns an object', function () {
				var res = asQuery.object();
				expect(res).to.eq(model);
			});
		});

		describe('.query', function () {
			it('returns a query string', function () {
				var res = asQuery.query();
				expect(res).to.eq(modelAsQuery);
			});
		});

		describe('.json', function () {
			it('returns a json string', function () {
				var res = asQuery.json();
				expect(res).to.eq(modelAsJson);
			});
		});

	});

	describe('.form', function() {

		var asForm = io.form('form');

		it('responds to form', function() {
			expect(io.form).to.be.a('function');
		});

		describe('.object', function () {
			it('returns an object', function() {
				var res = asForm.object();
				expect(res).to.eq({user: { first_name: 'Sam'}});
			});
		});

		describe('.query', function () {
			it('it returns a query', function() {
				var res = asForm.query();
				expect(res).to.eq('user%5Bfirst_name%5D=Sam&user%5Blast_name%5D=Sample');
			});
		});

		describe('.json', function () {
			it('returns json', function() {
				var res = asForm.json();
				expect(res).to.eq("{'user': { 'first_name': 'Sam'}}");
			});
		});

	});

	describe('.object', function() {

		it('responds to .object', function() {
			expect(io.object).to.be.a('function');
		});

		var asObject = io.object(model);

		describe('.object', function () {
			it('returns the same object', function () {
				var res = asObject.object();
				expect(res).to.equal(model);
			});
		});

		describe('.query', function () {
			it('returns a query string', function () {
				var res = asObject.query();
				expect(res).to.eq(modelAsQuery);
			});
		});

		describe('.json', function () {
			it('returns a json string', function () {
				var res = asObject.json();
				expect(res).to.eq(modelAsJson);
			});
		});

	});

	describe('.json', function () {

		it('responds to .json', function() {
			expect(io.json).to.be.a('function');
		});

		var asJson = io.json(modelAsJson);

		describe('.object', function () {
			it('returns an object', function () {
				var res = asJson.object();
				expect(res).to.eql(model);
			});
		});

		describe('.query', function () {
			it('returns a query', function () {
				var res = asJson.query();
				expect(res).to.eq(modelAsQuery);
			});
		});

		describe('.json', function () {
			it('returns json', function () {
				var res = asJson.json();
				expect(res).to.eq(modelAsJson);
			});
		});

	});
});