horizon.membership={current_membership:[],data:[],roles:[],has_roles:[],default_role_id:[],get_field_id:function(id_string){return id_string.slice(id_string.lastIndexOf("_")+1);},get_member_id:function(id_string,step_slug){return id_string.slice(id_string.indexOf(step_slug)+step_slug.length+1);},get_role_element:function(step_slug,role_id){return $('select[id^="id_'+step_slug+'_role_'+role_id+'"]');},get_member_element:function(step_slug,data_id){return $('li[data-'+step_slug+'-id$='+data_id+']').parent();},init_properties:function(step_slug){horizon.membership.has_roles[step_slug]=$("."+step_slug+"_membership").data('show-roles')!=="False";horizon.membership.default_role_id[step_slug]=$('#id_default_'+step_slug+'_role').attr('value');horizon.membership.init_data_list(step_slug);horizon.membership.init_role_list(step_slug);horizon.membership.init_current_membership(step_slug);},init_data_list:function(step_slug){horizon.membership.data[step_slug]=[];angular.forEach($(this.get_role_element(step_slug,"")).find("option"),function(option){horizon.membership.data[step_slug][option.value]=option.text;});},init_role_list:function(step_slug){horizon.membership.roles[step_slug]=[];angular.forEach($('label[for^="id_'+step_slug+'_role_"]'),function(role){var id=horizon.membership.get_field_id($(role).attr('for'));horizon.membership.roles[step_slug][id]=$(role).text();});},init_current_membership:function(step_slug){horizon.membership.current_membership[step_slug]=[];var members_list=[];var role_id,selected_members;angular.forEach(this.get_role_element(step_slug,''),function(value){role_id=horizon.membership.get_field_id($(value).attr('id'));selected_members=$(value).find("option:selected");members_list=[];if(selected_members){angular.forEach(selected_members,function(member){members_list.push(member.value);});}
horizon.membership.current_membership[step_slug][role_id]=members_list;});},get_member_roles:function(step_slug,data_id){var roles=[];for(var role in horizon.membership.current_membership[step_slug]){if($.inArray(data_id,horizon.membership.current_membership[step_slug][role])!==-1){roles.push(role);}}
return roles;},update_role_lists:function(step_slug,role_id,new_list){this.get_role_element(step_slug,role_id).val(new_list);horizon.membership.current_membership[step_slug][role_id]=new_list;},remove_member:function(step_slug,data_id,role_id,role_list){var index=role_list.indexOf(data_id);if(index>=0){role_list.splice(index,1);horizon.membership.update_role_lists(step_slug,role_id,role_list);}},remove_member_from_role:function(step_slug,data_id,role_id){var role,membership=horizon.membership.current_membership[step_slug];if(role_id){horizon.membership.remove_member(step_slug,data_id,role_id,membership[role_id]);}
else{for(role in membership){if(membership.hasOwnProperty(role)){horizon.membership.remove_member(step_slug,data_id,role,membership[role]);}}}},add_member_to_role:function(step_slug,data_id,role_id){var role_list=horizon.membership.current_membership[step_slug][role_id];role_list.push(data_id);horizon.membership.update_role_lists(step_slug,role_id,role_list);},update_member_role_dropdown:function(step_slug,data_id,role_ids,member_el){if(typeof(role_ids)==='undefined'){role_ids=horizon.membership.get_member_roles(step_slug,data_id);}
if(typeof(member_el)==='undefined'){member_el=horizon.membership.get_member_element(step_slug,data_id);}
var $dropdown=member_el.find("li.member").siblings('.dropdown');var $role_items=$dropdown.children('.role_dropdown').children('li');$role_items.each(function(idx,el){if($.inArray(($(el).data('role-id')),role_ids)!==-1){$(el).addClass('selected');}else{$(el).removeClass('selected');}});var $roles_display=$dropdown.children('.dropdown-toggle').children('.roles_display');var roles_to_display=[];for(var i=0;i<role_ids.length;i++){roles_to_display.push(horizon.membership.roles[step_slug][role_ids[i]]);}
var text=roles_to_display.join(', ');if(text.length===0){text=gettext('No roles');}
$roles_display.text(text);},generate_member_element:function(step_slug,display_name,data_id,role_ids,text){var roles=[],that=this,membership_roles=that.roles[step_slug],r;for(r in membership_roles){if(membership_roles.hasOwnProperty(r)){roles.push({role_id:r,role_name:membership_roles[r]});}}
var template=horizon.templates.compiled_templates["#membership_template"],params={data_id:"id_"+step_slug+"_"+data_id,step_slug:step_slug,default_role:that.roles[that.default_role_id[step_slug]],display_name:display_name,text:text,roles:roles,roles_label:gettext("Roles")},member_el=$(template.render(params));this.update_member_role_dropdown(step_slug,params.data_id,role_ids,member_el);return $(member_el);},generate_html:function(step_slug){var data_id,data=horizon.membership.data[step_slug];for(data_id in data){if(data.hasOwnProperty(data_id)){var display_name=data[data_id];var role_ids=this.get_member_roles(step_slug,data_id);if(role_ids.length>0){$("."+step_slug+"_members").append(this.generate_member_element(step_slug,display_name,data_id,role_ids,"-"));}
else{$(".available_"+step_slug).append(this.generate_member_element(step_slug,display_name,data_id,role_ids,"+"));}}}
horizon.membership.detect_no_results(step_slug);},update_membership:function(step_slug){$(".available_"+step_slug+", ."+step_slug+"_members").on('click',".btn-group a[href='#add_remove']",function(evt){evt.preventDefault();var available=$(".available_"+step_slug).has($(this)).length;var data_id=horizon.membership.get_member_id($(this).parent().siblings().attr('data-'+step_slug+'-id'),step_slug);var member_el=$(this).parent().parent();if(available){var default_role=horizon.membership.default_role_id[step_slug];$(this).text("-");$("."+step_slug+"_members").append(member_el);horizon.membership.add_member_to_role(step_slug,data_id,default_role);if(horizon.membership.has_roles[step_slug]){$(this).parent().siblings(".role_options").show();horizon.membership.update_member_role_dropdown(step_slug,data_id,[default_role],member_el);}}
else{$(this).text("+");$(this).parent().siblings(".role_options").hide();$(".available_"+step_slug).append(member_el);horizon.membership.remove_member_from_role(step_slug,data_id);}
horizon.membership.list_filtering(step_slug);horizon.membership.detect_no_results(step_slug);$("input."+step_slug+"_filter").trigger("keyup");});},detect_no_results:function(step_slug){$('.'+step_slug+'_filterable').each(function(){var css_class=$(this).find('ul').attr('class');var filter=$.grep(css_class.split(' '),function(val){return val.indexOf(step_slug)!==-1;})[0];if(!$('.'+filter).children('ul').length){$('#no_'+filter).show();$("input[id='"+filter+"']").attr('disabled','disabled');}
else{$('#no_'+filter).hide();$("input[id='"+filter+"']").removeAttr('disabled');}});},select_member_role:function(step_slug){$(".available_"+step_slug+", ."+step_slug+"_members").on('click','.role_dropdown li',function(evt){evt.preventDefault();evt.stopPropagation();var new_role_id=$(this).attr("data-role-id");var id_str=$(this).parent().parent().siblings(".member").attr("data-"+step_slug+"-id");var data_id=horizon.membership.get_member_id(id_str,step_slug);if($(this).hasClass('selected')){$(this).removeClass('selected');horizon.membership.remove_member_from_role(step_slug,data_id,new_role_id);}else{$(this).addClass('selected');horizon.membership.add_member_to_role(step_slug,data_id,new_role_id);}
horizon.membership.update_member_role_dropdown(step_slug,data_id);});},add_new_member:function(step_slug){$("select[id='id_new_"+step_slug+"']").on('change',function(){var display_name=$(this).find("option").text();var data_id=$(this).find("option").attr("value");var default_role_id=horizon.membership.default_role_id[step_slug];$("."+step_slug+"_members").append(horizon.membership.generate_member_element(step_slug,display_name,data_id,[default_role_id],"-"));horizon.membership.data[step_slug][data_id]=display_name;$("select[multiple='multiple']").append("<option value='"+data_id+"'>"+horizon.membership.data[step_slug][data_id]+"</option>");horizon.membership.add_member_to_role(step_slug,data_id,default_role_id);$(this).text("");horizon.membership.list_filtering(step_slug);horizon.membership.detect_no_results(step_slug);$("input.filter").val("");$("."+step_slug+"_members .btn-group").removeClass('last_stripe');$("."+step_slug+"_members .btn-group:last").addClass('last_stripe');});},add_new_member_styling:function(step_slug){var add_member_el=$("label[for='id_new_"+step_slug+"']").parent();$(add_member_el).find("select").hide();$("#add_"+step_slug).append($(add_member_el));$(add_member_el).addClass("add_"+step_slug);$(add_member_el).find("label, .input").addClass("add_"+step_slug+"_btn");},fix_stripes:function(step_slug){$('.fake_'+step_slug+'_table').each(function(){var filter="."+$(this).attr('id');var visible=" .btn-group:visible";var even=" .btn-group:visible:even";var last=" .btn-group:visible:last";$(filter+visible).removeClass('dark_stripe');$(filter+visible).addClass('light_stripe');$(filter+even).removeClass('light_stripe');$(filter+even).addClass('dark_stripe');$(filter+visible).removeClass('last_stripe');$(filter+last).addClass('last_stripe');});},list_filtering:function(step_slug){$('input.'+step_slug+'_filter').unbind();$('.'+step_slug+'_filterable').each(function(){var css_class=$(this).children().children('ul').attr('class');var filter=$.grep(css_class.split(' '),function(val){return val.indexOf(step_slug)!==-1;})[0];var input=$("input[id='"+filter+"']");input.quicksearch('ul.'+filter+' ul li span.display_name',{'delay':200,'loader':'span.loading','show':function(){$(this).parent().parent().show();if(filter==="available_"+step_slug){$(this).parent('.dropdown-toggle').hide();}},'hide':function(){$(this).parent().parent().hide();},'noResults':'ul#no_'+filter,'onAfter':function(){horizon.membership.fix_stripes(step_slug);},'prepareQuery':function(val){return new RegExp(horizon.string.escapeRegex(val),"i");},'testQuery':function(query,txt,span){if($(input).attr('id')===filter){$(input).prev().removeAttr('disabled');return query.test($(span).text());}else{return true;}}});});},workflow_init:function(modal,step_slug,step_id){$(modal).find('form').each(function(){var $form=$(this);if($form.find('div.'+step_slug+'_membership').length===0){return;}
horizon.membership.init_properties(step_slug);horizon.membership.generate_html(step_slug);horizon.membership.update_membership(step_slug);horizon.membership.select_member_role(step_slug);horizon.membership.add_new_member(step_slug);$form.find(".available_"+step_slug+" .role_options").hide();if(!horizon.membership.has_roles[step_slug]){$form.find("."+step_slug+"_members .role_options").hide();}
if(step_id.indexOf('update')===0){$form.find("#"+step_id+" input").blur();}
$form.find('.'+step_slug+'_membership').keydown(function(event){if(event.keyCode===13){event.preventDefault();return false;}});horizon.membership.add_new_member_styling(step_slug);horizon.membership.list_filtering(step_slug);horizon.membership.detect_no_results(step_slug);$form.find('.fake_'+step_slug+'_table').each(function(){var filter="."+$(this).attr('id');$(filter+' .btn-group:even').addClass('dark_stripe');$(filter+' .btn-group:last').addClass('last_stripe');});});}};