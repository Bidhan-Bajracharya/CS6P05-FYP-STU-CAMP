import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { getComments as getCommentsApi } from "../../data/api";

const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);

  // because root comments have parentId = null
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  // getting replies from the backend
  // and sorting as, new replies need to come at bottom
  // getTime() sends milliseconds time
  // (a, b) are two successive comments
  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  // fetching data
  // [] -> triggered only once, after mouting the component
  useEffect(() => {
    // should be fetch, using function for now
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <>
      <div className="h-fit">
        {/* List of comments are rendered here */}
        {rootComments.map((rootComment) => (
          // dont use index as key
          <Comment
            key={rootComment.id}
            comment={rootComment}
            // getting comment on the fly, not much efficient
            // if too many replies, research about 'lazy loading'
            replies={getReplies(rootComment.id)}  
          />
        ))}
      </div>
    </>
  );
};

export default Comments;

// need current userID
// people who are logged in can comment: but our is always logged in
// normally this is fetched from backend
