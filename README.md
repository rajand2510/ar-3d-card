
# AR 3D Product Card 

A lightweight React component for displaying products in both Augmented Reality (AR) and 3D. Perfect for eCommerce applications where you want to showcase your products in an immersive and interactive way.

## Installation

You can install the package via npm or yarn:

```bash
npm install room-craft
```

## Usage

```bash
import { AR3DProductCard } from 'room-craft';
```
## Basic Example
```bash
import React from 'react';
import { AR3DProductCard } from 'room-craft';

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
name as Arcomponent.jsx

```bash
import { XrHitModelContainer } from 'room-craft';
```

```bash
import { useLocation } from 'react-router-dom';
import { XrHitModelContainer } from 'room-craft';

const Arcomponent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gltfPath = params.get('gltfPath') || './models/default.gltf';

console.log(gltfPath);


  console.log("gltfPath:", gltfPath); // Log the gltfPath for debugging

  return (
    <>
      {gltfPath ? (
        <XrHitModelContainer gltfPath={gltfPath} />
      ) : (
        <p>Error: No valid GLTF path provided.</p>
      )}
    </>
  );
};

export default Arcomponent;


```

Make route 'xr' of this component

Example
```bash


import Arcomponent from "./components/Arcomponent";

const App = () => {
  return(
  <Routes>
   <Route path="/xr" element={<Arcomponent />} />
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