import { useEffect, useRef } from "react";

// Vertex shader - simple passthrough
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader - realistic top-down beach waves
const fragmentShaderSource = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;

  #define PI 3.14159265359

  // Smooth noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal brownian motion for organic patterns
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Wave function - creates rolling wave pattern
  float wave(vec2 uv, float time, float frequency, float speed, float offset) {
    // Wave moves from bottom to top (toward shore)
    float y = uv.y + offset;

    // Add slight curve variation along x-axis
    float xVariation = sin(uv.x * 2.0 + offset * 5.0) * 0.02;
    y += xVariation;

    // Create wave shape - sharper crest, smoother trough
    // Reversed direction with + time instead of - time
    float wave = sin((y * frequency + time * speed) * PI * 2.0);
    wave = wave * 0.5 + 0.5; // Normalize to 0-1

    // Sharpen the wave crest
    wave = pow(wave, 0.7);

    return wave;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Flip Y so waves come from top
    uv.y = 1.0 - uv.y;

    float time = u_time * 0.5;

    // Colors - tropical beach palette
    vec3 deepWater = vec3(0.0, 0.35, 0.5);       // Deep turquoise
    vec3 shallowWater = vec3(0.1, 0.6, 0.65);    // Light turquoise
    vec3 foam = vec3(0.95, 0.98, 1.0);           // White foam
    vec3 wetSand = vec3(0.76, 0.70, 0.55);       // Wet sand
    vec3 drySand = vec3(0.92, 0.85, 0.70);       // Dry sand

    // Shore position (bottom of screen)
    float shoreBase = 0.2;

    // Create multiple wave layers at different positions
    float wave1 = wave(uv, time, 4.0, 0.8, 0.0);
    float wave2 = wave(uv, time, 4.0, 0.8, 0.25);
    float wave3 = wave(uv, time, 4.0, 0.8, 0.5);
    float wave4 = wave(uv, time, 4.0, 0.8, 0.75);

    // Add organic variation with noise
    float noiseVal = fbm(uv * 8.0 + time * 0.2) * 0.1;

    // Calculate foam intensity for each wave
    // Foam appears at wave crests (when wave value is high)
    float foamThreshold = 0.75;
    float foam1 = smoothstep(foamThreshold, foamThreshold + 0.15, wave1);
    float foam2 = smoothstep(foamThreshold, foamThreshold + 0.15, wave2);
    float foam3 = smoothstep(foamThreshold, foamThreshold + 0.15, wave3);
    float foam4 = smoothstep(foamThreshold, foamThreshold + 0.15, wave4);

    // Foam is more intense near shore
    float shoreProximity = 1.0 - smoothstep(shoreBase, shoreBase + 0.5, uv.y);
    float totalFoam = (foam1 + foam2 + foam3 + foam4) * 0.3;
    totalFoam *= (0.3 + shoreProximity * 0.7);

    // Add foam texture variation
    float foamNoise = fbm(uv * 30.0 + time * 0.5);
    totalFoam *= (0.7 + foamNoise * 0.5);

    // Edge foam - extra foam right at wave crests
    float edgeFoam1 = smoothstep(0.85, 0.95, wave1) * smoothstep(1.0, 0.9, wave1);
    float edgeFoam2 = smoothstep(0.85, 0.95, wave2) * smoothstep(1.0, 0.9, wave2);
    float edgeFoam = (edgeFoam1 + edgeFoam2) * 0.5;

    // Water depth gradient
    float depth = smoothstep(shoreBase, 1.0, uv.y);
    vec3 waterColor = mix(shallowWater, deepWater, depth);

    // Add subtle wave shading (darker in troughs)
    float waveShade = (wave1 + wave2) * 0.5;
    waterColor = mix(waterColor * 0.85, waterColor, waveShade);

    // Shore/sand calculation
    // Waves push up onto shore dynamically
    float waveReach = shoreBase + (wave1 * 0.15 + wave2 * 0.1) * shoreProximity;
    waveReach += noiseVal * 0.5;

    float onShore = smoothstep(waveReach + 0.02, waveReach - 0.02, uv.y);

    // Wet sand zone
    float wetZone = smoothstep(shoreBase - 0.1, shoreBase + 0.15, uv.y);
    wetZone *= (1.0 - smoothstep(shoreBase + 0.15, shoreBase + 0.35, uv.y));

    // Sand color
    vec3 sandColor = mix(drySand, wetSand, wetZone * 0.8 + onShore * 0.3);

    // Compose final color
    vec3 color = waterColor;

    // Add foam to water
    color = mix(color, foam, totalFoam * 0.8);
    color = mix(color, foam, edgeFoam * 0.6);

    // Blend water with sand at shore
    color = mix(color, sandColor, onShore);

    // Shore foam line
    float shoreFoam = smoothstep(0.03, 0.0, abs(uv.y - waveReach));
    shoreFoam *= (0.5 + fbm(vec2(uv.x * 20.0, time * 2.0)) * 0.5);
    color = mix(color, foam, shoreFoam * 0.9);

    // Subtle sparkle on water
    float sparkle = pow(fbm(uv * 50.0 + time), 3.0) * depth;
    color += sparkle * 0.1;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function BeachWavesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get WebGL context with antialiasing
    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Set up geometry (full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    // Get locations
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    // Resize handler - properly handles high DPI displays
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      const rect = canvas.getBoundingClientRect();

      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Animation loop
    const startTime = performance.now();

    const render = () => {
      resize(); // Check size each frame for smooth resizing

      const time = (performance.now() - startTime) / 1000;

      gl.useProgram(program);

      // Set uniforms
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      // Set up position attribute
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen p-8 font-sans">
      <h1 className="text-sm text-black mb-8">Beach Waves Shader</h1>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{
            display: "block",
            height: "70vh",
          }}
        />
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Top-down beach wave animation - WebGL fragment shader
      </p>
    </div>
  );
}
