#Lost & Found Campus
A web-based platform for campus communities to report, track, and recover lost or found items.

#Features
Report Items – Submit lost or found items with details like name, location, status, and description

Dashboard – View all reported items with real-time counts of lost vs. found items

Search & Filter – Filter by status (Lost/Found) or search by item name, location, or description

Manage Items – Edit or delete existing reports

Responsive Design – Works on desktop, tablet, and mobile devices

Tech Stack
Frontend: React 18 with React Router DOM v6

Styling: Tailwind CSS

HTTP Client: Axios

API: MockAPI.io (mock backend)

Getting Started
Prerequisites
Node.js (v14 or higher)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/yourusername/lost-found-campus.git
cd lost-found-campus
Install dependencies

bash
npm install
Configure API endpoint

Open src/App.jsx and update the API_BASE_URL with your MockAPI endpoint:

javascript
const API_BASE_URL = 'https://your-mockapi-endpoint.mockapi.io/api/app';
Start the development server

bash
npm run dev
Open http://localhost:5173 in your browser

Project Structure
text
src/
├── App.jsx           # Main application with all components
├── main.jsx         # Entry point
└── index.css        # Tailwind CSS imports
API Endpoints (MockAPI)
Method	Endpoint	Description
GET	/items	Get all items
GET	/items/:id	Get single item
POST	/items	Create new item
PUT	/items/:id	Update item
DELETE	/items/:id	Delete item
Usage
Reporting an Item
Click "Report Item" in the navigation bar

Fill in the item details (name, location, status, description)

Click "Submit Report"

Searching & Filtering
Use the search bar to find items by name, location, or description

Use the dropdown to filter by Lost or Found status

Managing Items
Click "Edit" on any item card to modify details

Click "Delete" to remove an item (confirmation required)

Screenshots
Dashboard	Report Form
View all items with search/filter	Submit new lost/found reports
Customization
Styling
Tailwind CSS is configured. To customize colors or theme, update tailwind.config.js:

javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
      }
    }
  }
}



Project Link:https://github.com/littlegithu/lostandfoundapp

