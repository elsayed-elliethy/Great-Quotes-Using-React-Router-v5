import React, { Component, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MainNav from "./components/layout/MainNav";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetails from "./pages/QuoteDetails";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <div>
      <MainNav></MainNav>
      <main className="main">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/all-quotes" />
          </Route>
          <Route path="/all-quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="/all-quotes/:quoteId">
            <QuoteDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
