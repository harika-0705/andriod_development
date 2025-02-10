# Product Management App

A cross-platform mobile application built with NativeScript and TypeScript for managing products.

## Architecture & Technologies

- **Framework**: NativeScript 8.8.0
- **Language**: TypeScript 5.4
- **Styling**: TailwindCSS 3.4
- **Architecture**: MVVM (Model-View-ViewModel)
- **State Management**: NativeScript Observable
- **UI Components**: Native UI components via NativeScript Core

## Project Structure

```
├── app/
│   ├── app.ts              # Application entry point
│   ├── app-root.xml        # Root frame definition
│   ├── app.css             # Global styles (TailwindCSS)
│   ├── main-page.xml       # Main page UI definition
│   ├── main-page.ts        # Main page logic
│   └── main-view-model.ts  # Main page view model
```

## Setup & Running

1. **Prerequisites**:
   - Node.js (Latest LTS version)
   - NativeScript CLI
   - For iOS: macOS with Xcode
   - For Android: Android Studio & SDK

2. **Installation**:
   ```bash
   npm install
   ```

3. **Running the App**:
   ```bash
   # For preview
   ns preview
   
   # For Android
   ns run android
   
   # For iOS
   ns run ios
   ```

## Features

### Current Implementation
- Counter functionality with tap interaction
- Reactive UI updates using NativeScript Observable
- TailwindCSS styling integration
- Cross-platform compatibility

### Development Guidelines

1. **MVVM Pattern**:
   - Views: XML files (`*.xml`)
   - ViewModels: TypeScript classes extending Observable
   - Models: Data structures and business logic

2. **UI Components**:
   - Use NativeScript Core components
   - Style with TailwindCSS classes
   - Follow platform-specific design guidelines

3. **State Management**:
   - Use NativeScript Observable for reactive updates
   - Implement proper data binding
   - Handle lifecycle events appropriately

4. **Navigation**:
   - Use Frame navigation
   - Implement proper back navigation
   - Handle deep linking when needed

## Best Practices

1. **TypeScript**:
   - Use strict type checking
   - Leverage interfaces and types
   - Follow TypeScript best practices

2. **Performance**:
   - Lazy load components when possible
   - Optimize images and assets
   - Use proper list view templates

3. **Testing**:
   - Write unit tests for ViewModels
   - Test platform-specific functionality
   - Implement UI automation tests

4. **Styling**:
   - Use TailwindCSS classes
   - Follow responsive design principles
   - Consider platform-specific styling

## API Integration

The app can be extended to integrate with REST APIs using NativeScript's HTTP module:

```typescript
import { Http } from '@nativescript/core';

// GET request
async function getProducts() {
  const response = await Http.getJSON('https://api.example.com/products');
  return response;
}

// POST request
async function addProduct(product) {
  const response = await Http.request({
    url: 'https://api.example.com/products',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    content: JSON.stringify(product)
  });
  return response;
}
```

## Building for Production

1. **Android**:
   ```bash
   ns build android --release --key-store-path your-key.jks --key-store-password your-password --key-store-alias your-alias --key-store-alias-password your-alias-password
   ```

2. **iOS**:
   ```bash
   ns build ios --release --for-device --team-id YOUR_TEAM_ID
   ```

## Troubleshooting

Common issues and solutions:

1. **Build Errors**:
   - Clean project: `ns clean`
   - Remove platforms: `ns platform remove android/ios`
   - Reinstall platforms: `ns platform add android/ios`

2. **Runtime Errors**:
   - Check console logs
   - Use debugging tools
   - Verify platform-specific code

## Contributing

1. Follow TypeScript coding standards
2. Use meaningful commit messages
3. Document code changes
4. Test across platforms before submitting

## License

This project is licensed under the MIT License - see the LICENSE file for details.