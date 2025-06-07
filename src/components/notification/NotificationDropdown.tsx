// src/components/NotificationDropdown.tsx
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { getNotifications, Notification } from "api/notificationsApi";
import { useNavigate } from "react-router-dom";
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getNotifications();
      if (response && response.statusCode === 200 && response.data && response.data.notifications) {
        // Sort notifications by created_at (newest first)
        const sortedNotifications = response.data.notifications.sort(
          (a: Notification, b: Notification) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setNotifications(sortedNotifications);
        
        // Calculate unread notifications (from the last 24 hours)
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        const unreadNotifications = sortedNotifications.filter(
          (noti: Notification) => new Date(noti.created_at) > oneDayAgo
        );
        setUnreadCount(unreadNotifications.length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch notifications when component mounts and periodically
    fetchNotifications();
    
    // Set up periodic refresh (every 5 minutes)
    const intervalId = setInterval(fetchNotifications, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Format timestamp to a readable format
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = parseISO(timestamp);
      
      if (isToday(date)) {
        return `Hôm nay, ${format(date, 'HH:mm')}`;
      } else if (isYesterday(date)) {
        return `Hôm qua, ${format(date, 'HH:mm')}`;
      } else {
        return format(date, 'dd/MM/yyyy, HH:mm', { locale: vi });
      }
    } catch (error) {
      return timestamp; // Return original if parsing fails
    }
  };

  // Get appropriate icon/color based on notification heading
  const getNotificationStyles = (heading: string) => {
    if (heading.includes("Đăng ký") || heading.includes("thành công")) {
      return { bgColor: 'bg-green-100', textColor: 'text-green-800' };
    } else if (heading.includes("Hủy đăng ký")) {
      return { bgColor: 'bg-red-100', textColor: 'text-red-800' };
    } else if (heading.includes("Nhắc nhở")) {
      return { bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
    } else {
      return { bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      fetchNotifications();
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Only navigate to event details if this is an event notification
    if (notification.entity === 'event' && notification.entity_id) {
      navigate(`/event/${notification.entity_id}`);
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = document.getElementById('notification-dropdown');
      const buttonElement = document.getElementById('notification-button');
      
      if (
        dropdownElement && 
        buttonElement && 
        !dropdownElement.contains(event.target as Node) && 
        !buttonElement.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button 
        id="notification-button"
        onClick={toggleDropdown} 
        className="relative p-3 rounded-full hover:bg-indigo-700 transition-colors text-gray-700 hover:text-white"
        title="Thông báo"
      >
        <Bell className="w-6 h-6 cursor-pointer" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-indigo-600 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {showDropdown && (
        <div 
          id="notification-dropdown"
          className="absolute right-0 mt-2 w-96 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Thông báo</h3>
            {notifications.length > 0 && (
              <button 
                onClick={() => {
                  navigate("/notifications");
                  setShowDropdown(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Xem tất cả
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="p-4 text-center text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
              Đang tải thông báo...
            </div>
          ) : notifications.length > 0 ? (
            <ul>
              {notifications.map((noti, index) => {
                const { bgColor, textColor } = getNotificationStyles(noti.heading);
                
                return (
                  <li
                    key={noti.id || index}
                    onClick={() => handleNotificationClick(noti)}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${bgColor}`}></div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-800">
                          {noti.description || noti.heading}
                        </div>
                        <div className="mt-1 flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">
                            {noti.title}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(noti.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-gray-400" />
              </div>
              <p>Không có thông báo nào.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;