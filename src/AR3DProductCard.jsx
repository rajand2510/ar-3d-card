// import * as React from "react";
// import { useState, useEffect, useRef } from "react";
// import ProductCard from './ProductCard'; // Import the ProductCard component
// import {QRCodeSVG} from 'qrcode.react';
// // QrScannerCard component
// function QrScannerCard({ onCancel, url }) {
//   return (
//     <article className="relative flex flex-col shadow-2xl py-3 pr-3 pl-12 -ml-px rounded-2xl max-w-[266px] bg-white">
//       <div className="flex gap-3 items-start self-start mb-4">
//         {/* Dynamically generate the QR code */}
      
//         <QRCodeSVG
//           value={url} // URL for the QR code
//           size={155} // Size of the QR code
//           bgColor="#FFFFFF" // Background color
//           fgColor="#000000" // Foreground color
//           className="shrink-0 pt-[10px] pl-2 w-[155px] h-[155px]"
//         />

//         <button
//           onClick={onCancel} // Trigger onCancel function passed from Home
//           className="object-contain shrink-0 aspect-square w-[36px] h-[36px] sm:w-[36px] sm:h-[36px] md:w-[36px] md:h-[36px] p-1 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none transition duration-200 ease-in-out"
//         >
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/8413f1e3d7bad3c1c6a2161fe0a5e57db6bf71b385607571aa0c4b09275a751c?placeholderIfAbsent=true&apiKey=7c5c9b658efc49cc9c7f03d144c67cfb"
//             alt="Button cancel"
//             className="object-contain w-full h-full"
//           />
//         </button>
//       </div>
//       <div
//         className="self-center mt-1 px-2 pt-1 pb-1.5 mr-10 text-xs font-semibold text-center text-white rounded-2xl bg-neutral-600 w-[98px]"
//         tabIndex="0"
//       >
//         Scan QR Code
//       </div>
//     </article>
//   );
// }

// const Home = ({ 
//   gltfPath = "/models/indoor_plant/scene.gltf", 
//   positionY = 0, 
//   initialScale = 1, 
//   imageSrc = "/image/1.png" 
// }) => {
//   const [showQrScanner, setShowQrScanner] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
 

//   // Check if the device is mobile
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Consider screens <= 768px as mobile
//     };

//     // Add event listener on mount
//     window.addEventListener('resize', handleResize);

//     // Check on initial render
//     handleResize();

//     // Cleanup event listener on unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleRightButtonClick = () => {
//     const baseUrl = window.location.origin;
//     const arUrl = `${baseUrl}/xr?gltfPath=${encodeURIComponent(gltfPath)}`;

//     if (isMobile) {
//       // For mobile, directly navigate to the AR URL
//       window.location.href = arUrl;
//     } else {
//       // For desktop, show the QR scanner card and pass the arUrl
//       setShowQrScanner(arUrl); // Pass arUrl as the state
//     }
//   };

//   const handleLeftButtonClick = () => setShowPopup(true);
//   const handleCancel = () => setShowQrScanner(false);
//   const handleClosePopup = () => setShowPopup(false);

//   return (
//     <div>
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-5 rounded-lg relative">
//             <div className="flex justify-end">
//               <button
//                 onClick={handleClosePopup}
//                 className="object-contain aspect-square w-[36px] h-[36px] p-1 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
//               >
//                 <img
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/8413f1e3d7bad3c1c6a2161fe0a5e57db6bf71b385607571aa0c4b09275a751c"
//                   alt="Close"
//                   className="object-contain w-full h-full"
//                 />
//               </button>
//             </div>
//             <ProductCard gltfPath={gltfPath} positionY={positionY} initialScale={initialScale} />
//           </div>
//         </div>
//       )}

//       {showQrScanner ? (
//         <QrScannerCard onCancel={handleCancel} url={showQrScanner} /> // Pass the arUrl to QrScannerCard
//       ) : (
//         <article className="relative flex flex-col shadow-2xl rounded-3xl max-w-[266px] bg-white">
//           <img
//             src={imageSrc}
//             alt="Main gallery image"
//             className="object-cover rounded-2xl w-full h-full aspect-[1.204]"
//           />
//           <button
//             onClick={handleLeftButtonClick}
//             className="absolute bottom-4 left-4 w-[42px] h-[42px] p-1 rounded-full bg-gray-100 hover:bg-gray-200"
//           >
//             <img
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2449bde7ca28a3beaa263bf12357cc8044b671bc122d0e6e55fb91f5afce627"
//               alt="360 view"
//               className="object-contain w-full h-full"
//             />
//           </button>
//           <button
//             onClick={handleRightButtonClick}
//             className="absolute bottom-4 right-4 w-[42px] h-[42px] p-1 rounded-full bg-gray-100 hover:bg-gray-200"
//           >
//             <img
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/7344838b6c7244cc25bcab8cd8ceaf043201fa2fc9c5bde3a52bef437742f58c"
//               alt="AR View"
//               className="object-contain w-full h-full"
//             />
//           </button>
//         </article>
//       )}
//     </div>
//   );
// };

// export default Home;
// import React from 'react';

import { QRCodeSVG } from 'qrcode.react';
import './styles.css';

function QrScannerCard({ onCancel, url }) {
  return (
    <article className="qr-scanner-card">
      <div className="qr-scanner-header">
        <QRCodeSVG value={url} size={155} bgColor="#FFFFFF" fgColor="#000000" />
        <button
  onClick={onCancel}
  className="cancel-button"
  style={{ width: '20px', height: '20px', padding: '0' }} // Set size here
>
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8413f1e3d7bad3c1c6a2161fe0a5e57db6bf71b385607571aa0c4b09275a751c?placeholderIfAbsent=true&apiKey=7c5c9b658efc49cc9c7f03d144c67cfb"
    alt="Button cancel"
    style={{ width: '100%', height: '100%' }} // Make image fill the button
  />
</button>
      </div>
      <div className="qr-scanner-footer">Scan QR Code</div>
    </article>
  );
}



import React, { useState, useEffect } from 'react';

import ProductCard from './ProductCard';
import PropTypes from 'prop-types';



const AR3DProductCard  = ({ 
    gltfPath, 
    positionY, 
    initialScale, 
    imageSrc 
  }) => {
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const missingFields = [];
    if (!gltfPath) missingFields.push("gltfPath");
    if (positionY == null) missingFields.push("positionY");
    if (initialScale == null) missingFields.push("initialScale");
    if (!imageSrc) missingFields.push("imageSrc");

    setErrors(missingFields);
  }, [gltfPath, positionY, initialScale, imageSrc]);

  const handleRightButtonClick = () => {
    const baseUrl = window.location.origin;
    const arUrl = `${baseUrl}/xr?gltfPath=${gltfPath}`;
    if (isMobile) {
      window.location.href = arUrl;
    } else {
      setShowQrScanner(arUrl);
    }
  };

  const handleLeftButtonClick = () => setShowPopup(true);
  const handleCancel = () => setShowQrScanner(false);
  const handleClosePopup = () => setShowPopup(false);

  if (errors.length > 0) {
    return (
      <div className="error-container">
        <h2>Missing Required Props</h2>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error} is not provided</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="home-container">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={handleClosePopup} className="close-button">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8413f1e3d7bad3c1c6a2161fe0a5e57db6bf71b385607571aa0c4b09275a751c"
                alt="Close"
              />
            </button>
            <ProductCard gltfPath={gltfPath} positionY={positionY} initialScale={initialScale} />
          </div>
        </div>
      )}

      {showQrScanner ? (
        <QrScannerCard onCancel={handleCancel} url={showQrScanner} />
      ) : (
        <article className="main-card">
          <img src={imageSrc} alt="Main gallery image" className="main-image" />
          <button onClick={handleLeftButtonClick} className="left-button">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2449bde7ca28a3beaa263bf12357cc8044b671bc122d0e6e55fb91f5afce627"
              alt="360 view"
            />
          </button>
          <button onClick={handleRightButtonClick} className="right-button">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7344838b6c7244cc25bcab8cd8ceaf043201fa2fc9c5bde3a52bef437742f58c"
              alt="AR View"
            />
          </button>
        </article>
      )}
    </div>
  );
};

AR3DProductCard.propTypes = {
  gltfPath: PropTypes.string,
  positionY: PropTypes.number,
  initialScale: PropTypes.number,
  imageSrc: PropTypes.string
};

export default AR3DProductCard ;
