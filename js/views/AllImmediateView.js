define(['views/ReadOnlyView', 
		'views/CommitEditView', 
		'views/ImmediateEditView', 
		'models/Student'
	], function(ReadOnlyView, CommitEditView, ImmediateEditView, Student) {
	return Backbone.View.extend({
		initialize: function() {
			this.el = this.options.el;
			this.model = new Student();			
			this.model.set(this.options.model);
			// this.model.fetch
						
			var self = this;
			this.readView = new ReadOnlyView({ 
				model: this.model, 
				editFn: function() {
					self.editView.$el.fadeIn(200);
				}
			});
			
			if (this.options.undoSave) {
				this.model.set({ UndoSave: true});
				this.editView = new CommitEditView({ model: this.model });
			} else {
				this.editView = new ImmediateEditView({ model: this.model });
			}			
		},
		
		render: function() {
		    $(this.el).empty();
			$(this.el).append(this.readView.render());
			$(this.el).append(this.editView.render());
		}
	});
});