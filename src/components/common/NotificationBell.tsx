"use client";

import React, { useState } from 'react';
import { Badge, Popover, Button, List, Typography, Space, Tag, Avatar, Empty, Spin } from 'antd';
import { BellOutlined, ExclamationCircleOutlined, InfoCircleOutlined, CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useRealTimeNotifications } from '@/hooks/useNotifications';

const { Text, Title } = Typography;

interface Notification {
  id: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  type: 'system' | 'auction' | 'payment' | 'inspection' | 'transport' | 'general';
  isRead: boolean;
  createdAt: string;
  sender?: string;
  actionUrl?: string;
}

// Remove mock data - now using real-time API

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
    case 'medium':
      return <InfoCircleOutlined style={{ color: '#fa8c16' }} />;
    case 'low':
      return <CheckCircleOutlined style={{ color: '#1890ff' }} />;
    default:
      return <InfoCircleOutlined />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'red';
    case 'medium':
      return 'orange';
    case 'low':
      return 'blue';
    default:
      return 'default';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'auction':
      return 'purple';
    case 'payment':
      return 'green';
    case 'inspection':
      return 'cyan';
    case 'transport':
      return 'blue';
    case 'system':
      return 'gray';
    default:
      return 'default';
  }
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  // Use real-time notifications hook with 30-second polling
  const {
    notifications,
    unreadCount,
    loading,
    error,
    lastUpdate,
    isRealTime,
    markAsRead,
    refresh,
    pausePolling,
    resumePolling
  } = useRealTimeNotifications(30000); // 30 seconds

  const recentNotifications = notifications.slice(0, 5); // Show only 5 most recent

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleViewAll = () => {
    setOpen(false);
    router.push('/notifications');
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
    setOpen(false);
  };

  const notificationContent = (
    <div className="w-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Title level={5} className="mb-0">Notifications</Title>
          {loading && <Spin size="small" />}
          {error && <span className="text-red-500 text-xs">Error loading</span>}
          {isRealTime && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            type="text" 
            size="small" 
            icon={<ReloadOutlined />} 
            onClick={refresh}
            loading={loading}
            title="Refresh notifications"
          />
          <Button type="link" size="small" onClick={handleViewAll}>
            View All
          </Button>
        </div>
      </div>
      
      {recentNotifications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No notifications"
          className="py-4"
        />
      ) : (
        <List
          dataSource={recentNotifications}
          renderItem={(notification) => (
            <List.Item
              key={notification.id}
              className={`cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start w-full">
                <div className="flex-shrink-0 mr-3">
                  <Avatar 
                    size={32} 
                    icon={getPriorityIcon(notification.priority)}
                    style={{ 
                      backgroundColor: getPriorityColor(notification.priority) === 'red' ? '#fef2f2' : 
                                    getPriorityColor(notification.priority) === 'orange' ? '#fff7ed' : '#eff6ff'
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Title level={5} className="mb-0 text-sm" style={{ 
                      color: notification.isRead ? '#6b7280' : '#111827',
                      fontWeight: notification.isRead ? 'normal' : '600'
                    }}>
                      {notification.title}
                    </Title>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <Text className="text-xs text-gray-600 line-clamp-2 mb-2 block">
                    {notification.content}
                  </Text>
                  
                  <div className="flex items-center justify-between">
                    <Space size="small">
                      <Tag color={getTypeColor(notification.type)}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </Tag>
                      <Tag color={getPriorityColor(notification.priority)}>
                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                      </Tag>
                    </Space>
                    
                    <Text type="secondary" className="text-xs">
                      {new Date(notification.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </Text>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
          className="max-h-96 overflow-y-auto"
        />
      )}
      
      {notifications.length > 5 && (
        <div className="text-center pt-2 border-t">
          <Button type="link" size="small" onClick={handleViewAll}>
            View {notifications.length - 5} more notifications
          </Button>
        </div>
      )}
      
      {lastUpdate && (
        <div className="text-center pt-2 border-t text-xs text-gray-500">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  );

  return (
    <Popover
      content={notificationContent}
      title={null}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      overlayClassName="notification-popover"
    >
      <Badge count={unreadCount} size="small" offset={[-5, 5]}>
        <Button
          type="text"
          icon={<BellOutlined className="text-lg" />}
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full"
          onClick={() => setOpen(!open)}
        />
      </Badge>
    </Popover>
  );
}
