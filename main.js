const cube = document.querySelector('#cube')
let cubePosition = cube.getBoundingClientRect().left;
let cubeRotate = 0;
cube.addEventListener('click', (event) => {
    let target = event.target.closest('.cube');
    let cubeStartPosition = cube.getBoundingClientRect().right;
    let innerWidth = window.innerWidth - 5;
    let step = stepCube(document.querySelector('#cube_time').value, cubeStartPosition, innerWidth)
    let turnOver = document.querySelector('#cube_rotate').value
    let timeOff = ((Number(document.querySelector('#cube_time').value) + 3 )* 1000)

    if (!target || target.classList.contains('active')) return

    target.classList.add('active')
    target.innerHTML = "<span>Disabled!!</span>"

    cube.style.position = "absolute"

    let interval = setInterval(() => {
        if (cube.getBoundingClientRect().right < innerWidth) {
            runCube(step, cube)
            startRotate(turnOver, step, innerWidth, cubeStartPosition)
        } else {
            setTimeout(() => {
                clearInterval(interval)
                target.style.background = 'red'
            }, 0)
        }

    }, 0)
    setTimeout((timeOff)=>{
        window.location.reload()

    },timeOff)
})

function stepCube(time, startPosition, innerWidth) {
    if (Number(time) <= 0) time = 2
    return (innerWidth - startPosition) / (Number(time) * 250)
}

function runCube(step, cube) {
    cubePosition += step
    cube.style.left = `${cubePosition}px`
}

function startRotate(turnOver, step, innerWidth, cubeStartPosition) {
    cubeRotate += (360 * Math.ceil(turnOver)) / ((innerWidth - cubeStartPosition) / step)
    if (cubeRotate >= 360 * Math.ceil(turnOver)) cubeRotate = 360 * Math.ceil(turnOver)
    cube.style.transform = `rotate(${cubeRotate}deg)`
}