'use client';
import { BiCut } from 'react-icons/bi';
import { useState } from 'react';

const BASE_URL = 'https://short-url-api-two.vercel.app';

export const Form = () => {
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
      })
      .catch(() => {
        setCopied(false);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const req = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: formData.get('url') }),
    })
      .then((res) => res.json())
      .catch(() => {
        setStatus(false);
        setMsg('Error: Try again');
      });
    if (req?.status === 201) {
      setStatus(true);
      setMsg(req.data);
      copyToClipboard(`${BASE_URL}/${req.data}`);
      e.target.reset();
    } else {
      setStatus(false);
      if (req?.message) setMsg(req.message);
    }
  };
  return (
    <>
      <form
        className='flex items-center justify-center gap-2 p-3'
        onSubmit={handleSubmit}
      >
        <input
          type='url'
          name='url'
          id='url'
          placeholder='Enter URL here...'
          className='p-3 bg-transparent text-white rounded-md border'
          required
        />
        <button className='text-white p-4 border border-slate-950 bg-slate-950 hover:bg-slate-900 rounded-md'>
          <BiCut />
        </button>
      </form>
      {msg && msg !== '' && (
        <div className='p-3 w-full'>
          <p
            className={`${
              status ? 'bg-slate-700' : 'bg-red-300'
            } p-3 w-full rounded-lg`}
          >
            {status ? (
              <span>
                Generated URL:{' '}
                <a
                  className='underline text-blue-600'
                  href={`${BASE_URL}/${msg}`}
                  target='_blank'
                >
                  {BASE_URL}/{msg}
                </a>
              </span>
            ) : (
              <>{msg}</>
            )}
            &nbsp;&nbsp;&nbsp;
            <span
              className='font-semibold text-white'
              onClick={copied ? null : copyToClipboard(`${BASE_URL}/${msg}`)}
            >
              {status && copied ? 'Copied to clipboard' : 'Copy'}
            </span>
          </p>
        </div>
      )}
    </>
  );
};
