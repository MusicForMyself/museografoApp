(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['comments.hbs'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "	<article class='each_comment'>\n		<img src='"
    + alias3(((helper = (helper = helpers.author_thumbnail || (depth0 != null ? depth0.author_thumbnail : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author_thumbnail","hash":{},"data":data}) : helper)))
    + "' class='comment_user_thumb'>\n		<h3>"
    + alias3(((helper = (helper = helpers.author_name || (depth0 != null ? depth0.author_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author_name","hash":{},"data":data}) : helper)))
    + "</h3>\n		<p>"
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n	</article>\n";
},"3":function(depth0,helpers,partials,data) {
    return "	<p class='information'>¡Se el primero en reseñar este evento!</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<section class='comments border_c no_box clearfix'>\n	<h2>Reseñas ("
    + this.escapeExpression(((helper = (helper = helpers.comment_count || (depth0 != null ? depth0.comment_count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"comment_count","hash":{},"data":data}) : helper)))
    + ")</h2>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pool : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.pool : depth0),{"name":"unless","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	<section id='comment_form' class='comment_form'>\n		<form id=''>\n			<label for='comment_content'>Escribe tu reseña:</label>\n			<textarea name='comment_content' id='comment_content'></textarea>\n		</form>\n	</section>\n	<a class='comment_btn' id='comment_button' data-role='none'><i class='fa fa-share'></i></a>\n</section>";
},"useData":true});
})();