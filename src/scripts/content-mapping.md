# SchermBlij Content Mapping Analysis

## Overview
This document analyzes the Relume components and maps their content to our Payload CMS collections. The analysis identifies content patterns, themes, and provides recommendations for data structure implementation.

## Content Themes Identified

### 1. **Age-Specific Guidance**
- **Theme**: Educational content tailored to specific developmental stages
- **Key Messages**:
  - Baby (0-1 jaar): No screen time recommended by WHO
  - Peuters (1-3 jaar): Interactive, co-viewing approach
  - Kleuters (3-5 jaar): Maximum 1 hour per day with quality content
  - Onderbouw (6-8 jaar): Structured screen time with educational focus

### 2. **Professional Services**
- **Theme**: B2B services for organizations
- **Target Audiences**:
  - Kinderdagverblijven (Daycare centers)
  - Gemeenten (Municipalities) 
  - Scholen (Schools)
  - Professionals in childcare

### 3. **Parent Education**
- **Theme**: Practical guidance for families
- **Focus Areas**:
  - Online safety
  - Screen time balance
  - Media literacy
  - Family activities

### 4. **Media Evaluation Tools**
- **Theme**: Content assessment and recommendations
- **Key Feature**: "Media Maatje" - tool for evaluating child-friendly content

## Page-to-Collection Mapping

### 1. **Home Page → Multiple Collections**
**Components Analyzed**: `header-01.jsx`, `layout-238.jsx`, `layout-239.jsx`

**Content Mapping**:
- **Hero Section**: 
  - Title: "Schermtijd weer helemaal in balans"
  - Description: Balanced approach to screen time
  - Maps to: Site Settings (Global)
  
- **Media Maatje Section**:
  - Service description: Content evaluation tool
  - Maps to: Pages collection or custom blocks

### 2. **Age-Specific Pages → AgeGroups Collection**

#### Baby Page (`baby/`)
- **Header**: "Schermtijd en ontwikkeling van uw baby"
- **Key Message**: WHO recommendation of no screen time under 1 year
- **Tone**: Medical/authoritative
- **Maps to**: AgeGroups (name: "Baby", min_age: 0, max_age: 1)

#### Peuters Page (`peuters/`)
- **Header**: "Voordelen van actief schermgebruik bij peuters"
- **Key Message**: Co-viewing and interaction benefits
- **Focus**: "Samen kijken en praten"
- **Maps to**: AgeGroups (name: "Peuters", min_age: 1, max_age: 3)

#### Kleuters Page (`kleuters/`)
- **Header**: "Schermtijd voor Kleuters: Wat je Moet Weten"
- **Key Message**: WHO guideline of 1 hour max per day
- **Focus**: Responsible technology use
- **Maps to**: AgeGroups (name: "Kleuters", min_age: 3, max_age: 5)

### 3. **Course Pages → Courses Collection**

#### Course Listings (`cursussen-&-trainingen/`)
- **Featured Course**: "Cursus over Online Veiligheid voor Kinderen"
- **Category**: Safety/Veiligheid
- **Description**: Strategies for keeping children safe online
- **Maps to**: Courses collection with category relationship

#### Course Detail (`cursus-detail-page/`)
- **Generic Template**: "Cursus voor Ouders"
- **Focus**: Screen time balance
- **Maps to**: Course detail page template

### 4. **Professional Services → CourseCategories Collection**

#### Daycare (`media-wijs-voor-kinderdagverblijf/`)
- **Title**: "Mediawijsheid in Kinderopvang"
- **Target**: Daycare professionals
- **Focus**: Responsible screen use in childcare settings
- **Maps to**: CourseCategories (target_audience: "daycare")

#### Municipalities (`mediawijs-voor-gemeenten/`)
- **Title**: Municipality support services
- **Services**: Information sessions, e-learning, group discussions
- **Target**: Local government/community programs
- **Maps to**: CourseCategories (target_audience: "municipalities")

### 5. **Blog Content → Posts Collection**

#### Blog Categories Identified:
1. **Ouderschap tips** (Parenting tips)
2. **Schermgebruik advies** (Screen use advice)
3. **Gezinsactiviteiten** (Family activities)
4. **Online veiligheid** (Online safety)

#### Sample Blog Posts:
1. "Hoe schermtijd een positieve ervaring kan zijn"
2. "Tips voor het veilig gebruik van media"
3. "Creatieve offline activiteiten voor gezinnen"
4. "Balans tussen schermtijd en spel"
5. "De voordelen van digitale media"
6. "Effectieve communicatie met kinderen"

**Maps to**: Posts collection with Categories relationship

### 6. **About/Personal Pages → Pages Collection**

#### Lisanne's Profile (`over-lisanne/`)
- **Title**: "Lisanne: De brug tussen technologie en praktische opvoedingservaring"
- **Background**: Technology management + parenting experience
- **Approach**: Positive integration of screen time in family life
- **Maps to**: Pages collection (about page)

## Field Mapping Recommendations

### AgeGroups Collection Enhancement
```typescript
{
  name: "who_guidelines",
  type: "textarea",
  admin: {
    description: "WHO/Medical guidelines for this age group"
  }
},
{
  name: "key_benefits", 
  type: "array",
  fields: [
    {
      name: "benefit",
      type: "text"
    }
  ]
},
{
  name: "recommended_activities",
  type: "richText"
}
```

### CourseCategories Data Structure
```typescript
// Target audiences from content analysis:
{
  label: 'Ouders',
  value: 'parents',
  description: 'Praktische begeleiding voor gezinnen'
},
{
  label: 'Kinderdagverblijven', 
  value: 'daycare',
  description: 'Mediawijsheid in kinderopvang'
},
{
  label: 'Gemeenten',
  value: 'municipalities', 
  description: 'Community programs en ondersteuning'
},
{
  label: 'Professionals',
  value: 'professionals',
  description: 'Training voor zorgprofessionals'
}
```

## Content Priorities for Import

### Phase 1: Core Structure
1. **AgeGroups**: 6 age categories with Dutch descriptions
2. **CourseCategories**: 4 main target audiences  
3. **Basic Pages**: Home, About, Contact

### Phase 2: Educational Content
1. **Courses**: Sample courses for each category
2. **Blog Posts**: 10-15 sample posts across categories
3. **Media**: Placeholder images and icons

### Phase 3: Advanced Features  
1. **Media Maatje**: Content evaluation tool
2. **Testimonials**: User feedback system
3. **Events/Dates**: Course scheduling

## Dutch Educational Terminology

### Key Terms Found:
- **Mediawijsheid**: Media literacy
- **Schermtijd**: Screen time
- **Ontwikkeling**: Development  
- **Opvoeding**: Parenting/Education
- **Kinderopvang**: Childcare
- **Gezinsactiviteiten**: Family activities
- **Online veiligheid**: Online safety
- **Leeftijdsgroep**: Age group
- **Doelgroep**: Target audience

### Content Tone:
- **Professional but approachable**
- **Evidence-based** (WHO guidelines referenced)
- **Solution-oriented** (positive framing)
- **Family-focused** (practical application)

## Technical Implementation Notes

### URL Structure (from Relume):
- `/baby`, `/peuters`, `/kleuters` → Age-specific landing pages
- `/cursussen/[category]/[slug]` → Course detail pages
- `/blog/[slug]` → Blog posts
- `/over-lisanne` → About page

### Component Patterns:
1. **Hero sections**: Large headings + descriptive text + CTA buttons
2. **Feature grids**: 3-column layouts with icons + descriptions  
3. **Content blocks**: Text + image combinations
4. **Card layouts**: Blog posts and course listings

### SEO Considerations:
- Dutch language optimization
- Age-specific keywords
- Professional service terms
- Educational/parenting search terms

## Next Steps for Import Script

1. **Create seed data** based on this mapping
2. **Generate slugs** using Dutch content
3. **Establish relationships** between collections
4. **Import in dependency order**: Categories → AgeGroups → Courses/Posts
5. **Test content rendering** on frontend pages