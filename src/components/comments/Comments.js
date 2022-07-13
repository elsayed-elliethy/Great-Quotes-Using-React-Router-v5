import { useCallback, useEffect, useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import useHttp from "../../hooks/use-http";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  //////////
  const params = useParams();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const { isLoading, error, requestFn: sendComment } = useHttp();
  ////////////
  const [supmitComment, setSubmitComment] = useState(false);
  const addCommentHandler = (commentText) => {
    const transformData = (data) => {
      setSubmitComment(true);
    };
    sendComment(
      {
        url: "https://react-router-fcb08-default-rtdb.firebaseio.com/comments.json",
        method: "POST",
        body: { quote: params.quoteId, text: commentText },
      },
      transformData
    );
  };

  useEffect(() => {
    if (!isLoading && !error && supmitComment) {
      history.replace(`/all-quotes/${match.params.quoteId}`);
    }
  }, [error, isLoading, supmitComment, history, match.params.quoteId]);

  ///////////////
  /////////
  const { isLoading: isload, error: err, requestFn: getComments } = useHttp();
  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    const transformData = (data) => {
      const loadedArray = [];
      Object.entries(data).map(([key, value]) => {
        return loadedArray.push({
          id: key,
          text: value.text,
          quote: value.quote,
        });
      });
      setAllComments(loadedArray);
    };
    getComments(
      {
        url: "https://react-router-fcb08-default-rtdb.firebaseio.com/comments.json",
      },
      transformData
    );
  }, [getComments]);

  let comments;
  if (isload) {
    comments = (
      <div className="centered">
        <LoadingSpinner />{" "}
      </div>
    );
  }
  if (!isload && !err && allComments.length > 0) {
    comments = <CommentsList comments={allComments} />;
  }
  if (!isload && !err && allComments.length === 0) {
    comments = <p className="centered">no comments were added yet</p>;
  }
  //////////
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          isLoading={isLoading}
          onAddComment={addCommentHandler}
          error={error}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
