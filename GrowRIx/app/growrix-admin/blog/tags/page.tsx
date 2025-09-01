"use client";

import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, MoreHorizontal, Filter, ChevronDown, Tag, TrendingUp, X, Palette } from "lucide-react";

const mockTags = [
  { 
    id: 1, 
    name: "React", 
    slug: "react", 
    description: "React.js library and ecosystem",
    postCount: 23,
    color: "#61DAFB",
    trending: true
  },
  { 
    id: 2, 
    name: "Next.js", 
    slug: "nextjs", 
    description: "Next.js framework for React applications",
    postCount: 18,
    color: "#000000",
    trending: true
  },
  { 
    id: 3, 
    name: "TypeScript", 
    slug: "typescript", 
    description: "TypeScript programming language",
    postCount: 15,
    color: "#3178C6",
    trending: false
  },
  { 
    id: 4, 
    name: "Tailwind CSS", 
    slug: "tailwind-css", 
    description: "Utility-first CSS framework",
    postCount: 12,
    color: "#06B6D4",
    trending: true
  },
  { 
    id: 5, 
    name: "JavaScript", 
    slug: "javascript", 
    description: "JavaScript programming language fundamentals",
    postCount: 31,
    color: "#F7DF1E",
    trending: false
  },
  { 
    id: 6, 
    name: "UI/UX", 
    slug: "ui-ux", 
    description: "User interface and user experience design",
    postCount: 9,
    color: "#9333EA",
    trending: false
  },
  { 
    id: 7, 
    name: "Performance", 
    slug: "performance", 
    description: "Web performance optimization techniques",
    postCount: 7,
    color: "#EF4444",
    trending: true
  },
];

const predefinedColors = [
  "#9333EA", "#EF4444", "#10B981", "#3B82F6", "#F59E0B", 
  "#8B5CF6", "#06B6D4", "#84CC16", "#F97316", "#EC4899"
];

export default function TagsPage() {
  const [tags, setTags] = useState(mockTags);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [filterTrending, setFilterTrending] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterMinUsage, setFilterMinUsage] = useState<number | "">("");
  const [filterMaxUsage, setFilterMaxUsage] = useState<number | "">("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [newTag, setNewTag] = useState({
    name: "",
    description: "",
    color: predefinedColors[0]
  });

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tag.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrending = !filterTrending || tag.trending;
  const matchesMin = filterMinUsage === "" ? true : tag.postCount >= Number(filterMinUsage);
  const matchesMax = filterMaxUsage === "" ? true : tag.postCount <= Number(filterMaxUsage);
  return matchesSearch && matchesTrending && matchesMin && matchesMax;
  });

  const handleSelectAll = () => {
    if (selectedTags.length === filteredTags.length) {
      setSelectedTags([]);
    } else {
      setSelectedTags(filteredTags.map(t => t.id));
    }
  };

  const handleSelectTag = (id: number) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter(tId => tId !== id));
    } else {
      setSelectedTags([...selectedTags, id]);
    }
  };

  const handleQuickEdit = (tag: any) => {
    setEditingId(tag.id);
    setEditingName(tag.name);
  };

  const handleSaveEdit = () => {
    // Update tag in the list
    setTags(tags.map(tag => 
      tag.id === editingId ? { ...tag, name: editingName } : tag
    ));
    setEditingId(null);
    setEditingName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleAddTag = () => {
    if (newTag.name.trim()) {
      const newId = Math.max(...tags.map(t => t.id)) + 1;
      const newTagObj = {
        id: newId,
        name: newTag.name.trim(),
        slug: newTag.name.toLowerCase().replace(/\s+/g, "-"),
        description: newTag.description.trim() || `Posts tagged with ${newTag.name.toLowerCase()}`,
        postCount: 0,
        color: newTag.color,
        trending: false
      };
      setTags([...tags, newTagObj]);
      setNewTag({ name: "", description: "", color: predefinedColors[0] });
      setShowAddModal(false);
    }
  };

  const handleDeleteTag = () => {
    if (deleteId) {
      setTags(tags.filter(tag => tag.id !== deleteId));
      setSelectedTags(selectedTags.filter(id => id !== deleteId));
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  const handleBulkDelete = () => {
    if (selectedTags.length > 0) {
      setTags(tags.filter(tag => !selectedTags.includes(tag.id)));
      setSelectedTags([]);
    }
  };

  const trendingTags = tags.filter(tag => tag.trending);
  const mostUsedTags = [...tags].sort((a, b) => b.postCount - a.postCount).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Tags</h1>
              <p className="text-gray-400 mt-1">Manage content tags and labels</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#9333ea] text-white rounded-lg hover:bg-[#7c3aed] transition-colors" 
            >
              <Plus size={20} />
              Add New Tag
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#181818] rounded-lg border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[#9333ea]">{tags.length}</div>
                  <div className="text-sm text-gray-400">Total Tags</div>
                </div>
                <Tag className="text-[#9333ea]" size={24} />
              </div>
            </div>
            <div className="bg-[#181818] rounded-lg border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[#9333ea]">{trendingTags.length}</div>
                  <div className="text-sm text-gray-400">Trending Tags</div>
                </div>
                <TrendingUp className="text-green-400" size={24} />
              </div>
            </div>
            <div className="bg-[#181818] rounded-lg border border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[#9333ea]">
                    {tags.reduce((sum, t) => sum + t.postCount, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Total Usage</div>
                </div>
                <div className="text-[#9333ea] text-2xl font-bold">#</div>
              </div>
            </div>
            <div className="bg-[#181818] rounded-lg border border-gray-800 p-4">
              <div>
                <div className="text-sm text-gray-400 mb-2">Most Used</div>
                <div className="space-y-1">
                  {mostUsedTags.map((tag, index) => (
                    <div key={tag.id} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500">#{index + 1}</span>
                      <span className="text-white truncate">{tag.name}</span>
                      <span className="text-gray-400">({tag.postCount})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Search and Bulk Actions */}
          <div className="bg-[#181818] rounded-lg border border-gray-800 mb-6">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#9333ea] focus:outline-none w-80"
                    />
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {selectedTags.length} selected
                      </span>
                      <button 
                        onClick={handleBulkDelete}
                        className="flex items-center gap-1 px-3 py-1 text-sm border border-red-600 text-red-400 rounded hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete Selected
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setFilterTrending(!filterTrending)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm border rounded transition-colors ${
                      filterTrending 
                        ? 'border-[#9333ea] bg-[#9333ea]/10 text-[#9333ea]' 
                        : 'border-gray-600 hover:bg-gray-800'
                    }`}
                  >
                    <TrendingUp size={16} />
                    Trending Only
                  </button>
                  <button 
                    onClick={() => setShowFilterModal(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                    title="More filters"
                  >
                    <Filter size={16} />
                    More Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedTags.length === filteredTags.length && filteredTags.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-600 bg-[#0b0b0b] text-[#9333ea] focus:ring-[#9333ea] focus:ring-offset-0"
                      />
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-300">Tag</th>
                    <th className="text-left p-4 font-semibold text-gray-300">Description</th>
                    <th className="text-left p-4 font-semibold text-gray-300">Slug</th>
                    <th className="text-left p-4 font-semibold text-gray-300">Usage</th>
                    <th className="text-left p-4 font-semibold text-gray-300">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-300 w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTags.map((tag) => (
                    <tr 
                      key={tag.id} 
                      className="border-b border-gray-800 hover:bg-[#1a1a1a] transition-colors group"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => handleSelectTag(tag.id)}
                          className="rounded border-gray-600 bg-[#0b0b0b] text-[#9333ea] focus:ring-[#9333ea] focus:ring-offset-0"
                        />
                      </td>
                      <td className="p-4">
                        {editingId === tag.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="px-2 py-1 bg-[#0b0b0b] border border-gray-600 rounded text-sm focus:border-[#9333ea] focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="px-2 py-1 text-xs bg-[#9333ea] text-white rounded hover:bg-[#7c3aed]"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-2 py-1 text-xs border border-gray-600 rounded hover:bg-gray-800"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full border-2 border-gray-600"
                              style={{ backgroundColor: tag.color }}
                            />
                            <span className="font-medium">{tag.name}</span>
                            {tag.trending && (
                              <span className="flex items-center gap-1 text-xs bg-green-900/20 text-green-400 px-2 py-1 rounded">
                                <TrendingUp size={12} />
                                Trending
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-gray-400 text-sm max-w-xs truncate">
                        {tag.description}
                      </td>
                      <td className="p-4 text-gray-300 font-mono text-sm">
                        {tag.slug}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">
                            {tag.postCount} posts
                          </span>
                          <div className="flex-1 bg-gray-800 rounded-full h-2 max-w-20">
                            <div 
                              className="bg-[#9333ea] h-2 rounded-full transition-all"
                              style={{ 
                                width: `${Math.min((tag.postCount / Math.max(...tags.map(t => t.postCount))) * 100, 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 text-xs rounded ${
                          tag.postCount > 10 
                            ? 'bg-green-900/20 text-green-400' 
                            : tag.postCount > 5 
                            ? 'bg-yellow-900/20 text-yellow-400'
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          {tag.postCount > 10 ? 'Popular' : tag.postCount > 5 ? 'Active' : 'Low Usage'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleQuickEdit(tag)}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="Quick edit"
                          >
                            <Edit2 size={16} className="text-gray-400" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(tag.id);
                              setShowDeleteModal(true);
                            }}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="Delete tag"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                          <button
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="More actions"
                          >
                            <MoreHorizontal size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 flex items-center justify-between text-sm text-gray-400">
              <div>
                Showing {filteredTags.length} of {tags.length} tags
                {filterTrending && ' (trending only)'}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  disabled
                  className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                  title="Pagination disabled in demo"
                >
                  Previous
                </button>
                <span className="px-3 py-1 bg-[#9333ea] text-white rounded">1</span>
                <button 
                  disabled
                  className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                  title="Pagination disabled in demo"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Tag Cloud Preview */}
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Tag Cloud Preview</h3>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg hover:border-[#9333ea] transition-colors cursor-pointer"
                  style={{
                    fontSize: `${Math.max(0.75, Math.min(1.2, tag.postCount / 20 + 0.75))}rem`,
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  {tag.name}
                  <span className="text-xs text-gray-400">({tag.postCount})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Filter Tags</h2>
              <button onClick={() => setShowFilterModal(false)} className="p-1 hover:bg-gray-700 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Min Usage</label>
                  <input
                    type="number"
                    value={filterMinUsage}
                    onChange={(e) => setFilterMinUsage(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Usage</label>
                  <input
                    type="number"
                    value={filterMaxUsage}
                    onChange={(e) => setFilterMaxUsage(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none"
                    min={0}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setFilterMinUsage(""); setFilterMaxUsage(""); }}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Reset
              </button>
              <div className="flex-1" />
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 bg-[#9333ea] text-white rounded-lg hover:bg-[#7c3aed] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tag Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Tag</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tag Name</label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none"
                  placeholder="Enter tag name"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newTag.description}
                  onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none h-20 resize-none"
                  placeholder="Optional description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg border-2 border-gray-600"
                    style={{ backgroundColor: newTag.color }}
                  />
                  <div className="grid grid-cols-5 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewTag({ ...newTag, color })}
                        className={`w-6 h-6 rounded border-2 transition-all ${
                          newTag.color === color ? 'border-white scale-110' : 'border-gray-600'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddTag}
                disabled={!newTag.name.trim()}
                className="flex-1 px-4 py-2 bg-[#9333ea] text-white rounded-lg hover:bg-[#7c3aed] transition-colors disabled:opacity-50 disabled:hover:bg-[#9333ea]"
              >
                Add Tag
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-400">Delete Tag</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this tag? This action cannot be undone and will remove the tag from all associated posts.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteTag}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
