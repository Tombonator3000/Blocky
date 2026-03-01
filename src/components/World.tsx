import { useBox } from '@react-three/cannon';
import { useState, useEffect } from 'react';
import { TextureLoader, Texture } from 'three';
import { useGameStore, BlockType } from '../store/gameStore';
import * as THREE from 'three';
import { Edges } from '@react-three/drei';

interface BlockProps {
  position: [number, number, number];
  type: BlockType;
  textureUrl: string | null;
}

const Block = ({ position, type, textureUrl }: BlockProps) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: [1, 1, 1], // Half extents? No, args for box is [width, height, depth]
  }));

  const removeBlock = useGameStore((state) => state.removeBlock);
  const addBlock = useGameStore((state) => state.addBlock);
  const selectedBlock = useGameStore((state) => state.selectedBlock);
  const [hover, setHover] = useState(false);
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    if (!textureUrl) {
      setTexture(null);
      return;
    }
    const loader = new TextureLoader();
    const tex = loader.load(textureUrl);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    setTexture(tex);
    return () => {
      tex.dispose();
    };
  }, [textureUrl]);

  // Default colors if no texture
  const colors: Record<BlockType, string> = {
    dirt: '#8B4513',
    grass: '#4CAF50',
    stone: '#808080',
    wood: '#A0522D',
    glass: '#ADD8E6',
  };

  return (
    <mesh
      ref={ref as any}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (e.altKey || e.button === 2) {
          // Right click or Alt+Click to remove (simplified for now, usually right click adds)
          // Actually, let's stick to standard: Left click destroy, Right click place
          // But PointerLock makes mouse buttons tricky without UI overlay.
          // Let's use Alt+Click to destroy for now, or standard click logic.
          
          // In Three.js onClick:
          // event.face gives the normal
        }
        
        if (e.button === 0) {
            // Left click: Remove
            removeBlock(position[0], position[1], position[2]);
        }
      }}
      // Right click handling is tricky in onClick with PointerLock sometimes, 
      // but let's try onContextMenu or checking event.button
      onContextMenu={(e) => {
        e.stopPropagation();
        e.nativeEvent.preventDefault();
        if (!ref.current) return;
        
        // Add block adjacent to the face clicked
        // e.faceIndex is not always reliable for direction, use e.face.normal
        if (e.face) {
            const { x, y, z } = e.face.normal;
            addBlock(position[0] + x, position[1] + y, position[2] + z, selectedBlock);
        }
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={texture ? 'white' : colors[type]}
        map={texture}
        transparent={type === 'glass'}
        opacity={type === 'glass' ? 0.6 : 1}
      />
      {hover && <Edges color="black" />}
    </mesh>
  );
};

export const World = () => {
  const blocks = useGameStore((state) => state.blocks);
  const textureMap = useGameStore((state) => state.textureMap);

  return (
    <group>
      {blocks.map((block) => (
        <Block
          key={block.id}
          position={block.pos}
          type={block.type}
          textureUrl={textureMap[block.type]}
        />
      ))}
      <Ground />
    </group>
  );
};

const Ground = () => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position: [0, -1, 0], // Center at y=-1, height=1, so top is -0.5
    args: [100, 1, 100],
  }));

  return (
    <mesh ref={ref as any}>
      <boxGeometry args={[100, 1, 100]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  );
}
