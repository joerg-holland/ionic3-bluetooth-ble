# Tutorial
Ionic-Bluetooth-BLE Template

Last Update: 09. September 2017

## How to create this template?

1. Open the folder where the project should be created and run the command below. 
If you are in folder 'c:\projects\' the folder 'c:\projects\ionic-bluetooth-ble' will be created with all necessary files of the ionic project.
  ```bash
  $ ionic start ionic-bluetooth-ble blank
  ```
2. Open the folder, which you created the step before and run the command below.
If everything was installed successfully a web browser will be open and show you the Ionic blank page of the project.
  ```bash
  $ ionic serve
  ```
3. Install the Ionic Native plugin 'ble' to the file '/package.json':
  ```bash
  $ npm install @ionic-native/ble@3.12.1
  ```
4. Add the Cordova plugin 'cordova-plugin-ble-central' to the file '/config.xml':
  ```bash
  $ ionic cordova plugin add cordova-plugin-ble-central@1.1.4
  ```
5. Add the plugin 'bluetooth-serial' to the app's module /src/app/app.module.ts':
  ```ts
  import { BLE } from '@ionic-native/ble';
  providers: [ ... BLE ... ]
  ```
6. Add the following code to the component '/src/pages/home/home.ts'
  ```ts
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
  ```
7. Add the following code to the page '/src/pages/home/home.html'
  ```html
  <ion-header>
    <ion-navbar>
      <ion-title>BLE Connect</ion-title>
      <ion-buttons end>
        <button ion-button (click)="scan()">Scan</button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>
  <ion-content>
    <ion-list>
      <button ion-item *ngFor="let device of devices" (click)="deviceSelected(device)">
        <h2>{{ device.name || 'Unnamed' }}</h2>
        <p>{{ device.id }}</p>
        <p>RSSI: {{ device.rssi }}</p>
      </button>
    </ion-list>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <p>{{ statusMessage }}</p>
    </ion-toolbar>
  </ion-footer>
  ```
8. Create the following files in the folder '/src/pages/details/':
  ```bash
  /src/pages/details/details.ts
  /src/pages/details/details.html
  ```
9. Add the following code to the component '/src/pages/details/details.ts'
  ```ts
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
  ```
10. Add the following code to the page '/src/pages/details/details.html'
  ```html
  <ion-header>
    <ion-navbar>
      <ion-title>{{ peripheral.name || 'Device' }}</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content class="padding">
    <ion-card>
      <ion-card-header>{{ peripheral.name || 'Unnamed' }}</ion-card-header>
      <ion-card-content>{{ peripheral.id }}</ion-card-content>
    </ion-card>
    <ion-card>
      <ion-card-header>Services</ion-card-header>
      <ion-list>
        <ion-item *ngFor="let service of peripheral.services">
          {{service}}
        </ion-item>
      </ion-list>
    </ion-card>
    <ion-card>
      <ion-card-header>
        Details
      </ion-card-header>
      <ion-card-content>
        <pre>{{peripheral | json }}</pre>
      </ion-card-content>
    </ion-card>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <p>{{ statusMessage }}</p>
    </ion-toolbar>
  </ion-footer>
  ```
11. Add the page 'DetailsPage' to the app's module /src/app/app.module.ts':
  ```ts
  import { DetailsPage } from '../pages/details/details';
  declarations: [ ... DetailsPage ... ]
  entryComponents: [ ... DetailsPage ... ]
  ```
12. Build the project:
  ```bash
  $ npm run build
  ```
