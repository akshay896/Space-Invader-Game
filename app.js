const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.results')
let currentShooterIndex = 202
const width = 15
const aliensRemoved = []
let InvadersId
let isGoingRight = true
let direction = 1
let results = 0

for(let i = 0; i < width * width; i++){
  const squre = document.createElement('div')
  grid.appendChild(squre)
}
const squres = Array.from(document.querySelectorAll('.grid div')
)
console.log(squres);

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]
function draw(){
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)){
      squres[alienInvaders[i]].classList.add('invader')
    }
    
  }
}
draw()

squres[currentShooterIndex].classList.add('shooter')

function remove(){
  for (let i = 0; i < alienInvaders.length; i++) {
    squres[alienInvaders[i]].classList.remove('invader')
    
  }
}

function moveShooter(e){
  squres[currentShooterIndex].classList.remove('shooter')
  switch(e.key){
    case 'ArrowLeft':
      if(currentShooterIndex % width !==0) currentShooterIndex -=1
      break
    case 'ArrowRight':
      if(currentShooterIndex % width < width -1 )
      currentShooterIndex +=1
      break  
  }
  squres[currentShooterIndex].classList.add('shooter')

}
document.addEventListener('keydown',moveShooter)

function moveInvaders(){
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
  remove()

 
  if (rightEdge && isGoingRight){
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      isGoingRight = false
      
    }
  }
  if(leftEdge &&!isGoingRight){
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1
      direction = 1
      isGoingRight = true
      
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
    
  }

  draw()

  if(squres[currentShooterIndex].classList.contains("invader")){
    resultDisplay.innerHTML = 'GAME OVER'
    clearInterval(InvadersId)
  }
  if(aliensRemoved.length === alienInvaders.length){
    resultDisplay.innerHTML = 'YOU WIN'
    clearInterval(InvadersId)
  }
}
InvadersId = setInterval(moveInvaders, 600)

function shoot(e){
  let laserId
  let currentLaserIndex = currentShooterIndex

  function moveLaser(){
    squres[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width

    squres[currentLaserIndex].classList.add('laser')

    if(squres[currentLaserIndex].classList.contains('invader')){
      squres[currentLaserIndex].classList.remove('laser')
      squres[currentLaserIndex].classList.remove('invader')
      squres[currentLaserIndex].classList.add('boom')

      setTimeout(()=>squres[currentLaserIndex].classList.remove('boom'), 300
    )
    clearInterval(laserId)

    const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
    aliensRemoved.push(alienRemoved)
    results++
    resultDisplay.innerHTML = results
    console.log(aliensRemoved);

    }
  }
 
  if(e.key === 'ArrowUp'){
   laserId = setInterval(moveLaser, 100)
  }
}
document.addEventListener('keydown',shoot)