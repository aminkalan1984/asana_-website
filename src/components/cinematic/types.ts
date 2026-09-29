export interface TimelineBounds {
  start: number;
  end: number;
}

export interface CinematicBeat {
  id: string;
  name: string;
  nameEn: string;
  pStart: number;
  pHold: number;
  pEnd: number;
  narrativeTitle?: string;
  narrativeSubtitle?: string;
}

export interface LayerManifestItem {
  id: string;
  role: '00_sky' | '10_distant' | '20_midground' | '30_hero' | '40_foreground_left' | '41_foreground_right' | '50_portal_frame' | 'overlay_haze';
  name: string;
  src: string;
  width: number;
  height: number;
  depthZ: number;
  anchor: 'center-bottom' | 'center-center' | 'bottom-left' | 'bottom-right';
  transformOrigin: string;
  parallaxFactor: number; // sensitivity to pointer parallax
  scrollScaleRange: [number, number]; // [initial, final]
  scrollTranslateRange: [number, number]; // [initial Y%, final Y%]
  description: string;
}

export interface CatalogCardItem {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  badge: string;
  route: string;
  leadTime: string;
  capacity: string;
  highlight: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  actionUrl: string;
}
