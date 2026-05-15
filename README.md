<<<<<<< HEAD
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

=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> ea0ed5c2aeda5c9aadc0222e2b9d28c46badafbb
