define(["require","exports","module","modules/widget/slider","juicer","user","app/www/tray","store"],function(e,t,n){function g(){var e=$(window),t=p.offset().top,n=p.height();return e.height()+e.scrollTop()>=t+n-700}function y(){if(m)return;d?v||g()&&(m=!0,$.get("/ajax/third",function(e){m=!1,v=!0,p.append(e)})):g()&&(m=!0,$.get("/ajax/second",function(e){m=!1,d=!0,p.append(e)}))}var r=1600,i=600,s=$(".index_focus"),o=1340,u=1566,a=$(".index_auto"),f,l=function(){var e=$("body").width(),t=r,n=i;if(e<r)var t=e,n=e*i/r;s.add(s.find("img")).css({width:t,height:n}),e<o?(a.removeClass("index_m").addClass("index_s"),f="small"):e<u?(a.removeClass("index_s").addClass("index_m"),f="middle"):(a.removeClass("index_s index_m"),f="large")};l();var c=_.throttle(l,200),h=e("modules/widget/slider");new h(s);var p=$(".index_content"),d=!1,v=!1,m=!1,b=_.throttle(y,200);$(window).resize(function(){c(),b()}),$(window).scroll(function(){b()}),y();var w,E,S="/mv/get-video-info",x=$("#video_info_tpl").html(),T=e("juicer"),N=function(e){var t=$(e.currentTarget);w=setTimeout(function(){k();var e=t.find(".mv_pic_info"),n={};e.length==0&&(e=$('<div class="mv_pic_info"></div>').appendTo(t)),e.find("p").length==0&&(n.videoId=t.data("videoId"),t.parents("#program").length&&(n.type="guest"),E=$.getJSON(S,n,function(t){e.html(T.to_html(x,t.video))})),e.stop(!0,!0),t.addClass("mv_hover"),e.animate({height:148},300)},500)},C=function(e){clearTimeout(w),E&&E.abort();var t=$(e.currentTarget);t.find(".mv_pic_info").stop(!0,!0).animate({height:0},400,function(){t.removeClass("mv_hover")})},k=function(){E&&E.abort(),p.find(".J_mv").removeClass("mv_hover")};p.on("mouseenter",".J_mv",function(e){N(e)}).on("mouseleave",".J_mv",function(e){C(e)});var L=e("user"),A=Backbone.View.extend({events:{"click .J_render":"render","click .J_login_dialog":"popLogin"},initialize:function(){var e=this;this.videos=this.options.data,this.load(),L.isLogined()?$(".index_login").hide():L.logined(function(){e.load(),$(".index_login").hide()}),this.$ul=this.$el.find("ul");var t=_.bind(_.throttle(this.render,200),this);$(window).resize(function(){t()})},dynamicSize:{small:4,middle:5,large:6},popLogin:function(){e(["loginBox"],function(e){e.show()})},load:function(){var e=this;$.getJSON("/mv/get-guess","userId="+L.get("userId"),function(t){e.oVideos=t.video,e.videos=_.clone(e.oVideos),e.render()})},render:function(){var e=this,t=this.getRondomVideos(this.dynamicSize[f]);this.$ul.hide(),this.showLoading(),this.$ul.find("li").html(T.to_html(this.options.tpl,{videos:t}));if(t.length>0){var n=0,r=Math.max(t.length-2,1);this.$ul.find("img").load(function(){$(this).next().show(),n++;if(n>r)return;n>=r&&(e.removeLoading(),e.$ul.fadeIn())})}else e.removeLoading()},getRondomVideos:function(e){var t=[];for(var n=0;n<e;n++){var r=Math.floor(Math.random()*this.videos.length);t=t.concat(this.videos.splice(r,1))}return this.videos.length==0&&(this.videos=_.clone(this.oVideos)),t},showLoading:function(){$('<span class="ico_loading"></span>').appendTo(this.$el)},removeLoading:function(){this.$el.find(".ico_loading").remove()}}),O=e("app/www/tray");t.Tray=O,t.Recommend=A,t.store=e("store")});