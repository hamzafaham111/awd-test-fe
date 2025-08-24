"use client";

import React, { useState, useEffect } from 'react';
import './notifications.css';
import { 
  Card, 
  List, 
  Tag, 
  Space, 
  Typography, 
  Avatar, 
  Badge, 
  Empty, 
  Spin,
  Button,
  Select,
  Input,
  Row,
  Col,
  Divider,
  Alert
} from 'antd';
import { 
  BellOutlined, 
  ExclamationCircleOutlined, 
  InfoCircleOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  ClearOutlined,
  ReloadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { useNotifications } from '@/hooks/useNotifications';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

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
  metadata?: {
    auctionId?: string;
    amount?: number;
    vehicleId?: string;
    [key: string]: any;
  };
}

// Remove mock data - now using real-time API

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

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'auction':
      return '🏆';
    case 'payment':
      return '💰';
    case 'inspection':
      return '🔍';
    case 'transport':
      return '🚚';
    case 'system':
      return '⚙️';
    default:
      return '📢';
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

export default function NotificationsPage() {
  // Use the notifications hook with real-time API
  const {
    notifications,
    loading,
    error,
    total,
    currentPage,
    pageSize,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    handlePageChange
  } = useNotifications();

  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [filters, setFilters] = useState({
    priority: 'all',
    type: 'all',
    readStatus: 'all',
    search: ''
  });

  useEffect(() => {
    // Apply filters locally
    let filtered = notifications;
    
    if (filters.priority !== 'all') {
      filtered = filtered.filter(n => n.priority === filters.priority);
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(n => n.type === filters.type);
    }
    
    if (filters.readStatus !== 'all') {
      filtered = filtered.filter(n => 
        filters.readStatus === 'read' ? n.isRead : !n.isRead
      );
    }
    
    if (filters.search) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        n.content.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    setFilteredNotifications(filtered);
  }, [notifications, filters]);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearFilters = () => {
    setFilters({
      priority: 'all',
      type: 'all',
      readStatus: 'all',
      search: ''
    });
  };

  // unreadCount is now provided by the hook

  const renderNotificationItem = (notification: Notification) => (
    <List.Item
      key={notification.id}
      className={`notification-item ${!notification.isRead ? 'unread' : ''} hover:shadow-md transition-all duration-200`}
      data-priority={notification.priority}
      style={{
        backgroundColor: notification.isRead ? 'transparent' : '#f0f9ff',
        borderLeft: `4px solid ${notification.isRead ? '#e5e7eb' : getPriorityColor(notification.priority) === 'red' ? '#ef4444' : getPriorityColor(notification.priority) === 'orange' ? '#f97316' : '#3b82f6'}`,
        borderRadius: '8px',
        marginBottom: '8px',
        padding: '16px',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
      onClick={() => {
        if (!notification.isRead) {
          handleMarkAsRead(notification.id);
        }
      }}
    >
      <div className="flex items-start w-full">
        <div className="flex-shrink-0 mr-3">
          <Badge count={notification.isRead ? 0 : 1} size="small">
            <Avatar 
              size={48} 
              icon={getPriorityIcon(notification.priority)}
              style={{ 
                backgroundColor: getPriorityColor(notification.priority) === 'red' ? '#fef2f2' : 
                              getPriorityColor(notification.priority) === 'orange' ? '#fff7ed' : '#eff6ff'
              }}
            />
          </Badge>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Title level={5} className="mb-0" style={{ color: notification.isRead ? '#6b7280' : '#111827' }}>
                {notification.title}
              </Title>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
            <Space size="small">
              <Tag color={getTypeColor(notification.type)}>
                {getTypeIcon(notification.type)} {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
              </Tag>
              <Tag color={getPriorityColor(notification.priority)}>
                {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
              </Tag>
            </Space>
          </div>
          
          <Paragraph className="mb-2 text-gray-600">
            {notification.content}
          </Paragraph>
          
          <div className="flex items-center justify-between">
            <Space size="middle">
              <Text type="secondary" className="text-sm">
                <ClockCircleOutlined className="mr-1" />
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </Text>
              {notification.sender && (
                <Text type="secondary" className="text-sm">
                  From: {notification.sender}
                </Text>
              )}
            </Space>
            
            <Space size="small">
              {notification.actionUrl && (
                <Button 
                  type="link" 
                  size="small"
                  className="p-0 h-auto text-blue-600 hover:text-blue-800"
                >
                  View Details
                </Button>
              )}
              {!notification.isRead && (
                <Button 
                  type="link" 
                  size="small"
                  className="p-0 h-auto text-gray-500 hover:text-gray-700"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Mark as Read
                </Button>
              )}
            </Space>
          </div>
          
          {notification.metadata && Object.keys(notification.metadata).length > 0 && (
            <div className="mt-3 p-2 bg-gray-50 rounded-md">
              <Text type="secondary" className="text-xs font-medium">Additional Info:</Text>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.entries(notification.metadata).map(([key, value]) => (
                  <Tag key={key} className="text-xs">
                    {key}: {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </List.Item>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BellOutlined className="text-2xl text-blue-600" />
            <Title level={2} className="mb-0">Notifications</Title>
            {unreadCount > 0 && (
              <Badge count={unreadCount} size="small" className="ml-2">
                <div className="w-6 h-6"></div>
              </Badge>
            )}
            
            {/* Real-time status indicator */}
            <div className="flex items-center gap-2">
              {loading && <Spin size="small" />}
              {error && <span className="text-red-500 text-xs">Error loading</span>}
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Live Updates</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              type="text" 
              icon={<ReloadOutlined />} 
              onClick={() => fetchNotifications()}
              loading={loading}
              title="Refresh notifications"
            />
            <Button 
              type="primary" 
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              icon={<CheckCircleOutlined />}
            >
              Mark All as Read
            </Button>
          </div>
        </div>
        
        <Text type="secondary">
          Stay updated with important updates, auction results, payments, and system notifications
        </Text>
        
        {/* Error alert */}
        {error && (
          <Alert
            message="Error loading notifications"
            description={error}
            type="error"
            showIcon
            className="mt-3"
            action={
              <Button size="small" onClick={() => fetchNotifications()}>
                Retry
              </Button>
            }
          />
        )}
      </div>

      {/* Filters Section */}
      <Card className="mb-6 shadow-sm notifications-filters">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <div>
              <Text strong className="block mb-2">Priority</Text>
              <Select
                value={filters.priority}
                onChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}
                className="w-full"
                placeholder="All Priorities"
              >
                <Option value="all">All Priorities</Option>
                <Option value="high">High Priority</Option>
                <Option value="medium">Medium Priority</Option>
                <Option value="low">Low Priority</Option>
              </Select>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div>
              <Text strong className="block mb-2">Type</Text>
              <Select
                value={filters.type}
                onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                className="w-full"
                placeholder="All Types"
              >
                <Option value="all">All Types</Option>
                <Option value="auction">Auction</Option>
                <Option value="payment">Payment</Option>
                <Option value="inspection">Inspection</Option>
                <Option value="transport">Transport</Option>
                <Option value="system">System</Option>
                <Option value="general">General</Option>
              </Select>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div>
              <Text strong className="block mb-2">Status</Text>
              <Select
                value={filters.readStatus}
                onChange={(value) => setFilters(prev => ({ ...prev, readStatus: value }))}
                className="w-full"
                placeholder="All Statuses"
              >
                <Option value="all">All Statuses</Option>
                <Option value="unread">Unread Only</Option>
                <Option value="read">Read Only</Option>
              </Select>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <div>
              <Text strong className="block mb-2">Search</Text>
              <Search
                placeholder="Search notifications..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                prefix={<SearchOutlined />}
                allowClear
                className="notifications-search"
              />
            </div>
          </Col>
        </Row>
        
        <Divider className="my-4" />
        
        <div className="flex items-center justify-between">
          <Text type="secondary">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </Text>
          
          <Button 
            icon={<ClearOutlined />}
            onClick={handleClearFilters}
            disabled={filters.priority === 'all' && filters.type === 'all' && filters.readStatus === 'all' && !filters.search}
          >
            Clear Filters
          </Button>
        </div>
      </Card>

      {/* Notifications List */}
      <Card className="shadow-sm">
        {loading ? (
          <div className="text-center py-12">
            <Spin size="large" />
            <div className="mt-4 text-gray-500">Loading notifications...</div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <Text type="secondary">No notifications found</Text>
                <br />
                <Text type="secondary">Try adjusting your filters or check back later</Text>
              </div>
            }
            className="py-12"
          />
        ) : (
          <List
            dataSource={filteredNotifications}
            renderItem={renderNotificationItem}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notifications`,
              className: 'mt-6',
              onChange: handlePageChange,
              onShowSizeChange: handlePageChange
            }}
          />
        )}
      </Card>
    </div>
  );
}
