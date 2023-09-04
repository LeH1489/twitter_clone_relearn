"use client";

import Header from "../components/Header";
import NotificationFeed from "../components/NotificationFeed";

const NotificationPage = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationFeed />
    </>
  );
};

export default NotificationPage;
