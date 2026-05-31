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

export const REEL_CATEGORIES = [
  { id: 'ugc', label: 'UGC', subtitle: 'Skincare & Produits' },
  { id: 'dentist', label: 'DENTIST', subtitle: 'Cliniques Dentaires' },
  { id: 'esthetique', label: 'ESTHÉTIQUE', subtitle: 'Dermatologie & Soins' },
  { id: 'pharmacie', label: 'PHARMACIE', subtitle: 'Medical For Pharmacy' },
  { id: 'evenement', label: 'ÉVÉNEMENT', subtitle: 'Couverture d\'événements' },
];

export const REELS: Reel[] = [
  // UGC
  { id: 'ugc-new-3', category: 'ugc', title: 'UGC NEW 111111', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1780188058/11111111111reqqqqq_t6gn0f.mp4' },
  { id: 'ugc-new-2', category: 'ugc', title: 'Timeline 2', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/Timeline%201%20(Resolve)_1%20(2).mp4' },
  { id: 'ugc-01', category: 'ugc', title: 'UGC 01', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1779613134/1_z4ckvy.mp4' },
  { id: 'ugc-03', category: 'ugc', title: 'UGC 03', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1779613888/3_zzlpaf.mp4' },
  { id: 'ugc-04', category: 'ugc', title: 'UGC 04', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1779616936/4_t9dkoy.mp4' },
  { id: 'ugc-06', category: 'ugc', title: 'UGC 06', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1779615642/6_pwyiyv.mp4' },
  { id: 'ugc-07', category: 'ugc', title: 'UGC 07', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779635514/7_czjogl.mp4' },

  // Dentist
  { id: 'dent-new-4', category: 'dentist', title: 'DENTIST TIMELINE 1', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/Timeline%201%20(Resolve).mp4' },
  { id: 'dent-new-3', category: 'dentist', title: 'DENTIST ZOUAOI MOV', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/zouaoi.mov' },
  { id: 'dent-new-2', category: 'dentist', title: 'DENTIST ZOUAOUI', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/zouaoui.mp4' },
  { id: 'dent-new-1', category: 'dentist', title: 'DENTIST NEW', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/youssef%20%2Cusic.mov' },
  { id: 'dent-1', category: 'dentist', title: 'DENTIST 01', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779635871/D1_btulkn.mp4' },
  { id: 'dent-2', category: 'dentist', title: 'DENTIST 02', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779636353/D2_kblptd.mov' },
  { id: 'dent-3', category: 'dentist', title: 'DENTIST 03', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779639902/aymen_sfx_wbsxyn.mp4' },
  { id: 'dent-4', category: 'dentist', title: 'DENTIST 04', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1779628155/D4_cpfrhl.mov' },
  { id: 'dent-5', category: 'dentist', title: 'DENTIST 05', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1779628332/D5_s29kyc.mp4' },

  // Esthétique
  { id: 'esthetique-new-1', category: 'esthetique', title: 'ESTHÉTIQUE NEW', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1780186974/last_last_last_mfywan.mp4' },
  { id: 'derma-1', category: 'esthetique', title: 'DERMA 01', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779635774/derma1_vhlgwo.mp4' },
  { id: 'derma-3', category: 'esthetique', title: 'DERMA 03', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779636088/derma3_k7vfbl.mp4' },
  { id: 'derma-4', category: 'esthetique', title: 'DERMA 04', videoUrl: 'https://res.cloudinary.com/dzuabnhmm/video/upload/v1779617109/derma4_c9fcuj.mp4' },

  // Pharmacie
  { id: 'ph-new-1', category: 'pharmacie', title: 'PHARMA NEW', videoUrl: 'https://pub-139b67410e924dfc86e7bba0c2018c56.r2.dev/portfolio/Timeline%201%20(Resolve)%20(1).mp4' },
  { id: 'ph-1', category: 'pharmacie', title: 'PHARMA 01', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779639047/_%D8%AA%D8%B3%D8%A7%D9%82%D8%B7_%D8%B4%D8%B9%D8%B1%D9%83__%D8%AF%D9%8A%D8%B1%D9%8A_%D8%AA%D8%AD%D8%A7%D9%84%D9%8A%D9%84_%D9%88%D8%A7%D8%AA%D8%A8%D9%91%D8%B9%D9%8A_%D8%B1%D9%88%D8%AA%D9%8A%D9%86_%D8%A8%D8%B3%D9%8A%D8%B7_%D9%8A%D8%B1%D8%AC%D9%91%D8%B9%D9%88_%D9%82%D9%88%D9%8A_____%D9%85%D8%A7%D9%84%D9%81%D8%A9_uflxc4.mp4' },
  { id: 'ph-3', category: 'pharmacie', title: 'PHARMA 03', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779575761/ph3_l94s47.mp4' },
  { id: 'ph-4', category: 'pharmacie', title: 'PHARMA 04', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779629414/ph04_h5k88e.mp4' },

  // Événement
  { id: 'ev-1', category: 'evenement', title: 'EVENT 01', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779635999/eve1_tpw6hr.mp4' },
  { id: 'ev-2', category: 'evenement', title: 'EVENT 02', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779638821/pix_vcn1l2.mp4' },
  { id: 'ev-3', category: 'evenement', title: 'EVENT 03', videoUrl: 'https://res.cloudinary.com/dhpbwlsbs/video/upload/v1779638720/teaser_22_fc2zui.mp4' },
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
