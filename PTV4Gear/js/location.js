var coords; //global coords var. Should have coords of user if found
var running = false;
document.addEventListener("pageshow", function () {
    if (running) {
        return;
    } else running = true;//Stops program from starting again when page is refreshed

    let list = $('#nearbyList');
    let loop = function loop() {

        $('#refreshNearby').remove();//remove refresh button if there
        listEdit.edit('nearbyList', () => {
        	$("#nearbyList>li:nth-child(1)").after('<li class=\"ui-li-grid\"> <a href=\"index-old.html\"><div class=\"ui-marquee\">Locating</div></a> <div class=\"ui-processing\"></div></li>'
            );


        });//processing animation

        let sucessful = (pos) => {//start trying to locate
            coords = pos.coords;//store if sucessfull for PTV api

            $('#main').append('<footer class=\"ui-footer ui-bottom-button ui-fixed\">\
					<button class=\"ui-btn\" id=\"refreshNearby\">Refresh</button>\
					</footer>');
            document.getElementById('refreshNearby').onclick = () => {
            	NEARBY_DATA=[];
                loop();

            };//add refresh button
            ptv.populateNearby(coords);//ask ptv to populate nearbyList with global coords


        };
        navigator.geolocation.getCurrentPosition(sucessful, () => {

            listEdit.edit('nearbyList', () =>//add fail message
                 list.append('<li class=\"li-has-multiline\">No Location<span class=\"ui-li-sub-text li-text-sub\">Retrying in 5 seconds...</span></li>'
                         ));



             setTimeout(loop,5000);
            /*coords = {coords: {latitude: -37.883168, longitude: 144.700788}};//test coords in hoppers crossing with bus and train
            sucessful(coords); *///Testing Only
        }, {timeout: 10000});

    };
    loop();


});
