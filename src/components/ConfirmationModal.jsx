import React from "react";
import { RxCross1 } from "react-icons/rx";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        <div className="bg-white rounded-lg shadow-xl max-w-md w-full z-10 relative">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <RxCross1 className="size-5" />
            </button>
          </div>

          <div className="p-4">
            <p className="text-gray-700 mb-4">{message}</p>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
