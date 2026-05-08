// Guide types
export enum AreaType {
  STARTING = 'starting',
  MAIN = 'main',
  OPTIONAL = 'optional',
  LATE_GAME = 'late_game',
  DLC = 'dlc'
}

export interface Area {
  id: string;
  name: string;
  type: AreaType;
  description: string;
  bonfires: Bonfire[];
  bosses: Boss[];
  enemies: Enemy[];
  items: Item[];
  secrets: Secret[];
  interconnections: string[];
  level: number;
  recommendedEquipment: string[];
}

export interface Bonfire {
  id: string;
  name: string;
  areaId: string;
  description: string;
  coordinates?: { x: number; y: number; z: number };
  connectsTo: string[];
}

export interface Boss {
  id: string;
  name: string;
  areaId: string;
  description: string;
  health: number;
  weaknesses: string[];
  resistances: string[];
  drops: Drop[];
  strategies: Strategy[];
  variants?: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  imageUrl?: string;
  videoUrl?: string;
}

export interface Drop {
  itemId: string;
  itemName: string;
  probability: number;
  quantity: number;
}

export interface Strategy {
  title: string;
  description: string;
  difficulty: string;
  steps: string[];
  equipment: string[];
}

export interface Enemy {
  id: string;
  name: string;
  areaId: string;
  health: number;
  drops: Drop[];
  weakness?: string;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  location: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  effect?: string;
  value?: number;
  imageUrl?: string;
}

export enum ItemType {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  SPELL = 'spell',
  CONSUMABLE = 'consumable',
  MISCELLANEOUS = 'miscellaneous'
}

export interface Secret {
  id: string;
  title: string;
  description: string;
  areaId: string;
  type: 'hidden_item' | 'shortcut' | 'hidden_wall' | 'npc_location';
  hints?: string[];
  reward?: string;
}

export interface Build {
  id: string;
  name: string;
  description: string;
  level: number;
  stats: BuildStats;
  equipment: BuildEquipment;
  spells: string[];
  playstyle: string;
  difficulty: 'pve' | 'pvp' | 'mixed';
}

export interface BuildStats {
  vigor: number;
  attunement: number;
  endurance: number;
  strength: number;
  dexterity: number;
  resistance: number;
  intelligence: number;
  faith: number;
}

export interface BuildEquipment {
  rightHand: string;
  leftHand: string;
  helmet: string;
  chestpiece: string;
  gauntlets: string;
  leggings: string;
  ring1: string;
  ring2: string;
}

export interface Covenant {
  id: string;
  name: string;
  description: string;
  joinLocation: string;
  requiredLevel?: number;
  requiredItem?: string;
  benefits: string[];
  ranks: CovenantRank[];
}

export interface CovenantRank {
  rank: number;
  name: string;
  requiredLevel: number;
  reward: string;
}

export interface NPCQuest {
  id: string;
  npcName: string;
  questName: string;
  description: string;
  startLocation: string;
  steps: QuestStep[];
  rewards: string[];
  failConditions?: string[];
}

export interface QuestStep {
  order: number;
  description: string;
  location?: string;
  condition?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon?: string;
  type: 'boss' | 'item' | 'secret' | 'quest' | 'special';
  rarity: number;
  points: number;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  type: 'walkthrough' | 'boss_guide' | 'build_guide' | 'lore';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  rating: number;
  tags: string[];
}
