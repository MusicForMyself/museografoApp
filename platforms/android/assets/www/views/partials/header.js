(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['header'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pool : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.follow : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.vote : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.recommend : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "						<li class='each_notification "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.estatus : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " clearfix'>\n							<a href='user.html?user="
    + alias3(((helper = (helper = helpers.user_login || (depth0 != null ? depth0.user_login : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user_login","hash":{},"data":data}) : helper)))
    + "' rel='external' data-id='"
    + alias3(((helper = (helper = helpers.alerta_id || (depth0 != null ? depth0.alerta_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"alerta_id","hash":{},"data":data}) : helper)))
    + "' class='plus_btn right'><p><strong>"
    + alias3(((helper = (helper = helpers.user_login || (depth0 != null ? depth0.user_login : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user_login","hash":{},"data":data}) : helper)))
    + "</strong> te ha empezado a seguir.</p>\n							<i class='fa fa-plus-circle'></i></a>\n						</li>\n";
},"4":function(depth0,helpers,partials,data) {
    return "read";
},"6":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "						<li class='each_notification "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.estatus : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " clearfix'>\n							<a href='single-event.html?event="
    + alias3(((helper = (helper = helpers.objeto_id || (depth0 != null ? depth0.objeto_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"objeto_id","hash":{},"data":data}) : helper)))
    + "' rel='external' data-id='"
    + alias3(((helper = (helper = helpers.alerta_id || (depth0 != null ? depth0.alerta_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"alerta_id","hash":{},"data":data}) : helper)))
    + "' class='plus_btn right'><p><strong>"
    + alias3(((helper = (helper = helpers.user_login || (depth0 != null ? depth0.user_login : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user_login","hash":{},"data":data}) : helper)))
    + "</strong> votó tu comentario en el evento <strong>"
    + alias3(((helper = (helper = helpers.event_title || (depth0 != null ? depth0.event_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"event_title","hash":{},"data":data}) : helper)))
    + "</strong>.</p>\n							<i class='fa fa-plus-circle'></i></a>\n						</li>\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "						<li class='each_notification "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.estatus : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " clearfix' >\n							<a href='single-event.html?event="
    + alias3(((helper = (helper = helpers.objeto_id || (depth0 != null ? depth0.objeto_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"objeto_id","hash":{},"data":data}) : helper)))
    + "' data-id='"
    + alias3(((helper = (helper = helpers.alerta_id || (depth0 != null ? depth0.alerta_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"alerta_id","hash":{},"data":data}) : helper)))
    + "' rel='external' class='plus_btn right'><p><strong>"
    + alias3(((helper = (helper = helpers.user_login || (depth0 != null ? depth0.user_login : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user_login","hash":{},"data":data}) : helper)))
    + "</strong> te ha recomendado el evento <strong>"
    + alias3(((helper = (helper = helpers.event_title || (depth0 != null ? depth0.event_title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"event_title","hash":{},"data":data}) : helper)))
    + "</strong>.</p>\n							<i class='fa fa-plus-circle'></i></a>\n						</li>\n";
},"10":function(depth0,helpers,partials,data) {
    return "					<li class='clearfix'>\n						<p><strong>No tienes notificaciones</strong></p>\n					</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "	<div id='spinner' class='spinner'>\n		<div class='spinner-container container1'>\n			<div class='circle1'></div>\n			<div class='circle2'></div>\n			<div class='circle3'></div>\n			<div class='circle4'></div>\n		</div>\n		<div class='spinner-container container2'>\n			<div class='circle1'></div>\n			<div class='circle2'></div>\n			<div class='circle3'></div>\n			<div class='circle4'></div>\n		</div>\n		<div class='spinner-container container3'>\n			<div class='circle1'></div>\n			<div class='circle2'></div>\n			<div class='circle3'></div>\n			<div class='circle4'></div>\n		</div>\n	</div>\n	<div data-role='panel' id='main_drop' class='menu' data-position='left' data-display='push'>\n		<ul>\n			<li class='menu_profile'><a href='my-profile.html' rel='external'><img class='slight_radius' src='"
    + alias3(((helper = (helper = helpers.profile_pic || (depth0 != null ? depth0.profile_pic : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"profile_pic","hash":{},"data":data}) : helper)))
    + "'></a></li>\n			<li class='menu_profile_name'><a href='my-profile.html' rel='external'><h1>"
    + alias3(((helper = (helper = helpers.user_login || (depth0 != null ? depth0.user_login : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user_login","hash":{},"data":data}) : helper)))
    + "</h1></a></li>\n			<li class='feed'><a href='feed.html?filter_feed=all' rel='external'><i class='fa fa-newspaper-o'></i> Eventos</a></li>\n			<li class='feed'><a href='timeline.html' rel='external'><i class='fa fa-home'></i> Actividad</a></li>\n			<li class='agenda'><a href='my-events.html' rel='external'><i class='fa fa-calendar'></i> Mi agenda</a></li>\n			<li class='profile'><a href='follow-categories.html' rel='external'><i class='fa fa-tags'></i> Intereses</a></li>\n			<li class='profile settings'><a href='my-profile.html' rel='external'><i class='fa fa-user'></i> Mi Perfil</a></li>\n			<li class='logout settings'><a id='logout'><i class='fa fa-sign-out'></i> Cerrar sesión</a></li>\n			<li class='disclaimer'>Todos los derechos &reg; Museógrafo 2015</li>\n			<li class='disclaimer'><a href='mailto:hola@marat.mx'>hola@marat.mx</a></li>\n			<li class='disclaimer'><a onclick='window.open('http://app.museografo.com/aviso-de-privacidad', '_blank', 'location=yes');'>Aviso de privacidad</a></li>\n		</ul>\n	</div>\n	<div data-role='panel' id='notifications_drop' class='menu' data-position='right' data-display='push'>\n		<ul>\n			<li class='divider'>Notificaciones</li>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.count : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.pool : depth0),{"name":"unless","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<div data-role='header' data-tap-toggle='false' class='fixed_header' data-position='fixed'>\n		<a data-role='none' data-corners='false' href='#main_drop'  class='ui-btn-left menu_trigger'><i class='fa fa-bars'></i></a>\n		<h1 class='page_title'>\n			<form id='search_form' method='GET' action='search.html' data-ajax='false'>\n				<input type='search' data-corners='false' name='searchbox' id='searchbox' placeholder='¿Qué estás buscando?'>\n				<input type='submit' data-role='none' class='invisibo_submito' id='searchbox_submit' value=''>\n			</form>\n		</h1>\n		<a data-role='none' href='#notifications_drop' data-corners='false' class='ui-btn-right circle notifications notifications_trigger'>"
    + alias3(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</a>\n	</div>";
},"useData":true});
})();