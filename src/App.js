import React from 'react';
import './App.css';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
import SearchVisualizer from './SearchingVisualizer/SearchingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';

function App() {
  return (
    <div className="app">
     <NavBar />
      <Switch>
        <Route exact path = '/' component={SearchVisualizer} />
        <Route exact path = '/sortingvisualizer' component={SortingVisualizer} />
      </Switch>
    </div>
  );
}

export default App;
