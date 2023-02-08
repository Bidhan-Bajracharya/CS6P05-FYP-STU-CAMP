import React, { useState, useEffect } from "react";
import NavButtons from "../../components/Layout/NavButtons";
import Slider from "../../components/Slider";
import StARs from "../../components/stARs/StARs";
import Post from "../../components/content/Post";
import EmptyContent from "../../images/EmptyContent";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import QuickPopUp from "../../components/UI/QuickPopUp";
import {
  handleDotClick,
  handleDeleteIconClick,
  setPosts,
  setDeletedPostId,
  setComments,
  handleShowCommentClick,
  handleCommentDeleteIconClick,
  setAddCommentClickId,
  handleCommentAdd,
} from "../../features/postSlice";

const AdminHome = () => {
  const { currentIndex } = useSelector((store) => store.slider);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const dispatch = useDispatch();

  // const [posts, setPosts] = useState([]);
  // const [postClicked, setPostClicked] = useState(); // options for posts
  // const [deletedPostId, setDeletedPostId] = useState(null);
  // const [deleteIconClicked, setDeleteIconClicked] = useState(false);

  // const [comments, setComments] = useState([]);
  // const [commentPost, setCommentPost] = useState(); // tracking 'Add comment' clicked for posts
  // const [showPostComments, setShowPostComments] = useState(); // tracking 'show comment' clicked for posts
  // const [commentDeleteClick, setCommentDeleteClick] = useState(false); // delete icon clicked for a comment
  // const [commentClicked, setCommentClicked] = useState(""); // tracking 'id' of the comment that was selected for deletion

  const [currentSection, setCurrentSection] = useState("");

  const {
    posts,
    postClicked,
    deleteIconClicked,
    deletedPostId,
    comments,
    addCommentClickId,
    showPostComments,
    commentClicked,
    commentDeleteClick,
  } = useSelector((store) => store.post);

  const handleSectionChange = () => {
    if (currentIndex === 0) {
      setCurrentSection("Common");
    } else if (currentIndex === 1) {
      setCurrentSection("Computing");
    } else if (currentIndex === 2) {
      setCurrentSection("Networking");
    } else if (currentIndex === 3) {
      setCurrentSection("Multimedia");
    }
  };

  // open/close of deletion pop-over
  // const handleDeleteIconClick = () => {
  //   setDeleteIconClicked((prevState) => !prevState);
  // };

  // const handleDotClick = (_id) => {
  //   if (_id === postClicked) {
  //     // resetting clicked post's ID if it is clicked again
  //     // but dont reset yet if the delete icon was clicked
  //     if (!deleteIconClicked) {
  //       setPostClicked(null);
  //     }
  //   } else {
  //     // passing id to detect which post was clicked
  //     setPostClicked(_id);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/users/post");
      dispatch(setPosts(response.data.posts)); // redux
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController(); // cancel our request, when component unmounts

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get("/users/post", {
          signal: controller.signal,
        });
        dispatch(setPosts(response.data.posts)); // redux
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPosts();

    return () => {
      controller.abort();
    };
  }, []);

  // remove a post by its id
  const handleDelete = async (postId) => {
    try {
      const response = await axiosPrivate.delete(`/post/${postId}`);
      dispatch(setDeletedPostId(postId)); // redux
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // refetch the data when a post is deleted
  useEffect(() => {
    if (deletedPostId) {
      fetchData();
    }
  }, [deletedPostId]);

  // post deletion message
  useEffect(() => {
    if (deletedPostId) {
      const timeoutId = setTimeout(() => {
        dispatch(setDeletedPostId(null)); // redux
      }, 2000); 

      return () => clearTimeout(timeoutId);
    }
  }, [deletedPostId]);

  useEffect(() => {
    handleSectionChange();
  }, [currentIndex]);

  // fetch comments
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axiosPrivate(`/comment`);
        dispatch(setComments(response.data.comments)); // redux
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);

  // Showing/Hiding comments for post handler
  // const handleShowCommentClick = (postId) => {
  //   // only one posts's comments can be viewed at a time
  //   if (postId === showPostComments) {
  //     setShowPostComments(null);
  //   } else {
  //     setShowPostComments(postId);
  //   }
  // };

  // const handleCommentDeleteIconClick = (commentId) => {
  //   // if delete icon was just clicked, track the comment's id
  //   if (!commentDeleteClick) {
  //     setCommentClicked(commentId);
  //   }
  //   setCommentDeleteClick((prevState) => !prevState);
  // };

  // handle deletion of comments
  const handleCommentDelete = async () => {
    try {
      await axiosPrivate.delete(`/comment/${commentClicked}`);
      dispatch(
        setComments(
          comments.filter((comment) => comment._id !== commentClicked)
        )
      ); // redux
    } catch (error) {
      console.log(error);
    }
  };

  // filter comments according to posts
  // const getPostComments = (postId) => {
  //   return comments.filter((comment) => comment.postId === postId);
  // };

  // adding new comment
  // const handleCommentAdd = (comment) => {
  //   const updatedComments = [...comments, comment];
  //   setComments(updatedComments);
  // };

  const displayPosts = posts.filter((post) =>
    currentSection === "Common"
      ? true
      : post.createdBy.department === currentSection
  );

  return (
    <>
      <div className="lg:mx-36 dark:bg-tb lg:max-xl:ml-[90px]">
        <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
          <NavButtons userRoute="/admin" />
        </div>

        <div className="flex justify-center mb-4 lg:max-xl:w-auto">
          <Slider />
        </div>

        <div className="flex flex-row">
          <StARs currentSection={currentSection} />

          {/* delete comment confirmation pop-up */}
          {commentDeleteClick && (
            <ConfirmationPopUp
              title="Delete this comment?"
              subTitle="This action cannot be undone."
              onAction={() => handleCommentDelete()}
              onClose={() => dispatch(handleCommentDeleteIconClick())} // redux
            />
          )}

          {/* Post deletion quick pop-up */}
          {deletedPostId && (
              <QuickPopUp
                icon="success"
                title="Deleted"
                subTitle="The post has been removed."
              />
            )}

          {/* delete confirmation pop-up */}
          {deleteIconClicked && (
            <ConfirmationPopUp
              title="Delete this post?"
              subTitle="This action cannot be undone."
              onAction={() => handleDelete(postClicked)}
              onClose={() => dispatch(handleDeleteIconClick())} // redux
            />
          )}

          <div className="flex flex-col w-full ml-2 mr-6 min-h-screen lg:ml-3 lg:mr-[30px] sm:max-lg:w-auto sm:max-lg:ml-[22px] sm:max-lg:mr-[37px]">
            {/* Container for displaying posts */}
            <div className="lg:mx-auto">
              {displayPosts.length !== 0 ? (
                displayPosts.map((post) => (
                  <Post
                    key={post._id}
                    id={post._id}
                    name={post.createdBy.name}
                    department={post.createdBy.department}
                    section={post.createdBy.section}
                    profile_pic={post.createdBy.profile_pic}
                    body={post.body}
                    img={post.img}
                    creatorId={post.createdBy._id}
                    createdAt={post.createdAt}
                    // postClicked={postClicked}
                    // handleDotClick={() => handleDotClick(post._id)}
                    // onDeleteIconClick={() => handleDeleteIconClick()}
                    // onCommentClick={() => setCommentPost(post._id)}
                    // commentClicked={commentPost}
                    // onShowCommentClick={() => handleShowCommentClick(post._id)}
                    // commentShow={showPostComments}
                    // onCommentDeleteIconClick={(id) =>
                    //   handleCommentDeleteIconClick(id)
                    // }
                    // comments={getPostComments(post._id)}
                    // onCommentAdd={(newComment) => handleCommentAdd(newComment)}
                  />
                ))
              ) : (
                <div className="w-[200px] h-[200px] lg:w-[200px] lg:h-[200px] mx-auto">
                  <EmptyContent
                    stroke="gray"
                    fill="gray"
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
