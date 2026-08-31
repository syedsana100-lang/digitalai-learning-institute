import { requireStudentProfile } from '@/lib/lms/auth-helpers';
import ProfileForm from '@/components/lms/ProfileForm';

export default async function ProfilePage() {
  const profile = await requireStudentProfile();
  if (!profile) return null;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">My Profile</h1>
      <p className="mt-1 text-sm text-mist">Keep your details up to date — this information is used for enrollment and certificates.</p>
      <div className="mt-6 max-w-2xl">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
