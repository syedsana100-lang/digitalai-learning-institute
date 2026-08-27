export interface GalleryCategory {
  id: string;
  label: string;
  description: string;
  images: { seed: string; alt: string }[];
}

// PLACEHOLDER IMAGES — replace with real photos from actual classes, workshops and
// events before publishing. Each `seed` currently renders a placeholder via a public
// image service; swap the <img> src in the gallery page for real uploaded photos.
export const galleryCategories: GalleryCategory[] = [
  {
    id: 'online-classes',
    label: 'Online Classes',
    description: 'Live online sessions with instructors across our course catalog.',
    images: [
      { seed: 'gallery-online-1', alt: 'Live online class session at DigitalAI Learning Institute' },
      { seed: 'gallery-online-2', alt: 'Instructor teaching a live online AI course session' },
      { seed: 'gallery-online-3', alt: 'Students attending a live online Data Science class' },
    ],
  },
  {
    id: 'training-sessions',
    label: 'Training Sessions',
    description: 'Hands-on, project-based training sessions at our Noida centre.',
    images: [
      { seed: 'gallery-training-1', alt: 'In-person training session at DigitalAI Learning Noida centre' },
      { seed: 'gallery-training-2', alt: 'Students working on a project during a training session' },
      { seed: 'gallery-training-3', alt: 'Mentor guiding students during a hands-on training session' },
    ],
  },
  {
    id: 'workshops',
    label: 'Workshops',
    description: 'Focused workshops on specific tools and career skills.',
    images: [
      { seed: 'gallery-workshop-1', alt: 'Career skills workshop at DigitalAI Learning Institute' },
      { seed: 'gallery-workshop-2', alt: 'Technical workshop session with hands-on exercises' },
    ],
  },
  {
    id: 'certifications',
    label: 'Certifications',
    description: 'Certificate distribution moments for completed programs.',
    images: [
      { seed: 'gallery-cert-1', alt: 'Student receiving a course completion certificate' },
      { seed: 'gallery-cert-2', alt: 'Certificate distribution ceremony at DigitalAI Learning' },
    ],
  },
  {
    id: 'student-activities',
    label: 'Student Activities',
    description: 'Group activities, discussions and peer collaboration.',
    images: [
      { seed: 'gallery-activity-1', alt: 'Students collaborating on a group project' },
      { seed: 'gallery-activity-2', alt: 'Peer discussion session among DigitalAI Learning students' },
      { seed: 'gallery-activity-3', alt: 'Student activity session at the Noida centre' },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    description: 'Institute events, guest sessions and career talks.',
    images: [
      { seed: 'gallery-event-1', alt: 'Career guidance event at DigitalAI Learning Institute' },
      { seed: 'gallery-event-2', alt: 'Guest speaker session at DigitalAI Learning' },
    ],
  },
  {
    id: 'learning-environment',
    label: 'Learning Environment',
    description: 'A look at our classrooms and learning spaces in Noida.',
    images: [
      { seed: 'gallery-env-1', alt: 'Classroom space at DigitalAI Learning Institute Noida centre' },
      { seed: 'gallery-env-2', alt: 'Learning environment and study area at the Noida centre' },
      { seed: 'gallery-env-3', alt: 'Lab access area used for hands-on training sessions' },
    ],
  },
];
