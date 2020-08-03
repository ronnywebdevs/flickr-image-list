import React, { useState, useEffect } from 'react';
import './App.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import ImageHolder from './components/ImageHolder';
import useDebounce from './utils';

// Redux State and Dispatch Methods
const mapStateToProps = (state) => ({ images: state.fetchImages.images });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

function App({ images, getImages }) {
  // State and setter for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State and setter for search results
  const [, setResults] = useState([]);
  // State for search status (whether there is a pending API request)
  const [, setIsSearching] = useState(false);
  // Now we call our hook, passing in the current searchTerm value.
  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        setIsSearching(true);
        // Fire off our API call
        getImages(debouncedSearchTerm).then(() => {
          // Set back to false since request finished
          setIsSearching(false);
        });
      } else {
        setResults([]);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSubmit = () => {
    getImages(searchTerm);
  }


  const loadImage = () => {
    const arr = images;
    let list = []
    for (let i = 0; i < arr.length; i++) {
      list.push(<ImageHolder key={i} source={arr[i]} />);
    }
    return list;
  }

  return (
    <div className="App">
      <div style={{padding: 20}}>
        <input
          onChange={onChange}
          placeholder="Enter"
          fullwidth="true"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit(searchTerm)
            }
          }}
        />

        <br/>
        <button onClick={handleSubmit}>
          Search
        </button>
      </div>
      {loadImage()}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
