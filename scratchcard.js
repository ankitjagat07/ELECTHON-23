const canvas = document.getElementById('scratch');
const ctx = canvas.getContext('2d');
const base = document.querySelector('.base');

const rect = canvas.getBoundingClientRect();

canvas.width = rect.width;
canvas.height = rect.height;

ctx.fillStyle = '#C0C0C0';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', scratch);

canvas.addEventListener('touchstart', startDrawing, { passive: true });
canvas.addEventListener('touchend', stopDrawing, { passive: true });
canvas.addEventListener('touchmove', scratch, { passive: true });

function startDrawing(e) {
  isDrawing = true;
  scratch(e);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function scratch(e) {
  if (!isDrawing) return;

  const pos = getEventPos(e);

  ctx.globalCompositeOperation = 'destination-out';
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);

  checkScratchCompletion();
}

function getEventPos(e) {
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
}

function checkScratchCompletion() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let scratched = 0;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) {
      scratched++;
    }
  }

  const percentage = (scratched / (pixels.length / 4)) * 100;

  if (percentage > 60) {
    canvas.style.pointerEvents = 'none';
    base.style.opacity = 1;
  }
}
