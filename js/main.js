let canvas = document.querySelector('.canvas')
let g = canvas.getContext('2d')

let counter = 0

let rainFreq = 10
let rainDepth = 1
let dropWidth = 1
let dropHeight = 10
let dropSpeed = 3
let angle = Math.PI / 2
let angleRandomness = 0
let color = '#ffffff'
let scale = 1
let opacity = 0.2

let backgroundImage = document.querySelector('.backgroundImage')

let depthSlider = document.querySelector('.depthSlider')
depthSlider.oninput = function() {
    rainDepth = this.value
}

let speedSlider = document.querySelector('.speedSlider')
speedSlider.oninput = function() {
    dropSpeed = this.value
}

let freqSlider = document.querySelector('.freqSlider')
freqSlider.oninput = function() {
    rainFreq = this.value
}

let widthSlider = document.querySelector('.widthSlider')
widthSlider.oninput = function() {
    dropWidth = this.value
}

let heightSlider = document.querySelector('.heightSlider')
heightSlider.oninput = function() {
    dropHeight = this.value
}

let angleSlider = document.querySelector('.angleSlider')
angleSlider.oninput = function() {
    angle = parseFloat(this.value)
}

let angleRandomSlider = document.querySelector('.angleRandomSlider')
angleRandomSlider.oninput = function() {
    angleRandomness = parseFloat(this.value)
}

let jscolor = document.querySelector('.jscolor')
jscolor.onchange = function() {
    color = '#' + this.value
}

let scaleSlider = document.querySelector('.scaleSlider')
scaleSlider.oninput = function() {
    scale = this.value
    backgroundImage.height = backgroundImage.naturalHeight * scale
    backgroundImage.width = backgroundImage.naturalWidth * scale
}

let urlText = document.querySelector('.urlText')
let urlBtn = document.querySelector('.urlBtn')
urlBtn.onclick = function() {
    backgroundImage.src = urlText.value
    scale = 1.0
    scaleSlider.value = 1.0
    backgroundImage.height = backgroundImage.naturalHeight * scale
    backgroundImage.width = backgroundImage.naturalWidth * scale
}

let opacitySlider = document.querySelector('.opacitySlider')
opacitySlider.oninput = function() {
    opacity = opacitySlider.value
}

let drops = []
let startTime = new Date()

setInterval(onTimerTick, 5)

function onTimerTick() {
    let deltaTime = new Date() - startTime
    startTime = new Date()
    for (let i = 0; i < rainFreq; i++) {
        let randAngle = Math.random() / (10 - angleRandomness) - (0.5 / (10 - angleRandomness))
        if (angleRandomness === 0) {
            randAngle = 0
        }
        let drop = {angle: angle + randAngle, speed: dropSpeed * (canvas.height / 400), x: Math.random() * canvas.width * 3 - canvas.width, y: 0, depth: calculateDepth(rainDepth) }
        drops.push(drop)
    }

    g.clearRect(0, 0, canvas.width, canvas.height)

    g.strokeStyle = color
    g.globalAlpha = opacity
    for (let i = 0; i < drops.length; i++) {
        let length = drops[i].speed * drops[i].depth * (deltaTime / 4)
        let x = Math.cos(drops[i].angle) * length
        let y = Math.sin(drops[i].angle) * length
        drops[i].y += y
        drops[i].x += x

        length = dropHeight * drops[i].depth
        x = Math.cos(drops[i].angle) * length
        y = Math.sin(drops[i].angle) * length

        g.lineWidth = dropWidth * drops[i].depth
        g.beginPath();
        g.moveTo(drops[i].x, drops[i].y);
        g.lineTo(drops[i].x + x, drops[i].y + y);
        g.stroke();
        if (drops[i].y > canvas.height) {
            drops.splice(i, 1)
        }
    }
    g.globalAlpha = 1.0
    counter++
}

function calculateDepth(rainDepth) {
    return 1 - (Math.pow(Math.random(), 0.3) * rainDepth) + rainDepth / 2
}