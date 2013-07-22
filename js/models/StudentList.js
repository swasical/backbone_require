define(['./Student'], function(Student) {	
	return Backbone.Collection.extend({
		model: Student
	});
});