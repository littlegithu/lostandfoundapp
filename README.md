# Lost & Found Campus App

A web application that helps students and staff report, track, and recover lost or found items on campus. Built with **React**, **Tailwind CSS**, and **MockAPI**.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

---

## 🚀 Features

- **Report Items** – Report lost or found items with details (name, location, description, status).
- **Dashboard** – View all items, live statistics (total, lost, found).
- **Search & Filter** – Search by keyword and filter by Lost/Found status.
- **CRUD Operations** – Create, Read, Update, Delete items.
- **User Authentication** – Simple sign‑in via modal (name + email); user data saved in `localStorage`.
- **User Profile** – Edit profile information and upload a profile picture.
- **Dark / Light Mode** – Toggle themes; logo changes with mode, preference saved.
- **Responsive Sidebar** – Collapsible navigation (Dashboard, Report Item, Profile).
- **Sticky Search Bar** – Search bar stays at the top when scrolling.
- **Modern UI** – Glass‑morphism effects, smooth animations, Spotify‑style footer.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (functional components, hooks)
- **Routing**: React Router v6 (`Link`, `Outlet`, dynamic routes)
- **Styling**: Tailwind CSS (dark mode, utility classes)
- **HTTP Client**: Axios
- **Backend (mock)**: MockAPI.io – REST endpoints for items
- **State Management**: React Context API (theme, user)
- **Storage**: `localStorage` (user profile, theme preference)
- **Icons**: React Icons

---

## 📁 Project Structure

```
lost-found-app/
├── public/
├── src/
│   ├── assets/               # Logo images
│   ├── components/           # Footer, ItemCard, ItemForm, Logo, Sidebar
│   ├── contexts/             # ThemeContext, UserContext
│   ├── pages/                # Home, Profile, AddItem, EditItem
│   ├── services/             # api.js (Axios config)
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/littlegithu/lostandfoundapp.git
   cd lostandfoundapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`.

> **Note:** The default MockAPI endpoint is already configured. You can replace it with your own in `src/services/api.js`.

---

## 🧪 Usage

1. **Sign In** – Click the **Sign In** button on the dashboard, enter your name and email. Your profile will be saved automatically.
2. **Dashboard** – View all items. Use the search bar and filter to find specific items.
3. **Report an Item** – Go to the `Report Item` page, fill in the form, and submit.
4. **Edit / Delete** – On any item card, click **Edit** to modify details or **Delete** to remove it.
5. **Profile** – Click `Profile` in the sidebar to update your personal information and upload a profile picture.
6. **Dark Mode** – Click the sun/moon icon in the top‑right corner to toggle the theme.

---

## 📡 API Endpoints (MockAPI)

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | `/items`          | Fetch all items      |
| GET    | `/items/:id`      | Fetch a single item  |
| POST   | `/items`          | Create a new item    |
| PUT    | `/items/:id`      | Update an item       |
| DELETE | `/items/:id`      | Delete an item       |

> The default URL is `https://6a01817236fb6ad04de10c7b.mockapi.io/api/app`. Replace it with your own if needed.

---

## 👨‍🎓 Author

**Shadrack Githu** – [GitHub](https://github.com/littlegithu)

---

## 🙏 Acknowledgements

- [MockAPI](https://mockapi.io) – free mock REST API
- [HeroUI](https://heroui.com) – component library (modal, buttons)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Enjoy using the Lost & Found Campus App!** 🔍
```

