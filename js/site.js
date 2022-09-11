document.addEventListener("click", eventDocClick, false);

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
