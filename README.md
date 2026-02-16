# Task Board Application

A modern frontend Task Board web application built as part of a frontend engineering assignment.
This project demonstrates frontend architecture, state management, UI design, and usability principles.

---

## Live Demo

Deployed Site: (paste your Netlify link here)
GitHub Repository: (paste your repo link here)

---

## Features

### Authentication

* Static login system
* Hardcoded credentials:

  * Email: `intern@demo.com`
  * Password: `intern123`
* Protected routes
* Logout functionality
* Persistent session using localStorage

---

### Task Board

Three fixed columns:

* Todo
* Doing
* Done

Each task supports:

* Title
* Description
* Priority
* Due date
* Tags
* Created timestamp

---

### Functionalities

* Create task
* Edit task
* Delete task
* Drag and drop tasks between columns
* Move buttons (Todo / Doing / Done)
* Priority buttons (Low / Medium / High)
* Search by title
* Filter by priority
* Sort by due date
* Reset board option
* Persistent state after refresh

---

### Persistence

All data is stored locally using:

```
localStorage
```

No backend is used.

---

## Tech Stack

* React (Vite)
* JavaScript
* HTML5 Drag and Drop API
* CSS (inline styles)
* Git and GitHub
* Netlify deployment

---

## Project Structure

```
taskboard/
 ├── public/
 ├── src/
 │   ├── App.jsx
 │   └── main.jsx
 ├── package.json
 └── vite.config.js
```
<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/18620057-d707-466c-b80f-500bbd769db6" />

---

## Installation and Setup

Clone repository:

```bash
git clone https://github.com/Asmit1709/taskboard.git
cd taskboard
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Deployment

This project is deployed using Netlify with GitHub auto-deploy.

Whenever code is pushed:

```
git push
```

Netlify automatically rebuilds and redeploys the site.

---

## Engineering Highlights

This project demonstrates:

* Clean component architecture
* Proper state management
* Reusable logic
* Error handling
* Input validation
* UX-focused interactions
* Persistent storage handling
* Drag and drop implementation

---

## Design Decisions

| Decision           | Reason                             |
| ------------------ | ---------------------------------- |
| LocalStorage       | Assignment constraint (no backend) |
| Single-file App    | Simplicity and clarity             |
| Prompt-based input | Faster UI iteration                |
| Inline styles      | Minimal setup                      |
| Drag API           | Lightweight solution               |

---

## Assignment Requirement Coverage

| Requirement       | Status    |
| ----------------- | --------- |
| Login system      | Completed |
| Protected routes  | Completed |
| CRUD tasks        | Completed |
| Drag drop         | Completed |
| Search            | Completed |
| Filter            | Completed |
| Sort              | Completed |
| Persistence       | Completed |
| Reset board       | Completed |
| Activity tracking | Basic     |

---

## Conclusion

This project fulfills the assignment objective of demonstrating frontend engineering quality, usability, and state handling.

It is production-deployable, scalable, and structured according to modern frontend standards.

---

## Author

Asmit Srivastava

---

## Notes

This project was built for evaluation purposes and focuses on functionality, architecture, and reliability rather than heavy UI frameworks.
