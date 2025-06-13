import EventManagement from "components/event/admin/EventListAdmin";
import UpdateEventPage from "pages/admin/event/UpdateEventPage";
import CreateEventPage from "pages/admin/event/CreateEventPage";
import DetailEventAdminPage from "pages/admin/event/DetailEventAdminPage";
import EventTypeListPage from "pages/admin/event-type/EventTypeListPage";
import EventRegistrationPage from "pages/admin/event/EventRegistrationPage";
import AdminLayout from "pages/layouts/AdminLayout";
import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import CheckinSessionsPage from "pages/admin/checkin/CheckinSessionsPage";
import CertificateTable from "components/certificate/admin/CertificateTable";
import CreateCertificate from "components/certificate/admin/CreateCertificate";
import UpdateCertificate from "components/certificate/admin/UpdateCertificate";


// const PosterEditorWrapper = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   return eventId ? <PosterEditor eventId={eventId} /> : null;
// };

// const PosterViewerWrapper = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   return eventId ? <PosterViewer eventId={eventId} /> : null;
// };

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        {/* Nested routes cho các mục sidebar */}
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="events" element={<EventManagement/>} />
        <Route path="create-event" element={<CreateEventPage/>} />
        <Route path="/admin/event-detail/:eventId" element={<DetailEventAdminPage/>} />
        <Route path="/admin/event-update/:eventId" element={<UpdateEventPage />} />
        <Route path="/admin/event-registrations/:eventId" element={<EventRegistrationPage />} />
        <Route path="/admin/event-checkin/:eventId" element={<CheckinSessionsPage />} />
        <Route path="event-types" element={<EventTypeListPage />} />
        {/*<Route path="notifications" element={<Notifications />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="results" element={<Results />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<Settings />} /> */}
        {/* <Route path="events/:eventId/poster/edit" element={<PosterEditorWrapper />} />
        <Route path="events/:eventId/poster" element={<PosterViewerWrapper />} />
        <Route  path="/admin/event-registrations/:eventId" element={<RegistrationUser />}  /> */}
        <Route path="certificate-templates" element={<CertificateTable />} />
        <Route path="create-certificate-template" element={<CreateCertificate />} />
        <Route path="update-certificate-template/:id" element={<UpdateCertificate />} />
        </Route>
      </Routes>
  );
};

export default AdminRoutes;
