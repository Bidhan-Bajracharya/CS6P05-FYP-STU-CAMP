import React, { useState, useEffect } from "react";
import AdminNav from "../../components/Layout/AdminNav";
import NavButtons from "../../components/Layout/NavButtons";
import Slider from "../../components/Slider";
import StARs from "../../components/stARs/StARs";
import Post from "../../components/content/Post";
import EmptyContent from "../../images/EmptyContent";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const [posts, setPosts] = useState([]);

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

  return (
    <>
      <div className="lg:mx-36 dark:bg-tb lg:max-xl:ml-[90px]">
        <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
          <NavButtons />
        </div>

        <div className="flex justify-center mb-4 lg:max-xl:w-auto">
          <Slider />
        </div>

        <div className="flex flex-row">
          <StARs />

          <div className="flex flex-col w-full ml-2 mr-6 min-h-screen lg:ml-3 lg:mr-[30px] sm:max-lg:w-auto sm:max-lg:ml-[22px] sm:max-lg:mr-[37px]">
            {/* Container for displaying posts */}
            <div className="lg:mx-auto">
              {posts ? (
                posts.map((post) => (
                  <Post
                    key={post._id}
                    name={post.createdBy.name}
                    department={post.createdBy.department}
                    section={post.createdBy.section}
                    profile_pic={post.createdBy.profile_pic}
                    body={post.body}
                    img={post.img}
                    createdAt={post.createdAt}
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
