import ClientPortalDashboard from "@/components/client-portal-dashboard";
import { getClientPortalProject } from "@/lib/client-portal-data";

export default async function ClientPortalPage() {
  const portalProject = await getClientPortalProject("WEBX-DEMO");

  return <ClientPortalDashboard initialProject={portalProject} />;
}
