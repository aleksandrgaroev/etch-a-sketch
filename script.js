const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16
const DEFAULT_COLOR = '#161922'

let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE
let currentMode = DEFAULT_MODE

function setCurrentMode(newMode) {
	displayActiveMode(newMode)
	currentMode = newMode
}

function setCurrentColor(newColor) {
	currentColor = newColor
}

function setCurrentSize(newSize) {
	currentSize = newSize
}

// UI

const colorPicker = document.getElementById('colorPicker')
const colorBtn = document.getElementById('colorBtn')
const rgbBtn = document.getElementById('rgbBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rgbBtn.onclick = () => setCurrentMode('rgb')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.addEventListener('mousedown', () => {
	mouseDown = true
})
document.body.addEventListener('mouseup', () => {
	mouseDown = false
})

function displayActiveMode(newMode) {
	switch (currentMode) {
		case 'color':
			colorBtn.classList.remove('active')
			break
		case 'rgb':
			rgbBtn.classList.remove('active')
			break
		case 'eraser':
			eraserBtn.classList.remove('active')
			break
	}

	switch (newMode) {
		case 'color':
			colorBtn.classList.add('active')
			break
		case 'rgb':
			rgbBtn.classList.add('active')
			break
		case 'eraser':
			eraserBtn.classList.add('active')
			break
	}
}

function changeColor(e) {
	if (e.type === 'mouseover' && !mouseDown) return

	if (currentMode === 'color') {
		e.target.style.backgroundColor = currentColor
	} else if (currentMode === 'rgb') {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)
		e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
	} else if (currentMode === 'eraser') {
		e.target.style.backgroundColor = '#ffffff'
	}
}

function updateSizeValue(value) {
	sizeValue.innerHTML = `${value}x${value}`
}

function setupGrid(size) {
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

	for (let i = 0; i < size * size; i++) {
		const gridElement = document.createElement('div')
		gridElement.classList.add('grid-element')
		gridElement.addEventListener('mouseover', changeColor)
		gridElement.addEventListener('mousedown', changeColor)
		grid.appendChild(gridElement)
	}
}

function changeSize(value) {
	setCurrentSize(value)
	updateSizeValue(value)
	reloadGrid()
}

function clearGrid() {
	grid.innerHTML = ''
}

function reloadGrid() {
	clearGrid()
	setupGrid(currentSize)
}

window.onload = () => {
	displayActiveMode(DEFAULT_MODE)
	setupGrid(DEFAULT_SIZE)
}
