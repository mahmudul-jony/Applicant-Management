// Form validation and enhancement for the Applicant Management System
document.addEventListener("DOMContentLoaded", function() {
    try {
        initializeFormValidation();
        setupFormEnhancements();
    } catch (error) {
        console.error("Error initializing form validation:", error);
    }
});

function initializeFormValidation() {
    try {
        // Add applicant form validation
        const addApplicantForm = document.querySelector('#add-Applicant-modal form');
        if (addApplicantForm) {
            setupFormValidation(addApplicantForm, validateAddApplicantForm);
        }

        // Add university form validation
        const addUniversityForm = document.querySelector('#add-university form');
        if (addUniversityForm) {
            setupFormValidation(addUniversityForm, validateAddUniversityForm);
        }

        // Chat form validation
        const chatForm = document.querySelector('form');
        if (chatForm && chatForm.querySelector('#chat')) {
            setupFormValidation(chatForm, validateChatForm);
        }

    } catch (error) {
        console.error("Error setting up form validation:", error);
    }
}

function setupFormValidation(form, validationFunction) {
    try {
        if (!form || !validationFunction) return;

        // Add submit event listener
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validationFunction(form)) {
                // Form is valid, proceed with submission
                handleFormSubmission(form);
            }
        });

        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });

    } catch (error) {
        console.error("Error setting up form validation:", error);
    }
}

function validateAddApplicantForm(form) {
    try {
        let isValid = true;
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'crm-id'];
        requiredFields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field && !field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate email format
        const emailField = form.querySelector('[name="email"]');
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                showFieldError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Validate phone number (if provided)
        const phoneField = form.querySelector('[name="phone"]');
        if (phoneField && phoneField.value.trim()) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phoneField.value.trim().replace(/[\s\-\(\)]/g, ''))) {
                showFieldError(phoneField, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        return isValid;
    } catch (error) {
        console.error("Error validating add applicant form:", error);
        return false;
    }
}

function validateAddUniversityForm(form) {
    try {
        let isValid = true;
        
        // Validate required fields
        const requiredFields = ['university-name', 'course-name'];
        requiredFields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field && !field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate dates
        const offerDateField = form.querySelector('[name="offer-date"]');
        const confirmationDateField = form.querySelector('[name="confirmation-date"]');
        
        if (offerDateField && confirmationDateField && 
            offerDateField.value && confirmationDateField.value) {
            
            const offerDate = new Date(offerDateField.value);
            const confirmationDate = new Date(confirmationDateField.value);
            
            if (confirmationDate < offerDate) {
                showFieldError(confirmationDateField, 'Confirmation date cannot be before offer date');
                isValid = false;
            }
        }

        return isValid;
    } catch (error) {
        console.error("Error validating add university form:", error);
        return false;
    }
}

function validateChatForm(form) {
    try {
        let isValid = true;
        
        const chatInput = form.querySelector('#chat');
        const followUpInput = form.querySelector('#follow-up');
        
        if (chatInput && !chatInput.value.trim()) {
            showFieldError(chatInput, 'Please enter today\'s discussion');
            isValid = false;
        }
        
        if (followUpInput && !followUpInput.value.trim()) {
            showFieldError(followUpInput, 'Please enter the next follow-up issue');
            isValid = false;
        }

        return isValid;
    } catch (error) {
        console.error("Error validating chat form:", error);
        return false;
    }
}

function validateField(field) {
    try {
        const value = field.value.trim();
        
        // Clear previous errors
        clearFieldError(field);
        
        // Check if required
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation
        if (field.name === 'phone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    } catch (error) {
        console.error("Error validating field:", error);
        return false;
    }
}

function showFieldError(field, message) {
    try {
        // Remove existing error
        clearFieldError(field);
        
        // Add error class
        field.classList.add('error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        errorDiv.setAttribute('data-field-error', field.name || field.id);
        
        // Insert after field
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        
    } catch (error) {
        console.error("Error showing field error:", error);
    }
}

function clearFieldError(field) {
    try {
        // Remove error class
        field.classList.remove('error');
        
        // Remove error message
        const errorDiv = field.parentNode.querySelector(`[data-field-error="${field.name || field.id}"]`);
        if (errorDiv) {
            errorDiv.remove();
        }
        
    } catch (error) {
        console.error("Error clearing field error:", error);
    }
}

function handleFormSubmission(form) {
    try {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Saving...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('Form submitted successfully!', 'success');
                
                // Close modal if it's a modal form
                const modal = form.closest('[id$="-modal"], [id$="-onboard"], [id$="-profile"], [id$="-university"]');
                if (modal) {
                    modal.style.display = 'none';
                    
                    // Reset form
                    form.reset();
                    
                    // Show applicant list if it was hidden
                    if (modal.id === 'add-Applicant-modal') {
                        const listSection = document.getElementById('applicant-list-section');
                        if (listSection) {
                            listSection.style.display = 'block';
                        }
                    }
                }
                
            }, 1000);
        }
        
    } catch (error) {
        console.error("Error handling form submission:", error);
        showNotification('Error submitting form. Please try again.', 'error');
    }
}

function setupFormEnhancements() {
    try {
        // Auto-resize textareas
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        });
        
        // Auto-format phone numbers
        const phoneInputs = document.querySelectorAll('input[name="phone"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = value;
                    } else if (value.length <= 6) {
                        value = value.slice(0, 3) + '-' + value.slice(3);
                    } else {
                        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                    }
                }
                e.target.value = value;
            });
        });
        
        // Auto-format CRM ID
        const crmInputs = document.querySelectorAll('input[name="crm-id"]');
        crmInputs.forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
                if (value.length > 0) {
                    if (value.length <= 4) {
                        value = value;
                    } else if (value.length <= 7) {
                        value = value.slice(0, 4) + ' ' + value.slice(4);
                    } else {
                        value = value.slice(0, 4) + ' ' + value.slice(4, 7) + ' ' + value.slice(7, 10);
                    }
                }
                e.target.value = value;
            });
        });
        
    } catch (error) {
        console.error("Error setting up form enhancements:", error);
    }
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
    try {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    } catch (error) {
        console.error("Error showing notification:", error);
        // Fallback to alert if notification fails
        alert(message);
    }
}

// Export functions for global use
window.FormValidator = {
    validateField,
    showFieldError,
    clearFieldError,
    showNotification
};
