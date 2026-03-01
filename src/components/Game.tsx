import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls, Stars, AmbientLight } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Player } from './Player';
import { World } from './World';
import { TextureGenerator } from './TextureGenerator';
import { useGameStore, BlockType } from '../store/gameStore';

export default function Game() {
  const selectedBlock = useGameStore((state) => state.selectedBlock);
  const setSelectedBlock = useGameStore((state) => state.setSelectedBlock);

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas shadows camera={{ fov: 45 }}>
        <Sky sunPosition={[100, 10, 100]} />
        <Stars />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        
        <Physics gravity={[0, -9.8, 0]}>
          <Player />
          <World />
        </Physics>
        
        <PointerLockControls />
      </Canvas>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 pointer-events-none">
        <div className="w-full h-0.5 bg-white/80 absolute top-1/2 transform -translate-y-1/2"></div>
        <div className="h-full w-0.5 bg-white/80 absolute left-1/2 transform -translate-x-1/2"></div>
      </div>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white pointer-events-none">
        <h1 className="text-2xl font-bold font-mono tracking-tighter">GeminiCraft</h1>
        <p className="text-xs text-gray-400">WASD to Move, Space to Jump</p>
        <p className="text-xs text-gray-400">Left Click to Mine, Right Click to Place</p>
        <p className="text-xs text-emerald-400 mt-1">Press ESC to unlock cursor</p>
      </div>

      {/* Texture Generator UI */}
      <TextureGenerator />
      
      {/* Hotbar (Visual only for now, logic needs connection) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 p-2 rounded-xl border border-white/10 flex gap-2">
        {(['grass', 'dirt', 'stone', 'wood', 'glass'] as BlockType[]).map((type) => (
           <div 
             key={type}
             className={`w-10 h-10 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${selectedBlock === type ? 'border-white scale-110' : 'border-white/20 hover:border-white/50'}`}
             onClick={() => setSelectedBlock(type)}
           >
             <div className={`w-6 h-6 rounded-sm ${
                type === 'grass' ? 'bg-green-600' :
                type === 'dirt' ? 'bg-amber-800' :
                type === 'stone' ? 'bg-gray-500' :
                type === 'wood' ? 'bg-amber-900' :
                'bg-blue-300'
             }`} />
           </div>
        ))}
      </div>
    </div>
  );
}
