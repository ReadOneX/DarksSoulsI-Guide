import {
  BadgeCheck,
  BookOpen,
  Boxes,
  Flame,
  Gem,
  Lock,
  Map,
  ScrollText,
  Shield,
  Skull,
  Swords,
  Trophy
} from 'lucide-react';

export type AccessLevel = 'guest' | 'registered';

export interface GuideCard {
  id: string;
  title: string;
  type: 'Walkthrough' | 'Boss Guide' | 'Build' | 'Lore' | 'Secret' | 'PvP';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  access: AccessLevel;
  description: string;
  tags: string[];
  readTime: string;
  content: string;
}

export interface BossCard {
  id: string;
  name: string;
  area: string;
  difficulty: string;
  weakness: string;
  reward: string;
  status: string;
}

export interface ItemCard {
  id: string;
  name: string;
  category: string;
  location: string;
  rarity: string;
  effect: string;
}

export interface BuildCard {
  id: string;
  name: string;
  level: number;
  focus: string;
  access: AccessLevel;
  stats: string;
  equipment: string;
}

export const guideCards: GuideCard[] = [
  {
    id: 'lordran-opening-route',
    title: 'Lordran Opening Route',
    type: 'Walkthrough',
    difficulty: 'Beginner',
    access: 'guest',
    description: 'A clean first-hour route through the Undead Asylum, Firelink, and Undead Burg.',
    tags: ['route', 'new-player', 'bonfire'],
    readTime: '8 min',
    content: 'Start with survivability, unlock Firelink shortcuts, and avoid early overextension.'
  },
  {
    id: 'bell-gargoyles',
    title: 'Bell Gargoyles Pressure Plan',
    type: 'Boss Guide',
    difficulty: 'Intermediate',
    access: 'guest',
    description: 'Positioning, summon windows, tail cut timing, and fire breath punish routes.',
    tags: ['boss', 'parish', 'summon'],
    readTime: '6 min',
    content: 'Keep the first Gargoyle near mid-arena and finish phase one before the second controls space.'
  },
  {
    id: 'quality-knight',
    title: 'Quality Knight Build',
    type: 'Build',
    difficulty: 'Advanced',
    access: 'registered',
    description: 'Optimized stat path, weapon upgrade timing, ring swaps, and late-game pivots.',
    tags: ['build', 'strength', 'dexterity'],
    readTime: '12 min',
    content: 'A 27/40 quality route built around flexible weapon scaling and stable stamina economy.'
  },
  {
    id: 'hidden-mechanics',
    title: 'Hidden Mechanics Compendium',
    type: 'Secret',
    difficulty: 'Advanced',
    access: 'registered',
    description: 'Poise breakpoints, humanity scaling, matchmaking ranges, and obscure interaction rules.',
    tags: ['hidden', 'systems', 'advanced'],
    readTime: '16 min',
    content: 'Advanced mechanics are locked for registered users to preserve guest progression pacing.'
  },
  {
    id: 'artorias-lore',
    title: 'Artorias and the Abyss',
    type: 'Lore',
    difficulty: 'Intermediate',
    access: 'guest',
    description: 'A readable archive entry connecting Oolacile, Sif, the covenant, and the Abyss.',
    tags: ['lore', 'dlc', 'abyss'],
    readTime: '10 min',
    content: 'The legend is heroic because the truth is broken, partial, and carried by what remains.'
  },
  {
    id: 'pvp-parry',
    title: 'Advanced PvP Parry Lab',
    type: 'PvP',
    difficulty: 'Advanced',
    access: 'registered',
    description: 'Latency-aware parry drills, setup baits, and weapon matchup notes.',
    tags: ['pvp', 'advanced', 'timing'],
    readTime: '14 min',
    content: 'PvP content is registered-only and designed for repeat practice sessions.'
  }
];

export const bossCards: BossCard[] = [
  { id: 'asylum-demon', name: 'Asylum Demon', area: 'Undead Asylum', difficulty: 'Easy', weakness: 'Fire, plunging attacks', reward: 'Big Pilgrim Key', status: 'Guest' },
  { id: 'taurus-demon', name: 'Taurus Demon', area: 'Undead Burg', difficulty: 'Medium', weakness: 'Lightning, plunge opener', reward: 'Homeward Bone', status: 'Guest' },
  { id: 'bell-gargoyles', name: 'Bell Gargoyles', area: 'Undead Parish', difficulty: 'Medium', weakness: 'Gold Pine Resin', reward: 'Twin Humanities', status: 'Guest' },
  { id: 'ornstein-smough', name: 'Ornstein and Smough', area: 'Anor Londo', difficulty: 'Hard', weakness: 'Target isolation', reward: 'Lordvessel', status: 'Registered route' }
];

export const itemCards: ItemCard[] = [
  { id: 'zweihander', name: 'Zweihander', category: 'Weapon', location: 'Firelink Shrine graveyard', rarity: 'Uncommon', effect: 'High poise damage ultra greatsword' },
  { id: 'grass-crest', name: 'Grass Crest Shield', category: 'Shield', location: 'Darkroot Basin', rarity: 'Rare', effect: 'Stamina recovery boost' },
  { id: 'gold-pine-resin', name: 'Gold Pine Resin', category: 'Consumable', location: 'Undead Burg residence', rarity: 'Common', effect: 'Temporary lightning weapon buff' },
  { id: 'havel-ring', name: "Havel's Ring", category: 'Ring', location: 'Watchtower basement', rarity: 'Legendary', effect: 'Major equip load increase' }
];

export const buildCards: BuildCard[] = [
  { id: 'quality-knight', name: 'Quality Knight', level: 80, focus: 'PvE / Flexible', access: 'registered', stats: '27 STR / 40 DEX / 40 END', equipment: 'Claymore, Heater Shield, Favor Ring' },
  { id: 'pyro-dex', name: 'Pyro Dexterity', level: 65, focus: 'Fast casting', access: 'guest', stats: '16 STR / 40 DEX / Attunement slots', equipment: 'Uchigatana, Pyro Flame, Crown of Dusk' },
  { id: 'faith-paladin', name: 'Faith Paladin', level: 90, focus: 'Co-op support', access: 'guest', stats: '30 FAI / 30 STR / 35 VIT', equipment: 'Divine Claymore, Canvas Talisman' }
];

export const progressModules = [
  { label: 'Boss tracker', value: '9 / 26', icon: Skull },
  { label: 'Bonfire tracker', value: '18 / 43', icon: Flame },
  { label: 'Covenant tracker', value: '3 / 9', icon: Shield },
  { label: 'Weapon upgrades', value: '6 paths', icon: Swords },
  { label: 'NPC quests', value: '5 active', icon: ScrollText },
  { label: 'Achievements', value: '12 / 41', icon: Trophy },
  { label: 'Item collection', value: '148 items', icon: Gem },
  { label: 'Area progression', value: '46%', icon: Map }
];

export const featureModules = [
  { label: 'Markdown renderer', icon: BookOpen },
  { label: 'Collapsible sections', icon: Boxes },
  { label: 'Guest locks', icon: Lock },
  { label: 'Cloud sync boundary', icon: BadgeCheck }
];
