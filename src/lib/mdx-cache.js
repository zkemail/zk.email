import fs from "fs";
import path from "path";
import crypto from "crypto";
import { compileMDX } from "next-mdx-remote/rsc";

const CACHE_DIR = path.join(process.cwd(), ".mdx-cache");
const isProduction = process.env.NODE_ENV === "production";

// Bounded in-memory cache (keyed by file path, so bounded by number of MDX files)
// This cache persists for the lifetime of the Node.js process
const memoryCache = new Map();

// Ensure cache directory exists
function ensureCacheDir() {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
  } catch (error) {
    // Ignore errors during build - cache directory creation is best effort
    if (!isProduction) {
      console.warn(`[MDX Cache] Failed to create cache directory: ${error.message}`);
    }
  }
}

// Get file stats (mtime)
function getFileStats(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}

// Generate cache key from file path
function getCacheKey(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  // Use a hash of the relative path as the base cache key
  return crypto.createHash("sha256").update(relativePath).digest("hex");
}

// Get cache metadata file path
function getCacheMetaPath(cacheKey) {
  return path.join(CACHE_DIR, `${cacheKey}.meta.json`);
}

// Read cache metadata from disk
function readCacheMetadata(cacheKey) {
  try {
    const metaPath = getCacheMetaPath(cacheKey);
    if (fs.existsSync(metaPath)) {
      const metaData = fs.readFileSync(metaPath, "utf8");
      return JSON.parse(metaData);
    }
  } catch {
    // Ignore errors reading metadata
  }
  return null;
}

// Write cache metadata to disk
function writeCacheMetadata(cacheKey, filePath, mtime) {
  try {
    ensureCacheDir();
    const metaPath = getCacheMetaPath(cacheKey);
    const metaData = {
      filePath,
      mtime,
      cachedAt: Date.now(),
    };
    fs.writeFileSync(metaPath, JSON.stringify(metaData), "utf8");
  } catch {
    // Ignore errors writing metadata
  }
}

// Check if cached result is still valid
function isCacheValid(cacheKey, filePath) {
  const stats = getFileStats(filePath);
  if (!stats) {
    return false;
  }

  const cachedMeta = readCacheMetadata(cacheKey);
  if (!cachedMeta) {
    return false;
  }

  // Check if file mtime matches cached mtime
  return cachedMeta.mtime === stats.mtimeMs;
}

// Cached compile MDX function
export async function cachedCompileMDX(filePath, source, compileOptions) {
  const cacheKey = getCacheKey(filePath);
  const stats = getFileStats(filePath);

  if (!stats) {
    // File doesn't exist, compile directly
    if (!isProduction) {
      console.log(`[MDX Cache] File not found, compiling: ${filePath}`);
    }
    return await compileMDX({
      source,
      options: compileOptions,
    });
  }

  // Check in-memory cache first
  const memoryKey = `${cacheKey}:${stats.mtimeMs}`;
  if (memoryCache.has(memoryKey)) {
    if (!isProduction) {
      console.log(`[MDX Cache] Loaded from memory cache: ${path.basename(filePath)}`);
    }
    return memoryCache.get(memoryKey);
  }

  // Check if disk cache indicates file hasn't changed
  const cacheValid = isCacheValid(cacheKey, filePath);
  
  if (!cacheValid) {
    // File has changed or cache doesn't exist
    if (!isProduction) {
      const cachedMeta = readCacheMetadata(cacheKey);
      if (cachedMeta) {
        console.log(`[MDX Cache] File changed, compiling: ${path.basename(filePath)}`);
      } else {
        console.log(`[MDX Cache] Cache miss, compiling: ${path.basename(filePath)}`);
      }
    }
  } else {
    // File hasn't changed according to disk cache, but we still need to compile
    // to get a valid RSC (can't serialize RSC to disk)
    // The memory cache above should have caught this, but if not (e.g., after restart),
    // we need to recompile. This is still better than compiling on every request.
    if (!isProduction) {
      console.log(`[MDX Cache] File unchanged (mtime match), compiling: ${path.basename(filePath)}`);
    }
  }

  // Compile MDX
  const result = await compileMDX({
    source,
    options: compileOptions,
  });

  // Store in memory cache (bounded by number of files)
  // This ensures subsequent requests in the same process don't recompile
  memoryCache.set(memoryKey, result);
  
  // Update disk cache metadata (only if file changed or cache didn't exist)
  if (!cacheValid) {
    writeCacheMetadata(cacheKey, filePath, stats.mtimeMs);
  }

  return result;
}

