import { beforeAll, describe, expect, test } from "bun:test";
import { createClient } from "@supabase/supabase-js";

// Integration checks for the requested collection; never modify existing articles.
const existingIds = [
  "31d795a9-daf5-45e3-86d7-85b84d64161c",
  "977cb2a3-ff4d-43e1-8304-8bac9d701663",
  "60f92487-b7aa-4106-b559-12a39df48675",
  "74d1a711-d5c0-424e-9969-7035de4c7909",
];
let articles = [];

beforeAll(async () => {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Blog integration checks require the app's public connection settings.");
  const client = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await client.from("blog_posts")
    .select("id,title,content,published,created_at")
    .not("id", "in", `(${existingIds.join(",")})`)
    .lte("created_at", "2026-09-03T12:00:00Z")
    .gte("created_at", "2025-12-04T12:00:00Z")
    .order("created_at");
  if (error) throw new Error("Could not read the blog collection.");
  articles = data || [];
});

describe("requested 40-article collection", () => {
  test("contains 40 distinct published articles with different full content", () => {
    expect(articles).toHaveLength(40);
    expect(new Set(articles.map((a) => a.title)).size).toBe(40);
    expect(new Set(articles.map((a) => a.content)).size).toBe(40);
    expect(articles.every((a) => a.published && a.content.split(/\s+/).length >= 100)).toBe(true);
  });
  test("begins on 4 December 2025", () => {
    expect(new Date(articles[0].created_at).toISOString()).toBe("2025-12-04T12:00:00.000Z");
  });
  test("has a week or two between each article", () => {
    const gaps = articles.slice(1).map((a, i) =>
      (new Date(a.created_at) - new Date(articles[i].created_at)) / 86400000);
    expect(gaps).toHaveLength(39);
    expect(gaps.every((days) => days === 7 || days === 14)).toBe(true);
  });
});