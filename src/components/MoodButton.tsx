import React from 'react';
import { Mood } from '../types';
import { Smile, Frown, Ghost, Flame, Trash2 } from 'lucide-react';

interface MoodButtonProps {
  mood: Mood;
  onClick: () => void;
}

const moodConfig: Record<
  Mood,
  { icon: React.ReactNode; gradient: string; emoji: string }
> = {
  Alegria: {
    icon: <Smile className="w-12 h-12" />,
    gradient: 'from-yellow-400 to-orange-500',
    emoji: '😊',
  },
  Tristeza: {
    icon: <Frown className="w-12 h-12" />,
    gradient: 'from-blue-400 to-blue-600',
    emoji: '😢',
  },
  Miedo: {
    icon: <Ghost className="w-12 h-12" />,
    gradient: 'from-purple-400 to-purple-600',
    emoji: '😨',
  },
  Enojo: {
    icon: <Flame className="w-12 h-12" />,
    gradient: 'from-red-400 to-red-600',
    emoji: '😠',
  },
  Asco: {
    icon: <Trash2 className="w-12 h-12" />,
    gradient: 'from-green-400 to-green-600',
    emoji: '🤢',
  },
};

export const MoodButton: React.FC<MoodButtonProps> = ({ mood, onClick }) => {
  const config = moodConfig[mood];

  return (
    <button
      onClick={onClick}
      className={`mood-button bg-gradient-to-br ${config.gradient} flex flex-col items-center justify-center gap-3 min-h-[160px]`}
    >
      <span className="text-5xl">{config.emoji}</span>
      {config.icon}
      <span className="text-xl font-bold text-white">{mood}</span>
    </button>
  );
};
