	 /*     _                        _     _           _   
	*    / \   _ __  _ __     ___ | |__ (_) ___  ___| |_ 
	*   / _ \ | '_ \| '_ \   / _ \| '_ \| |/ _ \/ __| __|
	*  / ___ \| |_) | |_) | | (_) | |_) | |  __/ (__| |_ 
	* /_/   \_\ .__/| .__/   \___/|_.__// |\___|\___|\__|
	*         |_|   |_|               |__/               
	*/

	var app = {
		app_context: this,
		// Application Constructor
		initialize: function() {
			this.bindEvents();
			/* IMPORTANT to set requests to be syncronous */
			$.ajaxSetup({
				 async: false
			});
			// localStorage init
			this.ls 		= window.localStorage;
			var log_info 	= JSON.parse(this.ls.getItem('museo_log_info'));
							window.user 	= (log_info) ? log_info.user_login : '';
							window.user_id 	= (log_info) ? log_info.user_id : '';
							window.user_role = (log_info) ? log_info.user_role : '';

			/* Initialize API request handler */
			window.apiRH = new requestHandlerAPI().construct(app);

			/* Check if has any token */
			if(apiRH.has_token()){
				/* Check if has a valid token */
				var response = apiRH.has_valid_token()
				if(response){
					var data_id = $(this).data('id');
					console.log('You okay, now you can start making calls');
					/* Take the user to it's timeline */
					var is_home = window.is_home;
					if(is_home)
						window.location.assign('feed.html?filter_feed=all');
					return;
				}else{
					/* Token is not valid, user needs to authenticate */
					console.log("Your token is not valid anymore (or never was D:)");
					// window.location.assign('index.html');
					return;
				}
				 
			}
			/* Executing robots request first of all */
			console.log(JSON.stringify(apiRH.getRequest('robots', null)));
			/* Requesting passive token if no token is previously stored */
			console.log(apiRH.request_token().get_request_token());
			// window.location.assign('index.html');
		},
		bindEvents: function() {
			document.addEventListener('deviceready', app.onDeviceReady, false);
			document.addEventListener('mobileinit', app.onDMobileInit, false);
		},

		// deviceready Event Handler
		onDeviceReady: function() {
			app.receivedEvent('deviceready');
			/*   ___    _         _   _     
			*  / _ \  / \  _   _| |_| |__  
			* | | | |/ _ \| | | | __| '_ \ 
			* | |_| / ___ \ |_| | |_| | | |
			*  \___/_/   \_\__,_|\__|_| |_|
			*/                              

			try{
				OAuth.initialize('7O8IRe-xiPNc0JrOXSv3rc90RmU');
			}
			catch(err){
				console.log('OAuth initialize error: ' + err);
			}
		},

		// deviceready Event Handler
		onMobileInit: function() {
			app.receivedEvent('mobileinit');
		},
		// Update DOM on a Received Event
		receivedEvent: function(id) {
			if(id == 'deviceready'){
				console.log('Received event deviceready');
			}
		},
		getUrlVars: function() {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			return vars;
		},
		/* Returns the values in a form as an associative array */
		/* IMPORTANT: Does NOT include password type fields */
		getFormData: function (selector) {
			return $(selector).serializeJSON();
		},
		isObjEmpty: function (obj) {

				if (obj == null) return true;

				if (obj.length > 0)    return false;
				if (obj.length === 0)  return true;

				for (var key in obj) {
						if (hasOwnProperty.call(obj, key)) return false;
				}
				return true;
		},
		header_partial: function(){ return "\
	<div id='spinner' class='spinner'>\
		<div class='spinner-container container1'>\
			<div class='circle1'></div>\
			<div class='circle2'></div>\
			<div class='circle3'></div>\
			<div class='circle4'></div>\
		</div>\
		<div class='spinner-container container2'>\
			<div class='circle1'></div>\
			<div class='circle2'></div>\
			<div class='circle3'></div>\
			<div class='circle4'></div>\
		</div>\
		<div class='spinner-container container3'>\
			<div class='circle1'></div>\
			<div class='circle2'></div>\
			<div class='circle3'></div>\
			<div class='circle4'></div>\
		</div>\
	</div>\
	<div data-role='panel' id='main_drop' class='menu' data-position='left' data-display='push'>\
		<ul>\
			<li class='menu_profile'><a href='my-profile.html' rel='external'><img class='slight_radius' src='{{profile_pic}}'></a></li>\
			<li class='menu_profile_name'><a href='my-profile.html' rel='external'><h1>{{user_login}}</h1></a></li>\
			<li class='feed'><a href='feed.html?filter_feed=all' rel='external'><i class='fa fa-newspaper-o'></i> Eventos</a></li>\
			<li class='feed'><a href='timeline.html' rel='external'><i class='fa fa-home'></i> Actividad</a></li>\
			<li class='agenda'><a href='my-events.html' rel='external'><i class='fa fa-calendar'></i> Mi agenda</a></li>\
			<li class='profile'><a href='follow-categories.html' rel='external'><i class='fa fa-tags'></i> Intereses</a></li>\
			<li class='profile settings'><a href='my-profile.html' rel='external'><i class='fa fa-user'></i> Mi Perfil</a></li>\
			<li class='logout settings'><a id='logout'><i class='fa fa-sign-out'></i> Cerrar sesión</a></li>\
			<li class='disclaimer'>Todos los derechos &reg; Museógrafo 2015</li>\
			<li class='disclaimer'><a href='mailto:hola@marat.mx'>hola@marat.mx</a></li>\
			<li class='disclaimer'><a onclick='window.open('http://app.museografo.com/aviso-de-privacidad', '_blank', 'location=yes');'>Aviso de privacidad</a></li>\
		</ul>\
	</div>\
	<div data-role='panel' id='notifications_drop' class='menu' data-position='right' data-display='push'>\
		<ul>\
			<li class='divider'>Notificaciones</li>\
			{{#if count}}\
				{{#each pool}}\
					{{#if follow}}\
						<li class='each_notification {{#if estatus}}read{{/if}} clearfix'>\
							<a href='user.html?user={{user_login}}' rel='external' data-id='{{alerta_id}}' class='plus_btn right'><p><strong>{{user_login}}</strong> te ha empezado a seguir.</p>\
							<i class='fa fa-plus-circle'></i></a>\
						</li>\
					{{/if}}\
					{{#if vote}}\
						<li class='each_notification {{#if estatus}}read{{/if}} clearfix'>\
							<a href='single-event.html?event={{objeto_id}}' rel='external' data-id='{{alerta_id}}' class='plus_btn right'><p><strong>{{user_login}}</strong> votó tu comentario en el evento <strong>{{event_title}}</strong>.</p>\
							<i class='fa fa-plus-circle'></i></a>\
						</li>\
					{{/if}}\
					{{#if recommend}}\
						<li class='each_notification {{#if estatus}}read{{/if}} clearfix' >\
							<a href='single-event.html?event={{objeto_id}}' data-id='{{alerta_id}}' rel='external' class='plus_btn right'><p><strong>{{user_login}}</strong> te ha recomendado el evento <strong>{{event_title}}</strong>.</p>\
							<i class='fa fa-plus-circle'></i></a>\
						</li>\
					{{/if}}\
				{{/each}}\
			{{/if}}\
			{{#unless pool}}\
					<li class='clearfix'>\
						<p><strong>No tienes notificaciones</strong></p>\
					</li>\
			{{/unless}}\
		</ul>\
	</div>\
	<div data-role='header' data-tap-toggle='false' class='fixed_header' data-position='fixed'>\
		<a data-role='none' data-corners='false' href='#main_drop'  class='ui-btn-left menu_trigger'><i class='fa fa-bars'></i></a>\
		<h1 class='page_title'>\
			<form id='search_form' method='GET' action='search.html' data-ajax='false'>\
				<input type='search' data-corners='false' name='searchbox' id='searchbox' placeholder='¿Qué estás buscando?'>\
				<input type='submit' data-role='none' class='invisibo_submito' id='searchbox_submit' value=''>\
			</form>\
		</h1>\
		<a data-role='none' href='#notifications_drop' data-corners='false' class='ui-btn-right circle notifications notifications_trigger'>{{count}}</a>\
	</div>";},
		comments_partial: function(){
			return "<section class='comments border_c no_box clearfix'>\
						<h2>Reseñas ({{comment_count}})</h2>\
						{{#each pool}}\
						<article class='each_comment'>\
							<img src='{{author_thumbnail}}' class='comment_user_thumb'>\
							<h3>{{author_name}}</h3>\
							<p>{{content}}</p>\
							{{!-- <div class='votes'>\
								<a class='downvote'><i class='fa fa-thumbs-down'></i></a>\
								<a class='upvote'><i class='fa fa-thumbs-up'></i></a>\
							</div> --}}\
						</article>\
						{{/each}}\
						{{#unless pool}}\
						<p class='information'>¡Se el primero en reseñar este evento!</p>\
						{{/unless}}\
						<section id='comment_form' class='comment_form'>\
							<form id=''>\
								<label for='comment_content'>Escribe tu reseña:</label>\
								<textarea name='comment_content' id='comment_content'></textarea>\
							</form>\
						</section>\
						<a class='comment_btn' id='comment_button' data-role='none'><i class='fa fa-share'></i></a>\
					</section>";
		},
		province_select_partial: function(){
			return "\
				<select id='user_province' name='user_province'>\
					<option value='>Provincia/ciudad</option>\
					{{#each .}}\
						<option value='{{slug}}'>{{name}}</option>\
					{{/each}}\
				</select>";
		},
		render_login_content : function(){

			$.getJSON(api_base_url+'content/login/', function(response){
				var source   = $("#login_screen_template").html();
				var template = Handlebars.compile(source);
				$('#index_container').html( template(response.data) );
			}).fail(function(err){
				console.log(JSON.stringify(err));
			});
		},
		get_events_feed : function(offset, filter){

			$.getJSON(api_base_url+user+'/events/feed/'+offset+'/'+filter , function(response){
				console.log(response);
				var source   = $("#event_feed_entry_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').html( template(response) );
			}).fail(function(err){
				console.log(err);
			});
		},
		get_user_timeline : function(offset){
			/* To do: send block length from the app */
			$.getJSON(api_base_url+user+'/timeline/'+offset, function(response){
				console.log(response);
				offset++;
				var data = {};
				data.results = response;
				var source   = $("#event_entry_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(data) );
				/* To do: send block length from the app, change hardcoded 10 */
				if($('#load_more_posts').length > 0)
					$('#load_more_posts').remove();
				if(data.results.length < 10){
					$('.feed_container').append( "<a class='load_more' data-role='none'>No hay más actividad</a>" );
					return;
				}
				$('.feed_container').append( "<a class='load_more' id='load_more_posts' data-role='none' data-page='"+offset+"'><i class='fa fa-refresh'></i> Cargar más</a>" );
				return;
			}).fail(function(err){
				console.log(err);
			});
			
		},
		render_header : function(){
			
			$.getJSON(api_base_url+user+'/notifications', function(response){
				var source   = app.header_partial();
				var template = Handlebars.compile(source);
				$('.main').prepend( template(response) ).trigger('create');
			});
			
		},
		render_event_minigallery: function(event_id, limit){
			
			$.getJSON(api_base_url+'events/'+event_id+'/gallery/'+limit+'/thumbnail/', function(response){

				var source   = $("#mini_gallery_template").html();
				var template = Handlebars.compile(source);
				$('.append_gallery').prepend( template(response) ).trigger('create');
			});
		},
		render_event_popup: function(event_id){
			var source   = $("#event_popup_template").html();
			var template = Handlebars.compile(source);
			$('.main').append( template({'event_id': event_id}) ).trigger('create');
		},
		render_comments: function(event_id, offset){
			$.getJSON(api_base_url+'events/comments/'+event_id+'/'+offset, function(response){
				var source   = app.comments_partial();
				var template = Handlebars.compile(source);
				$('.main').append( template(response.data) );
			});
		},
		render_event: function(event_id){
			$.getJSON(api_base_url+user+'/events/'+event_id, function(response){
				var source   = $("#event_single_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response) ).trigger('create');
				app.render_event_minigallery(event_id, 5);
				app.render_comments(event_id, 0);
			});
		},
		render_my_schedule: function(offset){
			$.getJSON(api_base_url+user+'/scheduled_feed/'+offset, function(response){
				var source   = $("#event_single_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response) );
			});
		},
		render_user: function(user_login){
			$.getJSON(api_base_url+user+'/user/'+user_login, function(response){
				var source   = $("#user_profile_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response) ).trigger('create');
			});
		},
		render_user_profile: function(user_login){
			$.getJSON( api_base_url+user+'/user/'+user_login , function(response){
				var source   = $("#user_profile_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').prepend( template(response) ).trigger('create');
			});
		},
		render_user_picsmini: function(user_login){
			$.getJSON( api_base_url+'user/'+user_login+'/gallery/5/thumbnail/', function(response){
				var source   = $("#user_picsmini").html();
				var template = Handlebars.compile(source);
				$('.feed_container').prepend( template(response) ).trigger('create');
			});
		},
		render_my_profile: function(){
			$.getJSON( api_base_url+user+'/user/'+user , function(response){
				var source   = $("#my_profile_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').prepend( template(response) ).trigger('create');
			});
		},
		render_categories: function(){
			$.getJSON( api_base_url+user+'/categories/0' , function(response){
				// console.log(response);
				var source   = $("#category_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response) ).trigger('create');
			});
		},
		render_subcategories: function(parent){
			$.getJSON( api_base_url+user+'/categories/'+parent , function(response){
				console.log(response);
				var source   = $("#subcategory_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response) ).trigger('create');
			});
		},
		render_category_detail: function(cat_id){
			$.getJSON( api_base_url+user+'/category/'+cat_id , function(response){
				console.log(response);
				var source   = $("#category_detail_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response.data) ).trigger('create');
			});
		},
		render_schedule_first_events: function(offset){
			$.getJSON( api_base_url+user+'/events/feed/'+offset , function(response){
				console.log(response);
				var source   = $("#event_entry_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response) ).trigger('create');
			});
		},
		render_venue_profile: function(venue_id){
			$.getJSON( api_base_url+user+'/venues/'+venue_id , function(response){
				var source   = $("#venue_profile_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response.data) ).trigger('create');
			});
		},
		render_discover_screen: function(){
			$.getJSON( api_base_url+user+'/feeds/discover/' , function(response){
				var source   = $("#discover_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response.data) ).trigger('create');
			});
		},
		get_search_results: function(search_term, offset){
			$.getJSON( api_base_url+'user/'+user+'/search/'+search_term+'/'+offset , function(response){
				var source   = $("#search_entry_template").html();
				var template = Handlebars.compile(source);
				offset++;
				$('.feed_container').append( template(response.data) ).trigger('create');
				/* To do: send block length from the app, change hardcoded 10 */
				if($('#load_more_results').length > 0)
					$('#load_more_results').remove();
				if(response.data.results.length < 10){
					$('.feed_container').append( "<a class='load_more' data-role='none'>No hay más resultados</a>" );
					return;
				}
				$('.feed_container').append( "<a class='load_more' id='load_more_results' data-role='none' data-page='"+offset+"'><i class='fa fa-refresh'></i> Cargar más</a>" );
				return;
			});
		},
		get_user_followers: function(queried_user, type){
			if(!type) type = "any";
			$.getJSON( api_base_url+user+'/user/'+queried_user+'/followers/'+type , function(response){
				var source   = $("#follower_entry_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response.data) ).trigger('create');
			});
		},
		get_user_followees: function(queried_user, type){
			if(!type) type = "any";
			$.getJSON( api_base_url+user+'/user/'+queried_user+'/followees/'+type , function(response){
				var source   = $("#follower_entry_template").html();
				var template = Handlebars.compile(source);
				$('.feed_container').append( template(response.data) ).trigger('create');
			});
		},
		set_selected_filter: function(filter){
			$(".tab_button").filter(function() {
					return $(this).data('rel') == filter; 
			}).addClass('selected');
		},
		set_query_title: function(queried_term){
			$('.insert_query').text('"'+queried_term+'"');
		},
		set_selected_city: function(stored_city){
			console.log(stored_city);
			if(!stored_city || stored_city == '')
				return false;
			var opt = $("#city option[value='"+stored_city+"']");
			console.log(opt);
			opt.prop('selected', 'selected');
			$('#city').change();
			return;
		},
		get_file_from_gallery: function(destination){

			apiRH.getFileFromGallery(destination);
			return;
		},
		showLoader: function(){
			$('#spinner').show();
		},
		hideLoader: function(){
			$('#spinner').hide();
		},
		toast: function(message, bottom){
			// console.log('Toasting this: '+message);
			try{
				if(!bottom){
					window.plugins.toast.showLongCenter(message);
				}else{
					window.plugins.toast.showLongBottom(message);
				}
			}
			catch(err){
				console.log('Toasting error: ' + JSON.stringify(err));
				alert(message);
			}
			return;
		},
		gallery_partial: function(){ return "\
						<div class='pswp' tabindex='-1' role='dialog' aria-hidden='true' data-role='none'>\
								<div class='pswp__bg' data-role='none'></div>\
								<div class='pswp__scroll-wrap' data-role='none'>\
										<div class='pswp__container' data-role='none'>\
												<div class='pswp__item' data-role='none'></div>\
												<div class='pswp__item' data-role='none'></div>\
												<div class='pswp__item' data-role='none'></div>\
										</div>\
										<div class='pswp__ui pswp__ui--hidden' data-role='none'>\
												<div class='pswp__top-bar' data-role='none'>\
														<div class='pswp__counter' data-role='none'></div>\
														<button class='pswp__button pswp__button--close' title='Close (Esc)' data-role='none'></button>\
														<div class='pswp__preloader' data-role='none'>\
																<div class='pswp__preloader__icn' data-role='none'>\
																	<div class='pswp__preloader__cut' data-role='none'>\
																		<div class='pswp__preloader__donut' data-role='none'></div>\
																	</div>\
																</div>\
														</div>\
												</div>\
												<div class='pswp__share-modal pswp__share-modal--hidden pswp__single-tap' data-role='none'>\
														<div class='pswp__share-tooltip' data-role='none'></div>\
												</div>\
												<button class='pswp__button pswp__button--arrow--left' title='Previous (arrow left)' data-role='none'>\
												</button>\
												<button class='pswp__button pswp__button--arrow--right' title='Next (arrow right)' data-role='none'>\
												</button>\
												<div class='pswp__caption' data-role='none'>\
														<div class='pswp__caption__center' data-role='none'></div>\
												</div>\
										</div>\
								</div>\
						</div>";
		},
		render_event_gallery_partial: function(event_id){
			
			$.getJSON(api_base_url+'events/'+event_id+'/gallery/-1/', function(response){
				var source   = app.gallery_partial();
				var template = Handlebars.compile(source);
				$('body').append( template(response) );
				/*Set elements into temporary variable */
				window.event_temp_gallery_items = response.items;
			});
			return;
		},
		trigger_event_gallery: function(index){
			window.event_gallery = null;
			var pswpElement = document.querySelectorAll('.pswp')[0];
			var items = window.event_temp_gallery_items;
			var options = {
				history: false,
		        focus: false,

		        showAnimationDuration: 0,
		        hideAnimationDuration: 0,
			    index: index
			};
			// Initializes and opens PhotoSwipe
			window.event_gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			return;
		}
	};

	 /*      _                                       _                        _       
	*   __| | ___   ___ _   _ _ __ ___   ___ _ __ | |_   _ __ ___  __ _  __| |_   _ 
	*  / _` |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __| | '__/ _ \/ _` |/ _` | | | |
	* | (_| | (_) | (__| |_| | | | | | |  __/ | | | |_  | | |  __/ (_| | (_| | |_| |
	*  \__,_|\___/ \___|\__,_|_| |_| |_|\___|_| |_|\__| |_|  \___|\__,_|\__,_|\__, |
	*                                                                         |___/ 
	*/
	jQuery(document).ready(function($) {

		// $( ".fixed_header" ).toolbar({ position: "fixed" });

		/* Log In with a regular ol' account */
		$('#login_form').submit(function(e){
			app.showLoader();
			e.preventDefault();
			var data_login  	= app.getFormData('#login_form');
			var responsedata 	= apiRH.loginNative(data_login);
			if(responsedata) {
				apiRH.save_user_data_clientside(responsedata);
				window.location.assign('feed.html?filter_feed=all');
			}
		});

		$('#register_us').on('tap', function(){
			$('#register_form').slideToggle('fast');
			$(".login_area").slideToggle('fast');
			$('.add_text').text($('.add_text').text()+' regístrate con nosotros');
			$(this).remove();
			return;
		});

		/* Create a new account the old fashioned way */
		$('#register_form').validate({
			rules: {
				user_login_reg: "required",
				user_email_reg: {
						required: true,
						email: true
					},
				user_country: "required",
				i_accept_terms : "required"
			},
			messages: {
				user_login_reg: "Debes proporcionar un username",
				user_email_reg: {
						required: "Debes proporcionar un email",
						email: "Por favor proporciona un email válido"
					},
				user_country: "Por favor selecciona tu país",
				i_accept_terms: "Debes aceptar los términos y condiciones para continuar"
			},
			submitHandler: function(e){

				var data_login  	= app.getFormData('#register_form');
				data_login.user_password_reg = $('#user_password_reg').val();
				console.log(data_login);
				var responsedata 	= apiRH.registerNative(data_login);
				if(responsedata) {
					apiRH.save_user_data_clientside(responsedata);
					window.location.assign('feed.html?filter_feed=all');
					return;
				}
				app.toast('Lo sentimos, el nombre de usuario ya existe.');
				e.preventDefault();
			}
		});

		/* Log Out from the API */
		$('body').on('click', '#logout', function(e){
			/* Requesting logout from server */
			var response = apiRH.logOut({user_login : user, request_token : apiRH.get_request_token() });
			if(response.success){
				app.toast('Hasta pronto! Tu sesión ha sido cerrada');
				app.ls.removeItem('museo_log_info');
				app.ls.removeItem('request_token');
				window.location.assign('index.html');
				return;
			}
			app.toast('Ocurrió un problema al intentar cerrar tu sesión');
			return;
		});

		/* Get provinces select 
		 * Happens on register and profile updating
		 *
		 */
		$("body").on("change", "#user_country", function(){
			var country = $(this).val();
			var args = {};
				args.country = country;
				console.log(args);
				console.log(JSON.stringify(args));
			var response = apiRH.getRequest('assets/provinces/'+encodeURIComponent(JSON.stringify(args)), null);
			if(response.success){
				var source   = app.province_select_partial();
				var template = Handlebars.compile(source);
				$('#insert_select').append( template(response.pool) ).trigger("create");
			}
			return;
		});

		//UNSCHEDULE VIA CLOSE BUTTON
		$('body').on('click', 'a.close', function(){
			var event_id = $(this).data('id');
			var response = apiRH.makeRequest(user+'/unschedule', {'evento_id': event_id});
			if(response){
				$(this).parent().slideUp('fast');
				$(this).parent().slideUp('fast');
			}
			
		});

		
		// FOLLOW/UNFOLLOW CATEGORIES
		$('body').on('tap', '.select_me', function(e){

			if(!$(this).hasClass('selected')){
				var data = $(this).data('id');
				var response = apiRH.makeRequest(user+'/categories/follow', {'cat_id' : data});
				if(response){
					$(this).addClass('selected');
					e.stopPropagation();
					return;
				}
			}
			var data = $(this).data('id');
			var response = apiRH.makeRequest(user+'/categories/unfollow', {'cat_id' : data});
			if(response){
				$(this).removeClass('selected');
				e.stopPropagation();
				return;
			}
		});

		//MARK NOTIFICATION AS READ
		$('.main').on('tap', '.each_notification a', function(e){
			e.preventDefault();
			var redirect = $(this).attr('href');
			var $context = $(this);
			if($context.hasClass('read')) return false;
			var context_id = $context.data('id');
			
			var response = apiRH.makeRequest(user+'/notifications/read/'+context_id);
			console.log(response);
			if(response){
				$context.addClass('read');
			}
			window.location.assign(redirect);
			
		});

		//SCHEDULE EVENT
		$('body').on('click', '.schedule_this', function(){
			app.showLoader();
			var context_id = $(this).data('id');
			var response = apiRH.makeRequest(user+'/schedule', {'evento_id': context_id});
			if(response){
				$(this).removeClass('schedule_this').addClass('active unschedule_this').html("<i class='fa fa-calendar'></i><i class='fa fa-check superscript'></i>");
				app.toast("Se agendó un nuevo evento");
				app.hideLoader();
			}
		});

		//UNSCHEDULE EVENT
		$('body').on('click', '.unschedule_this', function(){
			app.showLoader();
			var context_id = $(this).data('id');
			var response = apiRH.makeRequest(user+'/unschedule', {'evento_id': context_id});
			if(response){
				$(this).removeClass('active unschedule_this').addClass('schedule_this').find(".superscript").remove();
				app.toast("Se eliminó un evento de tu agenda");
				app.hideLoader();
			}
		});

		/* TO DO: Check request, returns old value and we have to substract or add the follow */

		var update_follow_count = function(user_nice, type){
			if($('#'+type+'_follower_count').length == 0)
				return;
			console.log('user/'+user_nice+'/follower_count/'+type);
			var response = apiRH.getRequest('user/'+user_nice+'/follower_count/'+type, null);
			var string = '';
			if(type == 'museografo')
				string = '<span>Museógrafos</span>';
			if(type == 'venue')
				string = '<span>Venues</span>';
			if(type == 'artista')
				string = '<span>Artistas</span>';
			$('#'+type+'_follower_count').html(response+string);
			return;
		};

		//FOLLOW USER
		$('body').on('click', '#follow_user', function(){
			var _class	= $(this).hasClass('special_icon') ? true : false;
			var user_id = $(this).data('id');
			var _user_role = $(this).data('userrole');
			var _user_login = $(this).data('userlogin');
			var friendly_role = (_user_role && _user_role != '') ? $(this).data('userrole') : 'usuario';
				friendly_role = (friendly_role == 'suscriptor') ? 'museógrafo' : friendly_role;
			var museo_log_info = window.localStorage.getItem('museo_log_info');
			if(user_role == 'administrator' || user_role == 'administrador')
				user_role = 'suscriptor';
			var response = apiRH.makeRequest(user+'/follow', {'user_id': user_id, type: user_role});
			if(response.success){
				if(!_class){
					/* Profile follow 'switch' */
					$(this).removeClass('follow_user').addClass('unfollow_user').attr('id', 'unfollow_user').html('Dejar de seguir');
					app.toast("Ahora sigues un nuevo "+friendly_role+".");
					/* Update the number of followers */
					update_follow_count(_user_login, friendly_role);
					return;
				}
				/* Inline follow 'switch' */
				$(this).removeClass('follow_user').addClass('unfollow_user').attr('id', 'unfollow_user').html('<i class="fa fa-user"></i> <i class="fa fa-check superscript"></i>');
				app.toast("Ahora sigues un nuevo "+friendly_role+".");
				return;
			}
		});

		//UNFOLLOW USER
		$('body').on('click', '#unfollow_user', function(){

			var _class	= $(this).hasClass('special_icon') ? true : false;
			var user_id = $(this).data('id');
			var _user_role = $(this).data('userrole');
			var _user_login = $(this).data('userlogin');
			var friendly_role = (_user_role && _user_role != '') ? $(this).data('userrole') : 'usuario';
				friendly_role = (friendly_role == 'suscriptor') ? 'museógrafo' : friendly_role;
			
			var response = apiRH.makeRequest(user+'/unfollow', {'user_id': user_id});
			if(response.success){
				if(!_class){
					$(this).removeClass('unfollow_user').addClass('follow_user').attr('id', 'follow_user').html('Seguir');
					app.toast("Has dejado de seguir un "+friendly_role);
					/* Correct value should be -1 for the increment parameter */
					update_follow_count(_user_login, friendly_role);
					return;
				}
				/* Inline follow 'switch' */
				$(this).removeClass('unfollow_user').addClass('follow_user').attr('id', 'follow_user').html('<i class="fa fa-user"></i> <i class="fa fa-plus superscript"></i>');
				app.toast("Has dejado de seguir un "+friendly_role);
				// update_unfollow_count(friendly_role);
				return;
			}
		});


		/*
		 * Recomend to user
		 */
		$('body').on('submit', '#recomend_to', function(e){
			e.preventDefault();
			var data = app.getFormData('#recomend_to');
			var response = apiRH.makeRequest(user+'/recomend', {'evento_id': data.event_id,'user_reco': data.user_rec,'mensaje': data.comment});
			console.log(response);
			if(response){
				$('.close_dialog').trigger('click');
				app.toast("Invitación enviada!");
			}
		});

		/*
		 * Update user profile events
		 */
		$('body').on('submit', '#modify_profile', function(e){
			e.preventDefault();
			/* IMPORTANT! getFormData returns an array, we have to parse into a JSON object before making the PUT call */
			var data = app.getFormData('#modify_profile');

			if(data.password_nuevo && data.password_nuevo !== ''){
				console.log('Lo vamos a cambiar');
				if(data.password_nuevo == data.password_again){
					console.log("son iguales!");
					var response = apiRH.putRequest('user/'+user+"/password/" , data);
					if(!response.success){
						app.toast('There was an error saving your password');
						return false;
					}
					console.log(response);
				}
				app.toast('Tus passwords no coinciden');
			}
			// var response = apiRH.putRequest('user/'+user+'/' , data);
			var response = apiRH.putRequest('user/'+user+'/' , data);
			if(response.success){
				console.log(response);
				app.toast('Tu información ha sido actualizada');
			}
			return;
		});

		/** Login with events **/
		$(document).on('tap', '.login_button', function(){
			
			var provider = $(this).data('provider');
			if(provider == 'facebook')
				apiRH.loginOauth(provider, apiRH.loginCallbackFB);
			if(provider == 'twitter')
				apiRH.loginOauth(provider, apiRH.loginCallbackTW);
			// if(provider == 'google_plus')
			//     app.loginOauth(provider, loginCallbackGP);
		});

		/* Pagination Load more posts */
		$(document).on('tap', '#load_more_posts', function(e){
			e.preventDefault();
			var offset = $(this).data('page');
			app.get_user_timeline(offset);
			e.stopPropagation();
		});

		/* Pagination Load more search results */
		$(document).on('tap', '#load_more_results', function(e){
			e.preventDefault();
			var offset = $(this).data('page');
			var GET = app.getUrlVars();

			app.get_search_results(GET.searchbox, offset);
			e.stopPropagation();
		});

		/* Mark event as attended */
		$('#attend_event').on('tap', function(){
			console.log('Attending event');
			var post_id = $(this).data('eventid');
			var response = apiRH.makeRequest(user+'/events/attend', {'post_ID': post_id});
			if(response.success){
				$(this).removeClass('attend_event').addClass('attended_event').html('Asistido <i class="fa fa-check-square-o">');
				return;
			}
		});

		/* Trigger event gallery from thumb */
		$('body').on('tap','.gallery_thumb', function(e){
			app.trigger_event_gallery($(this).data('index'));
			setTimeout( event_gallery.init(), 600);
			e.preventDefault();
		});

		/* Insert new comment in event */
		$('#comment_button').on('tap', function(){
			var post_id = $('#hidden_event_id').val();
			var comment_content = $('#comment_content').val();
			var response = apiRH.makeRequest(user+'/events/comments/', {'event_id': post_id, 'comment_content': comment_content});
			if(response.success){
				window.location.reload();
				return;
			}
			app.toast('Ha ocurrido un error al postear tu comentario');
		});

		/* Autocomplete usernames for recommend event */
		$("#user_rec").on("change keyup", function() {
			var search = $(this).val();
			var render = "";
			var response = apiRH.getRequest(user+'/search/'+search, null);
			response.data.forEach(function(value){
				render += "<li class='fill_input' data-value='"+value+"'>"+value+"</li>";
			});
					$("#hidden_list").html(render).show().delay(6000).fadeOut('fast');
			});

			/* change value when suggested username is clicked */
			$(document).on('tap', '.fill_input', function(){
				var value = $(this).data('value');
				$('#user_rec').val(value);
				$("#hidden_list").html('').fadeOut('fast');
			});

			$(document).on('tap', 'a[rel=external]', function(){
				app.showLoader();
			});

			/* Category follow events */
			$(document).on('tap', '._nav_follow_category', function(e){
				e.preventDefault();
				var $context 	= $(this);
				var cat_id 		= $(this).data('id');
				var response 	= apiRH.makeRequest(user+'/categories/follow/', {'cat_id': cat_id});
			console.log(response);
			e.stopPropagation();
			if(response.success){
				app.toast('Sigues una nueva categoría');
				$context.removeClass('_nav_follow_category follow_category').addClass('_nav_unfollow_category unfollow_category');
				if($context.hasClass('inline')){
					$context.html('<i class="fa fa-check"></i>');
					return;
				}
				$context.html('<i class="fa fa-check"></i> Siguiendo');
				e.stopPropagation();
				return;
			}
			return app.toast('Oops! ocurrió un error');
			});

		/* Category follow events */
			$(document).on('tap', '._nav_unfollow_category', function(e){
				e.preventDefault();
				var $context 	= $(this);
				var cat_id 		= $(this).data('id');
				var response 	= apiRH.makeRequest(user+'/categories/unfollow/', {'cat_id': cat_id});
				console.log(response);
				e.stopPropagation();
			if(response.success){
				app.toast('Dejaste de seguir una categoría');
				$context.removeClass('_nav_unfollow_category unfollow_category').addClass('_nav_follow_category follow_category');
				if($context.hasClass('inline')){
					$context.html('<i class="fa fa-plus-circle"></i>');
					return;	
				}
				$context.html('<i class="fa fa-plus-circle"></i> Seguir');
				
				return;	
			}
			return app.toast('Oops! ocurrió un error');
			});

			/* Upload event image */
			$('#event_file_upload').on('tap', function(){
				var ls = window.localStorage;
				ls.setItem('museo_last_selected_event', $(this).data('eventid'));
				app.get_file_from_gallery('event');
			});
		
		/* Upload user profile pic */
			$('#mod_user_profile').on('tap', function(){
				app.get_file_from_gallery('profile');
			});

	});