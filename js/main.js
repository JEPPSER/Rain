let canvas = document.querySelector('.canvas')
let g = canvas.getContext('2d')

let counter = 0

let rainFreq = 5
let rainDepth = 1
let dropWidth = 1
let dropHeight = 10
let dropSpeed = 3
let angle = 90

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

let drops = []
let drop = { speed: dropSpeed * (canvas.height / 300), x: Math.random() * canvas.width, y: 0, depth: calculateDepth(rainDepth) }
drops.push(drop)

setInterval(onTimerTick, 0);

function onTimerTick() {

    if (counter % 5 === 0) {
        for (let i = 0; i < rainFreq; i++) {
            let drop = { speed: dropSpeed * (canvas.height / 400), x: Math.random() * canvas.width, y: 0, depth: calculateDepth(rainDepth) }
            drops.push(drop)
        }
    }

    g.fillStyle = 'rgb(100, 100, 255)'
    g.fillRect(0, 0, canvas.width, canvas.height)

    g.fillStyle = 'rgb(0, 0, 0)'
    for (let i = 0; i < drops.length; i++) {
        drops[i].y += drops[i].speed * drops[i].depth
        g.fillRect(drops[i].x, drops[i].y, dropWidth * drops[i].depth, dropHeight * drops[i].depth)
        if (drops[i].y > canvas.height) {
            drops.splice(i, 1)
        }
    }
    counter++
}

function calculateDepth(rainDepth) {
    return 1 - (Math.random() * rainDepth) + rainDepth / 2
}