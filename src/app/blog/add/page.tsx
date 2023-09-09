"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";


const postBlog = async (title: string | undefined, description: string | undefined) => {
    const res = await fetch(`http://localhost:3000/api/blog`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return res.json();
};

const PostBlog = () => {

    const titleRef = useRef<HTMLInputElement | null>(null);
    const descRef = useRef<HTMLTextAreaElement | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.loading("投稿中です・・・", { id: "1" })
        await postBlog(
            titleRef.current?.value,
            descRef.current?.value
        )


        toast.success("投稿しました!", { id: "1" })

        router.push("/")
        router.refresh();

    }

    return (
        <>
            <Toaster />
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder="タイトルを入力"
                            type="text"
                            className="rounded-md px-4 w-full py-2 my-2"
                            ref={titleRef}
                        />
                        <textarea
                            placeholder="記事詳細を入力"
                            className="rounded-md px-4 py-2 w-full my-2 resize-none"
                            ref={descRef}
                        ></textarea>
                        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                            投稿
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostBlog;
