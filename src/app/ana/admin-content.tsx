'use client';

import React from 'react';
import { format } from 'date-fns';

interface AdminContentProps {
  submissions: any[];
}

export default function AdminContent({ submissions }: AdminContentProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">CSCC AI Department Applications</p>
          </div>
          <div className="flex items-center gap-4">
            <ExportButton data={submissions} />
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-sm font-medium text-gray-600">Total Applicants: </span>
              <span className="text-lg font-bold text-purple-600">{submissions.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Field / Year</th>
                  <th className="px-6 py-4">AI Level</th>
                  <th className="px-6 py-4">Tools</th>
                  <th className="px-6 py-4">Contacts</th>
                  <th className="px-6 py-4">Applied At</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No applications yet.
                    </td>
                  </tr>
                ) : (
                  submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{sub.fullName}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{sub.id.substring(0,8)}...</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{sub.fieldMajor}</div>
                        <div className="text-xs text-gray-500">{sub.yearOfStudy}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {sub.aiLevel}/10
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(sub.toolsTechnologies || []).slice(0, 3).map((tool: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {tool}
                            </span>
                          ))}
                          {sub.toolsTechnologies?.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              +{sub.toolsTechnologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 space-y-1">
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">TG:</span> {sub.telegramUsername}
                        </div>
                        {sub.linkedinProfile && (
                          <div className="text-xs text-blue-600 hover:underline">
                            <a href={`https://linkedin.com/in/${sub.linkedinProfile}`} target="_blank" rel="noreferrer">
                              LinkedIn
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {format(new Date(sub.createdAt), 'MMM d, h:mm a')}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold">
                        <div className="flex items-center gap-3">
                          <details className="text-purple-600 hover:text-purple-700 cursor-pointer outline-none relative">
                            <summary className="font-medium list-none">View</summary>
                            <div className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-y-auto bg-white p-4 border border-gray-200 rounded-lg shadow-xl z-50 text-gray-900 border-t-4 border-t-purple-500">
                              <h3 className="font-bold mb-2 pb-2 border-b">Detailed Answers</h3>
                              <div className="space-y-3 text-xs text-black">
                                <div><span className="font-semibold text-purple-700 flex flex-col">Motivation: </span> {sub.whyJoin}</div>
                                <div><span className="font-semibold text-purple-700 flex flex-col">Goals: </span> {sub.yearGoals}</div>
                                <div><span className="font-semibold text-purple-700">Commitment: </span> {sub.hoursPerWeek} ({sub.confirmStay})</div>
                                <div><span className="font-semibold text-purple-700">Experience: </span> {sub.hasProjectExperience === 'yes' ? sub.projectDescription : 'None'}</div>
                                
                                <div className="pt-2 border-t mt-2">
                                  <h4 className="font-bold text-black mb-1">Team Preferences</h4>
                                  <div className="mb-1"><span className="font-semibold text-purple-700">Preferred: </span> {sub.preferredTeammates || 'No preference'}</div>
                                  <div><span className="font-semibold text-purple-700">Avoid: </span> {sub.avoidTeammates || 'No preference'}</div>
                                </div>

                                <div className="pt-3 border-t mt-3">
                                  <h4 className="font-bold text-black mb-2">AI Chat Transcript</h4>
                                  <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    {Array.isArray(sub.chatMessages) ? (
                                      sub.chatMessages.map((msg: any, i: number) => (
                                        <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                                          <div className={`inline-block px-3 py-2 rounded-xl border ${msg.role === 'user' ? 'bg-purple-50 border-purple-100 text-purple-900 rounded-tr-none' : 'bg-white border-slate-200 text-slate-800 rounded-tl-none shadow-sm'}`}>
                                            <strong className="block text-[9px] uppercase tracking-wider opacity-60 mb-1">{msg.role}</strong>
                                            <div className="text-[11px] leading-relaxed">{msg.content}</div>
                                          </div>
                                        </div>
                                      ))
                                    ) : "No chat data"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </details>
                          <DeleteButton id={sub.id} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportButton({ data }: { data: any[] }) {
  const exportToCSV = () => {
    const headers = ["Full Name", "Major", "Year", "Telegram", "AI Level", "Tools", "Interests", "Why Join", "Preferred Teammates", "Avoid Teammates", "Timestamp"];
    const rows = data.map(sub => [
      sub.fullName,
      sub.fieldMajor,
      sub.yearOfStudy,
      sub.telegramUsername,
      sub.aiLevel,
      (sub.toolsTechnologies || []).join(", "),
      (sub.interests || []).join(", "),
      sub.whyJoin?.replace(/\n/g, " ") || "",
      sub.preferredTeammates || "",
      sub.avoidTeammates || "",
      new Date(sub.createdAt).toLocaleString()
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export CSV
    </button>
  );
}

function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
        if (res.ok) {
          window.location.reload();
        } else {
          alert("Failed to delete");
        }
      } catch (err) {
        alert("Connection error");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`${isDeleting ? 'text-gray-400' : 'text-red-500 hover:text-red-700'} font-medium transition-colors`}
    >
      {isDeleting ? '...' : 'Delete'}
    </button>
  );
}
