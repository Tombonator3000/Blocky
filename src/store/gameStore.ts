import { create } from 'zustand';
import { nanoid } from 'nanoid';

export type BlockType = 'dirt' | 'grass' | 'stone' | 'wood' | 'glass';

export interface Block {
  id: string;
  pos: [number, number, number];
  type: BlockType;
}

interface GameState {
  blocks: Block[];
  textureMap: Record<BlockType, string | null>;
  selectedBlock: BlockType;
  addBlock: (x: number, y: number, z: number, type: BlockType) => void;
  removeBlock: (x: number, y: number, z: number) => void;
  setTexture: (type: BlockType, url: string) => void;
  setSelectedBlock: (type: BlockType) => void;
  resetWorld: () => void;
}

// Initial world generation
const generateInitialWorld = () => {
  const blocks: Block[] = [];
  for (let x = -10; x < 10; x++) {
    for (let z = -10; z < 10; z++) {
      blocks.push({
        id: nanoid(),
        pos: [x, 0, z],
        type: 'grass',
      });
      if (Math.random() > 0.8) {
         blocks.push({
          id: nanoid(),
          pos: [x, 1, z],
          type: 'stone',
        });
      }
    }
  }
  return blocks;
};

export const useGameStore = create<GameState>((set) => ({
  blocks: generateInitialWorld(),
  textureMap: {
    dirt: null,
    grass: null,
    stone: null,
    wood: null,
    glass: null,
  },
  selectedBlock: 'grass',
  addBlock: (x, y, z, type) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        { id: nanoid(), pos: [x, y, z], type },
      ],
    })),
  removeBlock: (x, y, z) =>
    set((state) => ({
      blocks: state.blocks.filter(
        (block) =>
          block.pos[0] !== x || block.pos[1] !== y || block.pos[2] !== z
      ),
    })),
  setTexture: (type, url) =>
    set((state) => ({
      textureMap: { ...state.textureMap, [type]: url },
    })),
  setSelectedBlock: (type) => set({ selectedBlock: type }),
  resetWorld: () => set({ blocks: generateInitialWorld() }),
}));
