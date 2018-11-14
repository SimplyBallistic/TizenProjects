/*(function(){
		
})();*/

var ptv = {
    accessPtv:
        function (uri, onSucess) {
	let auth={id: 3000927, key: 'd43e73b1-15b5-4a83-87d5-22b1ba13524e'};
	let base='http://timetableapi.ptv.vic.gov.au';
	
	let uriWithId=uri;
	if(uri.includes('?')){
		uriWithId+='&';
	}else uriWithId+='?';
	
	uriWithId+='devid='+auth.id;
	
	let signature;
	
	//start hashing
	let shaObj = new jsSHA("SHA-1", "TEXT");
	shaObj.setHMACKey(auth.key, "TEXT");
	shaObj.update(uriWithId);
	signature = shaObj.getHMAC("HEX");
	//end hashing
	
	let finalUrl=base+uriWithId+'&signature='+signature.toUpperCase();
	console.log(finalUrl);
	
	  $.ajax({
          type: "GET",
          url: finalUrl, // Server URL
          success: function (data) {
                console.log(JSON.stringify(data)); // Server data in String format
                console.log(data); // Server data in JSON format
                onSucess(data);
           }
     });


        },
    populateNearby:
        function ({latitude, longitude}) {
            this.accessPtv('/v3/stops/location/${latitude},${longitude}?max_results=10', () => {


            });

        }

};