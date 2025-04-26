import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import ContentModel from '@/models/contenModel' // Fixed typo in import path
import dbConnect from '@/lib/db'

// 🛠️ Uploads a file to Cloudinary
const uploadToCloudinary = async (file) => {
  if (!file || !file.name) return { secure_url: '', public_id: '' }
  
  const buffer = Buffer.from(await file.arrayBuffer())

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'content_uploads', resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    ).end(buffer)
  })
}

export async function POST(request) {
  await dbConnect()
  try {
    const formData = await request.formData()
    
    // Debug incoming form data
    console.log('Incoming form data keys:')
    for (let key of formData.keys()) {
      console.log('Key', key)
    }

    // Extract basic form fields
    const yourPassion = formData.get('yourPassion') || 'other'
    const date = formData.get('date') ? new Date(formData.get('date')) : new Date()
    
    // Process each content type
    const contentTypes = ['tedTalks', 'videos', 'books', 'articles']
    const contentData = {}
    
    // Find all indices for each content type
    const indices = {}
    for (const key of formData.keys()) {
      for (const type of contentTypes) {
        const match = key.match(new RegExp(`^${type}\\[(\\d+)\\]`))
        if (match) {
          indices[type] = indices[type] || new Set()
          indices[type].add(parseInt(match[1]))
        }
      }
    }
    
    // Process each content type
    for (const type of contentTypes) {
      contentData[type] = []
      
      if (!indices[type]) continue
      
      // Convert set to sorted array
      const typeIndices = [...indices[type]].sort((a, b) => a - b)
      
      for (const index of typeIndices) {
        const getField = (field) => formData.get(`${type}[${index}][${field}]`) || ''
        
        // Create base content item with common fields
        const item = {
          title: getField('title'),
          description: getField('description'),
          credit: getField('credit')
        }
        
        // Add type-specific fields
        if (type === 'tedTalks') {
          item.speaker = getField('speaker')
          item.tedUrl = getField('tedUrl')
        } else if (type === 'videos') {
          item.videoUrl = getField('videoUrl')
        } else if (type === 'books') {
          item.author = getField('author')
          item.bookUrl = getField('bookUrl')
        } else if (type === 'articles') {
          item.articleUrl = getField('articleUrl')
        }
        
        // Find corresponding file (if any)
        const files = formData.getAll(`${type}Files`)
        // In your frontend, you're appending files one by one without index
        // So we need to match them by position
        if (files.length > index) {
          const file = files[index]
          if (file && file.name) {
            const uploadResult = await uploadToCloudinary(file)
            item.url = uploadResult.secure_url
            item.publicId = uploadResult.public_id
            
            // Add type for videos specifically
            if (type === 'videos' && uploadResult.resource_type) {
              item.type = uploadResult.resource_type
            }
          }
        }
        
        // Only add non-empty items (where at least title or file exists)
        if (item.title || item.url) {
          contentData[type].push(item)
        }
      }
    }

    // Create and save the new content
    const newContent = new ContentModel({
      yourPassion,
      date,
      tedTalks: contentData.tedTalks,
      videos: contentData.videos,
      books: contentData.books,
      articles: contentData.articles
    })

    await newContent.save()

    return NextResponse.json({
      success: true,
      message: 'Content uploaded and saved successfully!',
      content: newContent
    })
  } catch (error) {
    console.error(' Upload error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}