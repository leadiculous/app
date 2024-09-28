"use client";

import MarkdownRenderer, {
  type Options as MarkdownRendererProps,
} from "react-markdown";
import remarkGFM from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "github-markdown-css/github-markdown.css";
import "@/styles/syntax-highlighting.css";

export type MarkdownProps = MarkdownRendererProps;

export function Markdown(props: MarkdownProps) {
  return (
    <MarkdownRenderer
      {...props}
      className="markdown-body rounded-lg border p-4"
      remarkPlugins={[remarkGFM]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        a: ({ node: _, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="!text-primary dark:!text-purple-400"
          />
        ),
        ul: ({ node: _, ...props }) => <ul {...props} className="list-disc" />,
        ol: ({ node: _, ...props }) => (
          <ul {...props} className="list-decimal" />
        ),
        code: ({ node: _, children, className, ...props }) => {
          return (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
