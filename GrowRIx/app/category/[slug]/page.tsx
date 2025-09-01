export default function CategoryPage({ params }: any) {
  const posts = [
    { id: 1, title: 'Hello World', slug: 'hello-world' },
    { id: 2, title: 'Second Post', slug: 'second-post' }
  ];
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Category Archive: {params.slug}</h1>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.id} className="p-3 border border-gray-700 rounded">
            <a href={`/blog/${p.slug}`} className="text-lg text-text">{p.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
