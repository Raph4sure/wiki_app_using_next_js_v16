import resend from "@/email";
import db from "@/db";
import { usersSync, articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import CelebrationTemplate from "./templates/celebration-templates";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default async function sendCelebrationEmail(articleId: number, pageViews: number) {
  const response = await db
    .select({
      email: usersSync.email,
      id: usersSync.id,
      title: articles.title,
      name: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .where(eq(articles.id, articleId));

  const { email, id, title, name } = response[0];

  if (!email) {
    console.log(
      `❌ skipping sending a celebration for getting ${pageViews} on article ${articleId}, could not find email`
    );
    return;
  }
  console.log(email);

  const emailRes = await resend.emails.send({
    from: "Wikimasters <onboarding@resend.dev>",
    to: "raph4sure007@gmail.com",
    subject: `✨ You article got ${pageViews} views! ✨`,
    // html: "<h1>Congrats!</h1><p>You're an amazing author!</p>",
    react: (
      <CelebrationTemplate
        articleTitle={title}
        articleUrl={`${BASE_URL}/wiki/${articleId}`}
        name={name ?? "Friend"}
        pageviews={pageViews}
      />
    ),
  });

  if (!emailRes.error) {
    console.log(`📧 sent ${id} a celebration for getting ${pageViews} on article ${articleId}`);
  } else {
    console.log(
      `❌ error sending ${id} a celebration for getting ${pageViews} page view on article ${articleId}`,
      emailRes.error
    );
  }
}
