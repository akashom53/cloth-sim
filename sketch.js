let bobs = []
let springs = []

let gravity

const SPRING_CONST = 0.3
const DAMPENING = 0.02

const clothH = 400
const clothW = 400
const spacing = 20

let noiseOff = 0.0

function setup() {
    createCanvas(windowWidth, windowHeight)
    gravity = createVector(0, 0.3)

    const yOff = 0
    const xOff = 100

    const rows = clothH / spacing
    const cols = clothW / spacing
    for (let y = 0; y < rows; y++) {
        let row = []
        for (let x = 0; x < cols; x++) {
            row.push(new Bob(xOff + x * spacing, yOff + y * spacing))

            if (x > 0) springs.push(new Spring(row[x - 1], row[x]))
            if (y > 0) springs.push(new Spring(bobs[y - 1][x], row[x]))
        }
        bobs.push(row)
    }
    for (let row = 0; row < bobs.length; row++) {
        if (row % 1 == 0) bobs[row][0].anchored = true
    }
    bobs[bobs.length - 1][0].anchored = true
}

function update() {
    let yOff = 0.0
    for (let row of bobs) {
        let xOff = 0.0
        for (let b of row) {
            b.applyForce(gravity)
            let n = noise(xOff, yOff, noiseOff)
            const wind = createVector(1, 0).normalize().mult(n * 1.5)
            b.applyForce(wind)
            b.update()
            xOff++
        }
        yOff++
    }

    for (let s of springs) s.update()

    if (mouseIsPressed) {
        let row = bobs[bobs.length - 1]
        let i = row.length - 1
        let b = row[i]
        b.pos.x = mouseX
        b.pos.y = mouseY
        b.v.set(0, 0)
    }
    noiseOff += 0.02
}

function render() {
    background(40, 40, 80)
    for (let s of springs) s.render()
}


function draw() {
    update()
    render()
}
