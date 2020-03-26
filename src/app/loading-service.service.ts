import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {
  loading:any;
  constructor(public loadingController: LoadingController) { }

  async presentLoading() {
     this.loading = await this.loadingController.create({
      message: 'Loading data..',
    });
    await this.loading.present();
    

    // const { role, data } = await loading.onDidDismiss();
    
  }
  async dismissLoading(){
   
  }
}
