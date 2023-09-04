"use client";

import Form from "@/app/components/Form";
import Header from "@/app/components/Header";
import CommentFeed from "@/app/components/posts/CommentFeed";
import PostItem from "@/app/components/posts/PostItem";
import usePost from "@/app/hooks/usePost";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

interface IParams {
  postId?: string;
}

//pages xem 1 post theo id
const PostView = ({ params }: { params: IParams }) => {
  const router = useRouter();

  const postId = params.postId;

  //get data of individual post
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
