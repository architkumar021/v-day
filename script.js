// Unique romantic GIFs - different from reference repo
const moodGifs = [
    "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif",     // 0 hopeful
    "https://media.tenor.com/DHkQXfTfJPAAAAAi/tkthao219-bubududu.gif",         // 1 curious
    "https://media.tenor.com/unvXyxthn3gAAAAi/tkthao219-bubududu.gif",         // 2 pleading eyes
    "https://media.tenor.com/TmvvKOVdmBgAAAAi/tkthao219-bubududu.gif",         // 3 sad puppy
    "https://media.tenor.com/c-LBjxrCiYoAAAAi/tkthao219-bubududu.gif",         // 4 crying
    "https://media.tenor.com/LBMbGfZRfKgAAAAi/tkthao219-bubududu.gif",         // 5 heartbroken
    "https://media.tenor.com/Oc4G5qpePvYAAAAi/tkthao219-bubududu.gif",         // 6 devastated
    "https://media.tenor.com/kHcMB3UbLCYAAAAi/sad-cry.gif"                     // 7 ultimate sad
]

// Unique romantic messages
const noButtonTexts = [
    "Hmm, let me think...",
    "Wait really, Shivangi? 🥺",
    "Are you super sure about that?",
    "You're breaking my pookie heart 💔",
    "Please reconsider, Mrs. Gupta-to-be?",
    "I'll wait forever for you, Shivangi",
    "Don't make me unleash the puppy eyes...",
    "One more chance? I brought gulab jamuns 🙏",
    "You can't escape our love bubble! 💕"
]

// Bubble messages that appear
const bubbleMessages = [
    "I've been thinking about you all day, Shivangi... 💭",
    "You make my heart skip a beat every single time 💓",
    "Every moment with you is magical ✨",
    "Life without you?<br>Impossible mission 🌙",
    "You're my favorite person in the whole universe 🌟",
    "My love for you grows every day 🌹",
    "You complete my chaos perfectly 💑",
    "Forever isn't long enough with you 💍"
]

const hearts = ['💕', '💗', '💖', '💝', '💓', '❤️', '💘', '💞', '✨', '🌟']

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true
let loveMeterValue = 50
let yesAlreadyClicked = false

const moodGif = document.getElementById('mood-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')
const messageBubble = document.getElementById('message-bubble')
const loveMeter = document.getElementById('love-meter')
const meterText = document.getElementById('meter-text')
const floatingHearts = document.getElementById('floating-hearts')

// Create floating hearts
function createFloatingHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('span')
            heart.className = 'heart'
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
            heart.style.left = Math.random() * 100 + '%'
            heart.style.animationDuration = (6 + Math.random() * 4) + 's'
            heart.style.animationDelay = Math.random() * 5 + 's'
            heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem'
            floatingHearts.appendChild(heart)
        }, i * 300)
    }
}

createFloatingHearts()

// Autoplay music
music.muted = true
music.volume = 0.4
music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🎵'
    }
}

function handleYesClick() {
    if (yesAlreadyClicked) return
    yesAlreadyClicked = true

    // Instant celebration
    yesBtn.classList.add('accepted')
    showBubbleMessage("Knew you'd say yes, Shivangi! 💗 Grab your bag, we're going on an adventure.")
    updateLoveMeter(true, true)
    addBurstHearts(true)
    setTimeout(() => {
        window.location.href = 'yes.html'
    }, 600)
}

function showBubbleMessage(msg) {
    messageBubble.innerHTML = `<p>${msg}</p>`
    messageBubble.classList.add('show')
}

function updateLoveMeter(increase, maxOut = false) {
    if (maxOut) {
        loveMeterValue = 100
    } else if (increase) {
        loveMeterValue = Math.min(100, loveMeterValue + 18)
    } else {
        loveMeterValue = Math.max(30, loveMeterValue - 4)
    }
    loveMeter.style.width = loveMeterValue + '%'
    
    // Update meter emoji based on value
    if (loveMeterValue >= 90) meterText.textContent = '💖💖💖'
    else if (loveMeterValue >= 70) meterText.textContent = '💗💗'
    else if (loveMeterValue >= 50) meterText.textContent = '💗'
    else meterText.textContent = '💔'
    
    // Animate meter text
    meterText.style.transform = 'scale(1.3)'
    setTimeout(() => meterText.style.transform = 'scale(1)', 200)
}

function handleNoClick() {
    noClickCount++
    
    // Update love meter (decreases)
    updateLoveMeter(false)

    // Change button text
    const msgIndex = Math.min(noClickCount, noButtonTexts.length - 1)
    noBtn.textContent = noButtonTexts[msgIndex]

    // Show bubble message
    const bubbleIndex = Math.min(noClickCount - 1, bubbleMessages.length - 1)
    showBubbleMessage(bubbleMessages[bubbleIndex])

    // Grow the Yes button (but keep approachable)
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${Math.min(currentSize * 1.18, 44)}px`
    const padY = Math.min(16 + noClickCount * 3, 42)
    const padX = Math.min(32 + noClickCount * 6, 90)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button, but never fully hide it
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.9, 14)}px`
        noBtn.style.opacity = Math.max(0.6, 1 - noClickCount * 0.05)
    }

    // Change GIF
    const gifIndex = Math.min(noClickCount, moodGifs.length - 1)
    swapGif(moodGifs[gifIndex])

    // Enable gentle runaway after several tries
    if (noClickCount >= 6 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
        showBubbleMessage("Fineee, I'll let the No button jog away... but only a little 😤")
    }
    
    // Add extra hearts when clicking no
    addBurstHearts()
}

function addBurstHearts(big = false) {
    const total = big ? 12 : 5
    for (let i = 0; i < total; i++) {
        const heart = document.createElement('span')
        heart.className = 'heart'
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
        heart.style.left = (35 + Math.random() * 30) + '%'
        heart.style.bottom = big ? '35%' : '30%'
        heart.style.animationDuration = big ? '4s' : '3s'
        heart.style.fontSize = big ? '2.4rem' : '2rem'
        floatingHearts.appendChild(heart)
        setTimeout(() => heart.remove(), big ? 4000 : 3000)
    }
}

function swapGif(src) {
    moodGif.style.opacity = '0'
    moodGif.style.transform = 'scale(0.8)'
    setTimeout(() => {
        moodGif.src = src
        moodGif.style.opacity = '1'
        moodGif.style.transform = 'scale(1)'
    }, 300)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 30
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.max(margin, Math.random() * maxX)
    const randomY = Math.max(margin, Math.random() * maxY)

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
    noBtn.style.transition = 'left 0.3s ease, top 0.3s ease'
}
