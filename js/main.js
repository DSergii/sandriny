$(document).ready(function() {
	SandrinyApp.init();
});

var SandrinyApp = {

	init: function(){

		this.showSocial();


	},

	showSocial: function() {
		var holder = $('.social-box');

		holder.each(function() {
			var box = $(this);

			box.click(function(){
				$(this).toggleClass('open');
			});
		})
	}




}