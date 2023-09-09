"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PostType } from '@/types';

const inter = Inter({ subsets: ['latin'] })


async function fetchAllblogs() {
  const res = await fetch(`http://localhost:3000/api/blog`, {
    cache: "no-store"
  })

  const data = await res.json();

  return data.posts;
}

export default async function Home() {

  const router = useRouter();

  const posts = await fetchAllblogs();

  return (
    <div className='h-auto w-full bg-zinc-600 py-10  scrollbar-thin scrollbar-thumb-rose-400'>
      <div className='flex flex-col items-center  min-h-screen'>
        <div className='bg-white px-10 py-5 rounded-xl'>
          <p className='text-xl font-bold'>
            Next.js & Supabase ブログ 📝
          </p>
        </div>

        <Link href={"/blog/add"}>
          <div
            className='mt-10 border cursor-pointer hover:scale-105 transition text-white text-xl rounded-md px-6 py-3 w-auto h-auto'>
            ブログを投稿する 🚀
          </div>
        </Link>

        <div className='
        container flex flex-col gap-5 w-full md:w-1/2 h-auto mt-5 p-6'>

          {/* ブログカード */}
          {posts.map((post: PostType) => (
            <div
              key={post.id}
              className='bg-slate-300 rounded-md p-5 flex justify-between'>
              <div className='flex flex-col justify-start'>
                <p className='font-semibold mb-1 text-lg'>{post.title}</p>
                <p className=''>{post.description}</p>
                <div className=' text-zinc-700 font-thin mt-6'>
                  <p>{new Date(post.date).toDateString()}</p>
                </div>
              </div>
              <Link href={`/blog/edit/${post.id}`}>
                <button className=' bg-slate-900 text-white px-5 py-2 rounded-xl font-bold hover:scale-105 transition'>編集</button>
              </Link>
            </div>
          ))}



        </div>
      </div>
    </div>
  )
}
