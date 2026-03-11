# 🗄️ C³ Project Structure

Most of the code lives in the `src` folder and follows this structure:

```sh
src
|
+-- assets            # static files such as images, fonts, logos, and club-related media
|
+-- components        # shared components used across the entire website
|
+-- config           # global configuration, environment variables, and theme settings
|
+-- features         # feature-based modules (events, membership, gallery, etc.)
|
+-- hooks            # shared React hooks used across the website
|
+-- lib              # pre-configured libraries and third-party integrations
|
+-- providers        # application providers (auth, theme, etc.)
|
+-- routes           # route configuration and page components
|
+-- stores           # global state management
|
+-- types            # TypeScript type definitions
|
+-- utils            # shared utility functions
```

To maintain scalability and organization, most feature-specific code should live in the `features` folder. Each feature represents a distinct section or functionality of the C³ website. For example:

```sh
src/features/events
|
+-- api         # API requests for event management
|
+-- components  # event-specific components (calendar, event cards, etc.)
|
+-- hooks       # event-related hooks
|
+-- routes      # event pages (list, detail, creation)
|
+-- stores      # event state management
|
+-- types       # event-related type definitions
|
+-- utils       # event utility functions
|
+-- index.ts    # public API for the events feature
```

## Import Guidelines

Always import feature components through the feature's index file:

✅ Correct:
```typescript
import { EventCard } from "@/features/events"
```

❌ Incorrect:
```typescript
import { EventCard } from "@/features/events/components/EventCard"
```

This can be enforced through ESLint:

```js
{
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@/features/*/*'],
            },
        ],
    }
}
```

Each feature should be self-contained but can expose functionality to other features through its index.ts file. This structure helps maintain clean code organization as the C³ website grows. 