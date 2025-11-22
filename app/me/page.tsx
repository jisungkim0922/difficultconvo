import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function MePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/api/auth/signin?callbackUrl=/me");
  }
  const cookieStore = cookies();
  const lastLoginCookie = cookieStore.get("dc_last_login")?.value ?? null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Your settings</h1>

      <section className="rounded-2xl border p-6">
        <h2 className="text-lg font-medium">Profile</h2>
        <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
          <dt className="text-neutral-500">Name</dt>
          <dd className="col-span-2">{(session as any).user?.name}</dd>
          <dt className="text-neutral-500">Email</dt>
          <dd className="col-span-2">{(session as any).user?.email}</dd>
          <dt className="text-neutral-500">Last login (session)</dt>
          <dd className="col-span-2">
            {(session as any).lastLoginAt
              ? new Date((session as any).lastLoginAt).toLocaleString()
              : "—"}
          </dd>
          <dt className="text-neutral-500">Last login (cookie)</dt>
          <dd className="col-span-2">
            {lastLoginCookie
              ? new Date(Number(lastLoginCookie)).toLocaleString()
              : "—"}
          </dd>
        </dl>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-lg font-medium">Activity Log</h2>
        <p className="text-sm text-neutral-600">
          Coming soon: your threads, letters, and saved prompts.
        </p>
      </section>
    </div>
  );
}
