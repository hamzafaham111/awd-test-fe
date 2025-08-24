import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Notification {
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

export interface NotificationFilters {
  priority?: 'high' | 'medium' | 'low' | 'all';
  type?: 'system' | 'auction' | 'payment' | 'inspection' | 'transport' | 'general' | 'all';
  readStatus?: 'read' | 'unread' | 'all';
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface NotificationResponse {
  notifications: Notification[];
  total: number;
  page: number;
  pageSize: number;
}

class NotificationService {
  private getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Get all notifications with filters
  async getNotifications(filters: NotificationFilters = {}): Promise<NotificationResponse> {
    try {
      const params = new URLSearchParams();
      
      if (filters.priority && filters.priority !== 'all') {
        params.append('priority', filters.priority);
      }
      
      if (filters.type && filters.type !== 'all') {
        params.append('type', filters.type);
      }
      
      if (filters.readStatus && filters.readStatus !== 'all') {
        params.append('is_read', filters.readStatus === 'read' ? 'true' : 'false');
      }
      
      if (filters.search) {
        params.append('search', filters.search);
      }
      
      if (filters.page) {
        params.append('page', filters.page.toString());
      }
      
      if (filters.pageSize) {
        params.append('page_size', filters.pageSize.toString());
      }

      const response = await axios.get(`${API_BASE_URL}/communication/api/v1/notifications/?${params.toString()}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  // Get unread notifications count
  async getUnreadCount(): Promise<number> {
    try {
      const response = await axios.get(`${API_BASE_URL}/communication/api/v1/notifications/unread-count/`, {
        headers: this.getAuthHeaders(),
      });

      return response.data.unread_count;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    try {
      await axios.patch(`${API_BASE_URL}/communication/api/v1/notifications/${notificationId}/mark-read/`, {}, {
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    try {
      await axios.patch(`${API_BASE_URL}/communication/api/v1/notifications/mark-all-read/`, {}, {
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/communication/api/v1/notifications/${notificationId}/`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  // Get recent notifications (for header bell)
  async getRecentNotifications(limit: number = 5): Promise<Notification[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/communication/api/v1/notifications/recent/?limit=${limit}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data.notifications;
    } catch (error) {
      console.error('Error fetching recent notifications:', error);
      throw error;
    }
  }

  // Create notification (for admin purposes)
  async createNotification(notificationData: Partial<Notification>): Promise<Notification> {
    try {
      const response = await axios.post(`${API_BASE_URL}/communication/api/v1/notifications/`, notificationData, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  // Update notification (for admin purposes)
  async updateNotification(notificationId: string, notificationData: Partial<Notification>): Promise<Notification> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/communication/api/v1/notifications/${notificationId}/`, notificationData, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  }

  // Get notification statistics
  async getNotificationStats(): Promise<{
    total: number;
    unread: number;
    read: number;
    byPriority: { high: number; medium: number; low: number };
    byType: { [key: string]: number };
  }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/communication/api/v1/notifications/stats/`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching notification stats:', error);
      throw error;
    }
  }
}

export const notificationService = new NotificationService();
export default notificationService;

