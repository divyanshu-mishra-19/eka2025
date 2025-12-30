import React, { useState, useEffect } from 'react';

/**
 * A mock implementation of Razorpay for development and testing purposes
 * @param {Object} options - Razorpay options
 * @returns {Object} - Razorpay instance methods
 */
const MockRazorpay = (options) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Simulate Razorpay modal open/close
  useEffect(() => {
    if (options.modal && isOpen) {
      console.log('Razorpay payment modal opened');
      
      // Auto-close after 2 seconds to simulate payment flow
      const timer = setTimeout(() => {
        if (options.handler) {
          options.handler({
            razorpay_payment_id: 'mock_payment_' + Math.random().toString(36).substr(2, 9),
            razorpay_order_id: options.order_id || 'order_' + Math.random().toString(36).substr(2, 9),
            razorpay_signature: 'mock_signature_' + Math.random().toString(36).substr(2, 16)
          });
        }
        setIsOpen(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, options]);

  // Mock Razorpay instance methods
  const instance = {
    open: () => {
      setIsOpen(true);
      if (options.modal && options.modal.ondismiss) {
        // Store the onDismiss handler for later use
        this.onDismiss = options.modal.ondismiss;
      }
    },
    close: () => {
      setIsOpen(false);
      if (this.onDismiss) {
        this.onDismiss();
      }
    },
    on: (event, callback) => {
      // Handle events if needed
      console.log(`MockRazorpay: ${event} event registered`);
    },
  };

  // Auto-open the modal when the component mounts
  useEffect(() => {
    if (options.modal && options.modal.ondismiss) {
      instance.onDismiss = options.modal.ondismiss;
    }
    instance.open();
    
    return () => {
      // Cleanup
      instance.close();
    };
  }, []);

  // For testing/demo purposes, you can render a simple modal
  if (isOpen && process.env.NODE_ENV === 'development') {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 9999,
        color: 'black',
        textAlign: 'center',
      }}>
        <h3>Mock Razorpay Payment</h3>
        <p>This is a mock payment interface for development.</p>
        <p>Amount: ₹{options.amount / 100}</p>
        <button 
          onClick={() => {
            if (options.handler) {
              options.handler({
                razorpay_payment_id: 'mock_payment_' + Math.random().toString(36).substr(2, 9),
                razorpay_order_id: options.order_id || 'order_' + Math.random().toString(36).substr(2, 9),
                razorpay_signature: 'mock_signature_' + Math.random().toString(36).substr(2, 16)
              });
            }
            instance.close();
          }}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Complete Payment
        </button>
        <button 
          onClick={() => instance.close()}
          style={{
            background: '#f44336',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
            marginLeft: '10px',
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return null;
};

export default MockRazorpay;
