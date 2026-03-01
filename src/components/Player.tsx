import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useGameStore } from '../store/gameStore';

const JUMP_FORCE = 4;
const SPEED = 4;

export const Player = () => {
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 5, 0],
    args: [0.5], // Radius
    fixedRotation: true,
  }));

  // Velocity and position tracking
  const velocity = useRef([0, 0, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => api.position.subscribe((p) => (pos.current = p)), [api.position]);

  // Keyboard controls
  const keys = useRef<{ [key: string]: boolean }>({});
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => (keys.current[e.code] = true);
    const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.code] = false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useFrame(() => {
    if (!ref.current) return;

    // Sync camera to physics body
    camera.position.copy(new Vector3(pos.current[0], pos.current[1] + 0.7, pos.current[2]));

    // Movement logic
    const frontVector = new Vector3(
      0,
      0,
      (keys.current['ArrowDown'] || keys.current['KeyS'] ? 1 : 0) - (keys.current['ArrowUp'] || keys.current['KeyW'] ? 1 : 0)
    );
    const sideVector = new Vector3(
      (keys.current['ArrowLeft'] || keys.current['KeyA'] ? 1 : 0) - (keys.current['ArrowRight'] || keys.current['KeyD'] ? 1 : 0),
      0,
      0
    );

    const direction = new Vector3();
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    // Jump
    if (keys.current['Space'] && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
    }
  });

  return <mesh ref={ref as any} />;
};
