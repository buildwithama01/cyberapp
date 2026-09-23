# Cybergate

Cybergate is a mobile learning app for discovering courses, enrolling in lessons, tracking progress, reviewing course content, and managing purchases and profile settings.

The app is built with Expo SDK 54, React Native, TypeScript, and Expo Router. Course, enrollment, review, mentor, and purchase data currently come from local mock data in `constants/mockData.ts`.

## Requirements

- Node.js compatible with the Expo SDK 54 toolchain
- npm
- One of the following for running the app:
  - Expo Go on a physical device
  - Android Studio and an Android emulator
  - Xcode and an iOS simulator on macOS

## Setup

Install dependencies from the project root:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Then use the commands shown by Expo to open the app in Expo Go, an emulator, or a simulator. Platform-specific shortcuts are also available:

```bash
npm run android
npm run ios
npm run web
```

## Available scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm start`       | Start the Expo development server |
| `npm run android` | Start Expo and open Android       |
| `npm run ios`     | Start Expo and open iOS           |
| `npm run web`     | Start Expo for the web            |
| `npm run lint`    | Run the Expo ESLint configuration |

## App structure

Expo Router maps files in `app/` to routes:

```text
app/
   (auth)/       Authentication and onboarding flow
   (tabs)/       Main application tabs
   (screens)/    Course and account detail screens
   index.tsx     Entry route
```

The main tab navigator contains:

- **Home**: Search, filters, categories, and popular course cards
- **My Course**: Ongoing and completed enrollments with progress
- **Purchases**: Purchase history and receipts
- **Profile**: Account settings, help, privacy, and app information

The authentication flow includes splash, onboarding, login, signup, password recovery, password creation, and verification screens.

Course cards navigate to the course details screen with the selected course ID. Course details include course information, mentor information, tools, lessons, reviews, bookmarks, and enrollment actions.

## Project conventions

- Reusable UI components live in `components/`.
- Shared mock data and TypeScript models live in `constants/mockData.ts`.
- Assessment content lives in `constants/assessmentData.ts`.
- Images and fonts live in `assets/`.
- The `@/` alias resolves to the project root.
- Urbanist font variants are loaded in `app/_layout.tsx`.
- Route groups such as `(auth)`, `(tabs)`, and `(screens)` organize navigation without adding URL segments.

## Data and environment

The current app uses local mock data and does not require a backend to run. A local `.env` file may be present for development configuration; keep secret values out of source control and do not add them to this README.

When replacing mock data with an API, keep the course IDs consistent across course records, enrollments, lessons, and navigation parameters. Course details and enrollment progress depend on those IDs matching.

## Useful references

- [Expo SDK 54 documentation](https://docs.expo.dev/versions/v54.0.0/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)
