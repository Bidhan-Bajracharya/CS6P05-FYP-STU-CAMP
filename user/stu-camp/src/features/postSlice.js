import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [], // list of posts
  postClicked: null, // option click tracker for post
  deleteIconClicked: false, // tracking if the 'delete icon' was clicked - used to display confirmation pop-up
  deletedPostId: null,
  comments: [], // unfiltered comments i.e., all comments
  addCommentClickId: "", // tracking 'Add comment' clicked for posts - used instead of [commentPost, setCommentPost]
  showPostComments: null, // tracking 'show comment' clicked for posts
  commentClicked: "", // tracking 'id' of the comment that was selected for deletion
  commentDeleteClick: false, // delete icon clicked for a comment
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    handleDotClick: (state, { payload: id }) => {
      // resetting clicked post's ID if it is clicked again
      // but dont reset yet if the delete icon was clicked
      if (id === state.postClicked) {
        if (!state.deleteIconClicked) {
          state.postClicked = null;
        }
      } else {
        // passing id to detect which post was clicked
        state.postClicked = id;
      }
    },

    // open/close of deletion pop-over
    handleDeleteIconClick: (state) => {
      state.deleteIconClicked = !state.deleteIconClicked;
    },

    setPosts: (state, { payload: arrPost }) => {
      state.posts = arrPost;
    },

    setDeletedPostId: (state, { payload: postId }) => {
      state.deletedPostId = postId;
    },

    setComments: (state, { payload: arrComments }) => {
      state.comments = arrComments;
    },

    // Showing/Hiding comments for post handler
    handleShowCommentClick: (state, { payload: postId }) => {
      // only one posts's comments can be viewed at a time
      if (postId === state.showPostComments) {
        state.showPostComments = null;
      } else {
        state.showPostComments = postId;
      }
    },

    handleCommentDeleteIconClick: (state, { payload: commentId }) => {
      // if delete icon was just clicked, track the comment's id
      if (!state.commentDeleteClick) {
        state.commentClicked = commentId;
      }
      state.commentDeleteClick = !state.commentDeleteClick;
    },

    setAddCommentClickId: (state, { payload: postId }) => {
      state.addCommentClickId = postId;
    },

    handleCommentAdd: (state, { payload: comment }) => {
      const updatedComments = [...state.comments, comment];
      state.comments = updatedComments;
    },

    resetPostState: (state) => {
      // this doesnt work
      state = {...initialState};
    },
  },
});

export const {
  handleDotClick,
  handleDeleteIconClick,
  setPosts,
  setDeletedPostId,
  setComments,
  handleShowCommentClick,
  handleCommentDeleteIconClick,
  setAddCommentClickId,
  handleCommentAdd,
  resetPostState,
} = postSlice.actions;

export default postSlice.reducer;
