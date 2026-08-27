export interface BlogAuthor {

  id: string;

  name: string;

  designation: string;

  bio: string;

  avatarSeed: string;

  avatarUrl?: string;

  social?: { linkedin?: string; twitter?: string };

}

export const blogAuthors: BlogAuthor[] = [
  {
    id: 'digitalai-team',
    name: 'DigitalAI Team',
    designation: 'Editorial Team',
    bio: 'The DigitalAI Learning editorial team writes practical, no-fluff guides on AI, data, development and digital marketing careers.',
    avatarSeed: 'digitalai-team',
  },
];

export function getAuthorById(id: string) {
  return blogAuthors.find((a) => a.id === id) || blogAuthors[0];
}
