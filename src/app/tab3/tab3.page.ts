import { Component } from "@angular/core";
import { FAQService } from '../services/faq-service'
import { Platform } from '@ionic/angular';

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
  providers:[FAQService]
})
export class Tab3Page {
 info:any = []
 dataLoaded:boolean = false 
 constructor(public faqService: FAQService, public platform: Platform) {}

  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      // setTimeout(()=>{
        this.getFaq()
      // },2000000)
      
    })
  }

  getFaq(){
    this.faqService.getFaq().subscribe(data=>{
      this.dataLoaded = true
      if(data){
        
        
        this.info = data
        
      }else{
        // show err
      }
    },err=>{
      this.dataLoaded = true
      console.log(err)
    })
  }
}
