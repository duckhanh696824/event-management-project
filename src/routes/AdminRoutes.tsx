import EventManagement from "components/event/admin/EventListAdmin";

import UpdateEventPage from "pages/admin/event/UpdateEventPage";
import CreateEventPage from "pages/admin/event/CreateEventPage";
import DetailEventAdminPage from "pages/admin/event/DetailEventAdminPage";
import EventTypeListPage from "pages/admin/event-type/EventTypeListPage";
import EventRegistrationPage from "pages/admin/EventRegistrationPage";

import AdminLayout from "pages/layouts/AdminLayout";
import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';


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
        {/* <Route path="registration" element={<Registration />} />
        <Route path="event-types" element={<EventTypeList />} /> */}
        {/*<Route path="notifications" element={<Notifications />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="results" element={<Results />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<Settings />} /> */}
        {/* <Route path="/admin/update-event/:eventId" element={<UpdateEventForm />} /> */}
        {/* <Route path="events/:eventId/poster/edit" element={<PosterEditorWrapper />} />
        <Route path="events/:eventId/poster" element={<PosterViewerWrapper />} />
        <Route path="create-event" element={<CreateEventForm />} />
        <Route path="/admin/event-update/:eventId" element={<UpdateEventForm />} />
        <Route path="/admin/event-detail/:eventId" element={<EventDetailAdmin />} />
        <Route  path="/admin/event-registrations/:eventId" element={<RegistrationUser />}  /> */}
        </Route>
      </Routes>
  );
};

export default AdminRoutes;
