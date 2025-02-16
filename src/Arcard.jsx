import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { QRCodeSVG } from "qrcode.react";
import "@google/model-viewer";
import "./Arcard.css";
import { div } from "three/webgpu";

if (!customElements.get("model-viewer")) {
    import("@google/model-viewer");
}

// QR Scanner Card Component
function QrScannerCard({ onCancel, url }) {
    return (
        <article className="qr-scanner-card">
            <div className="qr-scanner-header">
                <QRCodeSVG value={url} size={155} bgColor="#FFFFFF" fgColor="#000000" />
                <button onClick={onCancel} className="cancel-button">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8413f1e3d7bad3c1c6a2161fe0a5e57db6bf71b385607571aa0c4b09275a751c"
                        alt="Cancel"
                        style={{ width: "100%", height: "100%" }}
                    />
                </button>
            </div>
            <div className="qr-scanner-footer">Scan QR Code</div>
        </article>
    );
}

// Main Arcard Component
const Arcard = ({
    gltfPath,
    productName,
    productDescription,
    type,
    customWidth,
    customHeight,
    productPrice,
    productRating,
    cardStyle,
    cardColor = "#FFFFFF",
    textColor = "#000000",
}) => {
    const [showQrScanner, setShowQrScanner] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const missingFields = [];
        if (!gltfPath && type !== "horizontal-slider") missingFields.push("gltfPath");

        setErrors(missingFields);
    }, [gltfPath, type]);

    const handleRightButtonClick = () => {
        const baseUrl = window.location.origin;
        const arUrl = `${baseUrl}/xr?gltfPath=${gltfPath}`;
        
        // If it's a mobile device, redirect directly to the AR view
        if (isMobile) {
          window.location.href = arUrl; // Directly navigate to AR view
        } else {
          // For desktop, show the QR code
          setShowQrScanner(arUrl); // Show the QR code for desktop
        }
      };
      
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
        <>
{type === "3d-ar" && (
  <>
    {showPopup && (
      <div
        className="popup-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <div
          className="popup-content"
          style={{
            position: "relative",
            maxWidth: "90%",
            maxHeight: "90%",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <model-viewer
            src={gltfPath}
            alt="3D Product"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            style={{
              backgroundColor: cardColor,
              width: "100%",
              height: "400px",
              borderRadius: "10px",
            }}
          ></model-viewer>
          <button
            onClick={handleClosePopup}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>
      </div>
    )}

    {/* Show the QR Scanner only on desktop */}
  

    {/* Main content for AR display */}
  
      <>
        {/* Minimal Style */}
        {cardStyle === "minimal" && (
          <article
            className="main-card"
            style={{
              position: "relative",
              backgroundColor: cardColor || "#fff",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
              marginBottom: "20px",
               padding: showQrScanner ? "0px" : "5px"
            }}
          >

             {!showQrScanner && (
               <>
            <model-viewer
              src={gltfPath}
              alt="3D Product"
              auto-rotate
              camera-controls
              shadow-intensity="1"
              style={{
                backgroundColor: cardColor,
                width: "100%",
                height: "200px",
                borderRadius: "10px",
              }}
            ></model-viewer>

<p
  style={{
    position: "absolute",
    bottom: "7px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "16px",
    fontWeight: "600",
    color: textColor || "#fff",
    margin: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",  // Prevent text from wrapping to a new line
    textAlign: "center",
    maxWidth: "90%",  // Prevent overflow
    wordWrap: "break-word",  // Handle long words
  }}
>
  {productName}
</p>


            <button
              onClick={handleRightButtonClick}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "30px",
                height: "30px",
                background:
                  "url('https://cdn.builder.io/api/v1/image/assets/TEMP/7344838b6c7244cc25bcab8cd8ceaf043201fa2fc9c5bde3a52bef437742f58c') no-repeat center center",
                backgroundSize: "contain",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
            ></button>
         </>
             )}
               {showQrScanner && !isMobile && (
      <QrScannerCard onCancel={handleCancel} url={showQrScanner} />
    )}
          </article>
        )}

        {/* Glassmorphism Style */}
        {cardStyle === "glassmorphism" && (
          <article
            className="main-card"
            style={{
              position: "relative",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
              transition: "transform 0.3s",
              cursor: "pointer",
              marginBottom: "20px",
             padding: showQrScanner ? "0px" : "5px"
            }}
          >

{!showQrScanner && (
               <>
            <model-viewer
              src={gltfPath}
              alt="3D Product"
              auto-rotate
              camera-controls
              shadow-intensity="1"
              style={{
                backgroundColor: cardColor,
                width: "100%",
                height: "200px",
                borderRadius: "10px",
              }}
            ></model-viewer>
  
  <p
  style={{
    position: "absolute",
    bottom: "7px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "16px",
    fontWeight: "600",
    color: textColor || "#fff",
    margin: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",  // Prevent text from wrapping to a new line
    textAlign: "center",
    maxWidth: "90%",  // Prevent overflow
    wordWrap: "break-word",  // Handle long words
  }}
>
  {productName}
</p>



            <button
              onClick={handleRightButtonClick}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "30px",
                height: "30px",
                background:
                  "url('https://cdn.builder.io/api/v1/image/assets/TEMP/7344838b6c7244cc25bcab8cd8ceaf043201fa2fc9c5bde3a52bef437742f58c') no-repeat center center",
                backgroundSize: "contain",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
            ></button>
             </>
             )}
               {showQrScanner && !isMobile && (
      <QrScannerCard onCancel={handleCancel} url={showQrScanner} />
    )}
          </article>
        )}
      </>
   
  </>
)}







        

{type === "3d-only" && (
  <>
    {/* Card Style 1 */}
    {cardStyle === "minimal" && (
      <div
      className="main-card"
        style={{
          position: "relative",
          backgroundColor: cardColor || "#fff",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s",
          cursor: "pointer",
        
           padding: "2px"
        }}
      >
        <model-viewer
          src={gltfPath}
          alt="3D Product"
          auto-rotate
          camera-controls
          shadow-intensity="1"
          style={{
            backgroundColor: cardColor,
            width: "100%",
            height: "250px",
            borderRadius: "10px",
          }}
        ></model-viewer>
        <p
          style={{
            marginTop: "5px",
            fontSize: "16px",
            fontWeight: "600",
            color: textColor || "#111111",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%", // Ensure it respects the card width
          }}
        >
          {productName}
        </p>
        {/* Product Price */}
       
      </div>
    )}

    {/* Card Style 3 */}
    {cardStyle === "glassmorphism" && (
      <div
      className="main-card"
        style={{
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          transition: "transform 0.3s",
          cursor: "pointer",
         
         padding:"2px"
        }}
      >
        <model-viewer
          src={gltfPath}
          alt="3D Product"
          auto-rotate
          camera-controls
          shadow-intensity="1"
          style={{  width: "100%",
            height: "250px",
            borderRadius: "10px",
          }}
        ></model-viewer>
        <p
          style={{
            marginTop: "5px",
            fontSize: "16px",
            fontWeight: "600",
            color: textColor || "#111111",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%", // Ensure it respects the card width
          }}
        >
          {productName}
        </p>
        {/* Product Price */}
      
      </div>
    )}
  </>
)}


{type === "custom-size" && (
  <>
    {showPopup && (
      <div className="popup-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
>
        <div
          className="popup-content"
          style={{
            position: "relative",
            maxWidth: "90%",
            maxHeight: "90%",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <model-viewer
            src={gltfPath}
            alt="3D Product"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            style={{
              backgroundColor: cardColor,
              width: "100%",
              height: "400px",
              borderRadius: "10px",
            }}
          ></model-viewer>
          <button
            onClick={handleClosePopup}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>


      </div>
    )}
 
    

    
      <>
        {/* Minimal Style */}
        {cardStyle === "minimal" && (
          <article
            className="main-card"
            style={{
              position: "relative",
              backgroundColor: cardColor || "#fff",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              cursor: "pointer",
              marginBottom: "20px",
              width:customWidth || "300px",  // Default size if not provided
              height: customHeight || "200px", // Default size if not provided
             // Allows developer to resize in development
              overflow: "auto", // Needed for resize to work
            }}
          >
          
             {!showQrScanner && ( 
            <model-viewer
              src={gltfPath}
              alt="3D Product"
              auto-rotate
              camera-controls
              shadow-intensity="1"
              style={{
                backgroundColor: cardColor,
                width: "100%",
                height: "100%", // Fill container
                borderRadius: "10px",
              }}
            ></model-viewer>
          )}
          
          
           {showQrScanner && !isMobile && 
            <div 
              style={{
                width: "100%",
                height: "100%",
               display:"flex",
               justifyContent:"center",
               alignContent:"center",
               alignItems:"center",
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }}
            >
              <QrScannerCard onCancel={handleCancel} url={showQrScanner} />
            </div>
          }
  {!showQrScanner && ( 
<button
              onClick={handleRightButtonClick}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "30px",
                height: "30px",
                background:
                  "url('https://cdn.builder.io/api/v1/image/assets/TEMP/7344838b6c7244cc25bcab8cd8ceaf043201fa2fc9c5bde3a52bef437742f58c') no-repeat center center",
                backgroundSize: "contain",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
            ></button>
          )}

            
          </article>
        )}

        {/* Glassmorphism Style */}
        {cardStyle === "glassmorphism" && (
          <article
            className="main-card"
            style={{
              position: "relative",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
              transition: "transform 0.3s",
              cursor: "pointer",
              marginBottom: "20px",
              padding: "10px",
              width: customWidth || "300px",  // Default size
              height: customHeight || "200px", // Default size
              overflow: "auto", // Needed for resize
            }}
          >
    {showQrScanner && !isMobile && 
            <div 
              style={{
                width: "100%",
                height: "100%",
               display:"flex",
               justifyContent:"center",
               alignContent:"center",
               alignItems:"center",
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }}
            >
              <QrScannerCard onCancel={handleCancel} url={showQrScanner} />
            </div>
          }
{!showQrScanner && ( 
            <model-viewer
              src={gltfPath}
              alt="3D Product"
              auto-rotate
              camera-controls
              shadow-intensity="1"
              style={{
                backgroundColor: cardColor,
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              }}
            ></model-viewer>
          )}

{!showQrScanner && ( 
<button
              onClick={handleRightButtonClick}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "30px",
                height: "30px",
                background:
                  "url('https://cdn.builder.io/api/v1/image/assets/TEMP/7344838b6c7244cc25bcab8cd8ceaf043201fa2fc9c5bde3a52bef437742f58c') no-repeat center center",
                backgroundSize: "contain",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
            ></button>
          )}
          </article>
        )}
      </>
 
  </>
)}
{type === "detailed" && (
  <>
    {showPopup && (
      <div className="popup-overlay" style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}>
        <div style={{
          position: "relative",
          width: "80%",
          height: "80%",
          maxWidth: "1200px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
        }}>
          <model-viewer
            src={gltfPath}
            alt="3D Product"
            auto-rotate
            camera-controls
            shadow-intensity="1"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          ></model-viewer>
          <button
            onClick={handleClosePopup}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              border: "none",
              padding: "10px 13px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
              zIndex: 1,
            }}
          >
            ✕
          </button>
        </div>
      </div>
    )}

    <div style={{
      width: "70vw",
      margin: "20px auto",
      maxWidth: "1400px",
      position: "relative"
    }}>
      {/* Card Style */}
      <article
        style={{
          backgroundColor: cardStyle === "minimal" ? cardColor || "#fff" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: cardStyle === "glassmorphism" ? "blur(12px)" : "none",
          border: cardStyle === "glassmorphism" ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Responsive layout
          gap: "2rem",
          padding: "2rem",
          width: "100%",
          position: "relative"
        }}
      >
        {/* 3D Viewer Section */}
        <div style={{
          flex: isMobile ? "none" : "row",
          minWidth: "300px", // Adjusted for mobile
          height: isMobile ? "300px" : "450px",
          width: isMobile ? "" : "550px",
          position: "relative"
        }}>
          {!showQrScanner && (
            <model-viewer
              src={gltfPath}
              alt="3D Product"
              auto-rotate
              camera-controls
              shadow-intensity="1"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                backgroundColor: cardColor  || "rgba(255, 255, 255, 0.05)"
              }}
            ></model-viewer>
          )}
        
          {showQrScanner && !isMobile && 
            <div 
              style={{
                width: "100%",
                height: "100%",
                paddingTop: "140px",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }}
            >
              <QrScannerCard onCancel={handleCancel} url={showQrScanner} />
            </div>
          }
        </div>

        {/* Product Details Section */}
        <div style={{
          flex: 1,
          padding: "2rem",
          color: textColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h2 style={{
            fontSize: isMobile ? "2rem" : "2.5rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
            color: textColor
          }}>
            {productName}
          </h2>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "2rem"
          }}>
            <span style={{
              fontSize: isMobile ? "1.5rem" : "2.2rem",
              fontWeight: 600,
              color: textColor
            }}>
              ${productPrice}
            </span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={i < productRating ? "#ffd700" : "#ddd"}
                >
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z"/>
                </svg>
              ))}
            </div>
          </div>

          <p style={{
            fontSize: "1.2rem",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            opacity: 0.9,
            color:textColor
          }}>
            {productDescription}
          </p>
          <button
              onClick={handleRightButtonClick}
              style={{
                position: "absolute",
                top: "2rem",
              right: "2rem",
                width: "30px",
                height: "30px",
                background:
                  "url('https://cdn.builder.io/api/v1/image/assets/TEMP/7344838b6c7244cc25bcab8cd8ceaf043201fa2fc9c5bde3a52bef437742f58c') no-repeat center center",
                backgroundSize: "contain",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
            ></button>
         
          
        </div>
      </article>
    </div>
  </>
)}





            
        </>
    );
};

Arcard.propTypes = {
    gltfPath: PropTypes.string,
    productName: PropTypes.string,
    productPrice: PropTypes.string,
    productRating: PropTypes.string,
    customWidth:PropTypes.string,
    customHeight:PropTypes.string,
    productDescription: PropTypes.string,
    type: PropTypes.oneOf([
        "horizontal-slider",
        "3d-only",
        "3d-ar",
        "custom-size",
        "detailed",
    ]),

    cardStyle:PropTypes.oneOf([
        "minimal",
        "glassmorphism"
    ]),

    cardColor: PropTypes.string,
    textColor: PropTypes.string,
};

export default Arcard;
