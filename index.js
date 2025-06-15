// initialization
import { submitEmail } from './api/index.js';

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")

// Email form elements
const heroEmailInput = document.getElementById("hero-email-input")
const heroGetAccessBtn = document.getElementById("hero-get-access-btn")
const footerEmailInput = document.getElementById("footer-email-input")
const footerGetAccessBtn = document.getElementById("footer-get-access-btn")
const bookDemoBtn = document.getElementById("book-demo-btn")

function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)

/**
 * Handle email submission
 * @param {string} email - The email to submit
 * @param {HTMLElement} button - The button that was clicked
 */
async function handleEmailSubmission(email, button) {
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Submitting...';
    button.disabled = true;

    try {
        const result = await submitEmail(email);
        
        console.log(result)
        if (result.success) {
            showNotification('Thank you! We\'ll be in touch soon.', 'success');
            // Clear the email input
            const emailInput = button.previousElementSibling || 
                              document.querySelector(`input[value="${email}"]`);
            if (emailInput) {
                emailInput.value = '';
            }
        } else {
            showNotification(result.message || 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        showNotification('Network error. Please check your connection and try again.', 'error');
        console.error('Email submission error:', error);
    } finally {
        // Restore button state
        button.textContent = originalText;
        button.disabled = false;
    }
}

/**
 * Show notification to user
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('success' or 'error')
 */
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Find which form was used by checking which button was recently clicked
    // We'll show the message in both form containers to ensure it's visible
    const heroMessage = document.getElementById('hero-message');
    const footerMessage = document.getElementById('footer-message');
    
    // Show message in both containers (one will be visible depending on which form was used)
    [heroMessage, footerMessage].forEach(messageElement => {
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = 'tw-mt-2 tw-text-sm tw-text-red-500';
            
            // Auto hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    messageElement.textContent = '';
                    messageElement.className = 'tw-mt-2 tw-text-sm tw-text-red-500 tw-hidden';
                }, 5000);
            }
        }
    });
}

// Event listeners for email submissions
if (heroGetAccessBtn) {
    heroGetAccessBtn.addEventListener('click', () => {
        const email = heroEmailInput?.value?.trim();
        handleEmailSubmission(email, heroGetAccessBtn);
    });
}

if (footerGetAccessBtn) {
    footerGetAccessBtn.addEventListener('click', () => {
        const email = footerEmailInput?.value?.trim();
        handleEmailSubmission(email, footerGetAccessBtn);
    });
}

// Handle "Book a demo" button - for now, we'll use a placeholder email
if (bookDemoBtn) {
    bookDemoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // For demo booking, we could either:
        // 1. Open a modal to collect email
        // 2. Use a placeholder email and show a message
        // 3. Redirect to a separate demo booking page
        
        // For now, let's show a message asking for email
        const email = prompt('Please enter your email address to book a demo:');
        if (email) {
            handleEmailSubmission(email, bookDemoBtn);
        }
    });
}

// Allow Enter key to submit email forms
if (heroEmailInput) {
    heroEmailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            heroGetAccessBtn.click();
        }
    });
}

if (footerEmailInput) {
    footerEmailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            footerGetAccessBtn.click();
        }
    });
}
