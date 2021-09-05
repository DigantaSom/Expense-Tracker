import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GlobalStyle from './global.styles';

import Header from './components/header/header.component';

import Home from './pages/home/home.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/sign-in' component={SignInAndSignUp} />
      </Switch>
    </Router>
  );
};

export default App;
