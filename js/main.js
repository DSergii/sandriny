$(window).load(function() {
	SandrinyApp.init();
});

var SandrinyApp = {

	init: function(){

		this.header = $('#header');
		this.showSocial();
		this.showModal();
		this.loadContent();
		this.scrollLoad();
		this.addNewItems();
		this.smoothShow();
		this.viewImage();
		this.mobileMenu();
		this.form = $( "#contact-form" );
		this.validRules = {
			rules: {
			    name: "required",
			    message: "required",
			    privacy: "required",
			    email: {
			      	required: true,
			      	email: true
			    }
			},

			messages: {
	            name: "Please enter your full name",
	            message: "Please enter your message",
	            email: "Please enter a valid email address",
	            privacy: "Please accept privacy conditions"
	        }

		};
		this.validator = this.form.validate(this.validRules);
		this.formSubmit();
		this.stickyMenu();
	},

	formSubmit: function() {
		var _this = this,
			formBox = $('#catalog-request, .contact-box'),
			submitBtn = formBox.find('button');

		submitBtn.click(function() {

			if(_this.form.valid()){

				$.ajax({
					type: "POST",
					url: 'submit.php',
					data: _this.form.serialize(),
					success: function(data){
					  		formBox.addClass('success');
					  		setTimeout(function(){
					  			formBox.removeClass('show');
					  		}, 2000);
					  		setTimeout(function(){
					  			formBox.removeClass('success');
					  		}, 2500);
					 		_this.clearForm();
					}
				});
			}
		});

	},

	clearForm: function() {
		$( "#contact-form" )[0].reset();
	},

	/* show/hide social icons in model */
	showSocial: function() {
		var holder = $('.social-box');

		holder.each(function() {
			var box = $(this);
			box.unbind('click').bind('click', function(){
				$(this).toggleClass('open');
			});
		})
	},

	/* show/hide modal */
	showModal: function() {
		var _this = this;
		var modalBtn = $('.show-modal'),
			modal = null,
			image = null,
			closeModal = null;

		modalBtn.click(function() {
			$('.modal').removeClass('show');
			var data = $(this).data('id');
			image = $(this).parents('.box-item').find('.hold-img > img').attr('src');
			modal = $('#'+data).addClass('show');
			modal.find('.hold-img > img').attr('src', image);
			closeModal = modal.find('.close');

			closeModal.click(function(){
				modal.removeClass('show');
				_this.validator.resetForm();
				_this.clearForm();
				return false;
			});

			return false;
		});
	},

	/* show modal with image */
	viewImage: function() {
		var link = $('.box-item > .hold-img'),
			modal = $('#full-img'),
			close = modal.find('.close'),
			image = null;

		link.click(function(){
			$('.modal').removeClass('show');
			image = $(this).find('img').attr('src');
			modal.find('img').attr('src', image);
			modal.addClass('show');

			close.click(function(){
				modal.removeClass('show');
				return false;
			});

			return false;
		});
	},

	loadContent: function() {
		var _this = this;
		 $.ajax({
		  	url: "dbConfig.php",
		  	method: "POST",
		  	data: {start: 1, limit:12},
		  	dataType: "json",
		  	success: function(data){
		  		_this.addNewItems(data);
		  		_this.smoothShow();
		  	}
		});
	},

	/* load models when scrolling page */
	scrollLoad: function() {
		var spinner = $('.spinner'),
			complete = $('.complete'),
			flag = true,
			start = 13,
			_this = this;

		$(window).scroll(function() {
			if( $(window).scrollTop() > _this.header.outerHeight() ) {
				_this.stickyMenu(true);
			}else{
				_this.stickyMenu(false);
			}
		    if($(window).scrollTop() == $(document).height() - $(window).height()) {

		           $.ajax({
					  	url: "dbConfig.php",
					  	method: "POST",
					  	data: {start: start, limit:12},
					  	dataType: "json",
					  	beforeSend:function(){
					  		if(flag){
					  			spinner.addClass('show');
					  		}
		                },
					  	success: function(data){
					  		if(data === null){
					  			complete.addClass('show');
					  			flag = false;
					  		}
					  		_this.addNewItems(data);
					  		spinner.removeClass('show');
					  		_this.smoothShow();
					  		start += 4;
					  	}
					});
		    }else {
		    	
		    }
		});
	},

	/* better using templates like Handlebars, LoDash etc.*/
	addNewItems: function (data) {
		var container = $('.main-box'),
			_this = this,
			href = window.location.href,
			item = null;

			for (var obj in data) {

				if(data.hasOwnProperty(obj) ) {
					item = '<div class="box-item">'+
		                        '<div class="social-box">'+
		                            '<ul class="social-list">'+
		                                '<li><a href="http://pinterest.com/pin/create/button/?url='+href+''+data[obj].img+'&description='+data[obj].descr+'" target="_blank" class="pinterest"></a></li>'+
		                                '<li><a href="#" class="instagram"></a></li>'+
		                            '</ul>'+
		                        '</div>'+
		            			'<a href="#" class="hold-img">'+
		                            '<span class="overlay"></span>'+
		                            '<span class="eye"></span>'+
		            				'<img src="'+data[obj].img+'" alt="img">'+
		            			'</a>'+
		            			'<div class="description">'+
		            				'<strong class="title">'+data[obj].title+'</strong>'+
		            				'<p>'+data[obj].descr+'</p>'+
		            				'<a href="#" class="show-modal" data-id="catalog-request"></a>'+
		            			'</div>'+
		            		'</div>';

	            container.append(item);

				}
				
			}
			_this.showSocial();
			_this.showModal();
			_this.viewImage();
	},

	smoothShow: function() {
		var box = $('.box-item:not(show)');

		for (var i = 0; i < box.length; i++) {

			(function(index) {
		        setTimeout(function() { $(box[index]).addClass('show'); }, i * 200);
		    })(i);
		}
	},

	mobileMenu: function() {
		var _this = this,
			header = _this.header;

		btn = header.find('.toggle-menu'),
		menu = header.find('#nav');

		btn.click(function() {
			$(this).toggleClass('active');
				header.toggleClass('open');

			return false;
		});
	},

	stickyMenu: function(flag) {
		var _this = this,
			header = _this.header;

		if(flag) {
			header.addClass('sticky');
		}else {
			header.removeClass('sticky');
		}
		
	}

}
