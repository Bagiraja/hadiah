// Floating hearts background animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsBackground');
    if (!heartsContainer) return;
    
    const heartSymbols = ['💖', '💕', '💗', '💝', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    
    setInterval(() => {
        if (document.querySelectorAll('.heart').length < 8) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
        }
    }, 1500);
}

// Heart canvas animation for love page
function initHeartCanvas() {
    const canvas = document.getElementById("hearts");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let hearts = [];

    class Heart {
        constructor(x, y, size, speed) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = speed;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.swing = Math.random() * 0.02 + 0.01;
            this.swingOffset = Math.random() * Math.PI * 2;
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px Arial`;
            ctx.fillStyle = '#ff69b4';
            ctx.fillText("💖", this.x, this.y);
            ctx.globalAlpha = 1;
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.y * this.swing + this.swingOffset) * 1;
            
            if (this.y > canvas.height + 50) {
                this.y = -50;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    function init() {
        hearts = [];
        for (let i = 0; i < 30; i++) {
            hearts.push(
                new Heart(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() * 25 + 15,
                    Math.random() * 1.5 + 0.5
                )
            );
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach((h) => {
            h.draw();
            h.update();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start floating hearts background
    createFloatingHearts();
    
    // Initialize heart canvas if on love page
    if (document.getElementById('hearts')) {
        // Small delay to ensure proper rendering
        setTimeout(initHeartCanvas, 500);
    }
    
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add some interactive effects
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Add click sound effect for buttons (optional)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a subtle click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Make images clickable for fun interaction
    const images = document.querySelectorAll('.funny-img, .us-img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 100);
        });
    });
});

// Add some easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 10) {
        const surprise = document.createElement('div');
        surprise.innerHTML = '🎉 Kamu udah klik 10 kali! Kamu emang spesial! 🎉';
        surprise.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b6b, #ff8e53);
            color: white;
            padding: 20px;
            border-radius: 15px;
            z-index: 9999;
            animation: fadeIn 0.5s ease-out;
            text-align: center;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(surprise);
        
        setTimeout(() => {
            surprise.remove();
        }, 3000);
        
        clickCount = 0; // Reset counter
    }
});