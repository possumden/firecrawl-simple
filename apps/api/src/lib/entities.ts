export interface Progress {
  current: number;
  total: number;
  status: string;
  metadata?: {
    sourceURL?: string;
    [key: string]: any;
  };
  currentDocumentUrl?: string;
  currentDocument?: Document;
}

export type PageOptions = {
  includeMarkdown?: boolean;
  includeExtract?: boolean;
  includeRawHtml?: boolean;
  fallback?: boolean;
  fetchPageContent?: boolean;
  waitFor?: number;
  screenshot?: boolean;
  fullPageScreenshot?: boolean;
  headers?: Record<string, string>;
  replaceAllPathsWithAbsolutePaths?: boolean;
  parsePDF?: boolean;
  removeTags?: string | string[];
  onlyIncludeTags?: string | string[];
  includeLinks?: boolean;
  useFastMode?: boolean; // beta
  disableJsDom?: boolean; // beta
  atsv?: boolean; // beta
};

export type SearchOptions = {
  limit?: number;
  tbs?: string;
  filter?: string;
  lang?: string;
  country?: string;
  location?: string;
};

export type CrawlerOptions = {
  returnOnlyUrls?: boolean;
  includes?: string | string[];
  excludes?: string | string[];
  maxCrawledLinks?: number;
  maxDepth?: number;
  limit?: number;
  replaceAllPathsWithAbsolutePaths?: boolean;
  ignoreSitemap?: boolean;
  mode?: "default" | "fast"; // have a mode of some sort
  allowExternalLinks?: boolean;
};

export type WebScraperOptions = {
  jobId: string;
  urls: string[];
  mode: "single_urls" | "sitemap" | "crawl";
  crawlerOptions?: CrawlerOptions;
  pageOptions?: PageOptions;
  webhookUrl?: string;
  webhookMetadata?: any;
  concurrentRequests?: number;
  bullJobId?: string;
  crawlId: string;
  priority?: number;
  teamId?: string;
};

export interface DocumentUrl {
  url: string;
}

export class Document {
  id?: string;
  url?: string; // Used only in /search for now
  content: string;
  markdown?: string;
  html?: string;
  rawHtml?: string;
  llm_extraction?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  type?: string;
  metadata: {
    sourceURL?: string;
    [key: string]: any;
  };
  childrenLinks?: string[];
  provider?: string;
  warning?: string;

  index?: number;
  linksOnPage?: string[]; // Add this new field as a separate property

  constructor(data: Partial<Document>) {
    if (!data.content) {
      throw new Error("Missing required fields");
    }
    this.content = data.content;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.type = data.type || "unknown";
    this.metadata = data.metadata || { sourceURL: "" };
    this.markdown = data.markdown || "";
    this.childrenLinks = data.childrenLinks || undefined;
    this.provider = data.provider || undefined;
    this.linksOnPage = data.linksOnPage; // Assign linksOnPage if provided
  }
}

export class SearchResult {
  url: string;
  title: string;
  description: string;

  constructor(url: string, title: string, description: string) {
    this.url = url;
    this.title = title;
    this.description = description;
  }

  toString(): string {
    return `SearchResult(url=${this.url}, title=${this.title}, description=${this.description})`;
  }
}
