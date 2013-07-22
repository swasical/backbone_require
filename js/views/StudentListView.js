define(['views/StudentView', 'models/StudentList'], function(StudentView, StudentList) {	
	// Enrollment
	var countTemplate = Handlebars.compile($('#count-template').html());
	return Backbone.View.extend({
		initialize: function() {
			this.collection = new StudentList();
			this.collection.reset(this.options.students);
		},
		
		render: function() {
			this.enrolledCount = 0, 
			this.unenrolledCount = 0;
			_.each(this.collection.models, function(model) {
				this.renderStudentFromModel(model);
				if (model.attributes.Enrolled) {
					this.enrolledCount++;
				} else {
					this.unenrolledCount++;
				}
			}, this);
			
			this.updateCounts();
		},
		
		updateCounts: function() {
			this.$('#enrolledCount').html(countTemplate({ Count: this.enrolledCount, Enrolled: true }));
			this.$('#unenrolledCount').html(countTemplate({ Count: this.unenrolledCount, Enrolled: false }));
		},
		
		renderStudentFromModel: function(model) {
			var studentView = new StudentView({ model: model });
			this.renderStudent(studentView);
		},
		
		renderStudent: function(studentView) {
			if (studentView.model.attributes.Enrolled) {
				this.$('#enrolledList').append(studentView.render());
			} else {
				this.$('#unenrolledList').append(studentView.render());
			}
		},
		
		events: {
			'click .add': 'enroll',
			'click .delete': 'unenroll'
		},
		
		enroll: function(event) {
			if (this.changeEnroll(event, true)) {
				this.unenrolledCount--;
				this.enrolledCount++;
				this.updateCounts();			
			}
		},
		
		unenroll: function(event) {
			if (this.changeEnroll(event, false)) {
				this.unenrolledCount++;
				this.enrolledCount--;
				this.updateCounts();			
			}
		},
		
		changeEnroll: function(event, isEnrolled) {
			var modelId = $(event.target).data('id');	
			var model = this.collection.get(modelId); 
			model.set('Enrolled', isEnrolled);		
			this.renderStudentFromModel(model); // redraw in the appropriate column
			return true;
			// console.log(model.attributes.LastName + ' is ' + (isEnrolled ? 'enrolled!' : 'unenrolled.'));
		}
	});
});