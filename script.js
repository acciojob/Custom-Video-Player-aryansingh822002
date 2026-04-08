/* 1. Select the elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* 2. Define the functions */

// Toggle Play/Pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update the Play/Pause Button Icon
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Skip Functionality (Rewind 10s / Fast Forward 25s)
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume and Playback Speed Sliders
function handleRangeUpdate() {
  // this.name corresponds to "volume" or "playbackRate"
  video[this.name] = this.value;
}

// Update the visual progress bar based on current video time
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub through the video by clicking/dragging the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* 3. Hook up the event listeners */

// Video Playback Events
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

// Error handling for the bonus requirement
video.addEventListener('error', () => {
  console.error("The video failed to load. Check if 'download.mp4' exists.");
  // Optional: Update UI to show error
  document.querySelector('.player').style.border = "5px solid red";
});

// Controls
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Progress Bar Interactions
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);