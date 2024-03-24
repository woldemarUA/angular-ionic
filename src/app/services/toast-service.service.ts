import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ToastPosition = 'top' | 'middle' | 'bottom';
type ToastColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'medium'
  | 'light';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(
    message: string,
    color: ToastColors = 'primary',
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
