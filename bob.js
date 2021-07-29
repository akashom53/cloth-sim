class Bob {
    constructor(x, y, anchored) {
        this.pos = createVector(x, y)
        this.v = createVector()
        this.a = createVector()
        this.f = createVector()
        this.anchored = anchored
        this.mass = 0.5
    }

    update() {
        if (this.anchored) return
        this.v.mult(1 - DAMPENING)
        this.a = this.f
        this.a.mult(this.mass)
        this.v.add(this.a)
        this.pos.add(this.v)
        this.a.mult(0)
        this.f.mult(0)
    }

    applyForce(f) {
        this.f.add(f)
    }


    render() {
        fill(255)
        circle(this.pos.x, this.pos.y, 3)
    }
}