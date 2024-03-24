import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ToastPosition = 'top' | 'middle' | 'bottom';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    color: string,
    duration: number,
    position: ToastPosition = 'bottom',
    dismiss: boolean = false
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color,
    });

    toast.present();
    if (dismiss) await toast.onDidDismiss();
  }
}
