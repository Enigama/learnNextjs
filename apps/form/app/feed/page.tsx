import type { Metadata } from 'next';
import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

export const generateMetadata = async (data): Promise<Metadata> => {
  console.log('Metadata', data);
  const posts = await getPosts();
  const counts = posts.length;
  return {
    title: `Browse all our ${counts} posts.`,
    description: 'Browse all our posts.',
  };
};

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
