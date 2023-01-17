import React, { useState, useEffect } from "react";
import NavButtons from "../../components/Layout/NavButtons";
import Slider from "../../components/Slider";
import StARs from "../../components/stARs/StARs";
import Post from "../../components/content/Post";
import EmptyContent from "../../images/EmptyContent";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { currentIndex } = useSelector((store) => store.slider);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [postClicked, setPostClicked] = useState(); // options for posts
  const [deletedPostId, setDeletedPostId] = useState(null);
  const [reportClicked, setReportClicked] = useState(false);

  const [reportBody, setReportBody] = useState(""); // reason for report
  const [reportInformation, setReportInformation] = useState({});

  const [currentSection, setCurrentSection] = useState("");

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

  const handleDotClick = (_id) => {
    if (_id === postClicked) {
      // closing popover if it is clicked again
      setPostClicked(null);
    } else {
      // passing id to detect which post was clicked
      setPostClicked(_id);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/users/post");
      setPosts(response.data.posts);
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
        setPosts(response.data.posts);
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
      setDeletedPostId(postId);
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
    setReportBody("");
  };

  const handleReportSubmit = async (event) => {
    event.preventDefault();

    try {
      const content = {
        reportedUser: reportInformation.reportedUser,
        reportedPostId: reportInformation.reportedPostId,
        reason: reportBody,
      };

      const response = await axiosPrivate.post(
        "/users/report",
        JSON.stringify(content)
      );

      console.log(response);
      setReportClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

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
          <NavButtons userRoute="/admin" />
        </div>

        <div className="flex justify-center mb-4 lg:max-xl:w-auto">
          <Slider />
        </div>

        <div className="flex flex-row">
          <StARs />

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
                    postClicked={postClicked}
                    handleDotClick={() => handleDotClick(post._id)}
                    handleDelete={() => handleDelete(post._id)}
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

export default AdminHome;
