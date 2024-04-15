
# [APK File for Testing](https://github.com/murkrow92/gravity-demo/releases/tag/1.0.0)

# [Demo Screenshots](./screenshots)

# Stack
- React-Native 0.73.6
- React-query for caching, fetching data
- Memoization for performance optimization
- Reanimated for animations

# Changelog

## [1.0.0] - 2024-04-15
### Login Screen
- Login Form with mock data filled username and password.
- Animation for the text input.
- Validation in empty data.
- Mock authentication request with a loading indicator.
- Cache the authentication information

### Currency List Screen 
- A List of Currency Price. 
- The currency is re-fetch every 3 seconds.
- A filter.
- A button to clear the authentication information.
- `All tab` is required in the requirement, but it can cause problems in the Trade Screen, so I decide to skip it.
- Some optimizations for the list rendering by using memoization, React-query caching and Flashlist. Could be better if we have more time.

### Trading Screen
- A Trade Form with many calculations and validations (I could be wrong here).
- A mock call request and a loading indicator.
- A bottom sheet to confirm the transaction

# How to run this application locally


## Prerequisites:


Here is the list of required dependencies:

1. Node.js (>= 18)
2. Yarn
3. Watchman
4. React Native CLI:

> npm install -g react-native-cli

5. Development Environment: Set up your development environment for either Android, iOS, or both. For Android, you'll need Android Studio and for iOS, you'll need Xcode. Follow the official React Native documentation [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)  for detailed instructions on setting up your development environment.

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.


## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


