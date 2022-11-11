document.addEventListener('DOMContentLoaded', DomLoaded, false);
window.addEventListener("load", eventWindowLoad, false);
document.addEventListener("click", eventDocClick, false);
window.addEventListener("resize", function () { fnDelay(function () { eventWindowResize() }, 300) }, false);

gsap.registerPlugin(ScrollTrigger);


/* === big tablet & desktop === */
if(window.innerWidth >= 992) {

	if(document.querySelector(".headerPage-mainPage__animImgs")) {
		let scaleVal = 0.8,
			xVal = -250,
			yVal = 150;

		if(document.documentElement.getAttribute('lang') == 'ar') {
			xVal = 250;
		}


		if(window.innerWidth >= 1200) {
			scaleVal = 0.95;
		}

		let triggerNameStr2 = ".headerPage-mainPage__animImgs",
			headerPageImgCol = document.querySelector(".headerPage__imgCol");
			animImgsHeader = document.querySelectorAll(triggerNameStr2 + " img");
		gsap.to(triggerNameStr2, {
				duration:0.7, 
				scaleX:scaleVal, scaleY:scaleVal, rotationX:0, rotationY:0, rotationZ:0, x:xVal, y:yVal, z:0, skewX:0, skewY:0,
				scrollTrigger: {
					trigger: triggerNameStr2,
					toggleActions: "play none none reverse",
					toggleClass: "active",
					start: "top 70px",
					end: "bottom top",
					id: "anim2",
					onEnter: () => {
						gsap.to(animImgsHeader, {scaleX:1.055, scaleY:1.08, stagger: 0.06, duration:0.6, ease:"circ.out"}, "<+=.6");
						gsap.to(headerPageImgCol, {perspective: 900, perspectiveOrigin:"0% 0%", duration:0.6, ease:"circ.out"});
					},
					onLeaveBack: () => {
						gsap.to(animImgsHeader, {scale:1, stagger: 0.06, duration:0.6, ease:"circ.out"}, "<+=.6");
						gsap.to(headerPageImgCol, {perspective: 580, perspectiveOrigin:"-128% 121%", duration:0.6, ease:"circ.out"});
					}
				}
			}
		);
	}
	
}
//=============================================//
///////////////// pined pics ////////////////////
//=============================================//
(function() {

	if(!document.querySelector(".sectionOnMain-pros")) return;

	const ST1 = ScrollTrigger.create({
	  trigger: ".sectionOnMain-pros",
	  start: "top top",
	  end: "bottom bottom",
	  onUpdate: getCurrentSection,
	  pin: ".asidePics",
	});

	const contentMarkers = gsap.utils.toArray(".asideText-oneCont");

	contentMarkers.forEach(marker => {
	  marker.content = document.querySelector(`#${marker.dataset.markerContent}`);
	  
	  if(marker.content.tagName === "IMG") {
	    gsap.set(marker.content, {transformOrigin: "center"});
	    
	    marker.content.enter = function() {
			gsap.fromTo(marker.content, {autoAlpha: 0, rotateY: 0}, {duration: 0, autoAlpha: 1, rotateY: 0});
	    }
	  } 
	  
	  marker.content.leave = function() {
	    gsap.to(marker.content, {duration: 0, autoAlpha: 0});
	  }
	  
	});

	let lastContent;
	function getCurrentSection() {
	  let newContent;
	  const currScroll = scrollY;
	  
	  contentMarkers.forEach(marker => {
	    if(currScroll > (marker.offsetTop - (marker.content.offsetHeight / 2))) {
	      newContent = marker.content;
	    }
	  });
	  
	  if(newContent && 
	  	(lastContent == null || !newContent.isSameNode(lastContent))) {
	    if(lastContent) {
	      lastContent.leave();
	    }
	    
	    newContent.enter();
	    
	    lastContent = newContent;
	  }
	}

	const media = window.matchMedia("screen and (max-width: 992px)");
	ScrollTrigger.addEventListener("refreshInit", checkSTState);
	checkSTState();

	function checkSTState() {
	  if(media.matches) {
	    ST1.disable();
	  } else {
	    ST1.enable();
	  }
	}
})();

//=============================================//
///////////////// pined btns ////////////////////
//=============================================//
(function() {

	if(!document.querySelector(".sectionOnMain-btnsRainbow")) return;

	const ST = ScrollTrigger.create({
	  trigger: ".sectionOnMain-btnsRainbow",
	  start: "top top",
	  end: "bottom bottom",
	  pin: ".btnsRainbow-btnsCol-inner",
	  onUpdate: getCurrentSection
	});

	const contentMarkers = gsap.utils.toArray(".btnsRainbow-title");

	contentMarkers.forEach(marker => {
		marker.content = document.querySelector(`#${marker.dataset.markerContent}`);


		const currScroll = scrollY;
		if(marker.content.tagName === "SPAN") {

			marker.content.enter = function() {
				document.querySelector(".btnsRainbow-btnsCol-inner").classList.remove("buttonsDisabledHover");
				marker.content.classList.add("active");
				document.querySelectorAll("." + marker.content.id).forEach(btn => {
					btn.classList.add("active");
					btn.classList.remove("disabled");
				});
			}
		} 

		marker.content.leave = function() {
			marker.content.classList.remove("active");
			document.querySelectorAll("." + marker.content.id).forEach(btn => {
				btn.classList.remove("active");
				btn.classList.add("disabled");
			});
		}

	});

	let lastContent;;
	function getCurrentSection() {
		let newContent, shiftVertical;

		const currScroll = scrollY;

		contentMarkers.forEach(marker => {
			shiftVertical = 0;
			if(marker.getAttribute('data-marker-content') == "btns-1") {
				// shiftVertical = window.innerHeight / 3;
			}
			else if(marker.getAttribute('data-marker-content') == "btns-3") {
				shiftVertical = -130;
			}
			if(currScroll > (marker.offsetTop + shiftVertical)) {
				newContent = marker.content;
			}
		});

		if(newContent && 
			(lastContent == null || !newContent.isSameNode(lastContent))) {

			if(lastContent) {
				lastContent.leave();
			}

			newContent.enter();

			lastContent = newContent;
		}
	}

	const media = window.matchMedia("screen and (max-width: 992px)");
	ScrollTrigger.addEventListener("refreshInit", checkSTState);
	checkSTState();

	function checkSTState() {
		if(media.matches) {
			ST.disable();
		} else {
			ST.enable();
		}
	}
})();

//=============================================//
///////////////// pined btns end ////////////////
//=============================================//
var fnDelay = function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
}();
function eventWindowResize() {
	initSlick.check();
	if(window.innerWidth >= 992) {
		let tabsPane = document.querySelectorAll(".tab-pane[data-id]");
		if(tabsPane.length) {
			tabsPane.forEach((pane) => {
				pane.setAttribute("id", pane.getAttribute("data-id"));
				pane.removeAttribute("data-id");
			});
		}
	}
}
function eventWindowLoad() {
	initSlick.check();
}
function eventDocClick(e) {
    var targ = e.target;
    var clickedEl = e.target;

    while (targ && targ != this) {
    	if (targ.classList.contains("jp-play")) {    		
    		initAudioPlayer(targ.getAttribute("data-numplayer"));
    		break;
    	}
    	if(targ.classList.contains("tab-nav") && targ.getAttribute("role") == "tablist" && clickedEl.classList.contains("tab-btn")) {
    		initSlick.setActiveSlideFromTab(targ, clickedEl);
    	}
        targ = targ.parentNode;
    }
}
function DomLoaded() {
	bgPage.init();

	if(document.querySelector(".btnsRainbow-btnsCol-inner")) {
		document.querySelector(".btnsRainbow-btnsCol-inner").classList.add("buttonsDisabledHover");
	}

	/*if(document.querySelector(".select2-wrap")) {		
	    var list = $('.callNotification').select2({
	    	placeholder: "Event type",
	    	closeOnSelect: false,
	    	allowClear: true,
	    	width: '100%'
	    })
	}	*/
}

function initAudioPlayer(numPlayer) {
	let idPlayer = "jquery_jplayer_" + numPlayer;
	if(document.getElementById(idPlayer)) {

		$("#"+idPlayer).jPlayer({
			play: function() {
		        $(".jquery_jplayer").not(this).jPlayer("pause");
		    },
			ready: function () {
				$(this).jPlayer("setMedia", {
					title: this.getAttribute('data-title'),
					mp3: this.getAttribute('data-src')
				}).jPlayer("play");
			},
			cssSelectorAncestor: '#jp_container_' + numPlayer,
			swfPath: "js",
			supplied: "mp3",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		});
	}
}

var videoYT = {
	_idVideo: undefined,
	init: function(sender, idVideo) {
		document.getElementById("video").innerHTML = "<div id='player' data-idvideo='" + idVideo + "'></div>";

		this._setVideoId(idVideo);

	    var tag = document.createElement('script');
	    tag.src = "https://www.youtube.com/iframe_api";
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	    sender.style.display = "none";
	},
	onPlayerReady: function(e) {
		// e.target.playVideo();
	},
	_setVideoId: function(id) {
		this._idVideo = id;
	},
	getVideoId: function() {
		return this._idVideo;
	}	
} 							
function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoYT.getVideoId(),
        playerVars: { 'rel': 0, 'showinfo':0, 'controls': 1, 'fs':0 , 'autoplay':1, '	origin':'https%3A%2F%2Fcallgear.ae'},
        /*events: {
            'onReady': window.videoYT.onPlayerReady
        }*/
    });
}

var bgPage = {
	bgs: [
		[2,"bg-blue"],
		[3,"bg-coral"],
		[4,"bg-red"],
		[5,"bg-blue"],
		[6,"bg-coral"],
		[7,"bg-red"],
		[9,"bg-coral"],
		[10,"bg-red"],
		[11,"bg-blue"],
		[12,"bg-coral"],
		[13,"bg-red"],
		[14,"bg-blue"],
		[15,"bg-coral"],
		[18,"bg-coral"],
		[19,"bg-red"],
		[20,"bg-blue"],
		[21,"bg-coral"],
		[22,"bg-red"],
		[23,"bg-blue"],
		[24,"bg-coral"],
		[25,"bg-red"],
		[26,"bg-blue"],
		[27,"bg-coral"],
		[28,"bg-red"],
		[30,"bg-coral"],
		[31,"bg-red"],
		[32,"bg-blue"],
		[33,"bg-coral"],
		[34,"bg-red"],
		[35,"bg-blue"],
		[38,"bg-blue"],
		[39,"bg-coral"],
		[40,"bg-red"],
		[41,"bg-blue"],
		[42,"bg-coral"],
		[43,"bg-red"],
		[44,"bg-blue"],
		[45,"bg-coral"]
	],
	bodyEl: undefined,
	init: function() {
		this.bodyEl = document.body.querySelector(".body-inner");
		this.getNumPage();
	},
	getNumPage: function() {
		var imgCol, imgHeader, numPage = -1;
		if(imgCol = document.querySelector(".headerPage__imgCol")) {

			this.checkDocH();

			if(imgHeader = imgCol.getElementsByTagName("img")[0]) {
				numPage = imgHeader.src.split("_")[1].split(".")[0];

				if(!isNaN(parseInt(numPage,10))) {
					var numIndex = this.isValInArr(numPage, this.bgs);

					if(numIndex != -1) {
						this.setBgPage(numIndex);
					}
				}
			}
		}
	},
	checkDocH: function() {
	var bodyElH = 4600;
	var _body = this.bodyEl;

		if(_body.clientHeight >= bodyElH) {
			_body.classList.add("bg-long");
		}
	},
	isValInArr: function (val, arr) {
	    var inArray = -1;
	    for (var x = 0, y = arr.length; x < y; x++) {
	        if (val == arr[x][0]) {
	            inArray = x.toString();
	        }
	    }
	    return inArray;
	},
	setBgPage: function(i) {
		this.bodyEl.classList.add(this.bgs[i][1]);
	}

}

var loadJS = function(url, callback, locToInsert){
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = callback;
    scriptTag.onreadystatechange = callback;

    locToInsert.appendChild(scriptTag);
};
var initSlickFirstLoadFlag = true;
var initSlick = {
	check: function() {

		if(window.innerWidth <= 991) {

			var isTabsGallery = document.getElementsByClassName("tabsSlider")[0] ? 1 : 0;

			if (
					isTabsGallery
				) 
			{
				if (typeof $.fn.slick == "undefined") {
		        	loadJS("js/slick1.8.1.min.js", initSlick.startGallery, document.body);
		        }
		        else {
		        	this.startGallery();		        	
		        }
			}		
		}
	},
	_setBackup: function() {
		console.log("_setBackup")
		let slicks = document.querySelectorAll(".tabsSlider .tab-content");
		let tabNavs = document.querySelectorAll(".tab-nav");
		slicks.forEach((slick) => {
			let tabPanes = slick.querySelectorAll(".tab-pane");
			tabPanes.forEach((pane) => {
				pane.setAttribute("data-id", pane.id);
			});
		});

		tabNavs.forEach((nav) => {
			let tabs = nav.querySelectorAll(".tab-btn");
			tabs.forEach((tab, i) => {
				if(!i) {
					tab.classList.add("active");
					tab.setAttribute("aria-selected", "true");
				}
				else {
					tab.classList.remove("active");
					tab.setAttribute("aria-selected", "false");
				}
			})
		});
	},
	_setPositionActiveTab: function(tabList, activeTab) {
		// обрез слева
		if(activeTab.offsetLeft < tabList.scrollLeft) {
			gsap.to(tabList, {
				scrollLeft: () => {return ("-=" + parseInt(Math.round(tabList.scrollLeft - activeTab.offsetLeft), 10))}
 			});
		}
		// обрез справа
		if(activeTab.offsetLeft + activeTab.offsetWidth > tabList.clientWidth + tabList.scrollLeft) {
			gsap.to(tabList, {
				scrollLeft: () => {return ("+=" + parseInt(Math.round((activeTab.offsetLeft + activeTab.offsetWidth) - (tabList.clientWidth + tabList.scrollLeft)), 10))}
 			});			
		}
		this._setClassForTabPane(tabList);
	},
	_setClassForTabPane: function(tabList) {
		let tabsPaneContainer;
		let id = tabList.querySelector(".tab-btn").getAttribute("data-bs-target").slice(1);
		let firtTabPane = document.querySelector("[data-id='" + id + "']");
		if(firtTabPane) {
			tabsPaneContainer = firtTabPane.parentNode;
			let activeTabPane = tabsPaneContainer.querySelector(".tab-pane.active");
			activeTabPane.classList.remove("show");
			activeTabPane.classList.remove("active");
			tabsPaneContainer.querySelector(".slick-active").className += " show active";
		}
	},
	startGallery: function() {
		if(initSlickFirstLoadFlag) {
			initSlick._setBackup();
			initSlickFirstLoadFlag = false;			
		}

		$(".tabsSlider .tab-content").on("afterChange", function(event, slick, numSlide) {
			console.log(event);
			console.log(slick);
			_setActiveTab(slick.$slides[numSlide], numSlide);
		});
		$(".tabsSlider .tab-content").slick(initSlick.slickParams_1);

		function _setActiveTab( activeSlide, numSlideActive) {
				console.log(activeSlide);
				console.log(numSlideActive);
				if(activeSlide) {
						console.log("activeSlide.dataset.id = ", activeSlide.dataset.id);
						let tabList = document.querySelector("[data-bs-target='#" + activeSlide.dataset.id + "']").parentNode;

						let oldActiveTab = tabList.querySelector(".active");
						oldActiveTab.classList.remove("active");
						oldActiveTab.setAttribute("aria-selected", "false");

						let newActiveTab = tabList.getElementsByClassName("btn")[numSlideActive];
						newActiveTab.classList.add("active");
						newActiveTab.setAttribute("aria-selected", "true");
						window.initSlick._setPositionActiveTab(tabList, tabList.getElementsByClassName("btn")[numSlideActive]);
					}
			/*for(let i = sliders.length-1; i >= 0; i--) {
				(function(sliders, i) {
					if(sliders[i].classList.contains("slick-active")) {
						let tabList = document.querySelector("[data-bs-target='#" + sliders[i].dataset.id + "']").parentNode;

						let oldActiveTab = tabList.querySelector(".active");
						oldActiveTab.classList.remove("active");
						oldActiveTab.setAttribute("aria-selected", "false");

						let newActiveTab = tabList.getElementsByClassName("btn")[numSlideActive];
						newActiveTab.classList.add("active");
						newActiveTab.setAttribute("aria-selected", "true");
						window.initSlick._setPositionActiveTab(tabList, tabList.getElementsByClassName("btn")[numSlideActive]);
					}
				})(sliders, i)
			}*/
		}
	},	
	setActiveSlideFromTab: function(tabList, activeTab) {
		let idSlideToFind = activeTab.dataset.bsTarget.slice(1);

		if(!document.querySelector("[data-id='" + idSlideToFind + "']")) return;

		let ariaControlSlide = document.querySelector("[data-id='" + idSlideToFind + "']").id;
		let activeSlickDot = document.querySelector("[aria-controls='" + ariaControlSlide + "']");

		if(!activeSlickDot) return;

		this._setPositionActiveTab(tabList, activeTab);

		let _$slider = activeSlickDot.parentNode.parentNode.parentNode;
		let activeTabNum;
		tabList.querySelectorAll(".tab-btn").forEach((tab, i) => {
			if(tab.classList.contains("active")) {
				activeTabNum = i;
			}
		});
		if(_$slider.classList.contains("slick-slider")) {
			// $(_$slider).slick("slickGoTo", activeTabNum);
		}
	},
	slickParams_1: {
	    dots: true,
	    infinite: false,
	    speed: 500,
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    slide: 'div',
	    arrows: false,
	    autoplay: false,
	    mobileFirst: true,
	    variableWidth: false,
	    adaptiveHeight: true,
	    rtl: document.documentElement.getAttribute("lang") == "ar" ? true : false,
	    responsive: [
	    	{
	            breakpoint: 992,
	            settings: "unslick"
	        },
	        {
	            breakpoint: 300,
	            settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1
	            }
	        }
	    ]
	},	
};