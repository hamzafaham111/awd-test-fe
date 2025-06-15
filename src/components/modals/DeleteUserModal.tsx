import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteUserModal = ({ isOpen, onClose, onConfirm, loading = false }: DeleteUserModalProps) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ExclamationCircleFilled className="text-red-500 text-xl" />
          <span>Delete User</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      onOk={onConfirm}
      okText="Yes, Delete"
      cancelText="No, Cancel"
      okButtonProps={{
        danger: true,
        loading: loading,
        className: 'bg-red-500 hover:bg-red-600'
      }}
      cancelButtonProps={{
        className: 'hover:bg-gray-100'
      }}
    >
      <div className="py-4">
        <p className="text-gray-700">Are you sure you want to delete this user? This action cannot be undone.</p>
      </div>
    </Modal>
  );
};

export default DeleteUserModal; 