define(['./StudentEditView'], function(StudentEditView) {	
	return StudentEditView.extend({
		events: {
			'click .closeImmediate': 'close',
			'click .save': 'save',
			'click .undo': 'undo',
		},
		initialize: function() {
			this.undoModel = this.model.clone();
		},
		save: function(event) {
			this.model.set({ 
				LastName: this.$('input[name=LastName]').val(),
				FirstName: this.$('input[name=FirstName]').val() 
			});
			this.undoModel = this.model.clone();
		},
		undo: function(event) {
			this.model.set(this.undoModel.toJSON());
			this.render();
		}
	});	
});