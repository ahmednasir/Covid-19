import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { MapStyleService } from "../services/map-style.service";
import { LocationService } from "../services/location-service";
import { ToastService } from "../services/toast-service";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult
} from "@ionic-native/native-geocoder/ngx";
import { LoadingServiceService } from "../loading-service.service";

declare var google: any;
@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
  providers: [
    MapStyleService,
    LocationService,
    ToastService,
    LoadingServiceService
  ]
})
export class Tab2Page {
  dataFound: boolean = true;
  dataClicked: boolean = false;
  map: any;
  dataLoaded: boolean = false;
  display: string = "none";
  constructor(
    public platform: Platform,
    public toastService: ToastService,
    public locationService: LocationService,
    public mapStyleService: MapStyleService,
    private nativeGeocoder: NativeGeocoder,
    public loadingService: LoadingServiceService
  ) {}
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.locationService.getLocations().subscribe(
        data => {
          this.dataFound = true;
          this.loadMap(data);
        },
        () => {
          this.dataLoaded = true;
          this.dataFound = false;
          this.toastService.presentToast(
            "Data not available. Please try again later"
          );
        }
      );
    });
  }
  loadMap(locations) {
    // navigator.geolocation.getCurrentPosition(p => {
    this.map = new google.maps.Map(document.getElementById("map_canvas"), {
      zoom: 2,
      center: new google.maps.LatLng({
        lat: 12.9352,
        lng: 77.6245
      }),
      // { lat: this.geoLoc.lat, lng: this.geoLoc.lng },
      mapTypeId: "roadmap",
      styles: this.mapStyleService.getStyle(),
      tilt: 75
    });

    for (var country in locations) {
      let totalCases = locations[country].TotalCases * 10;
      if (locations[country].TotalCases * 10 < 10000) {
        // if (locations[country] == "India") {
        //   console.log(locations[country].TotalCases)
        //   totalCases *= 500;
        // } else {
          totalCases *= 50;
        // }
      }

      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.3,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: this.map,
        center: {
          lat: parseFloat(locations[country].Coordinates.lat),
          lng: parseFloat(locations[country].Coordinates.lng)
        },
        radius: totalCases
      });
      this.dataLoaded = true;
      google.maps.event.addListener(cityCircle, "click", ev => {
        this.dataClicked = true;
        this.display = "block";
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder
          .reverseGeocode(ev.latLng.lat(), ev.latLng.lng(), options)
          .then((result: NativeGeocoderResult[]) => {
            let res = result[0];
            

            let markerdata = locations[res.countryName];
            
            document.getElementById("country").textContent = res.countryName;
            document.getElementById("total-cases-text").textContent =
              markerdata.TotalCases;
            document.getElementById("new-cases-text").textContent =
              markerdata.NewCases;
            document.getElementById("last-updated").textContent =
              "Last Updated: " + new Date().toDateString();
          })
          .catch((error: any) => {});
      });
    }
    // });
  }
}
