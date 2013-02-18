describe('io', function () {

	var model = {
			user: {
				id: 1,
				name: 'Sam',
				interests: [1, 2, 3],
				address: {
					number: '101'
				}
			}
		};
	var modelWithString = {
			user: {
				id: '1',
				name: 'Sam',
				interests: ['1', '2', '3'],
				address: {
					number: '101'
				}
			}
		};
	var modelAsQuery = 'user%5Bid%5D=1&user%5Bname%5D=Sam&user%5Binterests%5D%5B%5D=1&user%5Binterests%5D%5B%5D=2&user%5Binterests%5D%5B%5D=3&user%5Baddress%5D%5Bnumber%5D=101';
	var modelAsJson = '{"user":{"id":1,"name":"Sam","interests":[1,2,3],"address":{"number":"101"}}}';
	var modelAsJsonWithString = '{"user":{"id":"1","name":"Sam","interests":["1","2","3"],"address":{"number":"101"}}}';

	// beforeEach(function () {

	// });

	// afterEach(function () {

	// });

	describe('.query', function () {

		it('responds to query', function () {
			expect($.io).to.respondTo('query');
		});

		it('throws if no argumets passed', function () {
			expect($.io.query).to.throw(Error);
		});

		var asQuery = $.io.query(modelAsQuery);

		describe('.object', function () {
			it('returns an object', function () {
				var res = asQuery.object();
				expect(res).to.eql(modelWithString);
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
				expect(res).to.eq(modelAsJsonWithString);
			});
		});

	});

	describe('.form', function() {

		it('responds to form', function () {
			expect($.io).to.respondTo('form');
		});

		it('throws if no argumets passed', function () {
			expect($.io.form).to.throw(Error);
		});

		// it('throws if no element passed', function () {
		// 	var fn = function () {
		// 		$.io.form('fff');
		// 	}
		// 	expect(fn).to.throw(Error);
		// });

		var $form = $('form');
		var asForm = $.io.form($form);

		it('responds to form', function() {
			expect($.io.form).to.be.a('function');
		});

		describe('.object', function () {
			it('returns an object', function() {
				var res = asForm.object();
				expect(res).to.eql(modelWithString);
			});
		});

		describe('.query', function () {
			it('it returns a query', function() {
				var res = asForm.query();
				expect(res).to.eq(modelAsQuery);
			});
		});

		describe('.json', function () {
			it('returns json', function() {
				var res = asForm.json();
				expect(res).to.eq(modelAsJsonWithString);
			});
		});

	});

	describe('.object', function() {

		it('responds to form', function () {
			expect($.io).to.respondTo('object');
		});

		it('throws if no argumets passed', function () {
			expect($.io.object).to.throw(Error);
		});

		it('responds to .object', function() {
			expect($.io.object).to.be.a('function');
		});

		var asObject = $.io.object(model);

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

		it('responds to form', function () {
			expect($.io).to.respondTo('json');
		});

		it('throws if no argumets passed', function () {
			expect($.io.json).to.throw(Error);
		});

		var asJson = $.io.json(modelAsJson);

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