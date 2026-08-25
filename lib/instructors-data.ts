export interface Instructor {
  id: string;
  name: string;
  role: string;
  experience: string;
  expertise: string[];
  bio: string;
  photo: string; // replace with real photo path
  linkedin?: string;
}

// PLACEHOLDER — replace with real instructor profiles before publishing.
export const instructors: Instructor[] = [
  {
    id: 'instr-001',
    name: 'Instructor Name',
    role: 'Lead AI Faculty',
    experience: '8+ years',
    expertise: ['Machine Learning', 'Generative AI', 'Python'],
    bio: 'Placeholder bio — replace with a real instructor profile before publishing.',
    photo: '/images/instructors/placeholder.jpg',
  },
  {
    id: 'instr-002',
    name: 'Instructor Name',
    role: 'Data Science Faculty',
    experience: '6+ years',
    expertise: ['Data Science', 'SQL', 'Analytics'],
    bio: 'Placeholder bio — replace with a real instructor profile before publishing.',
    photo: '/images/instructors/placeholder.jpg',
  },
  {
    id: 'instr-003',
    name: 'Instructor Name',
    role: 'Full Stack Faculty',
    experience: '7+ years',
    expertise: ['React', 'Node.js', 'System Design'],
    bio: 'Placeholder bio — replace with a real instructor profile before publishing.',
    photo: '/images/instructors/placeholder.jpg',
  },
  {
    id: 'instr-004',
    name: 'Instructor Name',
    role: 'Digital Marketing Faculty',
    experience: '6+ years',
    expertise: ['SEO', 'Performance Marketing'],
    bio: 'Placeholder bio — replace with a real instructor profile before publishing.',
    photo: '/images/instructors/placeholder.jpg',
  },
];

export function getInstructorById(id: string) {
  return instructors.find((i) => i.id === id) || null;
}
