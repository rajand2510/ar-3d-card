import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';  // React Three Fiber
import { OrbitControls } from '@react-three/drei'; // Import OrbitControls for model rotation
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';  // GLTFLoader to load 3D models
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';  // Draco compression support
import { ToastContainer, toast } from 'react-toastify';

const ProductCard = ({ gltfPath, positionY, initialScale }) => {
  const controlsRef = useRef();
  const [model, setModel] = useState(null);
  const [loadModelError, setLoadModelError] = useState(null);

  useEffect(() => {
    if (!gltfPath) {
      console.error('No GLTF path provided');
      setLoadModelError(new Error('No GLTF path provided'));
      return;
    }

    console.log('GLTF Path:', gltfPath);

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    // Point to the Draco decoder files in your public directory
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(gltfPath, (gltf) => {
      console.log('Model loaded:', gltf);
      const scene = gltf.scene;
      scene.scale.set(initialScale, initialScale, initialScale);
      scene.position.y = positionY;
      setModel(scene);
    }, (xhr) => {
      console.log('Model loading progress:', xhr.loaded, xhr.total);
    }, (error) => {
      console.error('Error loading model:', error);
      setLoadModelError(error);
    });

    // Clean up the DRACOLoader after use
    return () => {
      dracoLoader.dispose();
    };
  }, [gltfPath, initialScale, positionY]);

  if (loadModelError) {
    return <div>Error loading model: {loadModelError.message}</div>;
  }

  return (
    <div className="flex flex-col mx-[15px] my-[20px] bg-white shadow-lg h-[400px] w-[600px] rounded-[25px]">
      {/* Conditionally render the ToastContainer if there's a notification */}
      { toast.isOpen && 
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      }

      {/* 3D Canvas */}
      <div className="shrink-0 rounded-[20px] h-[410px]  bg-zinc-300 ">
        <Canvas
          className="product-canvas rounded-[15px]"
          camera={{ position: [0, 0, 5] }} // Set camera position for viewing the model
          gl={{ alpha: true }} // Ensures transparency for the background
          style={{ background: 'linear-gradient(to bottom, #cfd9df, #e2ebf0)' }} // Background style
        >
          <ambientLight intensity={2.5} color="#ffffff" /> {/* Ambient lighting */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> {/* Spot light */}
          <OrbitControls ref={controlsRef} /> {/* OrbitControls to allow rotation of model */}
          {model && <primitive object={model} />} {/* Render the 3D model */}
        </Canvas>
      </div>
    </div>
  );
};

export default ProductCard;
