import { Component, ViewChild, ElementRef } from "@angular/core";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { NewsServiceService } from "../news-service.service";
import { ModalController } from "@ionic/angular";
import { DetailsPage } from "../details/details.page";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
  providers: [NewsServiceService]
})
export class Tab1Page {
  dataLoaded: boolean = false;
  news: any = [];
  allNews: any = [];

  constructor(
    private socialSharing: SocialSharing,
    private newsService: NewsServiceService,
    public modalController: ModalController
  ) {
    this.getNews();
  }
  getNews(event?) {
    let imageUrl = "";
    this.newsService.getNews().subscribe(
      data => {
        if (data.status == 200) {
          this.allNews = [];
          this.news = [];
          this.allNews = data.body;
          this.news = data.body;
          // for (let val of data.body) {

          //   if (!val.image.url) {
          //     // localimage
          //   }
          //   let obj = {
          //     Title: val.title.replace("<b>", "").replace("</b>", ""),
          //     ImageUrl: imageUrl
          //   };
          //   this.news.push(obj);
          // }
          this.dataLoaded = true;
          if (event) {
            event.target.complete();
          }
        } else {
          this.dataLoaded = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // share()

  share(element) {
    let message = element.title + "\n" + element.url;
    
    this.socialSharing
      .share(message, "Subject")
      .then(data => {
        
      })
      .catch(err => {
        console.log(err);
      });
  }
  async detailsNav(element) {
    const modal = await this.modalController.create({
      component: DetailsPage,
      swipeToClose: true,
      animated: true,
      componentProps: {
        Data: element
      }
    });
    return await modal.present();
  }
  doRefresh(event) {
    this.dataLoaded = false;
    this.getNews(event);
  }

  formatDate(date) {
    return new Date(date).toDateString();
  }
}
