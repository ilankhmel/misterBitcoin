// import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import './assets/styles/main.scss'

import { AppHeader } from './cmps/AppHeader';
import { ContactDetails } from './views/ContactDetails';
import { ContactEdit } from './views/ContactEdit';
import { ContactPage } from './views/ContactPage';
import { HomePage } from './views/HomePage';
import { SignupPage } from './views/SignupPage';
import { StatisticPage } from './views/StatisticPage';

function App() {
  return (
    <Router>
      <div className="main-app ">
          <AppHeader/>

          <main className='main-container'>
            <Switch>
              <Route path="/contact/edit/:id?" component={ContactEdit}/>
              <Route path="/contact/:id" component={ContactDetails}/>
              <Route path="/contact" component={ContactPage}/>
              <Route path="/statistic" component={StatisticPage}/>
              <Route path="/signup" component={SignupPage}/>
              <Route path="/" component={HomePage}/>
              {/* <Route path="/" {!loggedIn ? <Redirect to="/signup" /> : <HomePage />} /> */}
            </Switch>
          </main>

          <footer>
                  <section className='container'>
                      misterBitcoin 2022 &copy;
                  </section>
          </footer>
      </div>
    </Router>
  );
}

export default App;
