let musicPlaying = false
const hearts = ['💕', '💗', '💖', '💝', '💓', '❤️', '💘', '💞', '✨', '🌟', '💫']

window.addEventListener('load', () => {
    launchConfetti()
    createFloatingHearts()
    startCountdown()

    // Autoplay music
    const music = document.getElementById('bg-music')
    music.volume = 0.4
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🎵'
    
    // Continuous confetti bursts
    setInterval(() => {
        confetti({
            particleCount: 20,
            spread: 60,
            origin: { x: Math.random(), y: Math.random() * 0.5 },
            colors: ['#ff6b9d', '#ff8fab', '#ffc2d1', '#fff', '#ffdf00']
        })
    }, 3000)
})

function createFloatingHearts() {
    const container = document.getElementById('floating-hearts')
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('span')
            heart.className = 'heart'
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
            heart.style.left = Math.random() * 100 + '%'
            heart.style.animationDuration = (5 + Math.random() * 5) + 's'
            heart.style.animationDelay = Math.random() * 3 + 's'
            heart.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem'
            container.appendChild(heart)
        }, i * 200)
    }
}

function startCountdown() {
    // Valentine's Day 2026
    const valentines = new Date('2026-02-14T19:00:00')
    
    function update() {
        const now = new Date()
        const diff = valentines - now
        
        if (diff <= 0) {
            document.getElementById('days').textContent = '💖'
            document.getElementById('hours').textContent = '💖'
            document.getElementById('mins').textContent = '💖'
            return
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        
        document.getElementById('days').textContent = days
        document.getElementById('hours').textContent = hours
        document.getElementById('mins').textContent = mins
    }
    
    update()
    setInterval(update, 60000)
}

function launchConfetti() {
    const colors = ['#ff6b9d', '#ff8fab', '#ffc2d1', '#fff', '#ffdf00', '#ff69b4']
    const duration = 8000
    const end = Date.now() + duration

    // Big initial burst
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        colors
    })

    // Heart-shaped confetti from sides
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        // Left cannon
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.7 },
            colors,
            shapes: ['circle', 'square'],
            scalar: 1.2
        })

        // Right cannon
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.7 },
            colors,
            shapes: ['circle', 'square'],
            scalar: 1.2
        })
    }, 400)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🎵'
    }
}
