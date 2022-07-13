import React, { Component, useEffect, useState } from "react";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/ui/LoadingSpinner";
const AllQuotes = (props) => {
  /////////
  const { isLoading, error, requestFn: getQuotes } = useHttp();
  const [allQuots, setAllQuots] = useState([]);
  useEffect(() => {
    const transformData = (data) => {
      const loadedArray = [];
      Object.entries(data).map(([key, value]) => {
        return loadedArray.push({
          id: key,
          text: value.text,
          author: value.author,
        });
      });
      setAllQuots(loadedArray);
    };
    getQuotes(
      {
        url: "https://react-router-fcb08-default-rtdb.firebaseio.com/quotes.json",
      },
      transformData
    );
  }, [getQuotes]);
  //////////
  // console.log(allQuots);
  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (!error && !isLoading && allQuots.length === 0) {
    return <NoQuotesFound />;
  }
  return (
    <div>
      <QuoteList quotes={allQuots}></QuoteList>
    </div>
  );
};

export default AllQuotes;
