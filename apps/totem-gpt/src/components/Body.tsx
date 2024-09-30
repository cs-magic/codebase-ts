'use client';

import { PromptSuggestion } from '@/components/PromptSuggestion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { responseErrorAtom, responseStatusAtom } from '@/store/api';
import { GenerateFormRequest, generateFormSchema } from '@/types/generate';
import { extractSVG } from '@/utils/stream-svg';
import { cn } from '@/utils/utils';
import { Loading } from '@cs-magic/react/components/loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChat } from 'ai/react';
import { useAtom } from 'jotai/react';
import { last } from 'lodash-es';
import { AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';

const RealtimeSVGRenderer = dynamic(() => import('./RealtimeSVGRenderer'), {
  ssr: false,
});

const promptSuggestions = [
  // todo: vary based on user input
  'INFP',
  'ENTJ',
];

const Body = ({
  name,
  description,
  modelLatency,
  id,
}: {
  name?: string;
  description?: string;
  modelLatency?: number;
  id?: string;
}) => {
  const [error, setError] = useAtom(responseErrorAtom);
  const [status, setStatus] = useAtom(responseStatusAtom);
  const isGenerating = status === 'running';

  const form = useForm<GenerateFormRequest>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',

    // Set default values so that the form inputs are controlled components.
    defaultValues: {
      name: '南川',
      options: {
        description: '',
        favoriteColor: '',
      },
    },
  });

  const {
    messages,
    stop,
    setInput,
    handleSubmit,
    append,
    reload,
    setMessages,
  } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error({ error });
      setError(error.message);
    },
    onResponse: (response) => {
      console.log({ response });
    },
    onFinish: ({ content }) => {
      setStatus('finished');
      const svg = extractSVG(content);
      console.info({ content, svg });
      if (svg.status !== 'complete') {
        toast.error('您的输入不合法或者服务器错误，请稍后重试！');
      }
    },
    keepLastMessageOnError: true,
  });

  // sync input change: useForm --> useChat
  const input = form.watch('name');
  useEffect(() => {
    // console.log({ input });
    setInput(input);
    // reload 的时候直接提交 n-1 条信息
    // 因此重试的时候需要修改 2-1 也就是第一次输入
    if (status === 'finished') {
      setMessages((messages) => {
        messages[0].content = input;
        return messages;
      });
    }
  }, [input]);

  const text = last(messages)?.content ?? '';

  useEffect(() => {
    return () => {
      setStatus('idle');
    };
  }, []);

  // console.log({ messages });

  return (
    <div className="flex justify-center items-center flex-col w-full h-full overflow-hidden lg:p-0 p-4 sm:mb-28 mb-0 ">
      <div
        className={cn(
          'max-w-6xl w-full h-full overflow-auto grid grid-cols-1 justify-center gap-6 md:gap-12 mt-10',
          status !== 'idle' && 'sm:grid-cols-2',
        )}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(200px, 500px))`,
        }}
      >
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Generate a Life Totem</h1>

          <Form {...form}>
            <form
              onSubmit={(event) => {
                event.preventDefault();

                setStatus('running');
                if (status === 'finished') {
                  reload();
                } else {
                  handleSubmit(event);
                }
              }}
            >
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="XX 小公举" {...field} />
                      </FormControl>
                      <FormDescription>This is your name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="options.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="我是一名艺术家，INFP"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="">
                        The more concise description, the closer the life totem
                        is to you.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="options.favoriteColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Favorite Color</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="白色？粉色？红色？紫色？黑色？"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="">
                        The color represents your deepest belongings.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="my-2">
                  <p className="text-sm font-medium mb-3">
                    The Feature Suggestions
                  </p>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-center text-gray-500 text-sm">
                    {promptSuggestions.map((suggestion) => (
                      <PromptSuggestion
                        key={suggestion}
                        suggestion={suggestion}
                        onClick={() => {
                          // todo
                          // handleSuggestionClick(suggestion);
                        }}
                        isLoading={isGenerating}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex justify-center mx-auto border w-full bg-primary/90"
                >
                  {isGenerating ? (
                    <Loading type={'spin'} />
                  ) : status !== 'idle' ? (
                    '✨ Regenerate'
                  ) : (
                    '🚀 Generate'
                  )}
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </Form>
        </div>

        {status !== 'idle' && (
          <div
            className="col-span-1 h-full overflow-hidden flex flex-col transition-all duration-300 ease-out"
            style={{
              animation: 'slideIn 0.3s ease-out',
            }}
          >
            <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 text-center shrink-0">
              Realtime Totem Preview
            </h1>
            <div className="w-full grow overflow-hidden">
              <RealtimeSVGRenderer text={text} />
            </div>
          </div>
        )}

        <Toaster />
      </div>
    </div>
  );
};

export default Body;
