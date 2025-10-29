import { getSessionProfile, requireRole } from "@/lib/auth";
import { createClientServer } from "@/lib/supabase-server";
import ModerationClient from "./moderation-client";

export default async function AdminLetters() {
  const session = await getSessionProfile();
  if (!session || !requireRole(session.profile, ["editor","admin"])) return <div>Not authorized.</div>;

  const supabase = createClientServer();
  const { data: letters } = await supabase
    .from("letters").select("id, body, status, created_at")
    .eq("status","review").order("created_at",{ascending:false});

  return <ModerationClient initial={letters || []} />;
}
