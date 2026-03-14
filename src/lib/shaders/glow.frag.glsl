uniform vec3 uBaseColor;
uniform vec3 uGlowColor;
uniform float uGlowIntensity;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
  
  // Adding subtle time variation for shimmer
  float shimmer = sin(uTime * 2.0 + vPosition.z * 10.0) * 0.1 + 0.9;
  float intensity = fresnel * uGlowIntensity * shimmer;
  
  vec3 finalColor = mix(uBaseColor, uGlowColor, intensity);
  
  gl_FragColor = vec4(finalColor, 1.0);
}