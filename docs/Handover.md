# Project Overview

    A project for people taking part in Way of the Viking. A lifestyle company trying to encourage people to lead lives in line with "Way Of The Viking".

    Users have their own user price profile.
    List of Tasks in the active tasks feature.
    A Calendar where they can see previously completed tasks.
    A leaderboard where they can compare scores to other users.

    The project uses Firebase to store user profiles, uploaded media , and lists of tasks.
    The project uses StoryBook to document components and styling within the project.
    The project uses Material UI for certain components.

    Github Link -> https://github.com/nology-tech/wov-client-project
    Figma File/App Layout -> https://www.figma.com/file/UpuqGYWi7zUiYJRab5CKm2/Client-Project---Way-of-Viking?type=design&node-id=330-665&mode=design&t=EvHYQDjB691sKNk4-0

# Feature Documentation

### Navigation

### Profile creation

### Error page

### Leaderboard - view and compare points

### Leaderboard - read and display from Firestore

### Highlighting MVV and current user on the leaderboard

### Displaying and filtering active tasks

### Read and display active tasks from Firestore

### Displaying completed tasks

### Read and display completed tasks from Firestore

### Authentication - create account and sign in

### Application Login

### Create collections in Firestore on account creation

### Application Logout

### Private routing

### Distinguish between daily and weekly tasks

### User is able to complete an active task

### Update profile

### Design for laptop

### Firestore Provider

    The `<FirestoreProvider/>`, is as a central state management context for caching data fetched from Firestore, Firebase's NoSQL database. The provider initializes three state variables `activeTasksCache`, `completedTasksCache`, and `leaderBoardCache`, each representing cached data for different pages data respectively. The context provides functions like `getActiveTasks`, `getCompletedTasks`, and `getLeaderboard` to asynchronously fetch data from Firestore, it utilizing the cache to minimize unnecessary requests. By encapsulating this logic within the context, it enables efficient data management and sharing across the application's components.

### useFirestore

    This hook utilizes React's useContext hook to access the Firestore context (FirestoreContext) provided by the `<FirestoreProvider/>`. It then returns the context, which includes the state variables and functions defined in the FirestoreProvider.

### Private Routing

    Private routing allows authenticated users to access the main application, including the the tasks, profile, calender, leaderboard, and home pages. If authenticated users are on the error page, when they click the home button, they would be redirected back to the homepage.

    Unautheticated users would not be able to access the main application, even if they URL is manipulated; it would redirect the user to an error page. When the home button is clicked on the error page, the unauthenticated user would be redirected back to the splash page where they can create and account or sign in

    UserUID and isAuthenticated can be retrieved from useAuth.tsx in the hooks folder

# How to run component documentation

    Using the command `npm run storybook`, a browser window will open and you can interact with components using [Storybook](https://storybook.js.org/)
    With this, you get an idea of the props the component takes, what components look like and a learn about their behaviour.# Overview of Codebase / Project structure

# Overview of Codebase / Project structure

Component Map
https://app.mural.co/t/nology9400/m/nology9400/1712658405121/2d9d2142e3b579857660bcc6d938068c9ba6de32?sender=05d9c88f-51ea-41bc-893d-3bf5dbf66498

├── docs -- Developer documentation / research materials / conventions
├── public -- Assets for the live site go in here
│ └── assets
│ └── images
└── src
├── assets -- This should not be used. Use public/assets instead
│ └── images
├── components -- Components go in here
│ ├── ActiveTaskTile
│ ├── AuthProvider
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
│ └── FirestoreProvider
├── hooks -- Hooks are where auth and firestore functions are retrieved from
-- e.g. const { isAuthenticated } = useAuth()
├── mockData -- Used for develompment purposes. Contains mock data
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
└── utils -- This contains commonly used functions

# Features Left to Implement

     Add media to completed task
     Change image in the Update Profile Page
     Reset password on login page
     Change landing page to /auth, not to an error page
        (if not fixed by client demo)

# Research materials

     The majoirty of research materials can be be found in docs.
        To Add
         Video upload research on branch setup-upload video -
         Storybook Documentation - https://github.com/gordonmenzies/storybook_tutorial
         Mui Documentation - Ask Baheer

### Known Issues & fixes

        Box error & fix

### List of Group & coach who worked on the project.

Coach: Charlie Richardson
Group: Waiheke

Athish Thayalan
Baheer Wardak
Cheryl Lee
Divya Manivannan
Emma Oyetey
Hamish Lawson
Michaela Chan
Pablo Sartirana
Samuel Raducan
Sanjidaha Begum
Todd Griffin
