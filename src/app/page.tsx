import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../utils/mdx';
import { formatDate } from '../utils/date';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-8 mb-12 p-6 card rounded-lg bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
        <div className="flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="Bahadır Tarcan"
            width={120}
            height={120}
            className="rounded-full border-2 border-zinc-700"
            priority
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">Bahadır Tarcan</h1>
          <p className="text-xl text-zinc-400 mb-4">iOS Developer</p>
          <div className="flex gap-6 text-zinc-400">
            <a
              href="https://github.com/32tarcan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/bahadirtarcan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/32Tarcann"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaTwitter size={24} />
              <span className="text-sm font-medium">Twitter</span>
            </a>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8 text-white">Blog Yazıları</h2>
      <div className="space-y-6">
        {posts.map(post => (
          <article key={post.id} className="card border border-zinc-800 rounded-lg p-6 hover:bg-zinc-900/50 transition-all bg-zinc-900/30 backdrop-blur-sm relative">
            <div className="text-zinc-400 text-sm absolute top-4 right-6 font-medium">
              {formatDate(post.date)}
            </div>
            <Link href={`/post/${post.id}`}>
              <h2 className="text-2xl font-bold mb-2 hover:text-white text-zinc-100 pr-32">{post.title}</h2>
            </Link>
            <div className="text-zinc-400 mb-4">
              <span className="text-sm font-medium">{post.author}</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">{post.excerpt}</p>
            <Link href={`/post/${post.id}`} className="text-blue-400 hover:text-blue-300 mt-4 inline-flex items-center gap-1 font-medium">
              Devamını Oku 
              <span className="text-lg">→</span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
