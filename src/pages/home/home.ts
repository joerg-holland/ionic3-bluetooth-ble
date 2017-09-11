import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public devices: any[] = [];
  public statusMessage: string;

  constructor(
    private _ble: BLE,
    private _ngZone: NgZone,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
  ) {}

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  public scan(): void {
    this._setStatus('Scanning for Bluetooth LE Devices.');

    // Clear list:
    this.devices = [];

    this._ble.scan([], 5).subscribe(
      device => this._onDeviceDiscovered(device),
      error => this._scanError(error)
    );

    setTimeout(this._setStatus.bind(this), 5000, 'Scan complete.');
  }

  private _onDeviceDiscovered(device): void {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this._ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here:
  private _scanError(error): void {
    this._setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  private _setStatus(message): void {
    console.log(message);

    this._ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  public deviceSelected(device): void {
    console.log(JSON.stringify(device) + ' selected');

    this.navCtrl.push(DetailsPage, {
      device: device
    });
  }
}
