let canvas = document.querySelector('.canvas')
let g = canvas.getContext('2d')

let counter = 0
let rainFreq = 10

let drops = []
let drop = { speed: 2, x: Math.random() * canvas.width, y: 0}
drops.push(drop)

setInterval(onTimerTick, 0); // 33 milliseconds = ~ 30 frames per sec

function onTimerTick() {

    if (counter % rainFreq === 0) {
        let drop = { speed: 2, x: Math.random() * canvas.width, y: 0 }
        drops.push(drop)
    }

    g.fillStyle = 'rgb(100, 100, 255)'
    g.fillRect(0, 0, canvas.width, canvas.height)

    g.fillStyle = 'rgb(0, 0, 0)'
    for (let i = 0; i < drops.length; i++) {
        drops[i].y += drops[i].speed
        g.fillRect(drops[i].x, drops[i].y, 5, 20)
        if (drops[i].y > canvas.height) {
            drops.splice(i, 1)
        }
    }
    counter++
}