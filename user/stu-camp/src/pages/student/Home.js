import React, { useState, useEffect } from "react";
import NavButtons from "../../components/Layout/NavButtons";
import Slider from "../../components/Slider";
import StARs from "../../components/stARs/StARs";
import InputBox from "../../components/content/InputBox";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Post from "../../components/content/Post";

import { useDispatch, useSelector } from "react-redux";
import { showInputBox } from "../../features/homeSlice";
import { hideInputBox } from "../../features/homeSlice";
import {
  setNotifications,
  setUnreadNotifications,
} from "../../features/notificationSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../../styles/share.css";
import EmptyContent from "../../images/EmptyContent";
import ReportModal from "../../components/UI/ReportModal";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import QuickPopUp from "../../components/UI/QuickPopUp";
import words from "../../data/words";
import {
  handleDeleteIconClick,
  setPosts,
  setDeletedPostId,
  setComments,
  handleCommentDeleteIconClick,
} from "../../features/postSlice";

const Home = () => {
  const { shareIsShown } = useSelector((store) => store.home);
  const { currentIndex } = useSelector((store) => store.slider);
  const { userId, profile_pic } = useSelector((store) => store.user);
  const {
    posts,
    postClicked,
    deleteIconClicked,
    deletedPostId,
    comments,
    commentClicked,
    commentDeleteClick,
  } = useSelector((store) => store.post);

  const dispatch = useDispatch();
  const [body, setBody] = useState(""); // content of the post
  const [vulgarWords] = useState(words); // array of vulgar words
  const [showVulgarPopUp, setShowVulgarPopUp] = useState(false); // quick warning pop-up

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // path for image folder

  const defaultReasonState = {
    inappropriateContent: false,
    vulgarWords: false,
    spam: false,
    harassment: false,
  };
  const [reasons, setReasons] = useState(defaultReasonState); // reasons for report
  const [checkedCounter, setCheckedCounter] = useState(0); // counter for checked boxes
  const [reportInformation, setReportInformation] = useState({}); // information on reported & reporting user
  const [reportClicked, setReportClicked] = useState(false); // report modal pop-up
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const [currentSection, setCurrentSection] = useState("");
  const [file, setFile] = useState(); // for image

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  // fetching notifications
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axiosPrivate.get("/notification");
        dispatch(setNotifications(response.data.notifications));

        const getUnReadNotifications = () => {
          return response.data.notifications
            .slice(0, 10) // only top 10 notifications
            .filter((notification) => !notification.readBy.includes(userId)) // getting unread/unseen notifications
            .map((notification) => notification._id); // '_id' of those unseen notifications
        };

        const unread = getUnReadNotifications();
        dispatch(setUnreadNotifications(unread));
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, []);

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

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/users/post");
      dispatch(setPosts(response.data.posts)); // redux
    } catch (error) {
      console.log(error);
    }
  };

  // vulgar word detected warning
  useEffect(() => {
    if (showVulgarPopUp) {
      const timeoutId = setTimeout(() => {
        setShowVulgarPopUp(false);
      }, 2000); // hide the component after 2 seconds

      // clearing the timeout after component unmounting
      return () => clearTimeout(timeoutId);
    }
  }, [showVulgarPopUp]);

  // post deletion successful message
  useEffect(() => {
    if (deletedPostId) {
      const timeoutId = setTimeout(() => {
        dispatch(setDeletedPostId(null)); // redux
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [deletedPostId]);

  // report submission success message
  useEffect(() => {
    if (reportSubmitted) {
      const timeoutId = setTimeout(() => {
        setReportSubmitted(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [reportSubmitted]);

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

  // post submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      body: body,
    };

    // if file exists in the post
    if (file) {
      const formData = new FormData();
      const fileName = Date.now() + file.name; // creating unique file name
      formData.append("name", fileName);
      formData.append("file", file);
      newPost.img = fileName;

      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/upload",
          formData
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const lowerCaseParagraph = body.toLowerCase();
      const wordRegExps = vulgarWords.map(
        (badWord) => new RegExp(`\\b${badWord}\\b`, "i")
      );

      // check for vulgar words in body before submission
      const result = wordRegExps.some((word) =>
        // lowerCaseParagraph.includes(word)
        word.test(lowerCaseParagraph)
      );

      if (result) {
        setShowVulgarPopUp(true);
        return;
      }

      // if safe then post
      await axiosPrivate.post("/post", JSON.stringify(newPost));

      setBody("");
      setFile(null);
      dispatch(hideInputBox());
      fetchData(); // fetches data again after posting
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleReportClick = (reportedUser, reportedPostId) => {
    setReportClicked((prevState) => !prevState);
    // creator of the post, id of the post that was clicked
    setReportInformation({ reportedUser, reportedPostId });

    // resetting the reason's states
    setReasons(defaultReasonState);
    setCheckedCounter(0);
  };

  const handleReportSubmit = async (reason) => {
    try {
      const content = {
        reportedUser: reportInformation.reportedUser,
        reportedPostId: reportInformation.reportedPostId,
        reason: reason,
      };

      const response = await axiosPrivate.post(
        "/users/report",
        JSON.stringify(content)
      );

      console.log(response);
      setReportSubmitted(true);
      setReportClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  // handling filtering of posts
  useEffect(() => {
    handleSectionChange();
  }, [currentIndex]);

  const displayPosts = posts.filter((post) =>
    currentSection === "Common"
      ? true
      : post.createdBy.department === currentSection
  );

  return (
    <>
      <div className="lg:mx-36 dark:bg-tb lg:max-xl:ml-[90px]">
        <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
          {/* the [stream/people] div on the main body, during mobile mode*/}
          <NavButtons userRoute="/" />
        </div>

        <div className="flex justify-center mb-4 lg:max-xl:w-auto">
          <Slider />
        </div>

        <div className="flex flex-row">
          <StARs currentSection={currentSection} />

          {/* div for 'create post' and posts */}
          <div className="flex flex-col w-full ml-2 mr-6 min-h-screen lg:ml-3 lg:mr-[30px] sm:max-lg:w-full sm:max-lg:ml-[22px] sm:max-lg:mr-[37px]">
            <div className="shadow flex flex-row items-center rounded-lg w-full h-16 border-[1px] mb-6 dark:border-[#FFA500]">
              <Avatar
                size={45}
                icon={<UserOutlined />}
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  position: "static",
                  marginRight: "20px",
                  marginLeft: "10px",
                  boxShadow: "0 0 0 2px #FFA500",
                }}
                src={
                  profile_pic !== "default" && (
                    <img alt="user" src={PF + "/" + profile_pic} />
                  )
                }
                className="cursor-pointer"
              />
              <p
                className="mb-0 cursor-pointer text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
                onClick={() => {
                  dispatch(showInputBox());
                }}
              >
                Share your thoughts, with your friends.
              </p>
            </div>

            {/* Write a post pop-up modal */}
            {shareIsShown && (
              <InputBox
                handleSubmit={handleSubmit}
                body={body}
                setBody={(e) => setBody(e.target.value)}
                onClose={() => {
                  dispatch(hideInputBox());
                }}
                imgFile={file}
                onImageIconClick={(file) => setFile(file)}
                onImageRemove={() => setFile(null)}
              />
            )}

            {/* delete comment confirmation pop-up */}
            {commentDeleteClick && (
              <ConfirmationPopUp
                title="Delete this comment?"
                subTitle="This action cannot be undone."
                onAction={() => handleCommentDelete()}
                onClose={() => dispatch(handleCommentDeleteIconClick())} // redux
              />
            )}

            {/* delete post confirmation pop-up */}
            {deleteIconClicked && (
              <ConfirmationPopUp
                title="Delete this post?"
                subTitle="This action cannot be undone."
                onAction={() => handleDelete(postClicked)}
                onClose={() => dispatch(handleDeleteIconClick())} // redux
              />
            )}

            {/* Vulgar word detection pop up */}
            {showVulgarPopUp && (
              <QuickPopUp
                icon="warning"
                title="Vulgar words detected"
                subTitle="This content cannot be shared."
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

            {/* Report submission quick pop-up */}
            {reportSubmitted && (
              <QuickPopUp
                icon="success"
                title="Submitted"
                subTitle="Report sent to admin."
              />
            )}

            {/* Report pop-up modal */}
            {reportClicked && (
              <ReportModal
                onClose={() => handleReportClick()}
                handleSubmit={handleReportSubmit}
                reasons={reasons}
                onReasonChange={(reason) => setReasons(reason)}
                checkedCounter={checkedCounter}
                onCounterChange={(counter) => setCheckedCounter(counter)}
              />
            )}

            {/* Container for displaying posts */}
            <div className="lg:mx-auto">
              {displayPosts.length !== 0 ? (
                displayPosts.map((post, index) => (
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
                    handleReportClick={(reportedUser, reportedPostId) =>
                      handleReportClick(reportedUser, reportedPostId)
                    }
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

export default Home;
