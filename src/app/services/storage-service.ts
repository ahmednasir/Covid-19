import { Injectable } from "@angular/core";
import { ToastController } from '@ionic/angular';

@Injectable()

export class StorageService {
  toast:any;
  constructor(public toastController: ToastController) {}

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position:"top"
    });
    toast.present();
  }
  
  
}
