// animation.js
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Clear any existing circles
    const existingCircles = document.querySelectorAll('.circle');
    existingCircles.forEach(circle => circle.remove());

    // Create 12 circles instead of 5
    for (let i = 0; i < 12; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        
        // Random initial position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        circle.style.left = `${posX}%`;
        circle.style.top = `${posY}%`;
        
        // Random size between 40px and 80px
        const size = 40 + Math.random() * 40;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        
        // Random opacity
        const opacity = 0.2 + Math.random() * 0.3;
        circle.style.opacity = opacity;
        
        // Random border width
        const borderWidth = 1 + Math.random() * 2;
        circle.style.borderWidth = `${borderWidth}px`;
        
        hero.appendChild(circle);
        
        // More dynamic animation with GSAP
        gsap.to(circle, {
            x: () => (Math.random() - 0.5) * 300, // More random movement
            y: () => (Math.random() - 0.5) * 300,
            scale: () => 0.5 + Math.random() * 0.7, // Random scale
            opacity: () => 0.2 + Math.random() * 0.5, // Random opacity
            duration: () => 8 + Math.random() * 10, // Random duration
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3
        });
    }
    
    console.log('Animation with more circles initialized!');
});