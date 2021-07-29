class Spring {
    constructor(b1, b2) {
        this.b1 = b1
        this.b2 = b2
        this.l = p5.Vector.sub(b1.pos, b2.pos).mag()

    }

    update() {
        let f = p5.Vector.sub(this.b1.pos, this.b2.pos)
        let fMag = this.l - f.mag()
        f.normalize()
        f.mult(fMag * SPRING_CONST)
        this.b1.applyForce(f)
        this.b2.applyForce(f.mult(-1))
    }

    render() {
        stroke(255)
        line(this.b1.pos.x, this.b1.pos.y, this.b2.pos.x, this.b2.pos.y)
    }
}