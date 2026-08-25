// Reserved architecture for future Online + Offline expansion.
// Nothing here renders today. When the institute opens a physical centre,
// set siteConfig.operationMode = 'online_offline' and populate `campuses` below —
// components that consume this (CampusSection, BranchLocator, MapEmbed) already
// check the flag and will render automatically, no redesign required.

export type LearningMode = 'online' | 'offline' | 'hybrid';

export interface Campus {
  id: string;
  city: string;
  address: string;
  mapEmbedUrl?: string;
  localPhone?: string;
  facilities: string[];
  offlineBatchTimings: { days: string; time: string }[];
  photos: string[];
}

// Populated now that DigitalAI has a real physical centre in Noida.
// Replace placeholder fields (address, timings, photos) with exact details before publishing.
export const campuses: Campus[] = [
  {
    id: 'campus-noida',
    city: 'Noida',
    address: 'Noida, Uttar Pradesh, India', // TODO: replace with full street address
    mapEmbedUrl: 'https://www.google.com/maps?q=Noida,Uttar+Pradesh,India&output=embed',
    localPhone: '+91 9310378799',
    facilities: ['Classrooms', 'Lab access', 'Mentor desks'], // TODO: confirm real facilities
    offlineBatchTimings: [{ days: 'Mon–Sat', time: '10:00 AM – 6:00 PM' }], // TODO: confirm
    photos: [],
  },
];
