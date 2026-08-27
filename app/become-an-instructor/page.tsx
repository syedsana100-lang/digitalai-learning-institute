import { buildMetadata } from '@/lib/seo';
import BecomeInstructorClient from '@/components/BecomeInstructorClient';

export const metadata = buildMetadata({
  title: 'Become an Instructor',
  description: 'Teach with DigitalAI Learning Institute — share your expertise with learners across India.',
  path: '/become-an-instructor',
});

export default function BecomeInstructorPage() {
  return <BecomeInstructorClient />;
}
