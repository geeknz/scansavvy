# ScanSavvy

ScanSavvy is a mobile application built with React Native, designed to help users efficiently manage and organize barcodes. Users can easily scan barcodes using their device's camera, add custom descriptions, and set expiry dates. The app provides a user-friendly interface, allowing users to navigate to detailed views of each barcode.

## Features

- Scan barcodes using device's camera
- Add custom descriptions and expiry dates to barcodes
- Navigate to detailed views of each barcode

## Installation

Before running the project locally, make sure you have the React Native environment set up by following the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup) instructions.

Clone the repository:
```sh
git clone git@github.com:geeknz/scansavvy.git
cd ScanSavvy
```

Install dependencies:
```sh
npm install
```

### Android

To run the app on an Android device or emulator, start the Metro bundler:
```sh
npx react-native start
```

When prompted to choose the platform, press `a` for Android.


### iOS

To run the app on an iOS device or simulator, first navigate to the iOS folder and install the necessary CocoaPods:

```
cd ios
pod install
cd ..
```

Then, start the Metro bundler:
```sh
npx react-native start
```

When prompted to choose the platform, press `i` for iOS.

## Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b your-feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push the changes to your branch (`git push origin your-feature-branch`)
5. Create a new pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
