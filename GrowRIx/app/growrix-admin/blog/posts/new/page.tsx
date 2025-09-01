"use client";

import React, { useState, useCallback } from 'react';
import EditorCanvas from '../../../../../components/blog/PostEditor/EditorCanvas';
import SlugCard from '../../../../../components/blog/PostEditor/Sidebar/SlugCard';
import SEOPanel from '../../../../../components/blog/PostEditor/Sidebar/SEOPanel';
import TaxonomyPanel from '../../../../../components/blog/PostEditor/Sidebar/TaxonomyPanel';
import FeaturedImageCard from '../../../../../components/blog/PostEditor/Sidebar/FeaturedImageCard';
import RevisionsCard from '../../../../../components/blog/PostEditor/Sidebar/RevisionsCard';
import PublishBox from '../../../../../components/blog/PostEditor/PublishBox';
import MediaInsertion from '../../../../../components/blog/PostEditor/MediaInsertion';
import { ToastProvider, useToast } from '../../../../../components/blog/shared/Toast';
import { useAutoSave } from '../../../../../hooks/useAutoSave';
import type { Post } from '../../../../../types/blog-mocks';

const NewPostPageContent = () => {
	const [postData, setPostData] = useState<Partial<Post>>({
		id: 'new',
		title: '',
		content: '',
		slug: '',
		status: 'draft',
		author: 'Admin',
		tag_ids: [],
		meta_title: '',
		meta_description: '',
		userEditedSlug: false
	});

	const [showMediaLibrary, setShowMediaLibrary] = useState(false);
	const { addToast } = useToast();

	const handleSave = useCallback(async (data: Partial<Post>) => {
		// In real app, this would make an API call
		console.log('Saving post data:', data);
	}, []);

	const { status, error } = useAutoSave({
		data: postData,
		onSave: handleSave,
		delay: 1000
	});

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		setPostData(prev => ({
			...prev,
			title,
			slug: prev.userEditedSlug ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
		}));
	};

	const handleSlugChange = (slug: string) => {
		setPostData(prev => ({ 
			...prev, 
			slug, 
			userEditedSlug: true
		}));
	};

	const handleSEOChange = (seoData: { meta_title?: string; meta_description?: string }) => {
		setPostData(prev => ({ ...prev, ...seoData }));
	};

	const handleTaxonomyChange = (taxonomyData: { category_id?: string; tag_ids?: string[] }) => {
		setPostData(prev => ({ ...prev, ...taxonomyData }));
	};

	const handleFeaturedImageChange = (featured_image_id?: string) => {
		setPostData(prev => ({ ...prev, featured_image_id }));
	};

	const handleStatusChange = (newStatus: 'draft' | 'published' | 'scheduled' | 'private') => {
		setPostData(prev => ({ ...prev, status: newStatus as any }));
	};

	const handlePublish = async () => {
		try {
			setPostData(prev => ({ ...prev, status: 'published' }));
			addToast({
				type: 'success',
				title: 'Post Published',
				message: 'Your post has been published successfully!'
			});
		} catch (error) {
			addToast({
				type: 'error',
				title: 'Publish Failed',
				message: 'Failed to publish the post. Please try again.'
			});
		}
	};

	const handleSchedule = async (datetime: string) => {
		try {
			setPostData(prev => ({ ...prev, status: 'scheduled' as any, scheduled_at: datetime }));
			addToast({
				type: 'success',
				title: 'Post Scheduled',
				message: `Your post has been scheduled for ${new Date(datetime).toLocaleString()}`
			});
		} catch (error) {
			addToast({
				type: 'error',
				title: 'Schedule Failed',
				message: 'Failed to schedule the post. Please try again.'
			});
		}
	};

	const handleSaveDraft = async () => {
		try {
			await handleSave(postData);
			addToast({
				type: 'success',
				title: 'Draft Saved',
				message: 'Your draft has been saved successfully.'
			});
		} catch (error) {
			addToast({
				type: 'error',
				title: 'Save Failed',
				message: 'Failed to save the draft. Please try again.'
			});
		}
	};

	const handleMediaInsert = (media: { url: string; alt: string; caption?: string }) => {
		const mediaHtml = `<img src="${media.url}" alt="${media.alt}"${media.caption ? ` title="${media.caption}"` : ''} />`;
		setPostData(prev => ({
			...prev,
			content: (prev.content || '') + '\n\n' + mediaHtml
		}));
	};

	const getStatusDisplay = () => {
		switch (status) {
			case 'saving': return <span style={{ color: '#9333ea' }}>Saving...</span>;
			case 'saved': return <span className="text-green-400">Saved</span>;
			case 'error': return <span className="text-red-400">Failed to save</span>;
			default: return null;
		}
	};

	return (
		<div className="min-h-screen" style={{ backgroundColor: '#0b0b0b' }}>
			{/* Header */}
			<div style={{ backgroundColor: '#181818' }} className="border-b border-gray-800 px-6 py-4">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold text-white">
						{postData.id === 'new' ? 'Add New Post' : 'Edit Post'}
					</h1>
					<div className="flex items-center gap-3">
						{getStatusDisplay()}
						<button
							onClick={() => setShowMediaLibrary(true)}
							style={{ backgroundColor: '#181818' }}
							className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#9333ea]"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							Add Media
						</button>
					</div>
				</div>
			</div>

			<div className="max-w-none mx-auto grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-0 h-full">
				<main className="px-6 py-6 min-h-screen">
					<div className="space-y-6 h-full">
						{/* Title */}
						<div>
							{/* Title card */}
							<div className="rounded-md" style={{ backgroundColor: '#181818', border: '1px solid #2a2a2a', padding: '12px' }}>
								<label className="block">
									<input 
										aria-label="Post title" 
										value={postData.title || ''}
										onChange={handleTitleChange}
										className="w-full text-2xl font-bold border-none outline-none bg-transparent text-white placeholder-gray-500" 
										placeholder="Enter title here" 
									/>
								</label>
							</div>
							{error && (
								<p className="mt-1 text-sm text-red-400">{error}</p>
							)}
						</div>

						{/* Editor */}
						<div style={{ backgroundColor: '#181818' }} className="border border-gray-800 rounded-lg flex-1 h-[calc(100vh-200px)]">
							<EditorCanvas
								content={postData.content || ''}
								onChange={(v) => setPostData(prev => ({ ...prev, content: v }))}
							/>
						</div>
					</div>
				</main>

				<aside style={{ backgroundColor: '#181818' }} className="p-4 space-y-4 border-l border-gray-800 min-h-screen">
					<PublishBox
						status={postData.status as 'draft' | 'published' | 'scheduled' | 'private'}
						onStatusChange={handleStatusChange}
						onSave={handleSaveDraft}
						onPublish={handlePublish}
						onSchedule={handleSchedule}
						isLoading={status === 'saving'}
						isDirty={status === 'saving'}
						lastSaved={status === 'saved' ? new Date().toISOString() : undefined}
					/>

					<SlugCard 
						post={postData}
						onSlugChange={handleSlugChange}
					/>

					<SEOPanel 
						post={postData}
						onSEOChange={handleSEOChange}
					/>

					<TaxonomyPanel 
						post={postData}
						onTaxonomyChange={handleTaxonomyChange}
					/>

					<FeaturedImageCard 
						post={postData}
						onFeaturedImageChange={handleFeaturedImageChange}
					/>

					<RevisionsCard 
						postId={postData.id}
						onPostRestore={(restoredPost) => setPostData(restoredPost)}
					/>
				</aside>
			</div>

			{/* Media Library Modal */}
			{showMediaLibrary && (
				<MediaInsertion
					onMediaInsert={handleMediaInsert}
					onClose={() => setShowMediaLibrary(false)}
				/>
			)}
		</div>
	);
};

export default function NewPostPage() {
	return (
		<ToastProvider>
			<NewPostPageContent />
		</ToastProvider>
	);
}
