import conversation from '@/data/conversation_totem.json';
import { responseStatusAtom, responseTextAtom } from '@/store/api';
import { useChat } from 'ai/react';
import { useAtom } from 'jotai/react';
import { FormEvent, useCallback } from 'react';

/**
 * todo: real chat
 */
export const useGenerateTotem = () => {
  const [status, setStatus] = useAtom(responseStatusAtom);
  const [text, setText] = useAtom(responseTextAtom);

  const { messages, stop, handleInputChange, handleSubmit, append } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error({ error });
    },
    onResponse: (response) => {
      console.log({ response });
    },
    initialMessages: [{ content: 'hello', id: '1', role: 'system' }],
  });

  const response = conversation.chat_messages.find(
    (chat) => chat.uuid === 'b11343b9-fe16-46a7-a3cb-4d798df18d30',
  )!.text;

  const submitGeneration = useCallback((event: FormEvent<HTMLFormElement>) => {
    console.log('-- startGeneration');
    handleSubmit(event);

    // doGeneration();
  }, []);

  const stopGeneration = useCallback(() => {
    setStatus('idle');
  }, []);

  const doGeneration = useCallback(() => {
    setText('');
    setStatus('running');

    let i = 0;
    const interval = setInterval(() => {
      if (i >= response.length) {
        setStatus('finished');
        clearInterval(interval);
        return;
      }
      i += 1;
      setText(response.slice(0, i));
      // console.log({ i });
    }, 10);
  }, []);

  // console.log({messages})

  return { submitGeneration, stopGeneration, status, text };
};
