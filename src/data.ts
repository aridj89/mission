import { TeamMember, Reel, BentoProject } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'oussama-hamdaoui',
    name: 'OUSSAMA HAMDAOUI',
    role: 'CO-FONDATEUR & ÉDITEUR',
    category: 'LEADERSHIP',
    imageUrl: '/team/oussama.jpg'
  },
  {
    id: 'maria-boukhalfa',
    name: 'MARIA BOUKHALFA',
    role: 'MEDIA FACE',
    category: 'DESIGN',
    imageUrl: '/team/MARIA.jpg'
  },
  {
    id: 'chaima',
    name: 'CHAIMA',
    role: 'GRAPHIC DESIGNER',
    category: 'DESIGN',
    imageUrl: '/team/CHAIMA.jpg'
  },
  {
    id: 'ramy-zoubiri',
    name: 'RAMY ZOUBIRI',
    role: 'FONDATEUR & CONTENT CREATOR',
    category: 'LEADERSHIP',
    imageUrl: '/team/Ramy.jpg'
  },
  {
    id: 'aridj-bouzidi',
    name: 'ARIDJ BOUZIDI',
    role: 'FONDATRICE & DÉVELOPPEUSE',
    category: 'ENGINEERING',
    imageUrl: '/team/aridj.jpg'
  },
  {
    id: 'direche-abderrahmen',
    name: 'DIRECHE ABDERRAHMEN',
    role: 'FONDATEUR, PHOTOGRAPHE & DÉVELOPPEUR',
    category: 'ENGINEERING',
    imageUrl: '/team/abdou.jpg'
  },
  {
    id: 'amel-allaoua',
    name: 'AMEL ALLAOUA',
    role: 'CONTENT CREATOR',
    category: 'DESIGN',
    imageUrl: '/team/amel.jpg'
  },
  {
    id: 'yassmine-tifratene',
    name: 'YASSMINE TIFRATENE',
    role: 'UGC CONTENT CREATOR',
    category: 'DESIGN',
    imageUrl: '/team/yassmine.jpg'
  },
  {
    id: 'dhikra',
    name: 'DHIKRA',
    role: 'UGC CONTENT CREATOR',
    category: 'DESIGN',
    imageUrl: '/team/dikra.jpg'
  },
  {
    id: 'kawtar-ali-dahmane',
    name: 'KAWTAR ALI DAHMANE',
    role: 'MARKETING STRATEGY & BRAND COMMUNICATION',
    category: 'MARKETING',
    imageUrl: '/team/kawthar.jpg'
  }
];

export const REEL_CATEGORIES: { id: string; label: string; subtitle?: string }[] = [];

export const REELS: Reel[] = [
  { id: 'reel-with-pics', title: 'WITH PICS', videoUrl: 'https://res.cloudinary.com/uzgkcqhw/video/upload/v1792505374/with_pics.mp4' },
  { id: 'reel-reql', title: 'REQL', videoUrl: 'https://res.cloudinary.com/uzgkcqhw/video/upload/v1792505557/reql.mp4' },
  { id: 'reel-sf-final', title: 'SF FINAL', videoUrl: 'https://res.cloudinary.com/uzgkcqhw/video/upload/v1792505251/sf-final.mp4' },
  { id: 'reel-111111', title: '111111', videoUrl: 'https://res.cloudinary.com/uzgkcqhw/video/upload/v1792504360/111111.mp4' },
  { id: 'ugc-new-2', title: 'Timeline 2', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/Timeline%201%20(Resolve)_1%20(2).mp4' },
  { id: 'dent-new-4', title: 'DENTIST TIMELINE 1', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/Timeline%201%20(Resolve).mp4' },
  { id: 'dent-new-3', title: 'DENTIST ZOUAOI MOV', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/zouaoi.mov' },
  { id: 'dent-new-2', title: 'DENTIST ZOUAOUI', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/zouaoui.mp4' },
  { id: 'dent-new-1', title: 'DENTIST NEW', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/youssef%20%2Cusic.mov' },
  { id: 'ph-new-1', title: 'PHARMA NEW', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/Timeline%201%20(Resolve)%20(1).mp4' },
];

export const BENTO_PROJECTS: BentoProject[] = [
  {
    id: 'vortex',
    title: 'Vortex Financial Dashboard',
    category: 'UI/UX',
    tags: ['UI/UX', 'SaaS'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA92dUDzGEY9RHEB-8WGsMqJxxfTbOz1J3gRoheXnivqFzELCpGis4UCkToUDqUObOMbbCEWGuI61LVenlxjG1ZXafWIo1__t8OrQP9fi8ENwBVIr8enhLZ3XyTtNCBZBHdmhZt1Oa91ntNrT4Nih84RtRWscH5pIzz-rqIv01NLsfpBx_5S4gkaW6UCCIyOcKlX_rGlVaVTzbapFajDoTsXFg1MfAPppwzG8-0FeCPnduYhROFl4WaOznc8qgOhsGEeLsBCBg6b2M',
    description: 'Dynamic real-time analytics suite mapping algorithmic indices and transactional latency.'
  },
  {
    id: 'agency-mono',
    title: 'Agency Mono Font Family',
    category: 'TYPOGRAPHY',
    tags: ['TYPOGRAPHY'],
    description: 'A custom typeface designed for readability in low-light digital environments and technical layouts.',
    buttonText: 'View Specimen'
  },
  {
    id: 'manifesto',
    title: 'The Minimalist Manifesto',
    category: 'EDITORIAL',
    tags: ['EDITORIAL'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH2dIWM2uwRaN65h2BS2I0z82eS3eY1KTTjlYeIP_t6tWRgB6_R-F32NbAGoWppaF-09baHZKKQAeR9slLEzIbUHj-t7sVpG_AzRe7_BofpNf5DyKFOCGPrLMAEJTQt87vGBHxrGd0pznvlBauNMLn72PT18AfT2DdBYzFVlQATH3-DrT0sbwseY2jsi6ivWaT-5M-VSF_A7Mb-GiAgVvx9rtfCrMnDQK3qFX2lP8uxvvMuvZGLLaMUtLeBLuGZ3egrNPz9rJHtvA',
    description: 'A printed, limited-edition theoretical publication exploring architectural minimalism in social tech.'
  },
  {
    id: 'onyx',
    title: 'Onyx Apparel Experience',
    category: 'ECOMMERCE',
    tags: ['ECOMMERCE'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsFQjN8D5U7jGeUFHeqkvQSIt4Z4-HLHlXmmoIFRLx6C5XpvbEkEXW5rWaiXIy7JyVMBlCOdOw_8WwbKyzBH16dd-iGvC7PcdVURQECHHNJXyVbHODSlU5J86SItmicsOOYW1bowa_r_KARYEWu7AKo_PYUnVrBRZ1KiQs-B6lB0WszG8tMjVt5aUl0o9oMm5pv6mgHc3TswSIbKRrC0dxw2gnM7xTJ9vlHJ5bCgC3-Kd5kAiDISRdUNk0NsNZ6DAo2AhcOnB4KTE',
    description: 'Reimagining luxury retail through high-contrast motion and seamless transitions.',
    buttonText: 'Explore Case Study'
  }
];

export const OFFICE_LOCATION = {
  address: 'H53H+P83, Rte de Biskra, Batna, Algérie',
  name: 'Batna Studio',
  coords: { lat: 35.5610, lng: 6.1739 }
};
