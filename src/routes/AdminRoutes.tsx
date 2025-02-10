import EventManagement from "components/event/admin/EventListAdmin";
import UpdateEventPage from "pages/admin/event/UpdateEventPage";
import CreateEventPage from "pages/admin/event/CreateEventPage";
import DetailEventAdminPage from "pages/admin/DetailEventAdminPage";
import EventTypeListPage from "pages/admin/event-type/EventTypeListPage";
import EventRegistrationPage from "pages/admin/EventRegistrationPage";
import EventTypeListPage from "pages/admin/event-type/EventTypeListPage";




import AdminLayout from "pages/layouts/AdminLayout";
import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
// import Dashboard from "components/common/StatisticsDashboard";
// import Registration from "components/Registration/RegistrationTable";
// import Notifications from "../pages/admin/Notifications";
// import Attendance from "../pages/admin/Attendance";
// import Results from "../pages/admin/Results";
// import Statistics from "../pages/admin/Statistics";
// import Settings from "../pages/admin/Settings";
// import CreateEventForm from "pages/admin/event/CreateEventForm";
// import EventManagement from "components/event/admin/EventListAdmin";
// import RegistrationUser from "components/Registration/RegistrationUser";
// import UpdateEventForm from "components/event/admin/UpdateEventForm";
// import EventDetailAdmin from "components/event/admin/EventDetailAdmin";
// import EventTypeList from "components/event_type/EventTypeList";
// import  PosterEditor   from "components/event/admin/PosterEditor";
// import { PosterViewer } from "components/event/admin/PosterViewer";

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
        <Route path="event-types" element={<EventTypeListPage />} />
        {/* <Route path="registration" element={<Registration />} />
        <Route path="event-types" element={<EventTypeList />} /> */}
        {/*<Route path="notifications" element={<Notifications />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="results" element={<Results />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<Settings />} /> */}
        {/* <Route path="events/:eventId/poster/edit" element={<PosterEditorWrapper />} />
        <Route path="events/:eventId/poster" element={<PosterViewerWrapper />} />
        <Route  path="/admin/event-registrations/:eventId" element={<RegistrationUser />}  /> */}
        </Route>
      </Routes>
  );
};

export default AdminRoutes;
