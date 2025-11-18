# 🎬 React Movie App

A web application for searching movies via the **OMDb API**, viewing IMDb ratings, checking movie details, and saving your own ratings and watched list.  
Built to practice React fundamentals, custom hooks, side-effects, and working with external APIs.

---

## 🔗 **Live Demo**

👉 https://react-movie-app-beta-five.vercel.app/

---

## 🧰 **Tech Stack**

- **React** (Create React App)
- **CSS**
- **JavaScript (ES6+)**
- **OMDb API**
- **localStorage**

---

## 🚀 **Features**

- 🔍 Search movies via OMDb API
- 🎞 Detailed movie view (poster, year, plot, IMDb rating)
- ⭐ User ratings (rate movies directly inside the app)
- 📁 Add/remove movies from “Watched” list (persisted via localStorage)
- 🔄 Loader while fetching API data
- ⚠️ Graceful error handling (invalid query, no results, API issues)
- 🧠 Custom hooks for reusable logic
- ⛔ API request cancellation using `AbortController`
- 📱 Fully responsive interface

---

## 📦 **Installation & Running locally**

### 1. Clone the repo

```bash
git clone https://github.com/mrobacki/react-movie-app.git
cd react-movie-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm start
```

App will start at:

```
http://localhost:3000
```

> **Note:** The OMDb API key is hardcoded for demo purposes.  
> In production, use `.env` variables.

---

## 🧠 **What I Learned**

- Building reusable **components**
- Writing and organizing **custom hooks**
- Managing state with **useState**
- Using **useEffect** for API calls and side-effects
- Canceling API requests with **AbortController**
- Persisting user data with **localStorage**
- Handling loading/error states cleanly

---

## 📁 **Short Project Structure**

```
src/
  components/
  hooks/
  styles/
  App.js
  index.js
```

---

## 🚧 **Possible Future Improvements**

- Add pagination to search results
- Add dark/light theme toggle
- Add transitions/animations
- Integrate user accounts + backend
- Add recommended movies system
