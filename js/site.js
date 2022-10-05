document.addEventListener("click", eventDocClick, false);

gsap.registerPlugin(ScrollTrigger);

//=============================================//
///////////////// pined pics ////////////////////
//=============================================//
(function() {

const ST1 = ScrollTrigger.create({
  trigger: ".sectionOnMain-pros",
  start: "top top",
  end: "bottom bottom",
  onUpdate: getCurrentSection,
  pin: ".asidePics"
});

const contentMarkers = gsap.utils.toArray(".asideText-title");

contentMarkers.forEach(marker => {
  marker.content = document.querySelector(`#${marker.dataset.markerContent}`);
  
  if(marker.content.tagName === "IMG") {
    gsap.set(marker.content, {transformOrigin: "center"});
    
    marker.content.enter = function() {
      gsap.fromTo(marker.content, {autoAlpha: 0, rotateY: -30}, {duration: 0.3, autoAlpha: 1, rotateY: 0});
    }
  } 
  
  marker.content.leave = function() {
    gsap.to(marker.content, {duration: 0.1, autoAlpha: 0});
  }
  
});

let lastContent;
function getCurrentSection() {
  let newContent;
  const currScroll = scrollY;
  
  contentMarkers.forEach(marker => {
    if(currScroll > marker.offsetTop) {
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

const ST = ScrollTrigger.create({
  trigger: ".sectionOnMain-btnsRainbow",
  start: "top top",
  end: "bottom bottom",
  onUpdate: getCurrentSection,
  pin: ".btnsRainbow-btnsCol-inner"
});

const contentMarkers = gsap.utils.toArray(".btnsRainbow-title");

contentMarkers.forEach(marker => {
  marker.content = document.querySelector(`#${marker.dataset.markerContent}`);
  
  if(marker.content.tagName === "SPAN") {
    
    marker.content.enter = function() {
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

let lastContent;
function getCurrentSection() {
  let newContent;
  const currScroll = scrollY;
  
  contentMarkers.forEach(marker => {
    if(currScroll > marker.offsetTop) {
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

AOS.init();

function eventDocClick(e) {
    var targ = e.target;
    var clickedEl = e.target;

    while (targ && targ != this) {
    	if (targ.classList.contains("jp-play")) {    		
    		initAudioPlayer(targ.getAttribute("data-numplayer"));
    		break;
    	}
        targ = targ.parentNode;
    }
}

$(document).ready(function() {

	bgPage.init();

	if(document.querySelector(".select2-wrap")) {		
	    var list = $('.callNotification').select2({
	    	placeholder: "Event type",
	    	closeOnSelect: false,
	    	allowClear: true,
	    	width: '100%'
	    })
	 //    .on("select2:closing", function(e) {
		//     e.preventDefault();
		// }).on("select2:closed", function(e) {
		//     list.select2("open");
		// });
		list.select2("open");
	}
});

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