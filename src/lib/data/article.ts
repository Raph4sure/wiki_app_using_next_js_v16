import { eq } from "drizzle-orm";
import redis from "@/app/cache";
import db from "@/db/index";
import { articles, usersSync } from "@/db/schema";

export async function getArticles() {
  const cached = await redis.get<
    {
      title: string;
      id: number;
      createdAt: string;
      content: string;
      author: string | null;
    }[]
  >("articles:all");
  if (cached) {
    console.log("🎯 Get Articles Cache Hit!");
    return cached;
  }

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));

  console.log("🙅‍♂️ Get Articles Cache Miss!");
  redis.set("articles:all", response, {
    ex: 60, // one minute
  });

  return response;
}

export async function getArticleById(id: number) {
  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
      imageUrl: articles.imageUrl,
    })
    .from(articles)
    .where(eq(articles.id, id))
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));
  return response[0] ? response[0] : null;
}
