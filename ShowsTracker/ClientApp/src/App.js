import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Login from './components/Login';
import SearchShows from './components/SearchShows';
import Details from './components/Details';

export default () => (
  <Layout>
    <Route exact path='/' component={Login} />
    <Route path='/searchshows/:searchQuery?/:pageNumber?' component={SearchShows} />
    <Route path='/details/:id' component={Details} />
    <Route path='/login' component={Login} />
  </Layout>
);
