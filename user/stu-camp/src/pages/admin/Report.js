import React, { useEffect, useState } from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import ReportList from "../../components/ReportList";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Report = () => {
  const [viewDeleteConfirmation, setViewDeleteConfirmation] = useState(false);
  const [viewResolveConfirmation, setViewResolveConfirmation] = useState(false);

  const [reports, setReports] = useState([]);
  const [reportClicked, setReportClicked] = useState();
  const [deletedReportId, setDeletedReportId] = useState(null);
  const [editedReportId, setEditedReportId] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  // fetch data on initial render
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

  // display updated data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/admin/report");
        setReports(response.data.reports);
      } catch (error) {
        console.log(error);
      }
    };
    
    // refetch the data when a report is deleted/edited
    if (deletedReportId || editedReportId) {
      fetchData();
    }
  }, [deletedReportId, editedReportId]);

  // open and closing of delete confirmation pop-over
  const handleDeleteConfirmation = (id) => {
    setViewDeleteConfirmation((prevState) => !prevState);

    // id of report that was clicked
    setReportClicked(id);
  };

  // deletion of the report
  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`/admin/report/${reportClicked}`);
      setDeletedReportId(reportClicked);
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
      setEditedReportId(reportClicked);
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

        {viewDeleteConfirmation && (
          <ConfirmationPopUp
            title="Delete?"
            subTitle="This action cannot be undone."
            onAction={() => handleDelete()}
            onClose={() => handleDeleteConfirmation()}
          />
        )}

        {viewResolveConfirmation && (
          <ConfirmationPopUp
            title="Mark as resolved?"
            subTitle="This action cannot be undone."
            onAction={() => handleResolve()}
            onClose={() => handleResolveConfirmation()}
          />
        )}
      </SettingWrapper>
    </>
  );
};

export default Report;
