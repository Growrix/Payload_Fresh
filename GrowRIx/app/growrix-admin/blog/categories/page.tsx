"use client";

import React, { useState } from "react";
import { Search, Plus, Edit2, Trash2, MoreHorizontal, Filter, ChevronDown, X, Save, Folder, FolderOpen } from "lucide-react";

const mockCategories = [
  { 
    id: 1, 
    name: "Technology", 
    slug: "technology", 
    description: "Posts about technology and innovation",
    parent: null,
    postCount: 15,
    level: 0
  },
  { 
    id: 2, 
    name: "Web Development", 
    slug: "web-development", 
    description: "Frontend and backend development guides",
    parent: 1,
    postCount: 8,
    level: 1
  },
  { 
    id: 3, 
    name: "React", 
    slug: "react", 
    description: "React.js tutorials and best practices",
    parent: 2,
    postCount: 5,
    level: 2
  },
  { 
    id: 4, 
    name: "Design", 
    slug: "design", 
    description: "UI/UX design principles and trends",
    parent: null,
    postCount: 12,
    level: 0
  },
  { 
    id: 5, 
    name: "Business", 
    slug: "business", 
    description: "Business strategy and growth insights",
    parent: null,
    postCount: 7,
    level: 0
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterParentId, setFilterParentId] = useState<number | "">("");
  const [filterMinCount, setFilterMinCount] = useState<number | "">("");
  const [filterMaxCount, setFilterMaxCount] = useState<number | "">("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    parent: null as number | null
  });

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesParent = filterParentId === "" ? true : category.parent === filterParentId;

    const matchesMin = filterMinCount === "" ? true : category.postCount >= Number(filterMinCount);
    const matchesMax = filterMaxCount === "" ? true : category.postCount <= Number(filterMaxCount);

    return matchesSearch && matchesParent && matchesMin && matchesMax;
  });

  const handleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories.map(c => c.id));
    }
  };

  const handleSelectCategory = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(cId => cId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleQuickEdit = (category: any) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const handleSaveEdit = () => {
    // Update category in the list
    setCategories(categories.map(cat => 
      cat.id === editingId ? { ...cat, name: editingName } : cat
    ));
    setEditingId(null);
    setEditingName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      const parentCategory = categories.find(c => c.id === newCategory.parent);
      const newCat = {
        id: newId,
        name: newCategory.name.trim(),
        slug: newCategory.name.toLowerCase().replace(/\s+/g, "-"),
        description: newCategory.description.trim() || `Posts about ${newCategory.name.toLowerCase()}`,
        parent: newCategory.parent,
        postCount: 0,
        level: parentCategory ? parentCategory.level + 1 : 0
      };
      setCategories([...categories, newCat]);
      setNewCategory({ name: "", description: "", parent: null });
      setShowAddModal(false);
    }
  };

  const handleDeleteCategory = () => {
    if (deleteId) {
      // Remove category and any children
      setCategories(categories.filter(cat => 
        cat.id !== deleteId && cat.parent !== deleteId
      ));
      setSelectedCategories(selectedCategories.filter(id => id !== deleteId));
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  const handleBulkDelete = () => {
    if (selectedCategories.length > 0) {
      setCategories(categories.filter(cat => !selectedCategories.includes(cat.id)));
      setSelectedCategories([]);
    }
  };

  const getIndentClass = (level: number) => {
    return `pl-${Math.min(level * 6, 12)}`;
  };

  const parentCategories = categories.filter(cat => cat.level === 0);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Categories</h1>
              <p className="text-gray-400 mt-1">Organize your content with categories</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#9333ea] text-white rounded-lg hover:bg-[#7c3aed] transition-colors" 
            >
              <Plus size={20} />
              Add New Category
            </button>
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
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#9333ea] focus:outline-none w-80"
                    />
                  </div>
                  
                  {selectedCategories.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {selectedCategories.length} selected
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
                    onClick={() => setShowFilterModal(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                    title="Open filters"
                  >
                    <Filter size={16} />
                    Filter
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
                        checked={selectedCategories.length === filteredCategories.length && filteredCategories.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-600 bg-[#0b0b0b] text-[#9333ea] focus:ring-[#9333ea] focus:ring-offset-0"
                      />
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-300">Name</th>
                    <th className="text-left p-4 font-semibold text-gray-300">Description</th>
                    <th className="text-left p-4 font-semibold text-gray-300">Slug</th>
                    <th className="text-left p-4 font-semibold text-gray-300">Count</th>
                    <th className="text-left p-4 font-semibold text-gray-300 w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr 
                      key={category.id} 
                      className="border-b border-gray-800 hover:bg-[#1a1a1a] transition-colors group"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleSelectCategory(category.id)}
                          className="rounded border-gray-600 bg-[#0b0b0b] text-[#9333ea] focus:ring-[#9333ea] focus:ring-offset-0"
                        />
                      </td>
                      <td className="p-4">
                        {editingId === category.id ? (
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
                          <div className={`flex items-center ${getIndentClass(category.level)}`}>
                            {category.level > 0 && (
                              <span className="text-gray-500 mr-2">└─</span>
                            )}
                            <span className="font-medium">{category.name}</span>
                            {category.level === 0 && (
                              <span className="ml-2 text-xs bg-[#9333ea] text-white px-2 py-1 rounded">
                                Parent
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-gray-400 text-sm max-w-xs truncate">
                        {category.description}
                      </td>
                      <td className="p-4 text-gray-300 font-mono text-sm">
                        {category.slug}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">
                          {category.postCount} posts
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleQuickEdit(category)}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="Quick edit"
                          >
                            <Edit2 size={16} className="text-gray-400" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(category.id);
                              setShowDeleteModal(true);
                            }}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            title="Delete category"
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
                Showing {filteredCategories.length} of {categories.length} categories
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#181818] rounded-lg border border-gray-800 p-4">
              <div className="text-2xl font-bold text-[#9333ea]">{categories.length}</div>
              <div className="text-sm text-gray-400">Total Categories</div>
            </div>
            <div className="bg-[#181818] rounded-lg border border-gray-800 p-4">
              <div className="text-2xl font-bold text-[#9333ea]">
                {categories.filter(c => c.level === 0).length}
              </div>
              <div className="text-sm text-gray-400">Parent Categories</div>
            </div>
            <div className="bg-[#181818] rounded-lg border border-gray-800 p-4">
              <div className="text-2xl font-bold text-[#9333ea]">
                {categories.reduce((sum, c) => sum + c.postCount, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Posts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Filter Categories</h2>
              <button onClick={() => setShowFilterModal(false)} className="p-1 hover:bg-gray-700 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Parent Category</label>
                <select
                  value={filterParentId}
                  onChange={(e) => setFilterParentId(e.target.value === "" ? "" : parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none"
                >
                  <option value="">Any</option>
                  {parentCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Min Posts</label>
                  <input
                    type="number"
                    value={filterMinCount}
                    onChange={(e) => setFilterMinCount(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Posts</label>
                  <input
                    type="number"
                    value={filterMaxCount}
                    onChange={(e) => setFilterMaxCount(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none"
                    min={0}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setFilterParentId(""); setFilterMinCount(""); setFilterMaxCount(""); }}
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

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#181818] rounded-lg border border-gray-800 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Category</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none"
                  placeholder="Enter category name"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none h-20 resize-none"
                  placeholder="Optional description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Parent Category</label>
                <select
                  value={newCategory.parent || ""}
                  onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-3 py-2 bg-[#0b0b0b] border border-gray-700 rounded-lg focus:border-[#9333ea] focus:outline-none"
                >
                  <option value="">None (Top Level)</option>
                  {parentCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddCategory}
                disabled={!newCategory.name.trim()}
                className="flex-1 px-4 py-2 bg-[#9333ea] text-white rounded-lg hover:bg-[#7c3aed] transition-colors disabled:opacity-50 disabled:hover:bg-[#9333ea]"
              >
                Add Category
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
              <h2 className="text-xl font-semibold text-red-400">Delete Category</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this category? This action cannot be undone.
              {categories.find(c => c.parent === deleteId) && (
                <span className="block mt-2 text-yellow-400 text-sm">
                  Warning: This will also delete all subcategories.
                </span>
              )}
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCategory}
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
