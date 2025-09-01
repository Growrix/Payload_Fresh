// UI-ONLY: Mock data for comments system - no backend integration
export interface MockComment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  status: 'approved' | 'pending' | 'spam' | 'trash';
  createdAt: string;
  updatedAt?: string;
  parentId?: string; // For threading/replies
  replies?: MockComment[];
  likes?: number;
  isEdited?: boolean;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'subscriber' | 'author' | 'editor' | 'admin';
  bio?: string;
  website?: string;
  registeredAt: string;
  lastLoginAt?: string;
  status: 'active' | 'inactive' | 'banned';
}

// Mock comments data
export const mockComments: MockComment[] = [
  {
    id: '1',
    postId: '1',
    authorName: 'Alice Johnson',
    authorEmail: 'alice@example.com',
    authorAvatar: '/images/users/alice.jpg',
    content: 'Great article! This really helped me understand Next.js 14 better. The TypeScript integration is amazing.',
    status: 'approved',
    createdAt: '2025-01-10T10:30:00Z',
    likes: 5,
    replies: [
      {
        id: '2',
        postId: '1',
        parentId: '1',
        authorName: 'Bob Wilson',
        authorEmail: 'bob@example.com',
        content: 'I agree! The app router is a game changer.',
        status: 'approved',
        createdAt: '2025-01-10T11:15:00Z',
        likes: 2
      }
    ]
  },
  {
    id: '3',
    postId: '1',
    authorName: 'Charlie Brown',
    authorEmail: 'charlie@example.com',
    content: 'Thanks for sharing this. Could you elaborate more on server components?',
    status: 'approved',
    createdAt: '2025-01-11T09:20:00Z',
    likes: 1
  },
  {
    id: '4',
    postId: '2',
    authorName: 'Diana Prince',
    authorEmail: 'diana@example.com',
    content: 'Excellent insights on React patterns. The custom hooks section was particularly useful.',
    status: 'approved',
    createdAt: '2025-01-12T14:45:00Z',
    likes: 8
  },
  {
    id: '5',
    postId: '1',
    authorName: 'Spam User',
    authorEmail: 'spam@fake.com',
    content: 'Check out my amazing product at [spam link]',
    status: 'spam',
    createdAt: '2025-01-13T08:00:00Z'
  }
];

// Mock users data
export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@growrix.com',
    avatar: '/images/authors/sarah-chen.jpg',
    role: 'admin',
    bio: 'Lead Developer and Tech Writer at GrowRix',
    website: 'https://sarahchen.dev',
    registeredAt: '2024-01-15T00:00:00Z',
    lastLoginAt: '2025-01-14T10:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@growrix.com',
    role: 'editor',
    bio: 'Content Editor and Digital Marketing Specialist',
    registeredAt: '2024-02-20T00:00:00Z',
    lastLoginAt: '2025-01-13T16:45:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '/images/users/alice.jpg',
    role: 'subscriber',
    registeredAt: '2024-06-10T00:00:00Z',
    lastLoginAt: '2025-01-10T10:30:00Z',
    status: 'active'
  },
  {
    id: '4',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'author',
    bio: 'Freelance developer and technical writer',
    website: 'https://bobwilson.tech',
    registeredAt: '2024-08-05T00:00:00Z',
    lastLoginAt: '2025-01-12T09:15:00Z',
    status: 'active'
  }
];

// Mock service functions for comments
export const mockCommentService = {
  // Get comments for a specific post
  getCommentsByPostId: (postId: string): MockComment[] => {
    return mockComments
      .filter(comment => comment.postId === postId && comment.status === 'approved')
      .map(comment => ({
        ...comment,
        replies: comment.replies?.filter(reply => reply.status === 'approved') || []
      }));
  },

  // Get all comments for admin (including moderation)
  getAllComments: (status?: string): MockComment[] => {
    if (status) {
      return mockComments.filter(comment => comment.status === status);
    }
    return mockComments;
  },

  // Add new comment (UI-ONLY: just returns success)
  addComment: (commentData: Partial<MockComment>): Promise<{ success: boolean; comment?: MockComment }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment: MockComment = {
          id: Math.random().toString(36).substr(2, 9),
          postId: commentData.postId || '',
          authorName: commentData.authorName || '',
          authorEmail: commentData.authorEmail || '',
          content: commentData.content || '',
          status: 'pending', // Comments start as pending
          createdAt: new Date().toISOString(),
          likes: 0,
          ...commentData
        };
        resolve({ success: true, comment: newComment });
      }, 500); // Simulate API delay
    });
  },

  // Update comment status (for moderation)
  updateCommentStatus: (commentId: string, status: MockComment['status']): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },

  // Search comments
  searchComments: (query: string): MockComment[] => {
    return mockComments.filter(comment => 
      comment.content.toLowerCase().includes(query.toLowerCase()) ||
      comment.authorName.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Mock service functions for users
export const mockUserService = {
  // Get all users
  getAllUsers: (role?: string): MockUser[] => {
    if (role) {
      return mockUsers.filter(user => user.role === role);
    }
    return mockUsers;
  },

  // Get user by ID
  getUserById: (userId: string): MockUser | null => {
    return mockUsers.find(user => user.id === userId) || null;
  },

  // Register new user (UI-ONLY: just returns success)
  registerUser: (userData: Partial<MockUser>): Promise<{ success: boolean; user?: MockUser }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: MockUser = {
          id: Math.random().toString(36).substr(2, 9),
          name: userData.name || '',
          email: userData.email || '',
          role: 'subscriber',
          registeredAt: new Date().toISOString(),
          status: 'active',
          ...userData
        };
        resolve({ success: true, user: newUser });
      }, 800);
    });
  },

  // Login user (UI-ONLY: just returns success)
  loginUser: (email: string, password: string): Promise<{ success: boolean; user?: MockUser; token?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          resolve({ 
            success: true, 
            user, 
            token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
          });
        } else {
          resolve({ success: false });
        }
      }, 600);
    });
  },

  // Update user profile
  updateUser: (userId: string, userData: Partial<MockUser>): Promise<{ success: boolean; user?: MockUser }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          const updatedUser = { ...user, ...userData };
          resolve({ success: true, user: updatedUser });
        } else {
          resolve({ success: false });
        }
      }, 400);
    });
  }
};
