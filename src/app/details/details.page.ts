import { NavParams, ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  data: any;
  imageUrl: string = "";
  constructor(
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    public modalCtrl: ModalController
  ) {
    this.data = navParams.get("Data");
    this.data.title = this.data.title.replace("<b>", "").replace("</b>", "");
  }

  ngOnInit() {}

  share() {
    let message = this.data.title +"\n" +this.data.url
    
    this.socialSharing
      .share(message, "Covid-19")
      .then(data => {
        
      })
      .catch(err => {
        
      });
  }
  dismissModal(){
    this.modalCtrl.dismiss()
  }
}
