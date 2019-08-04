let canvas = document.querySelector('.canvas')
let g = canvas.getContext('2d')

let counter = 0

let drops = []
let drop = { speed: 2, x: Math.random() * canvas.width }
drops.push(drop)

setInterval(onTimerTick, 0); // 33 milliseconds = ~ 30 frames per sec

function onTimerTick() {

    g.fillStyle = 'rgb(100, 100, 255)'
    g.fillRect(0, 0, canvas.width, canvas.height)

    g.fillStyle = 'rgb(0, 0, 0)'
    for (let i = 0; i < drops.length; i++) {
        g.fillRect(drops[i].x, ((canvas.height * (counter / canvas.height)) % canvas.height) * drops[i].speed, 20, 20)
    }
    counter++
}