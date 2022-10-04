document.addEventListener("click", eventDocClick, false);

AOS.init();

var rellax = new Rellax('.rellax', {
	center: true,
	zIndex:-1
});

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