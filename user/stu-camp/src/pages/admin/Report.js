import React, { useEffect, useState } from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import ReportList from "../../components/ReportList";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Report = () => {
  const [viewConfirmation, setViewConfirmation] = useState(false);
  const [viewResolveConfirmation, setViewResolveConfirmation] = useState(false);

  const [reportClicked, setReportClicked] = useState();
  const [deletedReportId, setDeletedReportId] = useState(null);
  const [reports, setReports] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await axiosPrivate.get("/admin/report");
        setReports(response.data.reports);
      } catch (error) {
        console.log(error);
      }
    };

    getReports();
  }, []);

  // open and closing of delete confirmation pop-over
  const handleDeleteConfirmation = (id) => {
    setViewConfirmation((prevState) => !prevState);

    // id of report that was clicked
    setReportClicked(id);
  };

  // deletion of the report
  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`/admin/report/${reportClicked}`);
    } catch (error) {
      console.log(error);
    }
  };

  // open and closing of resolve confirmation pop-over
  const handleResolveConfirmation = (id) => {
    setViewResolveConfirmation((prevState) => !prevState);

    // id of report that was clicked
    setReportClicked(id);
  };

  // updating the status of the report
  const handleResolve = async () => {
    try {
      const response = await axiosPrivate.patch(
        `/admin/report/${reportClicked}`,
        JSON.stringify({ resolved: true })
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SettingWrapper>
        <H1>Reports</H1>

        {reports.map((report) => (
          <ReportList
            key={report._id}
            id={report._id}
            onDeleteIconClick={() => handleDeleteConfirmation(report._id)}
            onResolveIconClick={() => handleResolveConfirmation(report._id)}
            reportedUserName={report.reportedUserId.name}
            reportedPost={report.reportedPostId}
            reportingUserName={report.reportingUserId.name}
            reason={report.reason}
            reportedDate={report.createdAt}
            resolved={report.resolved}
            resolvedDate={report.updatedAt}
          />
        ))}

        {viewConfirmation && (
          <ConfirmationPopUp
            title="Delete?"
            onAction={() => handleDelete}
            onClose={() => handleDeleteConfirmation()}
          />
        )}

        {viewResolveConfirmation && (
          <ConfirmationPopUp
            title="Mark as resolved?"
            onAction={() => handleResolve()}
            onClose={() => handleResolveConfirmation()}
          />
        )}
      </SettingWrapper>
    </>
  );
};

export default Report;
