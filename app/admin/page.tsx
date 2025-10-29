import Link from "next/link";

export default function AdminIndex() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <ul className="list-disc ml-5 space-y-1">
        <li><Link href="/admin/threads" className="text-blue-600 underline">Manage Threads</Link></li>
        <li><Link href="/admin/letters" className="text-blue-600 underline">Moderate Letters</Link></li>
        <li><Link href="/admin/resources/new" className="text-blue-600 underline">Upload Resource</Link></li>
      </ul>
    </div>
  );
}
