function container(){
	$("#container .swiper-slide").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 4,
		freeMode: true
	})
}
function container6(){
	var a=0;
	$("#container6").ready(function(){
		$("#container6 .iconfont").on("touchstart",function(){
			var index=$(this).index(".iconfont");
			if(a==0){
				$($(".iconfont")[index]).html("&#xe625");
				a=1;
			}else{
				$($(".iconfont")[index]).html("&#xe61f");
				a=0;
			}
			$($("#container6 ol")[index]).children().toggle();
		})
	})
}
function container13(){
	var wrap=$(".wrap");
	$(".wrap").on("click",function(){
		$(this).addClass("wrap_focus").siblings().removeClass("wrap_focus");
	});
	$("textarea").on("click",function(){
		$(".wrap").removeClass("wrap_focus");
	})
}
function container4(){
	$("#container4 .swiper-slide").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 4,
		freeMode: true
	})
}
function container3(){
	var map = new AMap.Map("wrap", {
				resizeEnable: true
			});
			AMap.service(["AMap.PlaceSearch"], function() {
				var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
					pageSize:100,
					pageIndex: 1,
					city: "0512", //城市
					map: map,
					panel: "panel"
				});
				//关键字查询
				placeSearch.search("苏州瑞鹏信息科技");
			});
}
function container5(){
	$("#container5 .swiper-slide").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 4,
		freeMode: true
	})
}
function container9(){
	var time=setInterval(autogo,2000);
	var arr=$(".lunbo>li");
	var arr2=$(".count li");
	var len=arr.length;
	var w=$("ul")[0].offsetWidth;
	var preX,curX;
	var transferX=0;
	for(var i=0;i<len;i++){
		$(arr[i]).css("left",i*w);
		arr[i].addEventListener("touchstart",touchstart,false);
		arr[i].addEventListener("touchmove",touchmove,false);
		arr[i].addEventListener("touchend",touchend,false);
	}
	for(var i=0;i<len;i++){
		arr2[i].addEventListener("touchstart",countchange,false);
	}
	//点击轮播下方圆形切换
	function countchange(){
		clearInterval(time);
		var count_index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		for(var i=0;i<len;i++){
			$(arr[i]).animate({"left":(i-count_index)*w},300);
		}
		time=setInterval(autogo,2000);
	}
	//触摸开始
	function touchstart(event){
		event.preventDefault();
		clearInterval(time);
		if(event.targetTouches.length==1){      //避免多手指触摸情况
			var touch=event.targetTouches[0];
			preX=touch.pageX;
		}
	}
	$(".lunbo li").mousedown(function(event){
		clearInterval(time);
		event.preventDefault();
		preX=event.pageX;
		$(this).mousemove(function(event){
			event.preventDefault();               //避免触发默认行为，特别在微信端；
			var $count=$(this);
			var $index2=$count.index();
			curX=event.pageX;
			transferX +=curX-preX;            //用累加是因为css的样式会叠加！！
			for(var i=0;i<len;i++){
				$(arr[i]).css("left",(i-$index2)*w+transferX);
			}
			preX=curX;
		})
	})
	$(".lunbo li").mouseup(function(event){
		event.preventDefault();
		$(".lunbo li").unbind("mousemove");
		transferX=0;                         //止transferX在下一次触摸中继续累加，导致下一次滑动幅度越来越大；
		var $this=$(this),
			$index=$(this).index(),
			$left1=parseInt($(this).css("left")),
			$left=Math.abs(parseInt($(this).css("left")));
		if($left<80){                         //设置手指滑动的距离，当小于80px的时候位置不变；
			for(var i=0;i<len;i++){
				var curL=parseInt($(arr[i]).css("left"));
				$(arr[i]).animate({"left":curL-$left1},400);
			}
		}else if($left>80){                  //当滑动的距离大于80px的时候，切换；
			if($left1>0){                    //当手指向右滑动的时候；
				if($index!=0){              //判断是不是第一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index+1)*w},400);
					}
					$(".count li").eq($index-1).addClass("active").siblings().removeClass("active");
				}else{                         //如果是第一张，则保持不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":i*w},400);
					}
				}
			}else{                          //当手指向左滑动的时候；
				if($index!=(len-1)){        //判断是不是最后一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index-1)*w},400);
						$(".count li").eq($index+1).addClass("active").siblings().removeClass("active");
					}
				}else{                    //如果是最后一张，则保持位置不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index)*w},400);
					}
				}
			}
		}
		time=setInterval(autogo,2000);
	})
	//手指拖动
	function touchmove(event){
		event.preventDefault();               //避免触发默认行为，特别在微信端；
		if(event.targetTouches.length==1){    //避免多手机触摸情况
			var $count=$(this);
			var $index2=$count.index();
			var touch=event.targetTouches[0];
			curX=touch.pageX;
			transferX +=curX-preX;            //用累加是因为css的样式会叠加！！
			for(var i=0;i<len;i++){
				$(arr[i]).css("left",(i-$index2)*w+transferX);
			}
			preX=curX;
		}
	}
	function touchend(event){
		event.preventDefault();
		transferX=0;                         //为了防止transferX在下一次触摸中继续累加，导致下一次滑动幅度越来越大；
		var $this=$(this),
			$index=$(this).index(),
			$left1=parseInt($(this).css("left")),
			$left=Math.abs(parseInt($(this).css("left")));
		if($left<80){                         //设置手指滑动的距离，当小于80px的时候位置不变；
			for(var i=0;i<len;i++){
				var curL=parseInt($(arr[i]).css("left"));
				$(arr[i]).animate({"left":curL-$left1},400);
			}
		}else if($left>80){                  //当滑动的距离大于80px的时候，切换；
			if($left1>0){                    //当手指向右滑动的时候；
				if($index!=0){              //判断是不是第一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index+1)*w},400);
					}
					$(".count li").eq($index-1).addClass("active").siblings().removeClass("active");
				}else{                         //如果是第一张，则保持不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":i*w},400);
					}
				}
			}else{                          //当手指向左滑动的时候；
				if($index!=(len-1)){        //判断是不是最后一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index-1)*w},400);
						$(".count li").eq($index+1).addClass("active").siblings().removeClass("active");
					}
				}else{                    //如果是最后一张，则保持位置不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index)*w},400);
					}
				}
			}
		}
		time=setInterval(autogo,2000);
	}
	//自动轮播效果
	function autogo(){
		for(var i=0;i<len;i++){
			if(parseInt($(arr[i]).css("left"))==0){
				var this_index=i;
				break;
			}
		}
		if(this_index!=len-1){
			for(var i=0;i<len;i++) {
				$(".count li").eq(this_index+1).addClass("active").siblings().removeClass("active");
				$(arr[i]).animate({"left": (i - this_index - 1) * w}, 300);
			}
		}else{
			for(var i=0;i<len;i++){
				$(".count li").eq(0).addClass("active").siblings().removeClass("active");
				$(arr[i]).animate({"left":i*w},300);
			}
		}
	}
	var swiper = new Swiper('.swiper-container', {
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		slidesPerView: 3,
		spaceBetween: 0,
		loop: true
	});
	var li_h=$(".menu .middle")[0].offsetHeight;
	var menu_h=$(".menu")[0].offsetHeight;
	if(li_h>menu_h){
		$(".menu").css("height",li_h+"px");
	}
}


