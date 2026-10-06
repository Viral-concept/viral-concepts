import { aiAgents, aiAutomation, generativeAi } from "./ai";
import { applicationDevelopment } from "./application-development";
import { customSoftware, ecommerceDevelopment } from "./build";
import { contentSearchStrategy, performanceMarketing } from "./marketing";
import { seo } from "./seo";
import { socialMediaManagement } from "./social-media-management";
import { webDevelopment } from "./web-development";

/**
 * Digital Solutions, in display order, grouped by capability: digital marketing, web & app
 * development, then AI & automation. Web, apps, SEO and social are listed in the Company
 * Profile (CP p.23); the rest of the offering was approved by the website owner.
 */
export const digitalServices = [
  // Digital marketing
  seo,
  socialMediaManagement,
  performanceMarketing,
  contentSearchStrategy,
  // Web & app development
  webDevelopment,
  applicationDevelopment,
  ecommerceDevelopment,
  customSoftware,
  // AI & automation
  aiAutomation,
  aiAgents,
  generativeAi,
] as const;
