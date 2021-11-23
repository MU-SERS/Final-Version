import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    if (!document.head.getElementsByClassName('googlemaps').length) {
      // Create the script tag, set the appropriate attributes
      var script = document.createElement('script');
      script.classList.add('googlemaps');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCdLeN6x1QoN5lhLuzDu3AUziUVJFpqKe0&libraries=places&callback=initMap';
      script.async = true;
  
      // Attach your callback function to the `window` object
      (<any>window).initMap = () => {
        this.setupMap();
      };
  
      // Append the 'script' element to 'head'
      document.head.appendChild(script);
    } else {
      this.setupMap();
    }

  }

  setupMap = () => {
    let location;
    if (this.activatedRoute.snapshot.params['location']) {
      location = decodeURIComponent(this.activatedRoute.snapshot.params['location']);
    }
    let lat = 38.9404;
    let long = -92.3277;

    if (location) {
      let latlong = location.split(',');
      lat = +latlong[0];
      long = +latlong[1];
    }

    let google = (<any>window).google;
    const myLatLng = { lat: lat, lng: long };

    const map = new google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      zoom: 15,
      mapTypeId: "roadmap",
    });

    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Incident Location",
    });

    console.log(location);

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers: any[] = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place: any) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}