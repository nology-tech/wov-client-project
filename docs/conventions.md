# Conventions

## Branches

The branch will have the theme and a brief summary of the ticket. all lowercase and hyphenated.

The themes are either:

- setup

- component

- feature

- fix

A brief summary will describe what your ticket is adding.

All should be joined with -

Examples:

- setup-adding-react

- component-button

- feature-linking-dashboard-to-nav

- fix-removing-side-scroll

---

## TS, TSX
Components will have stories.

Features will be tested with React testing library.

### How will you write functions?

If a function is very long and if it makes sense to be used elsewhere, it should be created in a separate folder/file, e.g. `src/utilities/utilities.ts`

All functions will use arrow function syntax and destructuring where possible
```
const myFunction = ({name, email, age}: MyFunctionProps) => {
}
```

### How will you write components/containers?

- Components and containers will each have their own folders
- Components should never contain containers, however containers are allowed to contain components
  - Containers should be used for routing and containing components
  - Components should be used for content

### How will you name state, variables, arrays, and props?

- camelCase naming for all variables, 
  - _excluding_ types and components, which are written in PascalCase
- Arrays should be named in plural
  - Array's names should be descriptive enough for the reader to know what is inside

### Should Prettier be on?

- Yes!!!?!!!!1111
- 2 space indentation

### Should you comment on how something works?

- Large and/or complex pieces of code should be commented if they are not self-descriptive __BUT__ self-descriptive and concise code should be prioritised
  - e.g. if a function can be broken up into smaller pieces, then it should be

### Should you leave console.log in the code?

- NO!!!!!

### Should you leave the commented-out code?

- NO!!!!!

# SCSS, Styling
## Where are the styles for a component kept?

- Within the folder for each component.

## Where are global styles kept?

- In the root folder we will have a styles folder which applies global styling to the project.

## Where will images/icons be kept?

- Will be stored in the public/assets/images directory.

## What features of SCSS should you use?

- BEM naming convention
- Nesting styles
- Use variables/mixins for styling that used throughout the project

## What units will you use?

- REM for global font sizes and EM for individual components (responsive units)
- CH for text box sizing
- REM or display % for sizing of images
- fr for grid layout
- vh for sections

## What should we use \_variables for?

- colors
- fonts
- breakpoints

## Should you leave the commented-out code?

- No. Because if we need to go to a previous commit we can use git commands.
- Pre-deployment comments for functionality can serve us well when working in a team
- Comment should be removed before merging/deploying to main.

## What media queries are we using?

- Mobile , tablet , desktop
- (min-width) for each

## Breakpoints:

- 320px
- 768px
- 1024px
- 1440px
- 2560px
