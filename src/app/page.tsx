import { WikiCard } from '@/components/ui/wiki-card';

export default function Home() {
  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        <WikiCard
          title="Complete Intro to MCP"
          author="Brian Holt"
          date="Sep 2025"
          summary="Dive into the Model Context Protocol and code an MCP server from scratch! Leverage external APIs and interact with custom applications. Compare remote versus local implementation strategies and security best practices to ensure safe AI agent deployment."
          href="https://frontendmasters.com/courses/mcp/"
        />
        <WikiCard
          title="Rust for TypeScript Developers"
          author="ThePrimeagen"
          date="Sep 2025"
          summary="ThePrimeagen teaches Rust to JavaScript/TypeScript devs. Dive into Rust's memory safety, ownership, and concurrency with fun, practical examples."
          href="https://frontendmasters.com/courses/rust-ts-devs/"
        />
        <WikiCard
          title="API Design & Node.js"
          author="Scott Moss"
          date="Sep 2025"
          summary="Scott Moss covers building robust APIs with Node.js. Learn REST, authentication, testing, and best practices for scalable backend services."
          href="https://frontendmasters.com/courses/api-design-nodejs/"
        />
        <WikiCard
          title="Cursor & Claude Code"
          author="Steve Kinney"
          date="Sep 2025"
          summary="Use Cursor and Claude Code for precise inline edits or to delegate larger tasks to background agents. Build project plans with guardrails, rules, and linting to keep output on track. Follow real-world workflows from a professional developer to harness AI agents for faster, higher-quality code!"
          href="https://frontendmasters.com/courses/pro-ai/"
        />
      </main>
    </div>
  );
}
