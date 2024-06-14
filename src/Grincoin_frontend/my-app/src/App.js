/*import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Balance from './balance.js';
import Transfer from './Transfer.js';
import Admin from './admin.js';
import LandingPage from './landingpage.js';
import logo from './logo.svg';
import './App.css';
import './logo.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/balance">Balance</Link></li>
            <li><Link to="/transfer">Transfer</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
        <div className="App-content">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

const Home = () => (
  <div>
    <h2>Grin Coin</h2>
    <p>
      The Hottest memecoin! Join the Smile Revolution!<br />
      Grin Coin is more than just a currency; it's a movement. A movement that combines the excitement of digital assets with the joy of a supportive community. So why wait? Embrace the smile revolution today with Grin Coin, and let's create a brighter, happier crypto world together.
      <br /><br />
      Follow Us: Stay connected with Grin Coin on our official social media channels for the latest updates, events, and community stories.
      <br /><br />
      Invest in Joy: Because at Grin Coin, every transaction is a reason to smile.
      <br /><br />
      Disclaimer: As with any investment, please do your research and understand the risks involved. Grin Coin aims to bring joy, but financial decisions should always be made with careful consideration.
      <br /><br />
      Welcome to the Grin Coin family! Let's make the crypto world a little happier, one grin at a time. 🌟💰😁
    </p>
  </div>
);

export default App;
*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Balance from './balance.js';
import Transfer from './Transfer.js';
import Admin from './admin.js';
import LandingPage from './landingpage.js';
import Wallet from './wallet.js';
import logo from './logo.svg';
import './App.css';
import './logo.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Wallet />
      </header>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/balance">Balance</Link></li>
            <li><Link to="/transfer">Transfer</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
        <div className="App-content">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

const Home = () => (
  <div>
    <h2>Grin Coin</h2>
    <p>
      The Hottest memecoin! Join the Smile Revolution!<br />
      Grin Coin is more than just a currency; it's a movement. A movement that combines the excitement of digital assets with the joy of a supportive community. So why wait? Embrace the smile revolution today with Grin Coin, and let's create a brighter, happier crypto world together.
      <br /><br />
      Follow Us: Stay connected with Grin Coin on our official social media channels for the latest updates, events, and community stories.
      <br /><br />
      Invest in Joy: Because at Grin Coin, every transaction is a reason to smile.
      <br /><br />
      Disclaimer: As with any investment, please do your research and understand the risks involved. Grin Coin aims to bring joy, but financial decisions should always be made with careful consideration.
      <br /><br />
      Welcome to the Grin Coin family! Let's make the crypto world a little happier, one grin at a time. 🌟💰😁
    </p>
  </div>
);

export default App;

