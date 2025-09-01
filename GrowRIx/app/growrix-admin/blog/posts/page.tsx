"use client";

import dynamic from 'next/dynamic';
import AdminMainPanel from '../../../../components/admin/AdminMainPanel';
import { ToastProvider } from '../../../../components/blog/shared/Toast';

const PostsTable = dynamic(() => import('../../../../components/blog/PostsTableNew'), { ssr: false });

export default function BlogPostsPage() {
  return (
    <ToastProvider>
      <AdminMainPanel>
        <PostsTable />
      </AdminMainPanel>
    </ToastProvider>
  );
}
