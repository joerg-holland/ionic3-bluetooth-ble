import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public peripheral: any = {};
  public statusMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ble: BLE,
    private toastCtrl: ToastController,
    private ngZone: NgZone
  ) {
    let device = navParams.get('device');

    this._setStatus('Connecting to ' + device.name || device.id);

    this.ble.connect(device.id).subscribe(
      peripheral => this._onConnected(peripheral),
      peripheral => this._onDeviceDisconnected(peripheral)
    );

  }

  private _onConnected(peripheral): void {
    this.ngZone.run(() => {
      this._setStatus('');
      this.peripheral = peripheral;
    });
  }

  private _onDeviceDisconnected(peripheral): void {
    let toast = this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');

    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }

  private _setStatus(message): void {
    console.log(message);

    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }
}
