# MELI - Front End Challenge

This is the front end challenge for Mercadolibre Interview done by Nicolas Pavlotsky. The project is done with **Vite** (React) on the front end and **Node** (with Express) for the back end.

### Project Overview

This is a product listing and detail-view application built as part of a front-end technical challenge. It includes search functionality, product detail views, and a minimal Node.js backend with mocked data.

The project can be seen live in the following link:

[MELI - Front End Challenge](https://meli-challenge-puce.vercel.app/)

The app was deployed using Vercel for the front and Render for the backend. I'm using free plans so expect reduced performance for server response times.

I added `robots.txt` to prevent search engines indexing.

---

### 🛠️ To start up the project:

1. After cloning the repo, `cd frontend && npm i`, then `cd ..` to the root and `cd backend && npm i`.
2. Add a `.env` file in the root of the Vite project and add `VITE_API_BASE_URL=http://localhost:3000`.
3. Add a `.env` file in the root of the Node project and add `IMAGE_URL_BASE=http://localhost:5173/products/`.
4. Both front end and backend can be started with `npm run dev`. Be sure to start Node project first. By default, the vite project will run on port `5173` and the Node server will run on port `3000`. You can change this if you need to, but also be sure to change it in the `.env` files.

### 🧪 To run tests

1. For both front and backend projects you can run tests using `npm run test`. This will run `jest` tests for the Node project and `vitest` and `react-testing-library` for the Vite one.
2. For E2E tests I used Playwright. You need to have the server running to run these tests: run `npm run dev` on the Node server, and then `cd` into the Vite project and run `npm run test:e2e`.

### 🖱️ To use it

1. Go into http://localhost:5173 (if using default port).
2. Try searching different things in the search bar, for example: "xiaomi" will bring some xiaomi products. Also try searching for things that will yield no results like "jackets".
3. You can click any product to go into the detail view. You can also click breadcrumb links to search by category.

---

## Some considerations:

I tried to follow the assignment as much as I could. In areas where the assignment was ambiguous, I made reasonable assumptions based on best practices.

The assignment asked for the project to be maintainable and scalable. For the sake of simplicity, I made compromises in some parts of the app, that I will detail later in here.

Also, I left comments in the code with some specific improvements that could be done, but the effort was not justified for the scope of this challenge.

#### 🧰 Backend Overview

For the backend, I used Node with Express, I created two endpoints as stated in the assignment. Since the backend was not the focus of the assignment, I’ve kept the implementation simple and omitted detailed documentation. The search endpoint features fuzzy search by product or category name. The second endpoint returns one of the mocked products. For brevity, I used the public folder of the Vite project to store the images of the products. I've set up CORS for both deployed url and localhost.

#### 📦 Technologies and libraries

- Vite - React with Typescript
- `react-router-dom` for routing.
- `react-icons` for icons (it's overkill for a project this small but it made it faster to deliver).
- Tanstack React Query for data fetching.
- `zustand` for global state management (only used for persisting and resetting search query in this case).
- SASS for styles.

#### 📁 File Organization

I prefer a vertical/hybrid folder structure, as it scales more naturally with project complexity. For that reason, files like styles, constants, etc.. are put in the respective domain folder, with the exception of global hooks/style/utils. It's not as pronounced in this project since the scope is small, but I took into consideration when creating files and folders for the project.

Each component is put into its own `Component.tsx` file. I prefer this way over having `index.tsx` files since it improves developer experience, and, in my opinion, makes for a more tidy codebase. Each component might have accompanying files like styles, hooks, utils etc.

#### 🎨 Styling Approach

Some global CSS variables are defined in the root style file. I tried to minimize repetition with colors and styles as much as possible.

For this challenge I've used custom styles for each component. At scale, it would be better to have a design system, a utility library and/or component library to ensure a more consistent look.

I've abstained from using any CSS libraries or component libraries in an attempt to prove my expertise, but for bigger projects it's highly recommended since they help reduce ambiguity, prevent style clashing, and improve consistency across the app.

#### ⚡Possible optimizations

I chose not to implement code splitting via `React.lazy` in this case, as there are only three routes and bundle size will be quite small. Also there shouldn't be any performance problems with the small scope of the project, so I haven't had the need to use any perf optimization technique such as `memo` or `useCallback`/`useMemo` hooks. I've no problem with concurrent rendering also (as expected) so no need to use `useTransition` or `useDeferredValue` in any part of the app.

#### 📌 Additional Implementation Notes

- I've set up absolute imports with `@` keyword for readability.
- I've created an `api` wrapper over fetch to inject Content-Type Header.
- I've set up a basic `zustand` store for state management. It's only used for the search query to reset the value when navigating to certain routes. While it's arguably overkill for such a limited use case I included it as proof of knowledge. I also set up a slice for the app. For bigger scale projects, I'd setup more slices on the different domains of the app.
- I've added skeleton placeholders for the loading states.
- Each request includes a 500ms artificial delay to simulate real-world latency. You can remove it and check that it's instant without it.

#### ♿ Accessibility

I aimed to make it as accessible as possible without going overboard. There may still be room for improvement, but when I tested it with the NVDA screen reader, it was overall acceptable. I did not extensively test WCAG guidelines, since they are out of the scope of this project.

#### 🧪 Tests

I've added unit tests using `vitest` for the utils and component tests using `react-testing-library`. I've tested some utils and components. For the Node project, I used `jest` to test the basic utilities, but I didn't do any endpoint tests.

#### ✨ AI Assistance:

I used Cursor as the IDE for this project. For some tasks, I used the Chat Agent mode to speed up development, mostly using Claude 4 Sonnet, and Auto mode for simpler tasks.

#### 🚀 Potential Improvements:

- Autocomplete on the search:

  - Should have an endpoint that takes a search query and returns the autocomplete options.
  - Can be debounced for reducing request amount + have min char amount to trigger search.
  - Can be cached for efficiency. A simple key-value map can be used to cache the options.

- Pagination on the results / lazy loading on scroll:

  - As done in Mercadolibre's real website, can have pagination with 20-25 items per page.
  - Another option (more complex) is having lazy loading on scroll. Can use a intersection observer API for this, or a library.

- Multiple images + lightbox / zoom capabilities:

  - Could add multiple images with thumbnails on the side as done on the real website.
  - Could have zoom on click or a lightbox using a library or custom solution.
  - Could have multiple colors per item (changing all images when selecting a different color).

- Sticky scroll for images:

  - Could have sticky scroll to avoid large blank spaces below image when metadata / purchase info of the product is too large.

- Stars / rating on the products
  - Could add a rating value and show that as part of the product listing or in the detail view.
  - Could have progressive filing using SVG or half filling to the rounded rating value like in the real website.
