define(['./StudentEditView'], function(StudentEditView) {
	return StudentEditView.extend({
		events: {
			'click .closeImmediate': 'close',
			'keyup input[type="text"]': 'updateName'
		},	
		updateName: function(event) {
			var target = $(event.target);
			var propToSave = (target.attr('id').match(/LastName$/)) ? "LastName" : "FirstName";
			this.model.set(propToSave, target.val());
		}
	});
});