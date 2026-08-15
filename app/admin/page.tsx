import { redirect } from "next/navigation";
import { isAdminRequest } from "../../lib/server/auth";
import { getContent } from "../../lib/server/store";
import AdminClient from "./admin-client";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminRequest())) redirect("/admin/login");
  const content = await getContent();
  return <AdminClient initialContent={content} />;
}
