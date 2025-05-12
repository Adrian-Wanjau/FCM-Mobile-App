# FCM Mobile App

This is a React Native project that implements Firebase Cloud Messaging (FCM) for push notifications, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Getting Started

> **Note**: Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

### Prerequisites

- Node.js and npm/yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- JDK 11 or newer
- Ruby and CocoaPods (for iOS)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Adrian-Wanjau/FCM-Mobile-App.git
```

2. Navigate to the project directory:

```bash
cd FCM-Mobile-App
```

3. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

4. For iOS, install CocoaPods dependencies:

```bash
bundle install
bundle exec pod install
```

## Firebase Setup

This project uses Firebase Cloud Messaging for push notifications. To set up your own Firebase project:

1. Create a project in [Firebase Console](https://console.firebase.google.com/)
2. Add Android and/or iOS apps to your Firebase project
3. Download and add the configuration files:
   - For Android: `google-services.json` to the `android/app/` directory
   - For iOS: `GoogleService-Info.plist` to the iOS app using Xcode

## Running the App

### Start Metro Server

```bash
npm start
```

or

```bash
yarn start
```

### Run on Android

```bash
npm run android
```

or

```bash
yarn android
```

### Run on iOS

```bash
npm run ios
```

or

```bash
yarn ios
```

## Development

### Push Notification Testing

After setting up Firebase, you can test push notifications by:

1. Using the Firebase Console to send test messages
2. Implementing a custom backend to send notifications via FCM API
3. Using the Firebase Admin SDK in a test script

### Modifying the App

Open `App.tsx` in your text editor to make changes. The app will automatically update thanks to Fast Refresh.

To force reload:
- **Android**: Press <kbd>R</kbd> twice or use the Dev Menu (<kbd>Ctrl</kbd>+<kbd>M</kbd> or <kbd>Cmd</kbd>+<kbd>M</kbd>)
- **iOS**: Press <kbd>R</kbd> in the iOS Simulator

## Building for Production

### Android

To create a release build for Android:

```bash
cd android
./gradlew assembleRelease
```

The APK will be available at `android/app/build/outputs/apk/release/app-release.apk`

### iOS

Build your iOS app through Xcode for distribution.

## Troubleshooting

If you encounter issues:

- Ensure your environment is properly set up according to the [React Native documentation](https://reactnative.dev/docs/environment-setup)
- Check that Firebase is correctly configured
- For Android build issues, verify your JDK version and JAVA_HOME environment variable
- For iOS, ensure CocoaPods is properly installed and dependencies are up to date

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- [React Native Firebase](https://rnfirebase.io/)

## License

This project is licensed under the MIT License.
