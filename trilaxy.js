// Trilaxy Intro Animation

// configuration
let speed = 10
let starCount = 300
let novafreq = 0.99998
let burstlen = 25
let background = 'black'

// internals
let canvas = document.querySelector( "#trilaxy" )

// classes --------------------------------------

class Trilaxy {

  distance = 0

  constructor( canvas, x, y, size ) {
    this.canvas = canvas
    this.ctx = canvas.getContext( '2d' )
    this.x = x
    this.y = y
    this.size = size
    this.galaxies = []
    let width = Math.min( canvas.width, canvas.height ) / 4
    this.galaxies.push( new Galaxy( this, width, 0, 0, .005, '#ffec27', starCount ) )
    this.galaxies.push( new Galaxy( this, width, 0, Math.PI * 2 / 3, .005, '#f89cfa', starCount ) ) //#f89cfa
    this.galaxies.push( new Galaxy( this, width, 0, Math.PI * 2 / 3 * 2, .005, '#23b0bd', starCount ) )
  }

  animate() {
    if( this.distance < this.size ) {
      // have galaxies move away from common center until a max distance is reached
      this.distance += .1
    }
    // for( let i = 0; i < this.galaxies.length; i++ ) {
    //   this.galaxies[ i ].distance = this.distance
    //   this.galaxies[ i ].animate()
    // } 
    this.galaxies.forEach( galaxy => {
      galaxy.distance = this.distance
      galaxy.animate()
    } )
  }

  draw() {
    this.galaxies.forEach( galaxy => galaxy.draw() )
    this.ctx.globalAlpha = 1
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = 'white'
    this.ctx.fillText("Trilaxy Software", this.canvas.width / 2 - 100, canvas.height / 2 );
  }

}

class Galaxy {

  constructor( trilaxy, size, distance, radPosition, radSpeed, color, starCount ) {

    this.trilaxy = trilaxy
    this.size = size
    this.distance = distance
    this.radPosition = radPosition
    this.radSpeed = radSpeed
    this.color = color
    this.starCount = starCount

    this.stars = []

    for( let i = 0; i < this.starCount; i++ ) {
      let starSize = .1 + Math.random() * ( this.size / 60 )
      let radPosition = Math.random() * 2 * Math.PI
      let radSpeed = Math.random() * 0.01
      let distanceSpeed = Math.random() * ( this.size / 850 )
      let starColor = Math.random() < .2 ? 'white' : this.color
      this.stars.push(
        new Star( this, starSize, starColor, radPosition, 0, radSpeed, distanceSpeed )
      )
    }

  }

  animate() {
    this.radPosition -= this.radSpeed
    this.x = this.trilaxy.x + Math.sin( this.radPosition ) * this.distance
    this.y = this.trilaxy.y + Math.cos( this.radPosition ) * this.distance
    this.stars.forEach( star => star.animate() ) 
  }

  draw() {
    dot( this.trilaxy.ctx, this.x, this.y, this.size / 30, this.color )
    this.stars.forEach( star => star.draw() ) 
  }

}

class Star {

  constructor( galaxy, size, color, radPosition, distance, radSpeed, distanceSpeed ) {
    this.galaxy = galaxy
    this.ctx = this.galaxy.trilaxy.ctx
    this.size = size
    this.color = color
    this.radPosition = radPosition
    this.distance = distance
    this.radSpeed = radSpeed
    this.distanceSpeed = distanceSpeed
  }

  animate() {
    this.radPosition += this.radSpeed
    this.distance += this.distanceSpeed
    if( this.distance > this.galaxy.size ) {
      this.distance = 0
      this.explosion = null
    }
    if( !this.explosion && Math.random() > 0.99999 ) {
      this.explosion = new Explosion( this.ctx, this )
      this.explosion.lifetime = 200
      this.explosion.particleSpeedMin = 0.01
      this.explosion.particleSpeedMax = .5
      this.explosion.particleCount = 30
      //this.explosion.randomColors = true
      this.explosion.color = 'yellow'
      this.explosion.fadeFactor = 2
      this.explosion.start()
    }
    if( this.explosion ) {
      this.explosion.animate()
    }
  }

  getX() {
    return this.galaxy.x + Math.sin( this.radPosition ) * this.distance
  }

  getY() {
    return this.galaxy.y + Math.cos( this.radPosition ) * this.distance
  }

  getColor() {
    return this.color
  }

  draw() {
    let x = this.getX()
    let y = this.getY()
    dot( this.ctx, x, y, this.size, this.color )
    if( this.explosion ) {
      this.explosion.draw()
    }
  }

  
}

function dot( ctx, x, y, r, color ) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc( x, y, r, 0, Math.PI * 2 )
  ctx.closePath()
  ctx.fill()
}


let animation = new Animation( canvas )
animation.backgroundColor = background
animation.maximize()
trilaxy = new Trilaxy( canvas, canvas.width / 2, canvas.height / 2, Math.min( canvas.height, canvas.width ) / 4 )
animation.add( trilaxy )
animation.start()




