"use client";

import usePosts from "@/app/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string; //userId for UserView page
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts?.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
