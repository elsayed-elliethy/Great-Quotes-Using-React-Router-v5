import { useParams } from "react-router-dom";
import CommentItem from "./CommentItem";
import classes from "./CommentsList.module.css";

const CommentsList = (props) => {
  const params = useParams();

  const targetComments = props.comments.filter((comment) => {
    return comment.quote === params.quoteId;
  });

  let content = targetComments.map((ele) => {
    return <CommentItem key={ele.id} text={ele.text} />;
  });
  if (targetComments.length === 0) {
    content = (
      <p className="centered">no comments were added yet for this quote</p>
    );
  }

  return <ul className={classes.comments}>{content}</ul>;
};

export default CommentsList;
