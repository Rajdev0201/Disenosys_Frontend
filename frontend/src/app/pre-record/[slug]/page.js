
import Prerecord from "@/screens/userDashboard/Prerecord";

export default async function PreRecordPage({ params }) {
  const resolvedParams = await params;
  return <Prerecord courseSlug={resolvedParams?.slug} />;
}
