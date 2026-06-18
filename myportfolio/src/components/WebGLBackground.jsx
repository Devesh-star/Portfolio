import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const CosmicBackground = () => {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0, 
        backgroundColor: '#010103',
        overflow: 'hidden' 
      }}
    >
      <div className="nebula-clouds" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, 8, 20], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#8245ec" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>
    </div>
  );
};

export default CosmicBackground;
