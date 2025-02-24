
# AR 3D Product Card 

A lightweight React component for displaying products in both Augmented Reality (AR) and 3D. Perfect for eCommerce applications where you want to showcase your products in an immersive and interactive way.

## Installation

You can install the package via npm or yarn:

```bash
npm install room-craft
```

## Usage

```bash
import { Arcard } from "room-craft";
```
## Basic Example
```bash
import React from 'react';
import { Arcard } from "room-craft";

function App() {
  return (
    <div>
    <Arcard
  gltfPath="/models/tree_lamp.glb"
  type="custom-size" // AR and 3D card
  cardColor="#ffffff" // Optional: Set the card color
  cardStyle="minimal" // Optional: Card style (e.g., 'minimal', 'classic')
  customWidth="350px" // Minimum 300px suggested
  customHeight="250px" // Minimum 300px suggested
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

Make route 'xr' of this component

Example
```bash


import { Routes, Route } from "react-router-dom";
import { XrHitModelContainer } from 'room-craft';

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/xr" element={<XrHitModelContainer/>} />
      </Routes>
      </>
  )
}

export default App
```
## Features

- **AR and 3D views**: Allows users to view products in Augmented Reality or 3D directly in their browser.
- **Customizable product card**: Easily add products to the card with customizable properties like model path, scale, position, and image.
- **Mobile and Desktop Support**: Automatically adjusts based on the device (mobile devices for AR and desktops for 3D).
- **Easy Integration**: Simple to use in any React application.

## License
MIT License.