// var map;
//   function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//     	// 25.721316, 90.194303
//       center: {lat: 25.721316, lng: 90.194303},
//       zoom: 8
//     });
//   }

var villages = {

	dadenggre: {
		center: {lat: 25.721316, lng: 90.194303},
		rainfall: 1.5
	},
	rongram: {
		center: {lat: 25.593040, lng: 90.263311},
		rainfall: 2.0
	},
	hatsingimari: {
		center: {lat: 25.711882, lng: 89.898015},
		rainfall: 1.2
	},
	jongchipara: {
		center: {lat: 25.875096, lng: 90.318242},
		rainfall: 0.9
	},
	tikrikilla: {
		center: {lat: 25.917099, lng: 90.149328},
		rainfall: 1.8
	},
	mankachar: {
		center: {lat: 25.538532, lng: 89.858190},
		rainfall: 1.7
	},
	dingok: {
		center: {lat: 25.873860, lng: 90.483037},
		rainfall: 2.5
	}

  // chicago: {
  //   center: {lat: 41.878, lng: -87.629},
  //   population: 2714856
  // },
  // newyork: {
  //   center: {lat: 40.714, lng: -74.005},
  //   population: 8405837
  // },
  // losangeles: {
  //   center: {lat: 34.052, lng: -118.243},
  //   population: 3857799
  // },
  // vancouver: {
  //   center: {lat: 49.25, lng: -123.1},
  //   population: 603502
  // }
};

function circleColor(rainfall) {
	if (rainfall >= 2.5) {
		return 'red'
	} else if (rainfall >= 2.0 && rainfall < 2.5) {
		return 'orange'
	} else if (rainfall >= 1.5 && rainfall < 2.0) {
		return 'yellow'
	} else {
		return 'green'
	}
}

function circleSize(rainfall) {
	return Math.pow(10,3)*5
}

function initMap() {
  // Create the map.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 25.721316, lng: 90.194303},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.
  for (var village in villages) {
    // Add the circle for this city to the map.
    var villageCircle = new google.maps.Circle({
      strokeColor: circleColor(villages[village].rainfall),
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: circleColor(villages[village].rainfall),
      fillOpacity: 0.35,
      map: map,
      center: villages[village].center,
      radius: circleSize(villages[village].rainfall)
      // raidius: 
      // radius: Math.sqrt(villages[village]*1000000) * 100
    });
		// var marker = new google.maps.Marker({
	 //    position: villages[village].center,
	 //    map: map,
	 //    title: 'Hello World!'
	 //  });
  }
}