import './App.css';
import {Route } from 'react-router-dom';
import {Switch} from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import SearchResults from './components/searchbar/SearchResults';
import Nav from './components/nav/Nav';
import CountryDetail from './components/countryDetail/CountryDetail';
import ActivityForm from './components/activityForm/ActivityForm';
import FilterResults from './components/filter/FilterResults';
import OrderingResults from './components/ordering/OrderingResults';
import NotFound from './components/notFound/NotFound';

export function App() {

  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component = {LandingPage}/>
      <Route path= "/" component = {Nav}/>
      </Switch>
      <Switch>
      <Route path= {["/home/:page","/home"]} component = {Home}/>

      <Route path= {["/search/:country/:page","/search/:country"]} component= {SearchResults}/>

      <Route path= "/country/:id" component = {CountryDetail}/>
      <Route path= "/create-activity" component = {ActivityForm}/>

      <Route path={["/filter-by-continent/:continent/:page","/filter-by-continent/:continent"]} component = {FilterResults}/>

      <Route path="/filter-by/:activity" component = {FilterResults}/>

      <Route path= {["/order-by/:ordering/:page","/order-by/:ordering"]} component = {OrderingResults}/>
      {window.location.pathname !== "/" && <Route component = {NotFound}/>}
      </Switch>
      </div>
  );
}

export default App;
