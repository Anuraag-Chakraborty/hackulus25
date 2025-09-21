// Login form functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const loginBtn = document.querySelector('.login-btn');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const createAccountLink = document.querySelector('.create-account');
    
    // Add focus effects to input fields
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(156, 136, 255, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effect to login button
    loginBtn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #8b5cf6, #6d28d9)';
    });
    
    loginBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #7c3aed, #553c9a)';
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Basic validation
        if (!username || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Add loading state
        loginBtn.textContent = 'LOGGING IN...';
        loginBtn.disabled = true;
        
        // Simulate login process
        setTimeout(() => {
            // Reset button
            loginBtn.textContent = 'LOGIN';
            loginBtn.disabled = false;
            
            // For demo purposes, show success message
            showMessage('Login successful!', 'success');
            
            // In a real application, you would send the data to a server
            console.log('Login attempt:', { username, password });
        }, 2000);
    });
    
    // Handle forgot password link
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showMessage('Password reset link would be sent to your email', 'info');
    });
    
    // Handle create account link
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        showMessage('Redirecting to registration page...', 'info');
    });
    
    // Navbar link interactions
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add ripple effect
            createRipple(this, e);
        });
    });
    
    // Create ripple effect for buttons
    function createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Message display function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        `;
        
        // Set color based on type
        switch(type) {
            case 'success':
                messageDiv.style.background = '#10b981';
                break;
            case 'error':
                messageDiv.style.background = '#ef4444';
                break;
            case 'info':
                messageDiv.style.background = '#3b82f6';
                break;
            default:
                messageDiv.style.background = '#6b7280';
        }
        
        document.body.appendChild(messageDiv);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.5s ease-in forwards';
            setTimeout(() => {
                messageDiv.remove();
            }, 500);
        }, 3000);
    }
    
    // Add CSS animations for messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Dynamic background animation
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animation = `float ${3 + index}s ease-in-out infinite`;
        shape.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform += ` translate(${x}px, ${y}px)`;
        });
        
        // Move illustrations slightly
        const leftIllustration = document.querySelector('.left-illustration');
        const rightIllustration = document.querySelector('.right-illustration');
        
        if (leftIllustration && rightIllustration) {
            leftIllustration.style.transform = `translateX(${(mouseX - 0.5) * 10}px)`;
            rightIllustration.style.transform = `translateX(${(mouseX - 0.5) * -10}px)`;
        }
    });
});