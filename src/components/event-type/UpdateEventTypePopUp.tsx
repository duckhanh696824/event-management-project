// src/components/UpdateEventTypeForm.tsx
import React, { useState, useEffect } from 'react';
import { EventType } from 'types/eventTypes';
import { updateEventType } from 'api/eventTypeApi';
import { showToast } from 'utils/toast';

interface UpdateEventTypePopUpProps {
  eventType: EventType;
  onSave: (id: string, name: string) => void;
  onCancel: () => void;
}

const UpdateEventTypePopUp: React.FC<UpdateEventTypePopUpProps> = ({ eventType, onSave, onCancel }) => {
  const [name, setName] = useState<string>(eventType.name);

  useEffect(() => {
    setName(eventType.name);
  }, [eventType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') {
      showToast({
        statusCode: 400,
        message: 'Tên loại sự kiện không được để trống',
      });
      return;
    }
    try {
      await onSave(eventType.id, name);
    } catch (error) {
      console.error('Error updating event type:', error);
      showToast({
        statusCode: 500,
        message: 'Đã xảy ra lỗi khi cập nhật loại sự kiện',
      });
    }
  };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
        onCancel();
        }
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-[90vw]">
        <h2 className="text-2xl font-bold mb-3 text-indigo-800">Chỉnh sửa loại sự kiện</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="name">
              Tên loại sự kiện
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="text-slate-600 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Lưu
            </button>            
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventTypePopUp;
