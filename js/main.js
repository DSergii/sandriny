'use strict';
$(document).ready(function() {
	SandrinyApp.init();
});

var SandrinyApp = {

	init: function(){

		this.showSocial();
		this.showModal();
		this.scrollLoad();
		this.smoothShow();

	},
	/* show/hide social icons in model */
	showSocial: function() {
		let holder = $('.social-box');

		holder.each(function() {
			let box = $(this);

			box.click(function(){
				$(this).toggleClass('open');
			});
		})
	},
	/* show/hide modal */
	showModal: function() {

		let modalBtn = $('.show-modal'),
			modal = null,
			closeModal = null;

		modalBtn.click(function() {
			let data = $(this).data('id');
			modal = $('#'+data).addClass('show');
			closeModal = modal.find('.close');

			closeModal.click(function(){
				modal.removeClass('show');
			})

			return false;
		});
	},
	/* load models when scrolling page */
	scrollLoad: function() {
		let spinner = $('.spinner');

		$(window).scroll(function() {
		    if($(window).scrollTop() == $(document).height() - $(window).height()) {
		           //spinner.addClass('show');
		           $.getJSON('stairs.json', function(data){
		           		console.log(data);
		           });
		    }else {
		    	//spinner.removeClass('show');
		    }
		});

	},

	smoothShow: function() {
		let box = $('.box-item');

		for (let i = 0; i < box.length; i++) {
			setTimeout(function(){
				$(box[i]).addClass('show');
			}, 300*i);
		}
	}




}