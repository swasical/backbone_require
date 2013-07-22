define([], function() {
	var immediateEditTemplate = Handlebars.compile($('#studentEdit-template').html());
	return Backbone.View.extend({
		tagName: 'fieldset',
		className: 'hidden',
		render: function() {
			$(this.el).html(immediateEditTemplate(this.model.toJSON()));
			return this.el;
		},
		
		close: function() {
			this.$el.fadeOut(100);
		}
	});
});