define([], function() {	
	var immediateViewTemplate = Handlebars.compile($('#studentView-template').html());
	return Backbone.View.extend({
		tagName: 'fieldset',
		className: 'left-col',
		events: {
			'click .editImmediate': 'edit'
		},
		
		initialize: function() {
			this.model.bind('change:LastName', this.render, this);
			this.model.bind('change:FirstName', this.render, this);			
			this.editFn = this.options.editFn;
		},
		
		render: function() {
			$(this.el).html(immediateViewTemplate(this.model.toJSON()));
			return this.el;
		},
		
		edit: function() {
			if (this.editFn) {
				this.editFn();
			}
		}
	});
});