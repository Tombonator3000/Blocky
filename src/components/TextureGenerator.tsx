import { useState } from 'react';
import { useGameStore, BlockType } from '../store/gameStore';
import { generateBlockTexture } from '../services/gemini';
import { Loader2 } from 'lucide-react';

export const TextureGenerator = () => {
  const textureMap = useGameStore((state) => state.textureMap);
  const setTexture = useGameStore((state) => state.setTexture);
  const resetWorld = useGameStore((state) => state.resetWorld);
  const [loading, setLoading] = useState<BlockType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (type: BlockType) => {
    setLoading(type);
    setError(null);
    try {
      const textureData = await generateBlockTexture(type);
      setTexture(type, textureData);
    } catch (err) {
      setError(`Failed to generate ${type} texture`);
    } finally {
      setLoading(null);
    }
  };

  const blockTypes: BlockType[] = ['grass', 'dirt', 'stone', 'wood', 'glass'];

  return (
    <div className="absolute top-4 right-4 bg-black/80 p-4 rounded-xl text-white w-64 backdrop-blur-sm border border-white/10 pointer-events-auto">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-emerald-400">Gemini</span> Textures
      </h2>
      
      <div className="space-y-3">
        {blockTypes.map((type) => (
          <div key={type} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded border border-white/20 bg-cover bg-center"
                style={{ 
                  backgroundColor: !textureMap[type] ? '#333' : undefined,
                  backgroundImage: textureMap[type] ? `url(${textureMap[type]})` : 'none'
                }}
              />
              <span className="capitalize text-sm font-medium">{type}</span>
            </div>
            
            <button
              onClick={() => handleGenerate(type)}
              disabled={loading === type}
              className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 rounded-md transition-colors font-medium flex items-center gap-2"
            >
              {loading === type ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                'Generate'
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <button 
            onClick={resetWorld}
            className="w-full py-2 bg-red-600/20 hover:bg-red-600/40 text-red-200 text-xs rounded border border-red-500/30 transition-colors"
        >
            Reset World
        </button>
      </div>

      {error && (
        <div className="mt-4 p-2 bg-red-500/20 text-red-200 text-xs rounded border border-red-500/30">
          {error}
        </div>
      )}

      <div className="mt-4 text-[10px] text-gray-400">
        Press ESC to unlock cursor and use this menu.
        <br/>
        Powered by Gemini 2.5 Flash Image
      </div>
    </div>
  );
};
