import { AiFillGithub } from 'react-icons/ai';
import { Form } from './Form';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-start w-full bg-slate-800 h-screen pt-0'>
      <div className='flex items-center justify-between w-full bg-slate-950 p-3 text-white'>
        <span>Short URL - ARHEX LABS</span>
        <a
          href='https://github.com/i-abdul-raheem/short_url_client'
          target='_blank'
          className='flex items-center justify-start gap-1'
        >
          <AiFillGithub /> GitHub
        </a>
      </div>
      <Form />
    </main>
  );
}
