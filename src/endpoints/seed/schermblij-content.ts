import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { ageGroupsData } from './age-groups'
import { courseCategoriesData } from './course-categories'
import { coursesData } from './courses'
import { blogPostsData } from './blog-posts'
import { headerDutch } from './header-dutch'

export const seedSchermBlijContent = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('Starting SchermBlij content seeding...')

  try {
    // 1. Seed Age Groups
    console.log('Seeding age groups...')
    const ageGroups: any[] = []
    for (const ageGroup of ageGroupsData) {
      const existing = await payload.find({
        collection: 'age_groups',
        where: { slug: { equals: ageGroup.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'age_groups',
          data: ageGroup as any,
        })
        ageGroups.push(created)
        console.log(`✓ Created age group: ${ageGroup.name}`)
      } else {
        ageGroups.push(existing.docs[0])
        console.log(`- Age group already exists: ${ageGroup.name}`)
      }
    }

    // 2. Seed Course Categories
    console.log('Seeding course categories...')
    const categories: any[] = []
    for (const category of courseCategoriesData) {
      const existing = await payload.find({
        collection: 'course_categories',
        where: { slug: { equals: category.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'course_categories',
          data: category as any,
        })
        categories.push(created)
        console.log(`✓ Created course category: ${category.name}`)
      } else {
        categories.push(existing.docs[0])
        console.log(`- Course category already exists: ${category.name}`)
      }
    }

    // 3. Seed Courses (with category relationships)
    console.log('Seeding courses...')
    const categoryMap = {
      'ouders': categories.find(c => c.slug === 'ouders')?.id,
      'professionals': categories.find(c => c.slug === 'professionals')?.id,
      'kinderdagverblijf': categories.find(c => c.slug === 'kinderdagverblijf')?.id,
      'gemeente': categories.find(c => c.slug === 'gemeente')?.id,
    }

    for (const course of coursesData) {
      const existing = await payload.find({
        collection: 'courses',
        where: { slug: { equals: course.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        // Determine category based on course content
        let categoryId = null
        if (course.slug?.includes('peuters') || course.slug?.includes('schermvrije') || course.slug?.includes('sociale-media')) {
          categoryId = categoryMap['ouders']
        } else if (course.slug?.includes('onderwijs') || course.slug?.includes('signalen')) {
          categoryId = categoryMap['professionals']
        } else if (course.slug?.includes('kinderopvang') || course.slug?.includes('opvang')) {
          categoryId = categoryMap['kinderdagverblijf']
        } else if (course.slug?.includes('gemeente') || course.slug?.includes('beleid') || course.slug?.includes('voorlichting')) {
          categoryId = categoryMap['gemeente']
        }

        const courseData = {
          ...course,
          category_id: categoryId,
        }

        const created = await payload.create({
          collection: 'courses',
          data: courseData as any,
        })
        console.log(`✓ Created course: ${course.title}`)
      } else {
        console.log(`- Course already exists: ${course.title}`)
      }
    }

    // 4. Seed Blog Posts
    console.log('Seeding blog posts...')
    for (const post of blogPostsData) {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'posts',
          data: post as any,
        })
        console.log(`✓ Created blog post: ${post.title}`)
      } else {
        console.log(`- Blog post already exists: ${post.title}`)
      }
    }

    // 5. Update Header with Dutch Navigation
    console.log('Updating header with Dutch navigation...')
    try {
      await payload.updateGlobal({
        slug: 'header',
        data: headerDutch as any,
      })
      console.log('✓ Updated header with Dutch navigation')
    } catch (error) {
      console.log('- Header already configured or error occurred:', error)
    }

    console.log('\n🎉 SchermBlij content seeding completed successfully!')
    
    return {
      ageGroups: ageGroups.length,
      categories: categories.length,
      courses: coursesData.length,
      blogPosts: blogPostsData.length,
    }

  } catch (error) {
    console.error('Error seeding SchermBlij content:', error)
    throw error
  }
}