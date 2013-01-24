describe('IO', function() {
    beforeEach(function() {
        // this.apple = new Apple();
    });
    
    afterEach(function() {
        // delete this.apple;
    });
    
    it('should go crunch', function() {
    	expect($.io).to.be.a('function');
        // expect(this.apple).property('sound', 'crunch');
    });
});
