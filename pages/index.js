import CodeEditor from '../components/CodeEditor';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('const x = 123');
  return <CodeEditor value={text} onChange={setText} />;
}
