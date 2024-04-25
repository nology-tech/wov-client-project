# Handover

## Project Overview

A project for people taking part in Way of the Viking. A lifestyle company trying to encourage people to lead lives in line with the "Way Of The Viking".

The first part of the project ran for two weeks and focused on functionality for the user or the application.

- Potential users can register and create an account.
- Authenticated users can log in to the account.
- All users have access to a homepage.
- Users have their profile page and respected data that they can update.
- Users have a predefined list of active tasks to complete, each task increases their score.
- Users can access their completed tasks on the Calendar page and see what they have historically achieved.
- Users are part of a tribe and on the leaderboard page, they can compare scores to other members of their tribe.

The project is built with React, Vite and Typescript.

It uses:

- Firebase Firestore as a database to store user profiles, active tasks and completed tasks.
- Firebase Storage for file uploads.
- Firebase Authentication to create and authenticate users.
- StoryBook to document components props and styling within the project.
- Certain components are built with the Material UI component library.
- Jest & React Testing Library for function and component unit tests.
- Eslint to ensure code quality
- GitHub Actions to run tests & the linter before a PR can be merged.
- GitHub Actions to run a deploy script once a PR is merged.

### Project Resources

- [Live Site](https://wov-client-project-66242.web.app/)
- [Project Repo](https://github.com/nology-tech/wov-client-project)
- [Figma Wireframe](https://www.figma.com/file/UpuqGYWi7zUiYJRab5CKm2/Client-Project---Way-of-Viking?type=design&node-id=330-665&mode=design&t=EvHYQDjB691sKNk4-0)
- [MS Planner](https://tasks.office.com/opusrs.onmicrosoft.com/en-GB/Home/Planner/#/plantaskboard?groupId=f30f0f4e-6059-4846-b657-1c1b3a53a135&planId=3azd5cw9QUS_iMptQRyFG5cADV-G)

### Project Setup

Clone the repo, change into the directory, and install the project dependencies.

```bash
git clone https://github.com/nology-tech/wov-client-project
cd wov-client-project
npm install
```

Scripts available once installed.

```bash
# RUN DEVELOPMENT SERVER
npm run dev
# LAUNCH STORY BOOK
npm run storybook
# RUN ALL TESTS
npm run test
# RUN FILE-SPECIFIC TESTS
npm run test your-file-name
# RUN ESLINT
npm run lint
```

---

## Component documentation

Each component has been documented with [Storybook.js]()

The command `npm run storybook` will launch a browser window that enables you to view each component's stories file.
Each stories file documents the props it takes, and what the component looks like so that you can learn about their behaviour and have an understanding of how to interact with each component.

[Storybook Research Repo](https://github.com/gordonmenzies/storybook_tutorial)

[Component Tree Plan](https://app.mural.co/t/nology9400/m/nology9400/1712658405121/2d9d2142e3b579857660bcc6d938068c9ba6de32?sender=05d9c88f-51ea-41bc-893d-3bf5dbf66498)

---

## Feature Documentation

### Routing & Private Routing

Private routing allows authenticated users to access the main application. If authenticated users are on the error page, when they click the home button, they will be redirected back to the homepage.

Unauthenticated users are not able to access the main application, even if the URL is manipulated; it will redirect the user to an error page.
When the home button is clicked on the error page, the unauthenticated user is redirected back to the account page where they can create an account or sign in

There is more about how this is achieved in the AuthProvider feature.

#### Routes

| Path    | Element      | Route type |
| ------------ | ------------------ | ---------- |
| /      | `<Home/>`     | private  |
| /tasks   | `<ActiveTasks />` | private  |
| /calendar  | `<Calendar />`  | private  |
| /leaderboard | `<Leaderboard/>` | private  |
| /profile  | `<Profile/> `   | private  |
| /edit    | `<UpdateProfile/>` | private  |
| /auth    | `<Account />`   | public  |
| /register  | `<Register/>`   | public  |
| /sign-in  | `<Login />`    | public  |
| \*     | `<ErrorPage />`  | public  |

### Account

The Account page is for authorization. It features distinct calls-to-action for user navigation. The buttons for account creation and signing in are each linked to corresponding routes ("/register" and "/sign-in" respectively).

### Register

The Register page is for user registration, incorporating functionalities from the AuthProvider for account creation.

It includes required input fields for personal details such as first name, last name, bio, email, password, and tribe selection. Users can navigate between two form views using a "Next" button, with the second view enabling password entry and final registration submission.

Additionally, there's an optional field to add a profile image with an upload prompt. The component handles form validation, ensuring required fields are filled and passwords match before submission.

Upon successful registration, a user is added to Firebase auth, user data is stored in Firestore and the AuthProvider, and an optional profile image can be uploaded to Firebase Storage.

### Login

The Login page is for user authentication. Users can navigate back to the Account page using the left arrow icon. Form submission triggers an authentication process, where user credentials are verified. In case of authentication failure, an error message is displayed.

Upon successful authentication from Firebase Auth, the user data is retrieved from Firestore. The user is stored in the AuthProvider and the user is navigated to the Home page.

### ErrorPage

The ErrorPage is a fallback page for navigation errors. It displays a message about the wrong turn and offers a "Home" button to redirect.

The button redirects users to the Home page if they're authenticated, otherwise to the Account page.

### Home

The Home page is the landing page of the application, with essential elements for engagement and navigation. A call-to-action button directs users to view today's tasks. There is also descriptive copy text from Dan welcoming users to the "Way of the Viking" community.

### ActiveTasks

The ActiveTasks page is for managing active tasks within the application. It integrates various features for active task management, including a search bar for filtering tasks based on keywords or categories.

Active Tasks are dynamically rendered as tiles, allowing users to view task details and mark them as completed. Upon completion, the user's tasks are removed from active and go into complete. The user's score is also incremented.

Currently, the user is unable to add media and a description but the components are there the functionality hasn't been implemented.

The component leverages the FirestoreProvider for data management.

### Calendar

The Calendar page is for displaying completed tasks within the application. It integrates with a calendar interface, allowing users to navigate between dates and view completed tasks for specific dates.

Completed tasks are fetched from the FirestoreProvider and filtered based on the selected date. Completed Task details such as task heading, category, points, description, and associated images are displayed.

### Leaderboard

The Leaderboard page is for displaying user rankings based on their total scores within the application. It renders a list of LeaderboardCard components, each representing a user with their name, profile image, and total score.

Users are fetched from the FirestoreProvider and are sorted based on their total scores, with ties broken by sorting alphabetically by name.

The current user & top-scoring user have different styles to the other users in the ranking.

### Profile

The Profile page provides users with a view of their profile details, including their picture, score, name, bio, and email. It hides sensitive information like the password. Users can edit their profile or sign out using the provided buttons.

### UpdateProfile

The UpdateProfile page allows users to modify their profile information and change their password if needed. It provides fields for updating the name, and bio, along with an option to change the password. Users can see error and success messages as feedback.

Currently, the user is unable to update their email and profile image.

Changes to the profile are reflected in the database.

### Context

#### Firestore Provider

The FirestoreProvider context manages the state and caching of active and completed tasks, as well as provides functions to interact with Firestore collections such as fetching tasks, completing active tasks, and retrieving the leaderboard.

It optimizes data fetching by caching recent data and updating the cache as needed. The context it provides allows components to access these Firestore functionalities easily.

The `useFirestore()` hook utilizes React's useContext hook to access the Firestore context (FirestoreContext) provided by the `<FirestoreProvider/>`. It then returns the context, which includes the functions defined in the FirestoreProvider.

```tsx
const ExampleComponent = () => {
 const { getActiveTasks, getCompletedTasks, getLeaderboard } = useFirestore();

 const activeTasks = getActiveTasks("userId");
 const completedTasks = getCompletedTasks("userId");
 const leaderboard = getLeaderboard("tribe");

 return <div>{/* Your component JSX */}</div>;
};
```

#### Auth Provider

This context establishes authentication functionalities and user management within a React application using Firebase authentication and the Firestore database. It includes functions for user login, logout, creation, and updating user profiles. Additionally, the context handles error handling for authentication and database operations, ensuring smooth user experiences and secure authentication flows.

The AuthProvider context manages user authentication using Firebase Auth. It offers functionalities like logging in, logging out, and creating/updating user profiles.

Upon login, the user's authentication state is updated, and their profile information is retrieved from Firestore. Functions are provided for logging in with email and password, logging out, creating new user accounts, and updating user profiles. User profile data is stored in Firestore under different collections, allowing for efficient management and retrieval.

The `useAuth()` hook utilizes React's useContext hook to access the Auth context (AuthContext) provided by the `<AuthProvider/>`. It then returns the context, which includes the functions defined in the AuthProvider.

```tsx
const ExampleComponent = () => {
 const {
  isAuthenticated,
  getUser,
  loginUser,
  logoutUser,
  createUser,
  updateUser,
 } = useAuth();

 const user = authContext.getUser();

 return <div>{/* Your component JSX */}</div>;
};
```

---

## Overview of Codebase / Project structure

```
├── docs -- Developer documentation/research materials/conventions
├── public -- Assets for the live site go in here
│ └── assets
│ └── images
└── src
├── assets -- This should not be used. Use public/assets instead
│ └── images
├── components -- Components go in here
│ ├── ActiveTaskTile
│ ├── Button
│ ├── CompletedTask
│ ├── ErrorSVG
│ ├── Header
│ ├── HeaderHome
│ ├── Layout
│ ├── LeaderboardCard
│ ├── Navigation
│ └── Popup
├── context -- Context contains functions for getting data from Firebase
│ ├── AuthProvider
│ └── FirestoreProvider
├── hooks -- Hooks are where Auth and Firestore functions are retrieved from
├── mockData -- Used for development purposes. Contains mock data
├── pages -- This contains each page on the site
│ ├── Account
│ ├── ActiveTasks
│ ├── Calendar
│ ├── ErrorPage
│ ├── Home
│ ├── Leaderboard
│ ├── Login
│ ├── Profile
│ ├── Register
│ └── UpdateProfile
├── styles -- This contains global styles
├── types -- This contains types for complex data
└── utils -- This contains commonly used utility functions
```

---

## Research materials

During the project research projects were completed and presented back to the group.

- [FireStorage](./Firebase%20Storage%20api.pdf)
- [FireStore](./Firestore%20api.pdf)
- [Github Actions](https://github.com/ample-samples/github-actions-research)
- [Storybook Documentation](https://github.com/gordonmenzies/storybook_tutorial)
- [Mui Documentation](https://github.com/bwardak/material-ui-waiheke/tree/master)
- [Video upload and download](./video/video-upload.md)
 - On `setup-upload-video` [Branch](https://github.com/nology-tech/wov-client-project/tree/setup-upload-video/src/pages/Test)

---

## Features Left to Implement

MS Planner has the tickets and features that were not able to be implemented in the two weeks allocated to the project.

### Known Issues & fixes

- Blank screen and in console `createTheme_default is not a function`
 - [Stack Overflow](https://stackoverflow.com/questions/74542488/react-material-ui-createtheme-default-is-not-a-function)
 - Stop the server & close the browser (empty cache and hard reload)
 - Delete the `node_modules` folder. `rm -rf node_modules`
 - Install dependencies `npm i`
 - Run server `npm run dev`
 - If still broken stop the server
 - And run `rm -rf node_modules/.vite/deps`
 - Run server `npm run dev`

### Contributors

| Name       | Features Worked On                       | Role           |
| ------------------ | ---------------------------------------------------------------- | -------------------------- |
| Athish Thayalan  | Home, Navigation, Profile, Error Page, Completed Tasks, Register | Developer         |
| Baheer Wardak   | ActiveTasks                           | Developer         |
| Cheryl Lee    | Calendar, ActiveTasks, Video Research              | Developer         |
| Emma Oyetey    | ActiveTasks, Leaderboard, Register, Profile           | Developer         |
| Hamish Lawson   | Home, Navigation, Profile, ActiveTasks, Video Research     | Developer         |
| Michaela Chan   | Leaderboard, Sign in, AuthProvider, Private Routing       | Developer         |
| Pablo Sartirana  | Leaderboard, Register, Profile                 | Developer         |
| Sanjidaha Begum  | Leaderboard, Error Page, Completed Tasks, Register       | Developer         |
| Samuel Raducan  | Register, ActiveTasks                      | Project Manager, Developer |
| Divya Manivannan | Calendar, Update Profile                    | Project Manager, Developer |
| Todd Griffin   | Sign in, AuthProvider, Private Routing, Firestore Research   | Project Manager, Developer |
| Charlie Richardson | AuthProvider, FirebaseProvider, Firebase Storage Research    | Coach           |

---