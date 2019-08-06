let canvas = document.querySelector('.canvas')
let g = canvas.getContext('2d')

let counter = 0

let rainFreq = 5
let rainDepth = 1
let dropWidth = 1
let dropHeight = 10
let dropSpeed = 3
let angle = Math.PI / 2
let color = '#8888cc'

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
    angle = this.value
}

let jscolor = document.querySelector('.jscolor')
jscolor.onchange = function() {
    color = '#' + this.value
}

let drops = []
let drop = { speed: dropSpeed * (canvas.height / 300), x: Math.random() * canvas.width * 3 - canvas.width, y: 0, depth: calculateDepth(rainDepth) }
drops.push(drop)

setInterval(onTimerTick, 0);

function onTimerTick() {

    if (counter % 1 === 0) {
        for (let i = 0; i < rainFreq; i++) {
            let drop = { speed: dropSpeed * (canvas.height / 400), x: Math.random() * canvas.width * 3 - canvas.width, y: 0, depth: calculateDepth(rainDepth) }
            drops.push(drop)
        }
    }

    g.fillStyle = 'rgb(100, 100, 150)'
    g.fillRect(0, 0, canvas.width, canvas.height)

    g.strokeStyle = color
    for (let i = 0; i < drops.length; i++) {
        let length = drops[i].speed * drops[i].depth
        let x = Math.cos(angle) * length
        let y = Math.sin(angle) * length
        drops[i].y += y
        drops[i].x += x

        length = dropHeight * drops[i].depth
        x = Math.cos(angle) * length
        y = Math.sin(angle) * length

        g.lineWidth = dropWidth * drops[i].depth
        g.beginPath();
        g.moveTo(drops[i].x, drops[i].y);
        g.lineTo(drops[i].x + x, drops[i].y + y);
        g.stroke();
        if (drops[i].y > canvas.height) {
            drops.splice(i, 1)
        }
    }
    counter++
}

function calculateDepth(rainDepth) {
    return 1 - (Math.random() * rainDepth) + rainDepth / 2
}