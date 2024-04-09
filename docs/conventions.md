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
### How will you write functions?

If a function is very long and if it makes sense to be used elsewhere, it should be created in a separate folder/file, e.g. `src/utilities/utilities.ts`

Arrow functions
const myFunction = () => {
}

### How will you write components/containers?

Components and containers will each have their own folders
Components should never contain containers, however containers are allowed to contain components
Containers should be used for routing and containing components
Components should be used for content

### How will you name state, variables, arrays, and props?

camelCase naming for all variables, 
excluding​ types and components, which are written in PascalCase
Arrays should be named in plural
Array's names should be descriptive enough for the reader to know what is inside

### Should Prettier be on?

Yes!!!?!!!!1111
2 space indentation

### Should you comment on how something works?

Large pieces of code should be commented if they are not self-descriptive BUT​​ self-descriptive and concise code should be prioritised
e.g. if a function can be broken up into smaller pieces, then it should be

### Should you leave console.log in the code?

NO!!!!!

### Should you leave the commented-out code?

NO!!!!!
