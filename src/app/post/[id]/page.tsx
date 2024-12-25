import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostById } from '../../../utils/mdx';
import { formatDate } from '../../../utils/date';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PostPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);

  if (!post) {
    notFound();
  }

  const contentWithoutFirstTitle = post.content.replace(/^#\s+.*$/m, '').trim();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-flex items-center gap-1">
        <span className="text-lg">←</span>
        Ana Sayfaya Dön
      </Link>
      
      <article className="prose prose-invert prose-zinc mx-auto mt-8">
        <header className="mb-8 pb-8 border-b border-zinc-800">
          <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="text-sm font-medium">{post.author}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-sm font-medium">{formatDate(post.date)}</span>
          </div>
        </header>
        <div className="markdown-content">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-12 mb-4 text-white" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-8 mb-3 text-white" {...props} />,
              p: ({node, ...props}) => <p className="mb-6 text-zinc-300 leading-relaxed text-lg" {...props} />,
              a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-2" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 text-zinc-300 space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 text-zinc-300 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-lg" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-zinc-700 pl-6 my-8 italic text-zinc-400 text-lg" {...props} />
              ),
              code: ({node, inline, ...props}) => 
                inline ? (
                  <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-zinc-200 font-mono" {...props} />
                ) : (
                  <code className="block bg-zinc-800/50 p-4 rounded-lg text-sm text-zinc-200 font-mono overflow-x-auto my-6" {...props} />
                ),
              pre: ({node, ...props}) => <pre className="not-prose mb-6" {...props} />,
            }}
          >
            {contentWithoutFirstTitle}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
} 