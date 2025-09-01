"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Trash2,
  MoreHorizontal,
  X,
  Check,
  MessageSquare,
  User,
  Filter,
  ChevronDown,
  Info,
} from "lucide-react";

type CommentStatus = "approved" | "pending" | "spam";

const mockComments: any[] = [
  {
    id: 1,
    author: "Jane Doe",
    email: "jane@example.com",
    content: "Great article! I found the performance tips very useful.",
    postTitle: "Optimizing React Performance",
    date: "2025-08-20T10:12:00Z",
    status: "approved" as CommentStatus,
    replies: [],
  },
  {
    id: 2,
    author: "Spam Bot",
    email: "spam@bot.com",
    content: "Buy followers at cheap prices click here",
    postTitle: "How to scale your app",
    date: "2025-08-22T08:05:00Z",
    status: "spam" as CommentStatus,
    replies: [],
  },
  {
    id: 3,
    author: "Sam Green",
    email: "sam@green.dev",
    content: "I have a question about hooks — is useMemo necessary here?",
    postTitle: "State management patterns",
    date: "2025-08-24T14:34:00Z",
    status: "pending" as CommentStatus,
    replies: [],
  },
];

export default function CommentsAdminPage() {
  const [comments, setComments] = useState(mockComments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<CommentStatus | "">("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyTarget, setReplyTarget] = useState<any | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  const filtered = useMemo(() => {
    return comments.filter((c) => {
      const matchesSearch =
        c.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === "" ? true : c.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [comments, searchTerm, filterStatus]);

  const toggleSelect = (id: number) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const selectAll = () => {
    if (selected.length === filtered.length) setSelected([]);
    else setSelected(filtered.map((c) => c.id));
  };

  const handleApprove = (id: number) => {
    setComments((cs) => cs.map((c) => (c.id === id ? { ...c, status: "approved" } : c)));
  };

  const handleMarkSpam = (id: number) => {
    setComments((cs) => cs.map((c) => (c.id === id ? { ...c, status: "spam" } : c)));
  };

  const openReply = (comment: any) => {
    setReplyTarget(comment);
    setReplyText("");
    setShowReplyModal(true);
  };

  const submitReply = () => {
    if (!replyTarget) return;
    const newReply = {
      id: Date.now(),
      author: "Admin",
      email: "admin@local",
      content: replyText.trim(),
      date: new Date().toISOString(),
      status: "approved",
    };
    setComments((cs) => cs.map((c) => (c.id === replyTarget.id ? { ...c, replies: [...(c.replies || []), newReply] } : c)));
    setShowReplyModal(false);
    setReplyTarget(null);
    setReplyText("");
  };

  const openDelete = (comment: any) => {
    setDeleteTarget(comment);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setComments((cs) => cs.filter((c) => c.id !== deleteTarget.id));
    setSelected((s) => s.filter((id) => id !== deleteTarget.id));
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    setComments((cs) => cs.filter((c) => !selected.includes(c.id)));
    setSelected([]);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Comments</h1>
            <p className="text-gray-400 mt-1">Manage comments and moderation</p>
          </div>
          <div className="flex items-center gap-3">
            {selected.length > 0 && (
              <button onClick={handleBulkDelete} className="flex items-center gap-2 px-3 py-2 bg-red-700 text-white rounded">
                <Trash2 size={16} /> Delete {selected.length}
              </button>
            )}
            <button onClick={() => setShowFilterModal(true)} className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded hover:bg-gray-800">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="bg-[#181818] rounded-lg border border-gray-800 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  className="pl-10 pr-4 py-2 w-96 bg-[#0b0b0b] border border-gray-700 rounded-lg placeholder-gray-400 text-white focus:border-[#9333ea]"
                  placeholder="Search by author, email, comment or post..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-400">Showing {filtered.length} of {comments.length}</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-400">Status:</div>
              <div className="text-sm text-gray-300 px-3 py-1 bg-gray-800 rounded">{filterStatus || 'Any'}</div>
              <button className="flex items-center gap-1 text-sm border border-gray-600 px-2 py-1 rounded hover:bg-gray-800" onClick={() => setFilterStatus("")}>Clear</button>
            </div>
          </div>
        </div>

        <div className="bg-[#181818] rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="p-4 w-12">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={selectAll} className="rounded border-gray-600 bg-[#0b0b0b] text-[#9333ea]" />
                </th>
                <th className="p-4 font-semibold text-gray-300">Author</th>
                <th className="p-4 font-semibold text-gray-300">Comment</th>
                <th className="p-4 font-semibold text-gray-300">In Response To</th>
                <th className="p-4 font-semibold text-gray-300">Date</th>
                <th className="p-4 font-semibold text-gray-300">Status</th>
                <th className="p-4 font-semibold text-gray-300 w-36">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-800 hover:bg-[#1a1a1a] group">
                  <td className="p-4">
                    <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleSelect(c.id)} className="rounded border-gray-600 bg-[#0b0b0b] text-[#9333ea]" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white"><User size={18} /></div>
                      <div>
                        <div className="font-medium">{c.author}</div>
                        <div className="text-xs text-gray-400">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-200 mb-2">{c.content}</div>
                    {c.replies && c.replies.length > 0 && (
                      <div className="text-xs text-gray-400">{c.replies.length} repl{c.replies.length > 1 ? 'ies' : 'y'}</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-300">{c.postTitle}</td>
                  <td className="p-4 text-gray-400 text-sm">{new Date(c.date).toUTCString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs rounded ${c.status === 'approved' ? 'bg-green-900/20 text-green-400' : c.status === 'pending' ? 'bg-yellow-900/20 text-yellow-400' : 'bg-red-900/20 text-red-400'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {c.status !== 'approved' && (
                        <button onClick={() => handleApprove(c.id)} className="px-2 py-1 bg-[#9333ea] text-white rounded text-sm">Approve</button>
                      )}
                      <button onClick={() => openReply(c)} className="px-2 py-1 border border-gray-600 rounded text-sm flex items-center gap-2"><MessageSquare size={16} /> Reply</button>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleMarkSpam(c.id)} className="px-2 py-1 border border-gray-600 rounded text-sm text-red-400">Spam</button>
                        <button onClick={() => openDelete(c)} className="px-2 py-1 border border-gray-600 rounded text-sm text-red-300"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={() => setShowFilterModal(false)} className="p-1 hover:bg-gray-700 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)} className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg">
                  <option value="">Any</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="spam">Spam</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Keyword (search will still apply)</label>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setFilterStatus(""); setSearchTerm(""); }} className="px-4 py-2 border border-gray-600 rounded-lg">Reset</button>
              <div className="flex-1" />
              <button onClick={() => setShowFilterModal(false)} className="px-4 py-2 bg-[#9333ea] text-white rounded-lg">Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && replyTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Reply to {replyTarget.author}</h2>
              <button onClick={() => setShowReplyModal(false)} className="p-1 hover:bg-gray-700 rounded"><X size={20} /></button>
            </div>
            <div className="text-sm text-gray-400 mb-4">In response to: <span className="text-gray-200">{replyTarget.postTitle}</span></div>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full h-32 bg-[#0b0b0b] border border-gray-700 rounded-lg px-3 py-2 text-white" />
            <div className="flex gap-3 mt-4">
              <button onClick={submitReply} disabled={!replyText.trim()} className="px-4 py-2 bg-[#9333ea] text-white rounded-lg disabled:opacity-50">Send Reply</button>
              <button onClick={() => setShowReplyModal(false)} className="px-4 py-2 border border-gray-600 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-400">Delete Comment</h2>
              <button onClick={() => setShowDeleteModal(false)} className="p-1 hover:bg-gray-700 rounded"><X size={20} /></button>
            </div>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this comment by <span className="text-white">{deleteTarget.author}</span>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border border-gray-600 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
