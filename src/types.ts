export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  imageUrl?: string;
  icon?: string;
  isCustom?: boolean;
}

export interface Reel {
  id: string;
  category?: string;
  title: string;
  videoUrl: string;
}

export interface BentoProject {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  tags?: string[];
  imageUrl?: string;
  description?: string;
  buttonText?: string;
  link?: string;
}

export type ActiveTab = 'HOME';
