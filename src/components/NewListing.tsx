import { useSession } from "next-auth/react";
import { CustomButton } from "./CustomButton";
import { ProfileImage } from "./ProfileImage";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

function updatePostSize(textArea?: HTMLTextAreaElement) {
    if(textArea == null) return
    textArea.style.height = '0'
    textArea.style.height = `${textArea.scrollHeight}px`
}

export function NewListing() {
    const session = useSession();
    if (session.status !== "authenticated") return

    return <Form />
}

function Form() {
    const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>()
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updatePostSize(textArea);
    textAreaRef.current = textArea
  }, [])

  useLayoutEffect(() => {
    updatePostSize(textAreaRef.current);
  }, [inputValue]);

  if (session.status !== "authenticated") return null;

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
            ref={inputRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p4 flex-grow resize-none overflow-hidden text-lg outline-none"
          placeholder="Tell us about it"
        />
      </div>
      <CustomButton className="self-end">Post</CustomButton>
    </form>
  );
}

