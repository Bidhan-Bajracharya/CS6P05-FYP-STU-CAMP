import React, { useState, useEffect } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import { Select } from "antd";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import QuickPopUp from "../../components/UI/QuickPopUp";
import SelectConfig from "../../components/wrapper/SelectConfig";

const NotifyPage = () => {
  const initialNotification = {
    title: "",
    message: "",
    year: 1,
    department: "Computing",
    notiType: "Admin", // Admin type notification
  };

  const axiosPrivate = useAxiosPrivate();
  const [notification, setNotification] = useState(initialNotification);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const handleNotificationSubmission = async (e) => {
    e.preventDefault();

    // sending notification
    try {
      await axiosPrivate.post("/notification", JSON.stringify(notification));
      setConfirmationPopUp(true);
      setNotification(initialNotification);
    } catch (error) {
      console.log(error);
    }

    // sending email notification
    try {
      await axiosPrivate.post("/email", JSON.stringify(notification));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmationPopUp) {
      const timeoutId = setTimeout(() => {
        setConfirmationPopUp(false);
      }, 2000); // hide the component after 2 seconds

      // clearing the timeout after component unmounting
      return () => clearTimeout(timeoutId);
    }
  }, [confirmationPopUp]);

  return (
    <>
      <SettingWrapper>
        <H1>Notify students</H1>

        <section className="mx-5 lg:mx-0">
          {confirmationPopUp && (
            <QuickPopUp
              title="Successful"
              subTitle="Notification has been sent."
              icon="success"
            />
          )}

          <form onSubmit={handleNotificationSubmission}>
            <div className="flex flex-row">
              <div className="flex flex-col lg:flex-row">
                <h2 className="lg:mr-5 text-base dark:text-white">
                  Department
                </h2>
                <SelectConfig>
                  <Select
                    defaultValue="Computing"
                    style={{
                      width: 140,
                    }}
                    value={notification.department}
                    options={[
                      {
                        value: "Computing",
                        label: "Computing",
                      },
                      {
                        value: "Networking",
                        label: "Networking",
                      },
                      {
                        value: "MultiMedia",
                        label: "MultiMedia",
                      },
                    ]}
                    onChange={(value) =>
                      setNotification((prevState) => {
                        return { ...prevState, department: value };
                      })
                    }
                  />
                </SelectConfig>
              </div>

              <div className="flex flex-col ml-auto lg:flex-row ">
                <h2 className="lg:mr-5 text-base dark:text-white">Year</h2>
                <SelectConfig>
                  <Select
                    defaultValue={1}
                    style={{
                      width: 120,
                    }}
                    value={notification.year}
                    options={[
                      {
                        value: 1,
                        label: "1st",
                      },
                      {
                        value: 2,
                        label: "2nd",
                      },
                      {
                        value: 3,
                        label: "3rd",
                      },
                    ]}
                    onChange={(value) =>
                      setNotification((prevState) => {
                        return { ...prevState, year: value };
                      })
                    }
                  />
                </SelectConfig>
              </div>
            </div>

            <div className="mt-10 mb-5">
              <div className="flex flex-col mb-5 items-baseline lg:flex-row">
                <h2 className="mb-1 text-base lg:mr-11 dark:text-white">
                  Title
                </h2>
                <input
                  className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] lg:w-60 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
                  placeholder="Title for notification"
                  value={notification.title}
                  onChange={(e) =>
                    setNotification((prevState) => {
                      return { ...prevState, title: e.target.value };
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col lg:flex-row">
                <h2 className="mb-2 text-base lg:mr-5 dark:text-white">
                  Message
                </h2>
                <textarea
                  className="text-box resize-none w-full lg:w-[50%] min-h-[160px] h-fit bg-[#DFDFDF] dark:bg-sg p-2 dark:text-white"
                  placeholder="Message for students..."
                  value={notification.message}
                  onChange={(e) =>
                    setNotification((prevState) => {
                      return { ...prevState, message: e.target.value };
                    })
                  }
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#ED820E] rounded-lg h-12 p-2 text-white w-24 hover:bg-[#FC6A03]"
            >
              Post
            </button>
          </form>
        </section>
      </SettingWrapper>
    </>
  );
};

export default NotifyPage;
