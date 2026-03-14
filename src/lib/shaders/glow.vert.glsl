varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  
  #ifdef USE_INSTANCING
    mat4 instanceModelMatrix = modelMatrix * instanceMatrix;
  #else
    mat4 instanceModelMatrix = modelMatrix;
  #endif

  // Calculate world position
  vec4 worldPosition = instanceModelMatrix * vec4(position, 1.0);
  vPosition = worldPosition.xyz;
  
  // Calculate world normal (assuming no non-uniform scaling)
  vNormal = normalize(mat3(instanceModelMatrix) * normal);
  
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}