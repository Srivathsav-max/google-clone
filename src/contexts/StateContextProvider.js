import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]); // results from google search api
  const [loading, setLoading] = useState(false); // loading state for the spinner component 
  const [searchTerm, setSearchTerm] = useState(''); // this is the search term that the user types in the search bar

  const getResults = async (url) => { // async function to get the results from the api
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, { // fetching the results from the api using the url
      method: 'GET',
      headers: {
        'x-user-agent': 'desktops',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': '20cac57a71mshc04fb0ca18a5a76p14f4a6jsn1981a6c6939e',
      },
    });


    const data = await res.json();

    if(url.includes('/news')){
      setResults (data.entries)
    }else if(url.includes('/image')){
      setResults (data.image_results)
    }
    else{
      setResults (data.results)
    }

    setLoading(false);
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);