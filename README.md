# Bluetooth Manager App

A simple React Native app to manage and toggle Bluetooth functionality on your device.

## Features

- Enable or disable Bluetooth.
- Automatically check Bluetooth status when the app resumes.
- Guide users to Bluetooth settings if manual action is required.

## Setup & Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/bluetooth-manager-app.git
    cd bluetooth-manager-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the app on an emulator or connected device:

    - For iOS:

      ```bash
      npx react-native run-ios
      ```

    - For Android:

      ```bash
      npx react-native run-android
      ```

4. Ensure necessary permissions are configured in `AndroidManifest.xml` or `Info.plist` (e.g., Bluetooth and Location permissions).

## Limitations

- **Android 13 (API level 33) and newer:**
  The method used to manage and scan Bluetooth devices may not work on Android 13 or newer due to new security restrictions and role-based access introduced in that version. Apps are restricted from accessing certain system-level functionalities like managing Bluetooth settings directly without specific privileges, which are not granted to normal apps.

  - The app's ability to toggle Bluetooth or scan for connected devices may be limited or unavailable on devices running Android 13 or later.
  - Users may need to manually enable or disable Bluetooth through the settings if running on Android 13 or later.

- **iOS**: Bluetooth can be toggled, but users may still need to enable it manually in settings if it’s off. The app cannot directly manage Bluetooth settings.

## Usage

- Use the toggle switch to turn Bluetooth on or off.
- The app will automatically check Bluetooth status when it comes to the foreground and update the UI.

## Contributing

Feel free to fork the repository and submit pull requests for improvements or bug fixes!

## License

MIT License
