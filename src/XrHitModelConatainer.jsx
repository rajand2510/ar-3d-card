// import React, { useRef, useState } from "react";
// import "@google/model-viewer";
// import PropTypes from "prop-types";

// const XrHitModelContainer = ({ gltfPath }) => {
//   const modelViewerRef = useRef(null);
//   const [isPlaced, setIsPlaced] = useState(false);
//   const [scale, setScale] = useState(1); // Default scale

//   const handleARPlacement = (event) => {
//     const modelViewer = modelViewerRef.current;
//     if (modelViewer?.scene) {
//       const hitTest = event.detail?.hitTestResults?.[0];
//       if (hitTest) {
//         const { x, y, z } = hitTest.transform.position;

//         // Set position and scale
//         modelViewer.scene.position.set(x, y, z);
//         modelViewer.scene.scale.set(scale, scale, scale);
//         setIsPlaced(true);
//       }
//     }
//   };

//   const increaseScale = () => setScale((prev) => prev + 0.1);
//   const decreaseScale = () => setScale((prev) => Math.max(prev - 0.1, 0.1));

//   return (
//     <div style={{ width: "100%", height: "90%" }}>
//       <model-viewer
//         ref={modelViewerRef}
//         src={gltfPath}
//         ar
//         ar-hit-test
//         camera-controls
//         style={{ width: "100%", height: "100%" }}
//         onArHitTest={handleARPlacement}
//       />
//       {isPlaced && (
//         <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
//           <button onClick={increaseScale} style={{ marginRight: "10px" }}>
//             Increase Scale
//           </button>
//           <button onClick={decreaseScale}>Decrease Scale</button>
//         </div>
//       )}
//     </div>
//   );
// };

// XrHitModelContainer.propTypes = {
//   gltfPath: PropTypes.string.isRequired,
// };

// export default XrHitModelContainer;
import React, { useRef, useState, useEffect } from "react";
import "@google/model-viewer";

const XrHitModelContainer = () => {
  const modelViewerRef = useRef(null);
  const [isPlaced, setIsPlaced] = useState(false);
  const [scale, setScale] = useState(1);
  const [gltfPath, setGltfPath] = useState("");

  // Extract gltfPath from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const path = params.get("gltfPath");
    if (path) setGltfPath(path);
  }, []);

  // Handle AR placement logic
  const handleARPlacement = (event) => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const hitTest = event.detail?.hitTestResults?.[0]; // Get first hit test result
    if (hitTest) {
      const { x, y, z } = hitTest.transform.position;
      modelViewer.setAttribute("position", `${x} ${y} ${z}`);
      modelViewer.setAttribute("scale", `${scale} ${scale} ${scale}`);
      setIsPlaced(true);
    }
  };

  // Increase and decrease scale
  const increaseScale = () => setScale((prev) => prev + 0.1);
  const decreaseScale = () => setScale((prev) => Math.max(prev - 0.1, 0.1));

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {gltfPath ? (
        <model-viewer
          ref={modelViewerRef}
          src={gltfPath}
          ar
          ar-hit-test
          camera-controls
          auto-rotate
          style={{ width: "100%", height: "90%" }}
          onArHitTest={handleARPlacement}
        />
      ) : (
        <p>Loading AR Viewer...</p>
      )}

      {isPlaced && (
        <div style={{ position: "absolute", bottom: "10px", left: "10px", display: "flex", gap: "10px" }}>
          <button onClick={increaseScale}>Increase Scale</button>
          <button onClick={decreaseScale}>Decrease Scale</button>
        </div>
      )}
    </div>
  );
};

export default XrHitModelContainer;
