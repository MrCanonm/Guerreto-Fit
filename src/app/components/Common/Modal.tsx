"use client"

import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white px-8 py-3 rounded-lg shadow-2xl w-full max-w-2xl mx-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
