## How to build a Ionic-Bluetooth-BLE app?

This is a Ionic-Bluetooth-BLE template.

## Requirements
1. Node.js (v6.11.2 LTS) [https://nodejs.org/](https://nodejs.org/)
  ```bash
  // Check successful installation with:
  $ node --version
  ```
2. NPM (v5.3.0)
  ```bash
  $ sudo npm install -g npm@5.3.0
  ```
  ```bash
  // Check successful installation with:
  $ npm --version
  ```
3. Apache Cordova (v7.0.1)
  ```bash
  $ sudo npm install -g cordova@7.0.1
  ```
  ```bash
  // Check successful installation with:
  $ cordova --version
  ```
4. Ionic CLI (v3.9.2)
  ```bash
  $ sudo npm install -g ionic@3.9.2
  ```
  ```bash
  // Check successful installation with:
  $ ionic --version
  ```

## How to use this template?

To use this template, either create a new ionic project using the ionic node.js utility and follow the tutorial below, or copy the files from this repository [Ionic-Bluetooth-BLE](https://github.com/jschax/ionic-bluetooth-ble).

Then, to run it, cd into the project `ionic-bluetooth-ble` and run:

1. Install the packages:
  ```bash
  $ npm install
  ```
2. Build the project:
  ```bash
  $ npm run build
  ```
3. Build the platform:
  ```bash
  $ cordova platform add android
  ```
4. Build the app:
  ```bash
  $ cordova build android
  ```
5. Deploy the app to device:
  ```bash
  $ cordova run android --device
  ```

Substitute `android` for `ios` if on a Mac.

## How to create this template?
Open the file [TUTORIAL.md](TUTORIAL.md).

## Credits
- [(21.07.2017) Don Coleman: Ionic Bluetooth Low Energy Examples](https://github.com/don/ionic-ble-examples)

## Help
### Ionic:

#### Official documentation
[https://ionicframework.com/docs/](https://ionicframework.com/docs/)

#### Josh Morony
- Website: [https://www.joshmorony.com/](https://www.joshmorony.com/)
- Youtube: [https://www.youtube.com/user/LittlejTFS](https://www.youtube.com/user/LittlejTFS)

#### Simon Reimler
- Youtube: [https://www.youtube.com/user/saimon1924](https://www.youtube.com/user/saimon1924)
- Ionic Academy: [https://ionicacademy.com/](https://ionicacademy.com/)
- devdactic: [https://devdactic.com/](https://devdactic.com/)

#### Paul Halliday
- Blog: [https://blog.paulhalliday.io/](https://blog.paulhalliday.io/?)
- Youtube: [https://www.youtube.com/channel/UCYJ9O6X1oFt7YGXpfRwrcWg](https://www.youtube.com/channel/UCYJ9O6X1oFt7YGXpfRwrcWg)

### Apache Cordova:
#### Official documentation
- [https://cordova.apache.org/docs/en/latest/](https://cordova.apache.org/docs/en/latest/)

#### Plugins supported with Ionic
- [https://ionicframework.com/docs/native/](https://ionicframework.com/docs/native/) 
