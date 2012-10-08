define([], function() {	
	var personTemplate = Handlebars.compile($('#person-template').html());
	return Backbone.View.extend({
		tagName: 'li',
		initialize: function() {
			this.model.bind('change:Enrolled', this.remove, this);
		},
		remove: function() {
			$(this.el).remove();
			this.unbind();
		},
		render: function() {
			$(this.el).html(personTemplate(this.model.toJSON()));
			return this.el;
		}
	});
});
