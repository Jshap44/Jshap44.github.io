(() => {
  const isMobile = window.innerWidth < 768;
  const params = {
    ambientParticleCount: 10000,
    ambientMinScale: 1,
    ambientMaxScale: 2,
    ambientVelocityMin: 1,
    ambientVelocityMax: 20,
    ambientTweenDurationMin: 10,
    ambientTweenDurationMax: 20,
    ambientEase: "power1.inOut",
    
    ambientFadeInDurationMin: 1,
    ambientFadeInDurationMax: 5,
    ambientOpaqueTimeMin: 2,
    ambientOpaqueTimeMax: 2,
    ambientFadeOutDurationMin: 1,
    ambientFadeOutDurationMax: 5,
    ambientMovementDelayMin: 0,
    ambientMovementDelayMax: 10,
    ambientMinTravel: 20,
    ambientMaxTravel: 100,
    ambientAngleChange: Math.PI / 2,
    ambientCurveOffsetMin: -50,
    ambientCurveOffsetMax: 50,
    
    mouseParticleCount: 8,
    mouseMinScale: 1,
    mouseMaxScale: 5,
    mouseVelocityMin: 10,
    mouseVelocityMax: 60,
    mouseGravity: 10,
    mouseTweenDurationMin: 0.3,
    mouseTweenDurationMax: 2.1,
    mouseEase: "power2.inOut",
    mouseSpawnWidth: 20,
    mouseSpawnHeight: 50,
    mouseRandomAngle: false, // false: use fixed angle; true: random
    mouseFixedAngle: 5, // fixed angle when toggle is off
    
    rippleEffectRadius: 400,
    rippleDisplacementMin: 5,
    rippleDisplacementMax: 100,
    rippleRandomYOffset: 10,

    subtleRippleRadius: 0,
    subtleRippleDisplacementMin: 0,
    subtleRippleDisplacementMax: 0,
    subtleRippleRandomYOffset: 0,
    
    bloomIntensity: 1.5,
    backgroundWaveAmp: 0.35,
    backgroundIntensity: 20.0,
    bgTopColor: "#0A0011",
    bgBottomColor: "#000000"
  };

  if (!isMobile && typeof dat !== "undefined") {
    const gui = new dat.GUI();
    gui.domElement.style.zIndex = "1000";
    const ambientFolder = gui.addFolder("Ambient Particles");
    ambientFolder.add(params, "ambientParticleCount", 100, 50000, 1).name("Count").onFinishChange(resetAmbientParticles);
    ambientFolder.add(params, "ambientMinScale", 0.5, 10, 0.1).name("Min Scale");
    ambientFolder.add(params, "ambientMaxScale", 0.5, 10, 0.1).name("Max Scale");
    ambientFolder.add(params, "ambientVelocityMin", 0, 100, 1).name("Min Velocity");
    ambientFolder.add(params, "ambientVelocityMax", 0, 100, 1).name("Max Velocity");
    ambientFolder.add(params, "ambientTweenDurationMin", 1, 30, 0.1).name("Move Min Duration");
    ambientFolder.add(params, "ambientTweenDurationMax", 1, 30, 0.1).name("Move Max Duration");
    ambientFolder.add(params, "ambientEase").name("Move Easing");
    ambientFolder.add(params, "ambientMovementDelayMin", 0, 5, 0.1).name("Move Min Delay");
    ambientFolder.add(params, "ambientMovementDelayMax", 0, 5, 0.1).name("Move Max Delay");
    ambientFolder.add(params, "ambientMinTravel", 10, 200, 1).name("Min Travel");
    ambientFolder.add(params, "ambientMaxTravel", 10, 200, 1).name("Max Travel");
    ambientFolder.add(params, "ambientAngleChange", 0, Math.PI, 0.01).name("Max Angle Change");
    ambientFolder.add(params, "ambientCurveOffsetMin", -100, 0, 1).name("Min Curve Offset");
    ambientFolder.add(params, "ambientCurveOffsetMax", 0, 100, 1).name("Max Curve Offset");
    ambientFolder.add(params, "ambientFadeInDurationMin", 1, 5, 0.1).name("Fade In Min (s)");
    ambientFolder.add(params, "ambientFadeInDurationMax", 1, 5, 0.1).name("Fade In Max (s)");
    ambientFolder.add(params, "ambientOpaqueTimeMin", 1, 5, 0.1).name("Opaque Time Min (s)");
    ambientFolder.add(params, "ambientOpaqueTimeMax", 1, 5, 0.1).name("Opaque Time Max (s)");
    ambientFolder.add(params, "ambientFadeOutDurationMin", 1, 5, 0.1).name("Fade Out Min (s)");
    ambientFolder.add(params, "ambientFadeOutDurationMax", 1, 5, 0.1).name("Fade Out Max (s)");
    ambientFolder.add(params, "rippleEffectRadius", 50, 400, 1).name("Ripple Radius");
    ambientFolder.add(params, "rippleDisplacementMin", 5, 100, 1).name("Ripple Disp Min");
    ambientFolder.add(params, "rippleDisplacementMax", 5, 100, 1).name("Ripple Disp Max");
    ambientFolder.add(params, "rippleRandomYOffset", 0, 30, 1).name("Ripple Y Offset");
    ambientFolder.add(params, "subtleRippleRadius", 20, 200, 1).name("Subtle Ripple Radius");
    ambientFolder.add(params, "subtleRippleDisplacementMin", 1, 20, 1).name("Subtle Disp Min");
    ambientFolder.add(params, "subtleRippleDisplacementMax", 1, 20, 1).name("Subtle Disp Max");
    ambientFolder.add(params, "subtleRippleRandomYOffset", 0, 20, 1).name("Subtle Y Offset");
    ambientFolder.open();
    
    const mouseFolder = gui.addFolder("Mouse Particles");
    mouseFolder.add(params, "mouseParticleCount", 1, 100, 1).name("Particles/Move");
    mouseFolder.add(params, "mouseMinScale", 1, 10, 0.1).name("Min Scale");
    mouseFolder.add(params, "mouseMaxScale", 1, 10, 0.1).name("Max Scale");
    mouseFolder.add(params, "mouseVelocityMin", 0, 300, 1).name("Min Velocity");
    mouseFolder.add(params, "mouseVelocityMax", 0, 300, 1).name("Max Velocity");
    mouseFolder.add(params, "mouseGravity", 0, 100, 1).name("Gravity");
    mouseFolder.add(params, "mouseTweenDurationMin", 0.5, 10, 0.1).name("Min Duration");
    mouseFolder.add(params, "mouseTweenDurationMax", 0.5, 10, 0.1).name("Max Duration");
    mouseFolder.add(params, "mouseEase").name("Easing");
    mouseFolder.add(params, "mouseSpawnWidth", 10, 200, 1).name("Spawn Width");
    mouseFolder.add(params, "mouseSpawnHeight", 5, 100, 1).name("Spawn Height");
    // New toggle parameters
    mouseFolder.add(params, "mouseRandomAngle").name("Random Angle");
    mouseFolder.add(params, "mouseFixedAngle", 0, Math.PI * 2, 0.01).name("Fixed Angle");
    mouseFolder.open();
    
    const renderFolder = gui.addFolder("Render");
    renderFolder.add(params, "bloomIntensity", 0, 5, 0.1).name("Bloom Intensity");
    renderFolder.add(params, "backgroundWaveAmp", 0, 0.5, 0.01).name("BG Wave Amp");
    renderFolder.add(params, "backgroundIntensity", 0, 2, 0.1).name("BG Intensity");
    renderFolder.addColor(params, "bgTopColor").name("BG Top Color");
    renderFolder.addColor(params, "bgBottomColor").name("BG Bottom Color");
    renderFolder.open();
  }
  
  const canvas = document.getElementById("magic-dust");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL2 is not supported");
    return;
  }
  
  let sceneFBO = null, sceneTexture = null;
  let blurFBO1 = null, blurTexture1 = null;
  let blurFBO2 = null, blurTexture2 = null;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    resizeFramebuffers();
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  
  function compileShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }
  function createProgram(vsSource, fsSource) {
    const vShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }
  
  const vsParticle = `#version 300 es
    precision mediump float;
    layout(location = 0) in vec2 a_vertex;
    layout(location = 1) in vec2 a_position;
    layout(location = 2) in float a_scale;
    layout(location = 3) in float a_rotation;
    layout(location = 4) in vec4 a_color;
    uniform vec2 u_resolution;
    out vec2 v_texCoord;
    out vec4 v_color;
    void main() {
      float cosR = cos(a_rotation);
      float sinR = sin(a_rotation);
      vec2 rotated = vec2(
        a_vertex.x * cosR - a_vertex.y * sinR,
        a_vertex.x * sinR + a_vertex.y * cosR
      );
      vec2 pos = a_position + rotated * a_scale;
      vec2 clipSpace = (pos / u_resolution) * 2.0 - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      v_texCoord = a_vertex + vec2(0.5);
      v_color = a_color;
    }
  `;
  const fsParticle = `#version 300 es
    precision mediump float;
    in vec2 v_texCoord;
    in vec4 v_color;
    out vec4 outColor;
    void main() {
      float dist = distance(v_texCoord, vec2(0.5));
      if (dist > 0.5) { discard; }
      float alpha = smoothstep(0.5, 0.3, dist);
      outColor = vec4(v_color.rgb, v_color.a * alpha);
    }
  `;
  const vsQuad = `#version 300 es
    precision mediump float;
    layout(location = 0) in vec2 a_position;
    out vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0, 1);
    }
  `;
  const fsBlur = `#version 300 es
    precision mediump float;
    in vec2 v_texCoord;
    out vec4 outColor;
    uniform sampler2D u_texture;
    uniform vec2 u_texelSize;
    uniform vec2 u_direction;
    void main() {
      vec4 color = vec4(0.0);
      float weights[5];
      weights[0] = 0.204164;
      weights[1] = 0.304005;
      weights[2] = 0.093913;
      weights[3] = 0.304005;
      weights[4] = 0.204164;
      color += texture(u_texture, v_texCoord - 2.0 * u_direction * u_texelSize) * weights[0];
      color += texture(u_texture, v_texCoord - 1.0 * u_direction * u_texelSize) * weights[1];
      color += texture(u_texture, v_texCoord) * weights[2];
      color += texture(u_texture, v_texCoord + 1.0 * u_direction * u_texelSize) * weights[3];
      color += texture(u_texture, v_texCoord + 2.0 * u_direction * u_texelSize) * weights[4];
      outColor = color;
    }
  `;
  const fsComposite = `#version 300 es
    precision mediump float;
    in vec2 v_texCoord;
    out vec4 outColor;
    uniform sampler2D u_scene;
    uniform sampler2D u_bloom;
    uniform float u_bloomIntensity;
    uniform float u_time;
    uniform vec3 u_bgTop;
    uniform vec3 u_bgBottom;
    uniform float u_waveAmp;
    uniform float u_bgIntensity;
    void main() {
      float t = v_texCoord.y + sin(u_time * 0.1 + v_texCoord.x * 5.0) * u_waveAmp;
      vec3 bg = mix(u_bgBottom, u_bgTop, t);
      vec4 sceneColor = texture(u_scene, v_texCoord);
      vec4 bloomColor = texture(u_bloom, v_texCoord) * u_bloomIntensity;
      outColor = vec4(bg, 1.0) * u_bgIntensity + sceneColor + bloomColor;
    }
  `;
  
  const programParticles = createProgram(vsParticle, fsParticle);
  const programBlur = createProgram(vsQuad, fsBlur);
  const programComposite = createProgram(vsQuad, fsComposite);
  
  const uResLoc = gl.getUniformLocation(programParticles, "u_resolution");
  
  const quadVertices = new Float32Array([
    -0.5, -0.5,
     0.5, -0.5,
    -0.5,  0.5,
     0.5,  0.5
  ]);
  const quadVBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
  gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
  
  let instanceBuffer = gl.createBuffer();
  const particlesVAO = gl.createVertexArray();
  gl.bindVertexArray(particlesVAO);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
  const stride = 8 * 4;
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 0);
  gl.vertexAttribDivisor(1, 1);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 1, gl.FLOAT, false, stride, 2 * 4);
  gl.vertexAttribDivisor(2, 1);
  gl.enableVertexAttribArray(3);
  gl.vertexAttribPointer(3, 1, gl.FLOAT, false, stride, 3 * 4);
  gl.vertexAttribDivisor(3, 1);
  gl.enableVertexAttribArray(4);
  gl.vertexAttribPointer(4, 4, gl.FLOAT, false, stride, 4 * 4);
  gl.vertexAttribDivisor(4, 1);
  gl.bindVertexArray(null);
  
  const quadFSVertices = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
     1,  1
  ]);
  const quadFSVBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadFSVBO);
  gl.bufferData(gl.ARRAY_BUFFER, quadFSVertices, gl.STATIC_DRAW);
  const quadVAO = gl.createVertexArray();
  gl.bindVertexArray(quadVAO);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  
  function createFramebufferAttachment(width, height) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, null
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { fbo, texture };
  }
  function resizeFramebuffers() {
    const width = canvas.width;
    const height = canvas.height;
    if (sceneFBO) {
      gl.deleteTexture(sceneTexture);
      gl.deleteFramebuffer(sceneFBO);
      gl.deleteTexture(blurTexture1);
      gl.deleteFramebuffer(blurFBO1);
      gl.deleteTexture(blurTexture2);
      gl.deleteFramebuffer(blurFBO2);
    }
    let fb = createFramebufferAttachment(width, height);
    sceneFBO = fb.fbo;
    sceneTexture = fb.texture;
    fb = createFramebufferAttachment(width, height);
    blurFBO1 = fb.fbo;
    blurTexture1 = fb.texture;
    fb = createFramebufferAttachment(width, height);
    blurFBO2 = fb.fbo;
    blurTexture2 = fb.texture;
  }
  resizeFramebuffers();
  
  gl.useProgram(programBlur);
  const uTexelSizeLoc = gl.getUniformLocation(programBlur, "u_texelSize");
  const uDirectionLoc = gl.getUniformLocation(programBlur, "u_direction");
  const uTextureLoc = gl.getUniformLocation(programBlur, "u_texture");
  
  gl.useProgram(programComposite);
  const uSceneLoc = gl.getUniformLocation(programComposite, "u_scene");
  const uBloomLoc = gl.getUniformLocation(programComposite, "u_bloom");
  const uBloomIntensityLoc = gl.getUniformLocation(programComposite, "u_bloomIntensity");
  const uTimeLoc = gl.getUniformLocation(programComposite, "u_time");
  const uBgTopLoc = gl.getUniformLocation(programComposite, "u_bgTop");
  const uBgBottomLoc = gl.getUniformLocation(programComposite, "u_bgBottom");
  const uWaveAmpLoc = gl.getUniformLocation(programComposite, "u_waveAmp");
  const uBgIntensityLoc = gl.getUniformLocation(programComposite, "u_bgIntensity");
  
  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }
  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r, g, b];
  }
  function randomAllowedHue() {
    return Math.random() < 0.5 ? randomBetween(0, 0.167) : randomBetween(0.5, 0.667);
  }
  function hexToRgbNormalized(hex) {
    hex = hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return [r, g, b];
  }
  
  let particles = [];
  function createAmbientParticle() {
    const hue = randomAllowedHue();
    const particle = {
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      scale: randomBetween(params.ambientMinScale, params.ambientMaxScale),
      rotation: randomBetween(0, Math.PI * 2),
      hue: hue,
      fade: 1,
      ambient: true,
      rippleOffsetX: 0,
      rippleOffsetY: 0
    };
    particle.initialX = particle.x;
    particle.initialY = particle.y;
    particle.radius = 0;
    particle.angle = randomBetween(0, Math.PI * 2);
    particle.curveOffset = 0;
    particles.push(particle);
    const moveDuration = randomBetween(params.ambientTweenDurationMin, params.ambientTweenDurationMax);
    const moveDelay = randomBetween(params.ambientMovementDelayMin, params.ambientMovementDelayMax);
    const targetHue = (hue + 0.5) % 1;
    gsap.timeline({ repeat: -1, yoyo: true, delay: moveDelay })
      .to(particle, {
        duration: moveDuration,
        radius: randomBetween(params.ambientMinTravel, params.ambientMaxTravel),
        angle: particle.angle + randomBetween(-params.ambientAngleChange, params.ambientAngleChange),
        curveOffset: randomBetween(params.ambientCurveOffsetMin, params.ambientCurveOffsetMax),
        ease: params.ambientEase,
        onUpdate: () => {
          particle.x = particle.initialX + particle.radius * Math.cos(particle.angle) - particle.curveOffset * Math.sin(particle.angle);
          particle.y = particle.initialY + particle.radius * Math.sin(particle.angle) + particle.curveOffset * Math.cos(particle.angle);
        }
      }, 0)
      .to(particle, {
        duration: moveDuration,
        rotation: particle.rotation + randomBetween(-Math.PI, Math.PI),
        ease: params.ambientEase
      }, 0)
      .to(particle, {
        duration: moveDuration,
        hue: targetHue,
        ease: params.ambientEase
      }, 0);
    gsap.timeline({ repeat: -1 })
      .to(particle, {
        duration: randomBetween(params.ambientFadeOutDurationMin, params.ambientFadeOutDurationMax),
        fade: 0,
        ease: "power1.inOut"
      })
      .to(particle, {
        duration: randomBetween(params.ambientOpaqueTimeMin, params.ambientOpaqueTimeMax),
        ease: "power1.inOut"
      })
      .to(particle, {
        duration: randomBetween(params.ambientFadeInDurationMin, params.ambientFadeInDurationMax),
        fade: 1,
        ease: "power1.inOut"
      });
  }
  function resetAmbientParticles() {
    particles = particles.filter(p => !p.ambient);
    for (let i = 0; i < params.ambientParticleCount; i++) {
      createAmbientParticle();
    }
  }
  resetAmbientParticles();
  
  // Mouse (magic dust) particles: use toggle parameters for angle.
  function createMouseParticle(x, y) {
    const hue = randomAllowedHue();
    const alpha = randomBetween(0.8, 1.0);
    const offsetX = randomBetween(-params.mouseSpawnWidth / 2, params.mouseSpawnWidth / 2);
    const offsetY = randomBetween(-params.mouseSpawnHeight / 2, params.mouseSpawnHeight / 2);
    // If toggle is off, use fixed angle (with slight variation); otherwise, randomize fully.
    const angle = params.mouseRandomAngle
      ? randomBetween(0, Math.PI * 2)
      : params.mouseFixedAngle + randomBetween(-0.1, 0.1);
    const particle = {
      initialX: x + offsetX,
      initialY: y + offsetY,
      x: x + offsetX,
      y: y + offsetY,
      scale: randomBetween(params.mouseMinScale, params.mouseMaxScale),
      rotation: randomBetween(0, Math.PI * 2),
      hue: hue,
      alpha: alpha,
      angle: angle,
      radius: 0,
      angularVelocity: randomBetween(0.5, 1.5),
      radialSpeed: randomBetween(params.mouseVelocityMin, params.mouseVelocityMax)
    };
    particles.push(particle);
    const duration = randomBetween(params.mouseTweenDurationMin, params.mouseTweenDurationMax);
    const targetHue = (hue + 0.5) % 1;
    gsap.timeline({
      onComplete: () => {
        const index = particles.indexOf(particle);
        if (index > -1) particles.splice(index, 1);
      }
    })
      .to(particle, {
        duration: duration,
        radius: particle.radialSpeed * duration,
        angle: particle.angle + particle.angularVelocity * duration,
        ease: params.mouseEase,
        onUpdate: () => {
          particle.x = particle.initialX + Math.cos(particle.angle) * particle.radius;
          particle.y = particle.initialY + Math.sin(particle.angle) * particle.radius;
        }
      }, 0)
      .to(particle, {
        duration: duration,
        hue: targetHue,
        ease: params.mouseEase
      }, 0);
  }
  
  // On mouse move/touch swipe, create magic dust and apply subtle ripple to ambient particles.
  function handleMouseMove(x, y) {
    for (let i = 0; i < params.mouseParticleCount; i++) {
      createMouseParticle(x, y);
    }
    // Subtle ripple effect on ambient particles behind the magic dust point.
    particles.forEach(p => {
      if (p.ambient) {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < params.subtleRippleRadius) {
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          const disp = randomBetween(params.subtleRippleDisplacementMin, params.subtleRippleDisplacementMax);
          const extraYOffset = (Math.abs(nx) > Math.abs(ny))
            ? randomBetween(-params.subtleRippleRandomYOffset, params.subtleRippleRandomYOffset)
            : 0;
          gsap.to(p, {
            duration: 0.3,
            rippleOffsetX: nx * disp,
            rippleOffsetY: ny * disp + extraYOffset,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          });
        }
      }
    });
  }
  
  document.addEventListener("mousemove", (e) => {
    handleMouseMove(e.pageX, e.pageY);
  });
  if (isMobile) {
    document.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseMove(touch.pageX, touch.pageY);
    }, { passive: false });
    document.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseMove(touch.pageX, touch.pageY);
    }, { passive: false });
  }
  
  // Ripple effect for click/tap: animate ambient particles outward from the event point.
  function rippleEffect(cx, cy) {
    const range = params.rippleEffectRadius;
    particles.forEach(p => {
      if (p.ambient) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < range) {
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          const disp = randomBetween(params.rippleDisplacementMin, params.rippleDisplacementMax);
          const extraYOffset = (Math.abs(nx) > Math.abs(ny))
            ? randomBetween(-params.rippleRandomYOffset, params.rippleRandomYOffset)
            : 0;
          gsap.to(p, {
            duration: 0.5,
            rippleOffsetX: nx * disp,
            rippleOffsetY: ny * disp + extraYOffset,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          });
        }
      }
    });
  }
  document.addEventListener("click", (e) => {
    rippleEffect(e.pageX, e.pageY);
  });
  if (isMobile) {
    document.addEventListener("touchend", (e) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      rippleEffect(touch.pageX, touch.pageY);
    }, { passive: false });
  }
  
  // Update instance buffer (includes ripple offsets).
  function updateInstanceBuffer() {
    const data = new Float32Array(particles.length * 8);
    let i = 0;
    for (let p of particles) {
      const baseRgb = hslToRgb(p.hue, 0.8, 0.6);
      let r = baseRgb[0], g = baseRgb[1], b = baseRgb[2];
      if (p.ambient) {
        r *= p.fade;
        g *= p.fade;
        b *= p.fade;
      }
      data[i++] = p.x + (p.rippleOffsetX || 0);
      data[i++] = p.y + (p.rippleOffsetY || 0);
      data[i++] = p.scale;
      data[i++] = p.rotation;
      data[i++] = r;
      data[i++] = g;
      data[i++] = b;
      data[i++] = p.ambient ? 1 : p.alpha;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  }
  
  function render() {
    updateInstanceBuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFBO);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(programParticles);
    gl.uniform2f(uResLoc, canvas.width, canvas.height);
    gl.bindVertexArray(particlesVAO);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, particles.length);
    gl.bindFramebuffer(gl.FRAMEBUFFER, blurFBO1);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(programBlur);
    gl.bindVertexArray(quadVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
    gl.uniform1i(uTextureLoc, 0);
    gl.uniform2f(uTexelSizeLoc, 1.0 / canvas.width, 1.0 / canvas.height);
    gl.uniform2f(uDirectionLoc, 1.0, 0.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, blurFBO2);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindTexture(gl.TEXTURE_2D, blurTexture1);
    gl.uniform2f(uDirectionLoc, 0.0, 1.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(programComposite);
    gl.bindVertexArray(quadVAO);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
    gl.uniform1i(uSceneLoc, 0);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, blurTexture2);
    gl.uniform1i(uBloomLoc, 1);
    gl.uniform1f(uBloomIntensityLoc, params.bloomIntensity);
    gl.uniform1f(uTimeLoc, performance.now() * 0.001);
    gl.uniform1f(uWaveAmpLoc, params.backgroundWaveAmp);
    gl.uniform1f(uBgIntensityLoc, params.backgroundIntensity);
    gl.uniform3fv(uBgTopLoc, hexToRgbNormalized(params.bgTopColor));
    gl.uniform3fv(uBgBottomLoc, hexToRgbNormalized(params.bgBottomColor));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();
