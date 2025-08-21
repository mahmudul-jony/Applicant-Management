// Comprehensive error handling system for the Applicant Management System
window.ErrorHandler = {
    // Global error handler
    handleError: function(error, context = 'Unknown') {
        try {
            console.error(`Error in ${context}:`, error);
            
            // Log error to console with stack trace
            if (error.stack) {
                console.error('Stack trace:', error.stack);
            }
            
            // Show user-friendly error message
            this.showErrorMessage(error.message || 'An unexpected error occurred', 'error');
            
            // Send error to monitoring service (if configured)
            this.logErrorToService(error, context);
            
        } catch (handlingError) {
            console.error('Error in error handler:', handlingError);
        }
    },

    // Show user-friendly error messages
    showErrorMessage: function(message, type = 'error') {
        try {
            // Use existing notification system if available
            if (window.FormValidator && window.FormValidator.showNotification) {
                window.FormValidator.showNotification(message, type);
            } else {
                // Fallback to simple alert
                alert(`${type.toUpperCase()}: ${message}`);
            }
        } catch (error) {
            console.error('Error showing error message:', error);
            alert(message);
        }
    },

    // Log errors to external service (placeholder for production)
    logErrorToService: function(error, context) {
        try {
            // In production, you would send this to a logging service
            // For now, we'll just log to console
            const errorData = {
                message: error.message,
                stack: error.stack,
                context: context,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            console.log('Error logged:', errorData);
            
            // Example: Send to external service
            // fetch('/api/log-error', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(errorData)
            // });
            
        } catch (error) {
            console.error('Error logging to service:', error);
        }
    },

    // Wrap functions with error handling
    wrapFunction: function(func, context) {
        return function(...args) {
            try {
                return func.apply(this, args);
            } catch (error) {
                window.ErrorHandler.handleError(error, context);
                return null;
            }
        };
    },

    // Initialize global error handling
    init: function() {
        try {
            // Handle unhandled promise rejections
            window.addEventListener('unhandledrejection', function(event) {
                console.error('Unhandled promise rejection:', event.reason);
                window.ErrorHandler.handleError(event.reason, 'Unhandled Promise Rejection');
                event.preventDefault();
            });

            // Handle global JavaScript errors
            window.addEventListener('error', function(event) {
                console.error('Global error:', event.error);
                window.ErrorHandler.handleError(event.error, 'Global Error');
            });

            // Handle resource loading errors
            window.addEventListener('error', function(event) {
                if (event.target !== window) {
                    console.error('Resource loading error:', event.target.src || event.target.href);
                    window.ErrorHandler.handleError(new Error(`Failed to load resource: ${event.target.src || event.target.href}`), 'Resource Loading Error');
                }
            }, true);

            // Handle console errors
            const originalConsoleError = console.error;
            console.error = function(...args) {
                originalConsoleError.apply(console, args);
                
                // Check if it's a real error vs just logging
                if (args[0] instanceof Error) {
                    window.ErrorHandler.handleError(args[0], 'Console Error');
                }
            };

            console.log('Error handling system initialized');
            
        } catch (error) {
            console.error('Error initializing error handler:', error);
        }
    }
};

// Performance monitoring
window.PerformanceMonitor = {
    metrics: {},
    
    startTimer: function(name) {
        this.metrics[name] = performance.now();
    },
    
    endTimer: function(name) {
        if (this.metrics[name]) {
            const duration = performance.now() - this.metrics[name];
            console.log(`${name} took ${duration.toFixed(2)}ms`);
            
            // Log slow operations
            if (duration > 100) {
                console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
            }
            
            delete this.metrics[name];
            return duration;
        }
        return 0;
    },
    
    measureFunction: function(func, name) {
        return function(...args) {
            window.PerformanceMonitor.startTimer(name);
            try {
                const result = func.apply(this, args);
                window.PerformanceMonitor.endTimer(name);
                return result;
            } catch (error) {
                window.PerformanceMonitor.endTimer(name);
                throw error;
            }
        };
    }
};

// DOM utility functions with error handling
window.DOMUtils = {
    // Safely get element by ID
    getElement: function(id) {
        try {
            const element = document.getElementById(id);
            if (!element) {
                console.warn(`Element with ID '${id}' not found`);
            }
            return element;
        } catch (error) {
            window.ErrorHandler.handleError(error, `getElement(${id})`);
            return null;
        }
    },

    // Safely query selector
    querySelector: function(selector, parent = document) {
        try {
            const element = parent.querySelector(selector);
            if (!element) {
                console.warn(`Element with selector '${selector}' not found`);
            }
            return element;
        } catch (error) {
            window.ErrorHandler.handleError(error, `querySelector(${selector})`);
            return null;
        }
    },

    // Safely add event listener
    addEventListener: function(element, event, handler, options = {}) {
        try {
            if (element && typeof handler === 'function') {
                element.addEventListener(event, handler, options);
                return true;
            } else {
                console.warn('Invalid element or handler for event listener');
                return false;
            }
        } catch (error) {
            window.ErrorHandler.handleError(error, `addEventListener(${event})`);
            return false;
        }
    },

    // Safely remove event listener
    removeEventListener: function(element, event, handler, options = {}) {
        try {
            if (element && typeof handler === 'function') {
                element.removeEventListener(event, handler, options);
                return true;
            } else {
                console.warn('Invalid element or handler for event listener removal');
                return false;
            }
        } catch (error) {
            window.ErrorHandler.handleError(error, `removeEventListener(${event})`);
            return false;
        }
    },

    // Safely manipulate classes
    addClass: function(element, className) {
        try {
            if (element && element.classList) {
                element.classList.add(className);
                return true;
            }
            return false;
        } catch (error) {
            window.ErrorHandler.handleError(error, `addClass(${className})`);
            return false;
        }
    },

    removeClass: function(element, className) {
        try {
            if (element && element.classList) {
                element.classList.remove(className);
                return true;
            }
            return false;
        } catch (error) {
            window.ErrorHandler.handleError(error, `removeClass(${className})`);
            return false;
        }
    },

    // Safely set styles
    setStyle: function(element, property, value) {
        try {
            if (element && element.style) {
                element.style[property] = value;
                return true;
            }
            return false;
        } catch (error) {
            window.ErrorHandler.handleError(error, `setStyle(${property})`);
            return false;
        }
    }
};

// Initialize error handling when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        window.ErrorHandler.init();
        console.log('Application initialized with error handling');
    } catch (error) {
        console.error('Failed to initialize error handling:', error);
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ErrorHandler: window.ErrorHandler,
        PerformanceMonitor: window.PerformanceMonitor,
        DOMUtils: window.DOMUtils
    };
}
