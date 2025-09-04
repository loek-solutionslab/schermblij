import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_course_categories_target_audience" AS ENUM('parents', 'professionals', 'municipalities', 'daycare');
  CREATE TYPE "public"."enum_courses_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "public"."enum_courses_blocks_code_language" AS ENUM('typescript', 'javascript', 'css');
  CREATE TYPE "public"."enum_courses_format" AS ENUM('online', 'physical', 'hybrid');
  CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__courses_v_blocks_banner_style" AS ENUM('info', 'warning', 'error', 'success');
  CREATE TYPE "public"."enum__courses_v_blocks_code_language" AS ENUM('typescript', 'javascript', 'css');
  CREATE TYPE "public"."enum__courses_v_version_format" AS ENUM('online', 'physical', 'hybrid');
  CREATE TYPE "public"."enum__courses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_header_menu_items_type" AS ENUM('link', 'dropdown', 'mega_menu');
  CREATE TYPE "public"."enum_header_cta_button_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "age_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"description" jsonb,
  	"min_age" numeric NOT NULL,
  	"max_age" numeric NOT NULL,
  	"icon_id" integer,
  	"order" numeric DEFAULT 0,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "course_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"description" jsonb,
  	"icon_id" integer,
  	"order" numeric DEFAULT 0,
  	"target_audience" "enum_course_categories_target_audience" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_courses_blocks_banner_style" DEFAULT 'info',
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_courses_blocks_code_language" DEFAULT 'typescript',
  	"code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial" varchar,
  	"author" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "courses_upcoming_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"location" varchar,
  	"available_spots" numeric
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"description" jsonb,
  	"category_id" integer,
  	"price" numeric,
  	"duration_minutes" numeric,
  	"format" "enum_courses_format",
  	"max_participants" numeric,
  	"featured_image_id" integer,
  	"status" "enum_courses_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_courses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "courses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"age_groups_id" integer
  );
  
  CREATE TABLE "_courses_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__courses_v_blocks_banner_style" DEFAULT 'info',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" "enum__courses_v_blocks_code_language" DEFAULT 'typescript',
  	"code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_version_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial" varchar,
  	"author" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_upcoming_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"location" varchar,
  	"available_spots" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_description" jsonb,
  	"version_category_id" integer,
  	"version_price" numeric,
  	"version_duration_minutes" numeric,
  	"version_format" "enum__courses_v_version_format",
  	"version_max_participants" numeric,
  	"version_featured_image_id" integer,
  	"version_status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_courses_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"age_groups_id" integer
  );
  
  CREATE TABLE "header_menu_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "header_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_header_menu_items_type" DEFAULT 'link' NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'SchermBlij' NOT NULL,
  	"tagline" varchar,
  	"default_seo_meta_title" varchar,
  	"default_seo_meta_description" varchar,
  	"default_seo_og_image_id" integer,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_whatsapp" varchar,
  	"contact_address" varchar,
  	"contact_kvk_number" varchar,
  	"social_media_facebook_url" varchar,
  	"social_media_instagram_url" varchar,
  	"social_media_linkedin_url" varchar,
  	"social_media_youtube_url" varchar,
  	"analytics_google_analytics_id" varchar,
  	"analytics_google_tag_manager_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DROP INDEX "form_submissions_updated_at_idx";
  DROP INDEX "form_submissions_created_at_idx";
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''ve received a new message.';
  ALTER TABLE "posts" ADD COLUMN "reading_time" numeric;
  ALTER TABLE "posts" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "posts_rels" ADD COLUMN "age_groups_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_reading_time" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "age_groups_id" integer;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "age_groups_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "course_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "cta_button_text" varchar;
  ALTER TABLE "header" ADD COLUMN "cta_button_url" varchar;
  ALTER TABLE "header" ADD COLUMN "cta_button_style" "enum_header_cta_button_style" DEFAULT 'primary';
  ALTER TABLE "header_rels" ADD COLUMN "age_groups_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "course_categories_id" integer;
  ALTER TABLE "footer" ADD COLUMN "contact_info_email" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_info_phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_info_address" varchar;
  ALTER TABLE "footer" ADD COLUMN "newsletter_heading" varchar;
  ALTER TABLE "footer" ADD COLUMN "newsletter_description" varchar;
  ALTER TABLE "footer" ADD COLUMN "newsletter_button_text" varchar DEFAULT 'Subscribe';
  ALTER TABLE "footer" ADD COLUMN "copyright_text" varchar DEFAULT '© 2024 SchermBlij. All rights reserved.';
  ALTER TABLE "footer_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "age_groups" ADD CONSTRAINT "age_groups_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "course_categories" ADD CONSTRAINT "course_categories_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_banner" ADD CONSTRAINT "courses_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_code" ADD CONSTRAINT "courses_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_media_block" ADD CONSTRAINT "courses_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_media_block" ADD CONSTRAINT "courses_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_testimonials" ADD CONSTRAINT "courses_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_upcoming_dates" ADD CONSTRAINT "courses_upcoming_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_course_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."course_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_banner" ADD CONSTRAINT "_courses_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_code" ADD CONSTRAINT "_courses_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_media_block" ADD CONSTRAINT "_courses_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_media_block" ADD CONSTRAINT "_courses_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_testimonials" ADD CONSTRAINT "_courses_v_version_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_upcoming_dates" ADD CONSTRAINT "_courses_v_version_upcoming_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_parent_id_courses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_category_id_course_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."course_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_menu_items_children" ADD CONSTRAINT "header_menu_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_menu_items" ADD CONSTRAINT "header_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_links_links" ADD CONSTRAINT "footer_footer_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_links" ADD CONSTRAINT "footer_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_og_image_id_media_id_fk" FOREIGN KEY ("default_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "age_groups_slug_idx" ON "age_groups" USING btree ("slug");
  CREATE INDEX "age_groups_icon_idx" ON "age_groups" USING btree ("icon_id");
  CREATE INDEX "age_groups_updated_at_idx" ON "age_groups" USING btree ("updated_at");
  CREATE INDEX "age_groups_created_at_idx" ON "age_groups" USING btree ("created_at");
  CREATE INDEX "course_categories_slug_idx" ON "course_categories" USING btree ("slug");
  CREATE INDEX "course_categories_icon_idx" ON "course_categories" USING btree ("icon_id");
  CREATE INDEX "course_categories_updated_at_idx" ON "course_categories" USING btree ("updated_at");
  CREATE INDEX "course_categories_created_at_idx" ON "course_categories" USING btree ("created_at");
  CREATE INDEX "courses_blocks_banner_order_idx" ON "courses_blocks_banner" USING btree ("_order");
  CREATE INDEX "courses_blocks_banner_parent_id_idx" ON "courses_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_banner_path_idx" ON "courses_blocks_banner" USING btree ("_path");
  CREATE INDEX "courses_blocks_code_order_idx" ON "courses_blocks_code" USING btree ("_order");
  CREATE INDEX "courses_blocks_code_parent_id_idx" ON "courses_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_code_path_idx" ON "courses_blocks_code" USING btree ("_path");
  CREATE INDEX "courses_blocks_media_block_order_idx" ON "courses_blocks_media_block" USING btree ("_order");
  CREATE INDEX "courses_blocks_media_block_parent_id_idx" ON "courses_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_media_block_path_idx" ON "courses_blocks_media_block" USING btree ("_path");
  CREATE INDEX "courses_blocks_media_block_media_idx" ON "courses_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "courses_testimonials_order_idx" ON "courses_testimonials" USING btree ("_order");
  CREATE INDEX "courses_testimonials_parent_id_idx" ON "courses_testimonials" USING btree ("_parent_id");
  CREATE INDEX "courses_upcoming_dates_order_idx" ON "courses_upcoming_dates" USING btree ("_order");
  CREATE INDEX "courses_upcoming_dates_parent_id_idx" ON "courses_upcoming_dates" USING btree ("_parent_id");
  CREATE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_category_idx" ON "courses" USING btree ("category_id");
  CREATE INDEX "courses_featured_image_idx" ON "courses" USING btree ("featured_image_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "courses__status_idx" ON "courses" USING btree ("_status");
  CREATE INDEX "courses_rels_order_idx" ON "courses_rels" USING btree ("order");
  CREATE INDEX "courses_rels_parent_idx" ON "courses_rels" USING btree ("parent_id");
  CREATE INDEX "courses_rels_path_idx" ON "courses_rels" USING btree ("path");
  CREATE INDEX "courses_rels_age_groups_id_idx" ON "courses_rels" USING btree ("age_groups_id");
  CREATE INDEX "_courses_v_blocks_banner_order_idx" ON "_courses_v_blocks_banner" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_banner_parent_id_idx" ON "_courses_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_banner_path_idx" ON "_courses_v_blocks_banner" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_code_order_idx" ON "_courses_v_blocks_code" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_code_parent_id_idx" ON "_courses_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_code_path_idx" ON "_courses_v_blocks_code" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_media_block_order_idx" ON "_courses_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_media_block_parent_id_idx" ON "_courses_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_media_block_path_idx" ON "_courses_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_media_block_media_idx" ON "_courses_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_courses_v_version_testimonials_order_idx" ON "_courses_v_version_testimonials" USING btree ("_order");
  CREATE INDEX "_courses_v_version_testimonials_parent_id_idx" ON "_courses_v_version_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_upcoming_dates_order_idx" ON "_courses_v_version_upcoming_dates" USING btree ("_order");
  CREATE INDEX "_courses_v_version_upcoming_dates_parent_id_idx" ON "_courses_v_version_upcoming_dates" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_parent_idx" ON "_courses_v" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_version_slug_idx" ON "_courses_v" USING btree ("version_slug");
  CREATE INDEX "_courses_v_version_version_category_idx" ON "_courses_v" USING btree ("version_category_id");
  CREATE INDEX "_courses_v_version_version_featured_image_idx" ON "_courses_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_courses_v_version_version_updated_at_idx" ON "_courses_v" USING btree ("version_updated_at");
  CREATE INDEX "_courses_v_version_version_created_at_idx" ON "_courses_v" USING btree ("version_created_at");
  CREATE INDEX "_courses_v_version_version__status_idx" ON "_courses_v" USING btree ("version__status");
  CREATE INDEX "_courses_v_created_at_idx" ON "_courses_v" USING btree ("created_at");
  CREATE INDEX "_courses_v_updated_at_idx" ON "_courses_v" USING btree ("updated_at");
  CREATE INDEX "_courses_v_latest_idx" ON "_courses_v" USING btree ("latest");
  CREATE INDEX "_courses_v_autosave_idx" ON "_courses_v" USING btree ("autosave");
  CREATE INDEX "_courses_v_rels_order_idx" ON "_courses_v_rels" USING btree ("order");
  CREATE INDEX "_courses_v_rels_parent_idx" ON "_courses_v_rels" USING btree ("parent_id");
  CREATE INDEX "_courses_v_rels_path_idx" ON "_courses_v_rels" USING btree ("path");
  CREATE INDEX "_courses_v_rels_age_groups_id_idx" ON "_courses_v_rels" USING btree ("age_groups_id");
  CREATE INDEX "header_menu_items_children_order_idx" ON "header_menu_items_children" USING btree ("_order");
  CREATE INDEX "header_menu_items_children_parent_id_idx" ON "header_menu_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_menu_items_order_idx" ON "header_menu_items" USING btree ("_order");
  CREATE INDEX "header_menu_items_parent_id_idx" ON "header_menu_items" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_footer_links_links_order_idx" ON "footer_footer_links_links" USING btree ("_order");
  CREATE INDEX "footer_footer_links_links_parent_id_idx" ON "footer_footer_links_links" USING btree ("_parent_id");
  CREATE INDEX "footer_footer_links_order_idx" ON "footer_footer_links" USING btree ("_order");
  CREATE INDEX "footer_footer_links_parent_id_idx" ON "footer_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_seo_default_seo_og_image_idx" ON "site_settings" USING btree ("default_seo_og_image_id");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_course_categories_fk" FOREIGN KEY ("course_categories_id") REFERENCES "public"."course_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_age_groups_fk" FOREIGN KEY ("age_groups_id") REFERENCES "public"."age_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_course_categories_fk" FOREIGN KEY ("course_categories_id") REFERENCES "public"."course_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_age_groups_id_idx" ON "posts_rels" USING btree ("age_groups_id");
  CREATE INDEX "_posts_v_rels_age_groups_id_idx" ON "_posts_v_rels" USING btree ("age_groups_id");
  CREATE INDEX "form_submissions_updated_at_1_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_1_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_age_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("age_groups_id");
  CREATE INDEX "payload_locked_documents_rels_course_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("course_categories_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_1_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_rels_age_groups_id_idx" ON "header_rels" USING btree ("age_groups_id");
  CREATE INDEX "header_rels_course_categories_id_idx" ON "header_rels" USING btree ("course_categories_id");
  CREATE INDEX "footer_rels_media_id_idx" ON "footer_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "age_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "course_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_blocks_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_upcoming_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_blocks_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_upcoming_dates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_menu_items_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_links_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "age_groups" CASCADE;
  DROP TABLE "course_categories" CASCADE;
  DROP TABLE "courses_blocks_banner" CASCADE;
  DROP TABLE "courses_blocks_code" CASCADE;
  DROP TABLE "courses_blocks_media_block" CASCADE;
  DROP TABLE "courses_testimonials" CASCADE;
  DROP TABLE "courses_upcoming_dates" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "courses_rels" CASCADE;
  DROP TABLE "_courses_v_blocks_banner" CASCADE;
  DROP TABLE "_courses_v_blocks_code" CASCADE;
  DROP TABLE "_courses_v_blocks_media_block" CASCADE;
  DROP TABLE "_courses_v_version_testimonials" CASCADE;
  DROP TABLE "_courses_v_version_upcoming_dates" CASCADE;
  DROP TABLE "_courses_v" CASCADE;
  DROP TABLE "_courses_v_rels" CASCADE;
  DROP TABLE "header_menu_items_children" CASCADE;
  DROP TABLE "header_menu_items" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_footer_links_links" CASCADE;
  DROP TABLE "footer_footer_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_age_groups_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_age_groups_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_age_groups_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_course_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_courses_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_age_groups_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_course_categories_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_media_fk";
  
  DROP INDEX "posts_rels_age_groups_id_idx";
  DROP INDEX "_posts_v_rels_age_groups_id_idx";
  DROP INDEX "form_submissions_updated_at_1_idx";
  DROP INDEX "form_submissions_created_at_1_idx";
  DROP INDEX "payload_locked_documents_rels_age_groups_id_idx";
  DROP INDEX "payload_locked_documents_rels_course_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_courses_id_idx";
  DROP INDEX "payload_locked_documents_rels_form_submissions_id_1_idx";
  DROP INDEX "header_logo_idx";
  DROP INDEX "header_rels_age_groups_id_idx";
  DROP INDEX "header_rels_course_categories_id_idx";
  DROP INDEX "footer_rels_media_id_idx";
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''''ve received a new message.';
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  ALTER TABLE "posts" DROP COLUMN "reading_time";
  ALTER TABLE "posts" DROP COLUMN "featured";
  ALTER TABLE "posts_rels" DROP COLUMN "age_groups_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_reading_time";
  ALTER TABLE "_posts_v" DROP COLUMN "version_featured";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "age_groups_id";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "placeholder";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "age_groups_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "course_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "courses_id";
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "header" DROP COLUMN "cta_button_text";
  ALTER TABLE "header" DROP COLUMN "cta_button_url";
  ALTER TABLE "header" DROP COLUMN "cta_button_style";
  ALTER TABLE "header_rels" DROP COLUMN "age_groups_id";
  ALTER TABLE "header_rels" DROP COLUMN "course_categories_id";
  ALTER TABLE "footer" DROP COLUMN "contact_info_email";
  ALTER TABLE "footer" DROP COLUMN "contact_info_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_info_address";
  ALTER TABLE "footer" DROP COLUMN "newsletter_heading";
  ALTER TABLE "footer" DROP COLUMN "newsletter_description";
  ALTER TABLE "footer" DROP COLUMN "newsletter_button_text";
  ALTER TABLE "footer" DROP COLUMN "copyright_text";
  ALTER TABLE "footer_rels" DROP COLUMN "media_id";
  DROP TYPE "public"."enum_course_categories_target_audience";
  DROP TYPE "public"."enum_courses_blocks_banner_style";
  DROP TYPE "public"."enum_courses_blocks_code_language";
  DROP TYPE "public"."enum_courses_format";
  DROP TYPE "public"."enum_courses_status";
  DROP TYPE "public"."enum__courses_v_blocks_banner_style";
  DROP TYPE "public"."enum__courses_v_blocks_code_language";
  DROP TYPE "public"."enum__courses_v_version_format";
  DROP TYPE "public"."enum__courses_v_version_status";
  DROP TYPE "public"."enum_header_menu_items_type";
  DROP TYPE "public"."enum_header_cta_button_style";
  DROP TYPE "public"."enum_footer_social_links_platform";`)
}
