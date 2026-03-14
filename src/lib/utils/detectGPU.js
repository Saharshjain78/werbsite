export function detectGPU() {
  if (typeof window === 'undefined') return true;

  try {
    const canvas = document.createElement('canvas');
    if (!window.WebGLRenderingContext) return false;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return true;

    try {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    } catch(e) {
      console.warn("GPU detection info blocked, but WebGL works");
    }

    return true; 
  } catch (e) {
    console.error("WebGL initialization failed", e);
    return false;
  }
}
