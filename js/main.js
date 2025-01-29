// Metrics Animation
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.metrics-list li').forEach(item => {
        observer.observe(item);
    });
});

// Work Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.work-slider');
    const track = document.querySelector('.work-track');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events for desktop
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
});

// Typing Animation
document.addEventListener('DOMContentLoaded', () => {
    const roles = document.querySelectorAll('.typing-text');
    let currentRole = 0;

    function typeNextRole() {
        // Hide all roles
        roles.forEach(role => {
            role.classList.remove('active');
            role.classList.remove('complete');
        });

        // Show and animate current role
        roles[currentRole].classList.add('active');

        // Calculate display duration based on text length
        const currentText = roles[currentRole].textContent;
        const displayDuration = Math.max(3000, currentText.length * 100); // Minimum 3s, plus extra time for longer text

        // After animation completes
        setTimeout(() => {
            roles[currentRole].classList.remove('active');
            roles[currentRole].classList.add('complete');
            
            // Move to next role
            currentRole = (currentRole + 1) % roles.length;
            
            // Start next typing after a delay
            setTimeout(typeNextRole, 1500); // Increased pause between roles
        }, displayDuration); // Dynamic duration based on text length
    }

    // Start the typing animation
    typeNextRole();
}); 