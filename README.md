
# AR 3D Product Card 

A lightweight React component for displaying products in both Augmented Reality (AR) and 3D. Perfect for eCommerce applications where you want to showcase your products in an immersive and interactive way.

## Installation

You can install the package via npm or yarn:

```bash
npm install 3d-ar-product-card
```

## Usage

```bash
import { AR3DProductCard } from '3d-ar-product-card';
```
## Basic Example
```bash
import React from 'react';
import { AR3DProductCard } from '3d-ar-product-card';

function App() {
  return (
    <div>
      <AR3DProductCard 
        gltfPath="/models/indoor_plant/scene.gltf" 
        imageSrc="/image/1.png" 
      />
    </div>
  );
}

export default App;

```

## Props
- gltfPath (string): The path to the 3D model file (GLTF format).

- imageSrc (string): The image to display on the product card.


## Setup Require
Make this src/components folder
name as XrHitModelContainer.jsx

```bash

import React, { useRef, useState, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "@react-three/drei";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

// Reusable button component for AR controls
const ARButtonControl = ({ onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      padding: '10px 15px',
      backgroundColor: 'white',
      border: '1px solid black',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '5px'
    }}
  >
    {label}
  </button>
);

const Model = ({ gltfPath, position, scale, isRotating }) => {
  const gltf = useLoader(GLTFLoader, gltfPath);
  const modelRef = useRef();

  useEffect(() => {
    let rotationAnimationFrame;
    const rotateModel = () => {
      if (modelRef.current && isRotating) {
        modelRef.current.rotation.y += 0.01; // Rotate the model
      }
      rotationAnimationFrame = requestAnimationFrame(rotateModel);
    };

    if (isRotating) {
      rotateModel();
    } else {
      if (rotationAnimationFrame) {
        cancelAnimationFrame(rotationAnimationFrame);
      }
    }

    return () => {
      if (rotationAnimationFrame) {
        cancelAnimationFrame(rotationAnimationFrame);
      }
    };
  }, [isRotating]);

  return (
    <primitive
      ref={modelRef}
      position={position}
      scale={scale}
      object={gltf.scene}
    />
  );
};

const XrHitModel = ({ gltfPath, isRotating }) => {
  const reticleRef = useRef();
  const [models, setModels] = useState([]);
  const [scale, setScale] = useState(new THREE.Vector3(1, 1, 1));
  const { isPresenting } = useXR();

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  useHitTest((hitMatrix) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  const placeModel = () => {
    const position = reticleRef.current.position.clone();
    const id = Date.now();
    setModels([{ position, id }]);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        (touch1.clientX - touch2.clientX) ** 2 +
        (touch1.clientY - touch2.clientY) ** 2
      );

      if (handleTouchMove.prevDistance === null) {
        handleTouchMove.prevDistance = distance;
      }

      const scaleFactor = distance / handleTouchMove.prevDistance;
      setScale((prevScale) => {
        const newScale = prevScale.multiplyScalar(scaleFactor);
        return new THREE.Vector3(
          Math.min(Math.max(newScale.x, 0.5), 2),  // Constrain scaling between 0.5 and 2
          Math.min(Math.max(newScale.y, 0.5), 2),
          Math.min(Math.max(newScale.z, 0.5), 2)
        );
      });
      handleTouchMove.prevDistance = distance;
    }
  };

  const handleTouchEnd = () => {
    handleTouchMove.prevDistance = null;
  };

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => (
          <Model key={id} gltfPath={gltfPath} position={position} scale={scale} isRotating={isRotating} />
        ))}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}
      {!isPresenting && <Model gltfPath={gltfPath} scale={scale} isRotating={isRotating} />}
    </>
  );
};

const XrHitModelContainer = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gltfPath = params.get('gltfPath') || './models/default.gltf';
  const [isRotating, setIsRotating] = useState(true);

  const toggleRotation = () => {
    setIsRotating((prev) => !prev);
  };

  return (
    <>
      <ARButton sessionInit={{ requiredFeatures: ["hit-test"] }} />
      
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 100 }}>
        {/* Start/Stop Rotation Button */}
        <ARButtonControl
          onClick={toggleRotation}
          label={isRotating ? 'Stop Rotation' : 'Start Rotation'}
        />
        
      </div>
      
      <Canvas style={{ width: '1055px', height: '738px' }}>
        <XR>
          <XrHitModel gltfPath={gltfPath} isRotating={isRotating} />
        </XR>
      </Canvas>
    </>
  );
};

export default XrHitModelContainer;

```

Make route 'xr' of this component

Example
```bash


import XrHitModelContainer from "./components/XrHitModelContainer";

const App = () => {
  return(
  <Routes>
   <Route path="/xr" element={<XrHitModelContainer />} />
  </Routes>
 
)};

export default App;
```
## Features

- **AR and 3D views**: Allows users to view products in Augmented Reality or 3D directly in their browser.
- **Customizable product card**: Easily add products to the card with customizable properties like model path, scale, position, and image.
- **Mobile and Desktop Support**: Automatically adjusts based on the device (mobile devices for AR and desktops for 3D).
- **Easy Integration**: Simple to use in any React application.

## License
MIT License.