'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

const ArticleDetails = ({params}) => {
    const router = useRouter()
    const { slug } = params;
    console.log("slug from params:", slug);
    // const article = 
  return (
    <div>
        <button
        onClick={() => router.push('/content-library')}
        className="text-blue-400 mb-4 hover:underline"
      >
        ← Back to Articles
      </button>
      this a articel slug ${slug}
    </div>
  )
}

export default ArticleDetails
