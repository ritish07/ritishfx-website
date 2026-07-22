"use client";

import { Download } from "lucide-react";

type Submission = {
  name: string;
  email: string;
  phone: string | null;
  country: string;
  discordId: string;
  capital: string;
  propFirm: string;
  struggle: string;
  hesitation: string;
  earlyBirdCode: string;
  createdAt: Date;
};

export default function DownloadCsvButton({ data }: { data: Submission[] }) {
  const downloadCSV = () => {
    if (data.length === 0) return;

    // Define CSV Headers
    const headers = [
      "Date",
      "Name",
      "Email",
      "Phone",
      "Country",
      "Discord",
      "Capital",
      "Prop Firm",
      "Biggest Struggle",
      "Hesitation",
      "Early Bird Code"
    ];

    // Map data to rows
    const rows = data.map((sub) => [
      new Date(sub.createdAt).toLocaleDateString(),
      `"${sub.name.replace(/"/g, '""')}"`,
      `"${sub.email}"`,
      `"${sub.phone || ""}"`,
      `"${sub.country}"`,
      `"${sub.discordId}"`,
      `"${sub.capital}"`,
      `"${sub.propFirm}"`,
      `"${sub.struggle.replace(/"/g, '""')}"`,
      `"${sub.hesitation.replace(/"/g, '""')}"`,
      `"${sub.earlyBirdCode}"`
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create a Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `waitlist_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button 
      onClick={downloadCSV}
      disabled={data.length === 0}
      className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );
}
