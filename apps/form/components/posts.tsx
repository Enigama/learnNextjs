'use client';

import { formatDate } from '@/lib/format';
import { Post } from '@/lib/types';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';
import { useOptimistic } from 'react';
import Image, { ImageLoaderProps } from 'next/image';

function imageLoader(config: ImageLoaderProps): string {
  const [startUrl, endUrl] = config.src.split('upload/');
  const transformation = `w_200,q_${config.quality}`;
  const newSrc = `${startUrl}upload/${transformation}/${endUrl}`;
  return newSrc;
}

function PostItem({ post, action }: { post: Post; action: any }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          loader={imageLoader}
          src={post.image}
          width={200}
          height={150}
          alt={post.title}
          quality={50}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: Post[] }) {
  const [ompimisticPosts, setOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      return prevPosts.map((post) => {
        if (post.id === updatedPostId) {
          return {
            ...post,
            likes: post.likes + (post.isLiked ? -1 : 1),
            isLiked: !post.isLiked,
          };
        }
        return post;
      });
    },
  );
  if (!ompimisticPosts || ompimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatedPost(postId: number) {
    setOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {ompimisticPosts.map((post) => (
        <li key={post.id}>
          <PostItem post={post} action={updatedPost} />
        </li>
      ))}
    </ul>
  );
}
