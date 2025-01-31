import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'
import * as TweakpaneEssentialsPlugin from 'https://cdn.skypack.dev/@tweakpane/plugin-essentials'

import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'

const config = {
  theme: 'light',
  font: 20,
  ascii: '@#S%?*+;:,.',
  device: '',
  width: null,
  height: null,
  sample: 1,
  debug: false,
  color: true,
  invert: false,
  matrix: false,
}

let font
let cap
let downsampled
let capturing = false
let useFrames = false

const input = document.querySelector('#input')
const down = document.querySelector('#downsample')

const DPR = window.devicePixelRatio || 1
const video = document.querySelector('video')
const canvas = document.querySelector('canvas')
const offscreen = document.createElement('canvas')
const offscreenCtx = offscreen.getContext('2d', { willReadFrequently: true })
const ctx = canvas.getContext('2d', { willReadFrequently: true })

const ctrl = new Pane({
  title: 'Config',
  expanded: true,
})
ctrl.registerPlugin(TweakpaneEssentialsPlugin)

const update = () => {
  input.innerText = `${config.width} / ${config.height}`
  down.innerText = `${Math.floor(config.width / config.sample)} / ${Math.floor(
    config.height / config.sample
  )}`
  downsampled = {
    width: Math.floor(video.videoWidth / config.sample),
    height: Math.floor(video.videoHeight / config.sample),
  }
  offscreen.width = canvas.width = downsampled.width * DPR
  offscreen.height = canvas.height = downsampled.height * DPR
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.debug = config.debug
}

const sync = (event) => {
  update(event)
}

font = ctrl.addFolder({ title: 'Font', expanded: false, disabled: false })
font.addBinding(config, 'sample', {
  label: 'Downsample',
  min: 1,
  max: 5,
  step: 1,
})
font.addBinding(config, 'font', {
  label: 'Font Size',
  min: 1,
  max: 50,
  step: 1,
})
font.addBinding(config, 'ascii', {
  label: 'Characters',
})

ctrl.addBinding(config, 'debug', {
  label: 'Debug',
})

let frames = {}
const renderAscii = (ctx, imageData) => {
  // increment the frame and capture the frame data
  const cellWidth = config.font
  const cellHeight = config.font
  const numCols = Math.floor(imageData.width / cellWidth)
  const numRows = Math.floor(imageData.height / cellHeight)

  ctx.font = `${config.font}px monospace`

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const posX = x * cellWidth
      const posY = y * cellHeight

      let totalBrightness = 0
      let totalRed = 0
      let totalGreen = 0
      let totalBlue = 0
      let sampleCount = 0

      for (let sy = 0; sy < cellHeight; sy++) {
        for (let sx = 0; sx < cellWidth; sx++) {
          const sampleX = posX + sx
          const sampleY = posY + sy
          const offset = (sampleY * imageData.width + sampleX) * 4
          const red = imageData.data[offset]
          const green = imageData.data[offset + 1]
          const blue = imageData.data[offset + 2]
          const brightness = (red + green + blue) / 3
          totalBrightness += brightness
          totalRed += red
          totalGreen += green
          totalBlue += blue
          sampleCount++
        }
      }

      const averageBrightness = totalBrightness / sampleCount
      if (averageBrightness > 40) {
        const averageRed = totalRed / sampleCount
        const averageGreen = totalGreen / sampleCount
        const averageBlue = totalBlue / sampleCount
        const charIndex = Math.floor(
          (averageBrightness / 256) * config.ascii.length
        )
        const char = config.ascii[charIndex] || ' '
        let color = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`
        ctx.fillStyle = color
        ctx.fillText(char, posX, posY + cellHeight)
      }
    }
  }
  // cache the current frame
  frames[video.currentTime.toFixed(fix)] = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  )
}
const fix = 3

const findClosestFrame = (value) => {
  const formattedValue = parseFloat(value).toFixed(fix)
  const keys = Object.keys(frames)

  if (keys.includes(formattedValue)) return formattedValue

  // Find the closest key by comparing the numeric values
  const closestKey = keys.reduce((prev, curr) =>
    Math.abs(parseFloat(curr) - parseFloat(formattedValue)) <
    Math.abs(parseFloat(prev) - parseFloat(formattedValue))
      ? curr
      : prev
  )
  return closestKey
}

const updateCanvas = () => {
  offscreenCtx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (useFrames) {
    const frameKey = findClosestFrame(video.currentTime.toFixed(fix))
    const frame = frames[frameKey]
    ctx.putImageData(frame, 0, 0)
  } else {
    offscreenCtx.drawImage(video, 0, 0, canvas.width, canvas.height)
    renderAscii(
      ctx,
      offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
    )
  }
}

let src
const kickoff = async () => {
  useFrames = true
  video.loop = true
  await video.play()
  video.removeEventListener('ended', kickoff)
}

const handleCapture = async () => {
  if (!capturing) {
    capturing = true
    frames = {}
    document.documentElement.dataset.capturing = capturing
    // camera.disabled = true
    cap.title = 'Stop'
    video.src = src
    // video.loop = true
    video.muted = true
    video.addEventListener('ended', kickoff)
    await video.play()
    font.disabled = true
    cap.hidden = false
    ctrl.refresh()
    config.width = video.videoWidth
    config.height = video.videoHeight
    canvas.dataset.aspect =
      video.videoWidth > video.videoHeight ? 'landscape' : 'portrait'
    update()
    downsampled = {
      width: Math.floor(video.videoWidth / config.sample),
      height: Math.floor(video.videoHeight / config.sample),
    }
    offscreen.width = canvas.width = downsampled.width * DPR
    offscreen.height = canvas.height = downsampled.height * DPR
    gsap.ticker.add(updateCanvas)
  } else {
    // camera.disabled = false
    useFrames = false
    frames = {}
    capturing = false
    document.documentElement.dataset.capturing = capturing
    cap.title = 'Start'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gsap.ticker.remove(updateCanvas)
    video.srcObject = null
    video.pause()
    video.currentTime = 0
    video.loop = false
    config.width = config.height = null
    font.disabled = false
    ctrl.refresh()
  }
}

cap = ctrl
  .addButton({
    title: 'Start',
    hidden: true,
  })
  .on('click', handleCapture)

ctrl.on('change', sync)
update()

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
events.forEach((event) => {
  window.addEventListener(event, (e) => e.preventDefault())
})

window.addEventListener('drop', (e) => {
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('video/')) {
    const videoURL = URL.createObjectURL(file)
    src = videoURL
    if (capturing) {
      handleCapture()
    }
    handleCapture()
  } else {
    alert('Please drop a valid video file.')
  }
})

const use = document.querySelector('.use')
use.addEventListener('click', () => {
  video.crossOrigin = 'anonymous'
  src = 'https://assets.codepen.io/605876/firework.mp4'
  useFrames = false
  frames = {}
  config.down = 1
  config.font = 10
  ctrl.refresh()
  handleCapture()
})
