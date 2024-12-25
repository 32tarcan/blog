import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../types/blog';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        id: data.id,
        title: data.title,
        date: data.date,
        author: data.author,
        excerpt: data.excerpt,
        content: content,
      };
    })
    .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());

  return allPosts;
}

export function getPostById(id: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.id === id);
} 