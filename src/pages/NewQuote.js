import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";

const NewQuote = (props) => {
  const history = useHistory();

  //////////
  const { isLoading, error, requestFn: sendQuote } = useHttp();
  const [isSubmited, setIsSubmited] = useState(false);
  const addQuoteHandler = (newQuote) => {
    const transformData = (data) => {
      setIsSubmited(true);
    };
    sendQuote(
      {
        url: "https://react-router-fcb08-default-rtdb.firebaseio.com/quotes.json",
        method: "POST",
        body: newQuote,
      },
      transformData
    );
  };

  if (isSubmited && !error && !isLoading) {
    history.push("/all-quotes");
  }

  ///////////////
  return (
    <div>
      <QuoteForm isLoading={isLoading} onAddQuote={addQuoteHandler}></QuoteForm>
    </div>
  );
};
export default NewQuote;
