"use server";

import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";

export type CreateArticleType = {
  title: string;
  content: string;
  authorId: string;
  imageUrl?: string;
};
export type UpdateArticleType = {
  title?: string;
  content?: string;
  imageUrl?: string;
};

export async function createArticle(data: CreateArticleType) {
  const user = stackServerApp.getUser();
  if (!user) {
    throw new Error("❌ Unauthorized");
  }
  console.log("✨ Article Created Succesfully", data);
  return { success: true, message: "Article create logged (stub)" };
}

export async function updateArticle(id: string, data: UpdateArticleType) {
  const user = stackServerApp.getUser();
  if (!user) {
    throw new Error("❌ Unauthorized");
  }
  console.log("📝  Article Updated Succesfully", { id, ...data });
  return { success: true, message: `Article ${id} update logged (stub)` };
}
export async function deleteArticle(id: string) {
  const user = stackServerApp.getUser();
  if (!user) {
    throw new Error("❌ Unauthorized");
  }
  console.log("🗑️ deleteArticle called:", id);
  return { success: true, message: `Article ${id} delete logged (stub)` };
}

// Form-friendly server action: accepts FormData from a client form and calls deleteArticle
export async function deleteArticleForm(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (!id) {
    throw new Error("Missing article id");
  }

  await deleteArticle(String(id));
  // After deleting, redirect the user back to the homepage.
  redirect("/");
}
