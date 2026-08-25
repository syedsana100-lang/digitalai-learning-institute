'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flag, CornerDownRight } from 'lucide-react';

// NOTE: This comment system is UI-only. Comments live in React state and are
// lost on refresh — there is no backend/database wired up yet. Before launch,
// connect this to a real API (e.g. a headless CMS, Supabase, or a custom
// endpoint) for storage and moderation. Do not treat this as functional
// production commenting until that's done.

interface Comment {
  id: string;
  name: string;
  text: string;
  likes: number;
  liked: boolean;
  replies: Comment[];
}

function CommentItem({ comment, onReply, onLike, depth = 0 }: {
  comment: Comment;
  onReply: (parentId: string, name: string, text: string) => void;
  onLike: (id: string) => void;
  depth?: number;
}) {
  const [replying, setReplying] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  function submitReply() {
    if (!name.trim() || !text.trim()) return;
    onReply(comment.id, name, text);
    setName('');
    setText('');
    setReplying(false);
  }

  return (
    <div className={depth > 0 ? 'ml-6 border-l border-white/8 pl-4 sm:ml-10' : ''}>
      <div className="rounded-xl border border-white/8 bg-ink-900 p-4">
        <p className="font-display text-sm font-semibold">{comment.name}</p>
        <p className="mt-1.5 text-sm text-mist">{comment.text}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-mist">
          <button onClick={() => onLike(comment.id)} className="focus-ring flex items-center gap-1 hover:text-signal-cyan">
            <Heart className={`h-3.5 w-3.5 ${comment.liked ? 'fill-signal-cyan text-signal-cyan' : ''}`} /> {comment.likes}
          </button>
          <button onClick={() => setReplying((r) => !r)} className="focus-ring flex items-center gap-1 hover:text-signal-cyan">
            <CornerDownRight className="h-3.5 w-3.5" /> Reply
          </button>
          <button className="focus-ring flex items-center gap-1 hover:text-red-400">
            <Flag className="h-3.5 w-3.5" /> Report
          </button>
        </div>

        {replying && (
          <div className="mt-3 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="focus-ring w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-xs"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a reply..."
              className="focus-ring w-full resize-none rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-xs"
              rows={2}
            />
            <button onClick={submitReply} className="focus-ring rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-4 py-1.5 text-xs font-semibold">
              Post Reply
            </button>
          </div>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((r) => (
            <CommentItem key={r.id} comment={r} onReply={onReply} onLike={onLike} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  function addComment(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !text.trim()) return;
    setComments((c) => [{ id: crypto.randomUUID(), name, text, likes: 0, liked: false, replies: [] }, ...c]);
    setName('');
    setEmail('');
    setText('');
  }

  function addReply(parentId: string, replyName: string, replyText: string) {
    const reply: Comment = { id: crypto.randomUUID(), name: replyName, text: replyText, likes: 0, liked: false, replies: [] };
    setComments((prev) =>
      prev.map((c) => (c.id === parentId ? { ...c, replies: [...c.replies, reply] } : c))
    );
  }

  function toggleLike(id: string) {
    function update(list: Comment[]): Comment[] {
      return list.map((c) =>
        c.id === id
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : { ...c, replies: update(c.replies) }
      );
    }
    setComments((prev) => update(prev));
  }

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold">Comments ({comments.length})</h2>
      <p className="mb-6 text-xs text-mist">
        Comments are shown for this session only in this demo build — connect a backend to persist them.
      </p>

      <motion.form onSubmit={addComment} className="mb-8 space-y-3 rounded-2xl border border-white/8 bg-ink-900 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="focus-ring rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (not published)"
            type="email"
            className="focus-ring rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm"
          />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="focus-ring w-full resize-none rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm"
        />
        <button type="submit" className="focus-ring rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-2.5 text-sm font-semibold">
          Post Comment
        </button>
      </motion.form>

      {comments.length === 0 ? (
        <p className="text-sm text-mist">Be the first to comment.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} onReply={addReply} onLike={toggleLike} />
          ))}
        </div>
      )}
    </div>
  );
}
