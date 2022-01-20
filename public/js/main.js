function bringToFront(polygonId = "") {
  const svgElement = document.querySelector("#triforce svg");
  const selectedToUp = document.getElementById(polygonId);
  selectedToUp.remove();
  svgElement.appendChild(selectedToUp);
  redraw(svgElement)
}

function redraw(element) {
  if (element) {
    const clone = element.cloneNode(true);
    element.replaceWith(clone);
  }
}

function closeScreen(screenId) {
  let element = document.getElementById(screenId.substring(0, screenId.lastIndexOf('-')))
  document.getElementById(screenId).classList.remove('show');
  
  element.classList.remove("fullscreen");
}

function openScreen(partName) {
  let element = document.getElementById(partName);
  if (!element.classList.contains("fullscreen")) {
    bringToFront(partName);
    
    setTimeout(() => {
      element = document.getElementById(partName);
      element.classList.add("fullscreen");
  
      document.getElementById(`${partName}-content`).classList.add('show');
    }, 1)

  }
}

function avoidBubble(event) {
  event.stopPropagation();
}

window.onresize = () => {
  const reference = {x: 1920, y: 1080}
  var scaleY = window.outerHeight / reference.y;
  document.getElementById("triforce").style.transform = `scale(${scaleY * 5})`;
}

setTimeout(window.onresize, 10)