import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_relume_layout" AS ENUM('image-right', 'image-left', 'text-only', 'centered');
  CREATE TYPE "public"."enum_pages_blocks_cta_relume_background_color" AS ENUM('default', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_footer_block_social_links_platform" AS ENUM('facebook', 'instagram', 'twitter', 'linkedin', 'youtube');
  CREATE TYPE "public"."enum_pages_blocks_navigation_menu_items_type" AS ENUM('link', 'dropdown', 'mega_menu');
  CREATE TYPE "public"."enum_pages_blocks_navigation_cta_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_relume_layout" AS ENUM('image-right', 'image-left', 'text-only', 'centered');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_relume_background_color" AS ENUM('default', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_footer_block_social_links_platform" AS ENUM('facebook', 'instagram', 'twitter', 'linkedin', 'youtube');
  CREATE TYPE "public"."enum__pages_v_blocks_navigation_menu_items_type" AS ENUM('link', 'dropdown', 'mega_menu');
  CREATE TYPE "public"."enum__pages_v_blocks_navigation_cta_buttons_style" AS ENUM('primary', 'secondary');
  CREATE TABLE "pages_blocks_cta_relume" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Schrijf je nu in!',
  	"subheading" varchar DEFAULT 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
  	"image_id" integer,
  	"form_settings_email_placeholder" varchar DEFAULT 'Voer je e-mail in',
  	"form_settings_button_text" varchar DEFAULT 'Inschrijven',
  	"form_settings_success_message" varchar DEFAULT 'Bedankt voor je inschrijving! We houden je op de hoogte.',
  	"form_settings_error_message" varchar DEFAULT 'Er ging iets mis. Probeer het opnieuw.',
  	"form_settings_form_identifier" varchar DEFAULT 'cta-signup',
  	"terms_and_conditions_show_terms" boolean DEFAULT true,
  	"terms_and_conditions_terms_text" varchar DEFAULT 'Door op Inschrijven te klikken, ga je akkoord met onze',
  	"terms_and_conditions_terms_link_text" varchar DEFAULT 'Algemene Voorwaarden',
  	"terms_and_conditions_terms_link_url" varchar DEFAULT '/algemene-voorwaarden',
  	"layout" "enum_pages_blocks_cta_relume_layout" DEFAULT 'image-right',
  	"background_color" "enum_pages_blocks_cta_relume_background_color" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_block_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_footer_block_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_block_footer_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_block_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_block_partner_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_block_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"contact_info_address_label" varchar DEFAULT 'Adres:',
  	"contact_info_address" varchar,
  	"contact_info_contact_label" varchar DEFAULT 'Contact:',
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"newsletter_enabled" boolean DEFAULT false,
  	"newsletter_heading" varchar DEFAULT 'Blijf op de hoogte',
  	"newsletter_description" varchar,
  	"newsletter_button_text" varchar DEFAULT 'Inschrijven',
  	"newsletter_placeholder_text" varchar DEFAULT 'Voer je e-mail in',
  	"copyright_text" varchar DEFAULT '© 2024 SchermBlij. All rights reserved.',
  	"use_footer_config" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_navigation_menu_items_dropdown_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_navigation_menu_items_dropdown_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar
  );
  
  CREATE TABLE "pages_blocks_navigation_menu_items_simple_dropdown_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_navigation_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_pages_blocks_navigation_menu_items_type" DEFAULT 'link',
  	"url" varchar,
  	"featured_content_title" varchar,
  	"featured_content_subtitle" varchar,
  	"featured_content_description" varchar,
  	"featured_content_image_id" integer,
  	"featured_content_link_text" varchar DEFAULT 'Lees meer',
  	"featured_content_link_url" varchar,
  	"featured_content_view_all_text" varchar DEFAULT 'Bekijk alle artikelen',
  	"featured_content_view_all_url" varchar
  );
  
  CREATE TABLE "pages_blocks_navigation_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar,
  	"style" "enum_pages_blocks_navigation_cta_buttons_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"use_header_config" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_relume" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Schrijf je nu in!',
  	"subheading" varchar DEFAULT 'Begin vandaag nog met het creëren van een gezonde digitale balans voor je gezin.',
  	"image_id" integer,
  	"form_settings_email_placeholder" varchar DEFAULT 'Voer je e-mail in',
  	"form_settings_button_text" varchar DEFAULT 'Inschrijven',
  	"form_settings_success_message" varchar DEFAULT 'Bedankt voor je inschrijving! We houden je op de hoogte.',
  	"form_settings_error_message" varchar DEFAULT 'Er ging iets mis. Probeer het opnieuw.',
  	"form_settings_form_identifier" varchar DEFAULT 'cta-signup',
  	"terms_and_conditions_show_terms" boolean DEFAULT true,
  	"terms_and_conditions_terms_text" varchar DEFAULT 'Door op Inschrijven te klikken, ga je akkoord met onze',
  	"terms_and_conditions_terms_link_text" varchar DEFAULT 'Algemene Voorwaarden',
  	"terms_and_conditions_terms_link_url" varchar DEFAULT '/algemene-voorwaarden',
  	"layout" "enum__pages_v_blocks_cta_relume_layout" DEFAULT 'image-right',
  	"background_color" "enum__pages_v_blocks_cta_relume_background_color" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_block_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__pages_v_blocks_footer_block_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_block_footer_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_block_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_block_partner_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_block_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"contact_info_address_label" varchar DEFAULT 'Adres:',
  	"contact_info_address" varchar,
  	"contact_info_contact_label" varchar DEFAULT 'Contact:',
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"newsletter_enabled" boolean DEFAULT false,
  	"newsletter_heading" varchar DEFAULT 'Blijf op de hoogte',
  	"newsletter_description" varchar,
  	"newsletter_button_text" varchar DEFAULT 'Inschrijven',
  	"newsletter_placeholder_text" varchar DEFAULT 'Voer je e-mail in',
  	"copyright_text" varchar DEFAULT '© 2024 SchermBlij. All rights reserved.',
  	"use_footer_config" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_navigation_menu_items_dropdown_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"description" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_navigation_menu_items_dropdown_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_navigation_menu_items_simple_dropdown_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_navigation_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__pages_v_blocks_navigation_menu_items_type" DEFAULT 'link',
  	"url" varchar,
  	"featured_content_title" varchar,
  	"featured_content_subtitle" varchar,
  	"featured_content_description" varchar,
  	"featured_content_image_id" integer,
  	"featured_content_link_text" varchar DEFAULT 'Lees meer',
  	"featured_content_link_url" varchar,
  	"featured_content_view_all_text" varchar DEFAULT 'Bekijk alle artikelen',
  	"featured_content_view_all_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_navigation_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar,
  	"style" "enum__pages_v_blocks_navigation_cta_buttons_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"use_header_config" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cta_relume" ADD CONSTRAINT "pages_blocks_cta_relume_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_relume" ADD CONSTRAINT "pages_blocks_cta_relume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_block_social_links" ADD CONSTRAINT "pages_blocks_footer_block_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_block_footer_links_links" ADD CONSTRAINT "pages_blocks_footer_block_footer_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_block_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_block_footer_links" ADD CONSTRAINT "pages_blocks_footer_block_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_block_partner_logos" ADD CONSTRAINT "pages_blocks_footer_block_partner_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_block_partner_logos" ADD CONSTRAINT "pages_blocks_footer_block_partner_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_block_legal_links" ADD CONSTRAINT "pages_blocks_footer_block_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_block" ADD CONSTRAINT "pages_blocks_footer_block_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_block" ADD CONSTRAINT "pages_blocks_footer_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation_menu_items_dropdown_sections_items" ADD CONSTRAINT "pages_blocks_navigation_menu_items_dropdown_sections_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation_menu_items_dropdown_sections_items" ADD CONSTRAINT "pages_blocks_navigation_menu_items_dropdown_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navigation_menu_items_dropdown_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation_menu_items_dropdown_sections" ADD CONSTRAINT "pages_blocks_navigation_menu_items_dropdown_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navigation_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation_menu_items_simple_dropdown_items" ADD CONSTRAINT "pages_blocks_navigation_menu_items_simple_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navigation_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation_menu_items" ADD CONSTRAINT "pages_blocks_navigation_menu_items_featured_content_image_id_media_id_fk" FOREIGN KEY ("featured_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation_menu_items" ADD CONSTRAINT "pages_blocks_navigation_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation_cta_buttons" ADD CONSTRAINT "pages_blocks_navigation_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation" ADD CONSTRAINT "pages_blocks_navigation_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_navigation" ADD CONSTRAINT "pages_blocks_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_relume" ADD CONSTRAINT "_pages_v_blocks_cta_relume_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_relume" ADD CONSTRAINT "_pages_v_blocks_cta_relume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_block_social_links" ADD CONSTRAINT "_pages_v_blocks_footer_block_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_block_footer_links_links" ADD CONSTRAINT "_pages_v_blocks_footer_block_footer_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_block_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_block_footer_links" ADD CONSTRAINT "_pages_v_blocks_footer_block_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_block_partner_logos" ADD CONSTRAINT "_pages_v_blocks_footer_block_partner_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_block_partner_logos" ADD CONSTRAINT "_pages_v_blocks_footer_block_partner_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_block_legal_links" ADD CONSTRAINT "_pages_v_blocks_footer_block_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_block" ADD CONSTRAINT "_pages_v_blocks_footer_block_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_block" ADD CONSTRAINT "_pages_v_blocks_footer_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation_menu_items_dropdown_sections_items" ADD CONSTRAINT "_pages_v_blocks_navigation_menu_items_dropdown_sections_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation_menu_items_dropdown_sections_items" ADD CONSTRAINT "_pages_v_blocks_navigation_menu_items_dropdown_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navigation_menu_items_dropdown_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation_menu_items_dropdown_sections" ADD CONSTRAINT "_pages_v_blocks_navigation_menu_items_dropdown_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navigation_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation_menu_items_simple_dropdown_items" ADD CONSTRAINT "_pages_v_blocks_navigation_menu_items_simple_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navigation_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation_menu_items" ADD CONSTRAINT "_pages_v_blocks_navigation_menu_items_featured_content_image_id_media_id_fk" FOREIGN KEY ("featured_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation_menu_items" ADD CONSTRAINT "_pages_v_blocks_navigation_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_navigation_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation" ADD CONSTRAINT "_pages_v_blocks_navigation_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navigation" ADD CONSTRAINT "_pages_v_blocks_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cta_relume_order_idx" ON "pages_blocks_cta_relume" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_relume_parent_id_idx" ON "pages_blocks_cta_relume" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_relume_path_idx" ON "pages_blocks_cta_relume" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_relume_image_idx" ON "pages_blocks_cta_relume" USING btree ("image_id");
  CREATE INDEX "pages_blocks_footer_block_social_links_order_idx" ON "pages_blocks_footer_block_social_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_block_social_links_parent_id_idx" ON "pages_blocks_footer_block_social_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_block_footer_links_links_order_idx" ON "pages_blocks_footer_block_footer_links_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_block_footer_links_links_parent_id_idx" ON "pages_blocks_footer_block_footer_links_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_block_footer_links_order_idx" ON "pages_blocks_footer_block_footer_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_block_footer_links_parent_id_idx" ON "pages_blocks_footer_block_footer_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_block_partner_logos_order_idx" ON "pages_blocks_footer_block_partner_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_block_partner_logos_parent_id_idx" ON "pages_blocks_footer_block_partner_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_block_partner_logos_logo_idx" ON "pages_blocks_footer_block_partner_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_footer_block_legal_links_order_idx" ON "pages_blocks_footer_block_legal_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_block_legal_links_parent_id_idx" ON "pages_blocks_footer_block_legal_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_block_order_idx" ON "pages_blocks_footer_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_block_parent_id_idx" ON "pages_blocks_footer_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_block_path_idx" ON "pages_blocks_footer_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_footer_block_logo_idx" ON "pages_blocks_footer_block" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_navigation_menu_items_dropdown_sections_items_order_idx" ON "pages_blocks_navigation_menu_items_dropdown_sections_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_navigation_menu_items_dropdown_sections_items_parent_id_idx" ON "pages_blocks_navigation_menu_items_dropdown_sections_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_navigation_menu_items_dropdown_sections_ite_idx" ON "pages_blocks_navigation_menu_items_dropdown_sections_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_navigation_menu_items_dropdown_sections_order_idx" ON "pages_blocks_navigation_menu_items_dropdown_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_navigation_menu_items_dropdown_sections_parent_id_idx" ON "pages_blocks_navigation_menu_items_dropdown_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_navigation_menu_items_simple_dropdown_items_order_idx" ON "pages_blocks_navigation_menu_items_simple_dropdown_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_navigation_menu_items_simple_dropdown_items_parent_id_idx" ON "pages_blocks_navigation_menu_items_simple_dropdown_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_navigation_menu_items_order_idx" ON "pages_blocks_navigation_menu_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_navigation_menu_items_parent_id_idx" ON "pages_blocks_navigation_menu_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_navigation_menu_items_featured_content_feat_idx" ON "pages_blocks_navigation_menu_items" USING btree ("featured_content_image_id");
  CREATE INDEX "pages_blocks_navigation_cta_buttons_order_idx" ON "pages_blocks_navigation_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_navigation_cta_buttons_parent_id_idx" ON "pages_blocks_navigation_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_navigation_order_idx" ON "pages_blocks_navigation" USING btree ("_order");
  CREATE INDEX "pages_blocks_navigation_parent_id_idx" ON "pages_blocks_navigation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_navigation_path_idx" ON "pages_blocks_navigation" USING btree ("_path");
  CREATE INDEX "pages_blocks_navigation_logo_idx" ON "pages_blocks_navigation" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_cta_relume_order_idx" ON "_pages_v_blocks_cta_relume" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_relume_parent_id_idx" ON "_pages_v_blocks_cta_relume" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_relume_path_idx" ON "_pages_v_blocks_cta_relume" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_relume_image_idx" ON "_pages_v_blocks_cta_relume" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_footer_block_social_links_order_idx" ON "_pages_v_blocks_footer_block_social_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_block_social_links_parent_id_idx" ON "_pages_v_blocks_footer_block_social_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_block_footer_links_links_order_idx" ON "_pages_v_blocks_footer_block_footer_links_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_block_footer_links_links_parent_id_idx" ON "_pages_v_blocks_footer_block_footer_links_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_block_footer_links_order_idx" ON "_pages_v_blocks_footer_block_footer_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_block_footer_links_parent_id_idx" ON "_pages_v_blocks_footer_block_footer_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_block_partner_logos_order_idx" ON "_pages_v_blocks_footer_block_partner_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_block_partner_logos_parent_id_idx" ON "_pages_v_blocks_footer_block_partner_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_block_partner_logos_logo_idx" ON "_pages_v_blocks_footer_block_partner_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_footer_block_legal_links_order_idx" ON "_pages_v_blocks_footer_block_legal_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_block_legal_links_parent_id_idx" ON "_pages_v_blocks_footer_block_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_block_order_idx" ON "_pages_v_blocks_footer_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_block_parent_id_idx" ON "_pages_v_blocks_footer_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_block_path_idx" ON "_pages_v_blocks_footer_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_footer_block_logo_idx" ON "_pages_v_blocks_footer_block" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_dropdown_sections_items_order_idx" ON "_pages_v_blocks_navigation_menu_items_dropdown_sections_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_dropdown_sections_items_parent_id_idx" ON "_pages_v_blocks_navigation_menu_items_dropdown_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_dropdown_sections__idx" ON "_pages_v_blocks_navigation_menu_items_dropdown_sections_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_dropdown_sections_order_idx" ON "_pages_v_blocks_navigation_menu_items_dropdown_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_dropdown_sections_parent_id_idx" ON "_pages_v_blocks_navigation_menu_items_dropdown_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_simple_dropdown_items_order_idx" ON "_pages_v_blocks_navigation_menu_items_simple_dropdown_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_simple_dropdown_items_parent_id_idx" ON "_pages_v_blocks_navigation_menu_items_simple_dropdown_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_order_idx" ON "_pages_v_blocks_navigation_menu_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_parent_id_idx" ON "_pages_v_blocks_navigation_menu_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_navigation_menu_items_featured_content_f_idx" ON "_pages_v_blocks_navigation_menu_items" USING btree ("featured_content_image_id");
  CREATE INDEX "_pages_v_blocks_navigation_cta_buttons_order_idx" ON "_pages_v_blocks_navigation_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_navigation_cta_buttons_parent_id_idx" ON "_pages_v_blocks_navigation_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_navigation_order_idx" ON "_pages_v_blocks_navigation" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_navigation_parent_id_idx" ON "_pages_v_blocks_navigation" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_navigation_path_idx" ON "_pages_v_blocks_navigation" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_navigation_logo_idx" ON "_pages_v_blocks_navigation" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cta_relume" CASCADE;
  DROP TABLE "pages_blocks_footer_block_social_links" CASCADE;
  DROP TABLE "pages_blocks_footer_block_footer_links_links" CASCADE;
  DROP TABLE "pages_blocks_footer_block_footer_links" CASCADE;
  DROP TABLE "pages_blocks_footer_block_partner_logos" CASCADE;
  DROP TABLE "pages_blocks_footer_block_legal_links" CASCADE;
  DROP TABLE "pages_blocks_footer_block" CASCADE;
  DROP TABLE "pages_blocks_navigation_menu_items_dropdown_sections_items" CASCADE;
  DROP TABLE "pages_blocks_navigation_menu_items_dropdown_sections" CASCADE;
  DROP TABLE "pages_blocks_navigation_menu_items_simple_dropdown_items" CASCADE;
  DROP TABLE "pages_blocks_navigation_menu_items" CASCADE;
  DROP TABLE "pages_blocks_navigation_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_navigation" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_relume" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_block_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_block_footer_links_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_block_footer_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_block_partner_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_block_legal_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_block" CASCADE;
  DROP TABLE "_pages_v_blocks_navigation_menu_items_dropdown_sections_items" CASCADE;
  DROP TABLE "_pages_v_blocks_navigation_menu_items_dropdown_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_navigation_menu_items_simple_dropdown_items" CASCADE;
  DROP TABLE "_pages_v_blocks_navigation_menu_items" CASCADE;
  DROP TABLE "_pages_v_blocks_navigation_cta_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_navigation" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cta_relume_layout";
  DROP TYPE "public"."enum_pages_blocks_cta_relume_background_color";
  DROP TYPE "public"."enum_pages_blocks_footer_block_social_links_platform";
  DROP TYPE "public"."enum_pages_blocks_navigation_menu_items_type";
  DROP TYPE "public"."enum_pages_blocks_navigation_cta_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_relume_layout";
  DROP TYPE "public"."enum__pages_v_blocks_cta_relume_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_footer_block_social_links_platform";
  DROP TYPE "public"."enum__pages_v_blocks_navigation_menu_items_type";
  DROP TYPE "public"."enum__pages_v_blocks_navigation_cta_buttons_style";`)
}
