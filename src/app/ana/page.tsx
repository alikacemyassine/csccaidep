import prisma from '@/lib/prisma';
import AdminContent from './admin-content';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <AdminContent submissions={submissions} />;
}
