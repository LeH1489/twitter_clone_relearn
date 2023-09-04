"use client";

import { useCallback, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import usePosts from "../hooks/usePosts";
import useRegisterModal from "../hooks/useRegisterModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "../hooks/usePost";

interface FromProps {
  placeholder: string;
  isComment?: boolean; //for comment
  postId?: string; //for comment
}

const Form: React.FC<FromProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments/${postId}` : `/api/posts`;

      await axios.post(url, { body });

      toast.success("Tweet created");
      setBody("");
      mutatePosts();
      mutatePost(); //mutate invidual post after creating an comment in the posts
    } catch (error) {
      toast.error("Failed to create tweet!");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, postId, mutatePost, isComment]);

  return (
    <div className="border-b-[1px] border-neutral-200 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-rows gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="disabled:opacity-30 peer resize-y
              mt-3 w-full bg-white ring-0 outline-none text-[20px] 
              placeholder-neutral-500 text-black"
              placeholder={placeholder}
            ></textarea>
            <hr
              className="opacity-0 peer-focus:opacity-100 h-[1px] 
            w-full border-neutral-800 transition"
            />
            <div className="mt-4 flex flexrow justify-end">
              <Button
                onClick={onSubmit}
                disabled={isLoading || !body} //nếu ko viết gì thì ko cho đăng
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-black text-2xl text-center mb-4 font-bold">
            Welcome to Free Tweet 2
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
