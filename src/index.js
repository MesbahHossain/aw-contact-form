import App from "./App";
import { render } from '@wordpress/element';

// Import the stylesheet for the plugin.
import './assets/css/main.css';
import './assets/scss/main.scss';

// Render the App component into the DOM
render(<App />, document.getElementById('awcf'));
