const cube = document.querySelector('#cube')
const reset = document.querySelector('#reset')
let cubePosition = cube.getBoundingClientRect().left;
let cubeRotate = 0;
reset.addEventListener('click', () => {
    window.location.reload()
})
cube.addEventListener('click', (event) => {
    let target = event.target.closest('.cube');
    let cubeStartPosition = cube.getBoundingClientRect().right;
    let innerWidth = window.innerWidth - 5;
    let cubeTime = document.querySelector('#cube_time');
    let step = stepCube(cubeTime.value, cubeStartPosition, innerWidth);
    let turnOver = document.querySelector('#cube_rotate');
    let turnOverValue = turnOver.value;

    if (!target || target.classList.contains('active')) return


    target.classList.add('active');

    target.innerHTML = "<span>Disabled!!</span>";

    cube.style.position = "absolute";

    let interval = setInterval(() => {
        if (cube.getBoundingClientRect().right < innerWidth) {
            runCube(step, cube);
            startRotate(turnOverValue, step, innerWidth, cubeStartPosition);
        }
        else setTimeout(() => {
            clearInterval(interval)
            target.style.background = 'red'
        }, 0);
    }, 0)
    cubeTime.value = "";
    turnOver.value = "";

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