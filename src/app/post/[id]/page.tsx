import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate } from '../../../utils/date';
import { getPostById } from '../../../utils/mdx';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const PostPage: React.FC<PageProps> = async ({ params }) => {
  const id = (await params).id;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const contentWithoutFirstTitle = post.content.replace(/^#\s+.*$/m, '').trim();

  return (
    <main className='mx-auto min-h-screen max-w-4xl p-8'>
      <Link href='/' className='mb-8 inline-flex items-center gap-1 text-blue-400 hover:text-blue-300'>
        <span className='text-lg'>←</span>
        Ana Sayfaya Dön
      </Link>

      <article className='prose prose-zinc prose-invert mx-auto mt-8'>
        <header className='mb-8 border-b border-zinc-800 pb-8'>
          <h1 className='mb-4 text-4xl font-bold text-white'>{post.title}</h1>
          <div className='flex items-center gap-4 text-zinc-400'>
            <span className='text-sm font-medium'>{post.author}</span>
            <span className='text-zinc-600'>•</span>
            <span className='text-sm font-medium'>{formatDate(post.date)}</span>
          </div>
        </header>
        <div className='markdown-content'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, ...props }) => <h2 className='mb-4 mt-12 text-2xl font-bold text-white' {...props} />,
              h3: ({ node, ...props }) => <h3 className='mb-3 mt-8 text-xl font-bold text-white' {...props} />,
              p: ({ node, ...props }) => <p className='mb-6 text-lg leading-relaxed text-zinc-300' {...props} />,
              a: ({ node, ...props }) => <a className='text-blue-400 underline underline-offset-2 hover:text-blue-300' {...props} />,
              ul: ({ node, ...props }) => <ul className='mb-6 list-inside list-disc space-y-2 text-zinc-300' {...props} />,
              ol: ({ node, ...props }) => <ol className='mb-6 list-inside list-decimal space-y-2 text-zinc-300' {...props} />,
              li: ({ node, ...props }) => <li className='text-lg' {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className='my-8 border-l-4 border-zinc-700 pl-6 text-lg italic text-zinc-400' {...props} />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code className='rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-zinc-200' {...props} />
                ) : (
                  <code className='my-6 block overflow-x-auto rounded-lg bg-zinc-800/50 p-4 font-mono text-sm text-zinc-200' {...props} />
                ),
              pre: ({ node, ...props }) => <pre className='not-prose mb-6' {...props} />,
            }}
          >
            {contentWithoutFirstTitle}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
};

export default PostPage;
