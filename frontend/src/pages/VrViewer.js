import React from 'react';
import { useParams } from 'react-router-dom';

function VrViewer() {
  const { filename } = useParams();
  const imageURL = `http://192.168.207.37:5000/uploads/${filename}`;

  const handleEnterVR = () => {
    const scene = document.querySelector('#scene');
    if (scene && scene.enterVR) {
      scene.enterVR();
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0 }}>
      <button
        id="enterVRBtn"
        onClick={handleEnterVR}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 999,
        }}
      >
        🎮 Enter VR Mode
      </button>

      <a-scene id="scene" vr-mode-ui="enabled: true" embedded>
        <a-assets>
          <img id="vrImage" src={imageURL} alt="VR scene" crossOrigin="anonymous" />
        </a-assets>
        <a-sky src="#vrImage" rotation="0 -130 0"></a-sky>
        <a-text
          font="kelsonsans"
          value="VR Viewer"
          width="6"
          position="-2.5 0.25 -1.5"
          rotation="0 15 0"
        ></a-text>
      </a-scene>
    </div>
  );
}

export default VrViewer;
