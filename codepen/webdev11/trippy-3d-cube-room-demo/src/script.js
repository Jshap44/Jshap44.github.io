document.addEventListener("mousemove", function (e) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Get relative position [0,1]
  const xPos = e.clientX / vw;
  const yPos = e.clientY / vh;

  // Update the perspective-origin on the passage so the vanishing point follows the cursor.
  const perspectiveX = xPos * 100;
  const perspectiveY = yPos * 100;
  document.querySelector(
    ".passage"
  ).style.perspectiveOrigin = `${perspectiveX}% ${perspectiveY}%`;

  // Set max extra tilt (in degrees)
  const maxTilt = 10;
  // Calculate extra rotation relative to the center (values will be between -maxTilt/2 and +maxTilt/2)
  const extraRotateX = ((yPos - 0.5) * -maxTilt).toFixed(2) + "deg";
  const extraRotateY = ((xPos - 0.5) * maxTilt).toFixed(2) + "deg";

  // Update the CSS custom properties for rotation
  document.documentElement.style.setProperty("--rotateX", extraRotateX);
  document.documentElement.style.setProperty("--rotateY", extraRotateY);
});
