import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import SearchShows from './components/SearchShows';
import Details from './components/Details';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/searchshows/:searchQuery?/:pageNumber?' component={SearchShows} />
    <Route path='/details/:id' component={Details} />
  </Layout>
);
