import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">CSCC AI Department Applications</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-600">Total Applicants: </span>
            <span className="text-lg font-bold text-purple-600">{submissions.length}</span>
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
                  <th className="px-6 py-4">Full Application</th>
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
                          {sub.toolsTechnologies.slice(0, 3).map((tool, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {tool}
                            </span>
                          ))}
                          {sub.toolsTechnologies.length > 3 && (
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
                      <td className="px-6 py-4">
                        <details className="text-purple-600 hover:text-purple-700 cursor-pointer outline-none">
                          <summary className="font-medium">View Data</summary>
                          <div className="absolute right-8 mt-2 w-96 max-h-96 overflow-y-auto bg-white p-4 border border-gray-200 rounded-lg shadow-xl z-50">
                            <h3 className="font-bold mb-2 pb-2 border-b">Detailed Answers</h3>
                            <div className="space-y-3 text-xs text-gray-700">
                              <div><span className="font-semibold">Motivation:</span> {sub.whyJoin}</div>
                              <div><span className="font-semibold">Goals:</span> {sub.yearGoals}</div>
                              <div><span className="font-semibold">Commitment:</span> {sub.hoursPerWeek} ({sub.confirmStay})</div>
                              <div><span className="font-semibold">Experience:</span> {sub.hasProjectExperience === 'yes' ? sub.projectDescription : 'None'}</div>
                              
                              <div className="pt-3 border-t mt-3">
                                <h4 className="font-bold text-gray-900 mb-2">AI Chat Transcript</h4>
                                <div className="space-y-2 bg-gray-50 p-2 rounded">
                                  {Array.isArray(sub.chatMessages) ? (
                                    sub.chatMessages.map((msg: any, i) => (
                                      <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                                        <span className={`inline-block px-2 py-1 rounded ${msg.role === 'user' ? 'bg-purple-100' : 'bg-gray-200'}`}>
                                          <strong className="block text-[10px] uppercase text-gray-500 mb-0.5">{msg.role}</strong>
                                          {msg.content}
                                        </span>
                                      </div>
                                    ))
                                  ) : "No chat data"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </details>
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
