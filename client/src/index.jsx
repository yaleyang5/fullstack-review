import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios, { post, get } from 'axios';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    // send a post request to server
    // send a post to /repos
    axios.post('/repos', {
      username: term
    }).then(() => {
      return axios.get('/repos');
    }).then((response) => {
      this.setState({
        repos: response.data
      })
    })
    console.log(`${term} was searched`);
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));