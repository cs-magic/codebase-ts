import { useUserInDb } from "@/hooks/use-user-in-db";
import { trpcApi } from "@/trpc-api";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import numeral from "numeral";
import { HTMLProps, useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@cs-magic/shadcn/ui/alert-dialog";
import { Avatar, AvatarImage } from "@cs-magic/shadcn/ui/avatar";
import { Badge } from "@cs-magic/shadcn/ui/badge";
import { Button } from "@cs-magic/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@cs-magic/shadcn/ui/dialog";
import { Separator } from "@cs-magic/shadcn/ui/separator";

import { MasonryContainer } from "@cs-magic/react/components/containers";
import { Loading } from "@cs-magic/react/components/loading";
import { InfoItem, StatusItem } from "@/components/status";
import {
  FLOWGPT_HOMEPAGE,
  POKETTO_APP_ID,
  POKETTO_DETAIL_FEATURES_ENABLED,
  POKETTO_DETAIL_RATINGS_ENABLED,
  URI,
} from "@/config";
import { useMustache } from "@/hooks/use-mustache";
import { useUrl } from "@/hooks/use-url";
import clsx from "@/lib/clsx";
import { vIsNumber } from "@/lib/number";
import {
  getConversationLink,
  getConversationsLink,
  getImageUri,
  getUserLink,
} from "@/lib/string";

export function AppDetailView({
  appId,
  setOpen,
  className,
  ...props
}: {
  appId: string;
  setOpen?: (v: boolean) => void;
} & HTMLProps<HTMLDivElement>) {
  const { userId } = useUserInDb();
  const { data: app, error: appError } = trpcApi.app.get.useQuery({
    id: appId,
  });
  const { t } = useTranslation();
  const { origin } = useUrl();

  if (app === undefined) return <Loading />;

  // toast.error(appError.message) // 已经在 lib/api 里handle了
  if (appError) return null;

  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col gap-2 overflow-auto p-2",
        className,
      )}
      {...props}
    >
      <section id="basic" className="| flex w-full items-center gap-2">
        <Avatar className="shrink-0 p-4  wh-28">
          <AvatarImage
            src={getImageUri(app.avatar, "md")}
            className="rounded-2xl"
          />
        </Avatar>

        <div className="| flex grow flex-col gap-2 overflow-hidden">
          <div className="| flex w-full flex-col ">
            <h2 className="line-clamp-2">{app.name}</h2>
            <p className="truncate text-primary-foreground/75">
              by {app.creator.name}
            </p>
          </div>
        </div>

        {!userId ? (
          <Link href={URI.user.auth.signIn}>
            <Badge className="whitespace-nowrap">获取</Badge>
          </Link>
        ) : (
          <InstallButton userId={userId} appId={appId} setOpen={setOpen} />
        )}
      </section>

      <Separator orientation="horizontal" />

      <section
        id="status"
        className={clsx(
          "w-full",
          "flex items-center justify-between gap-1 overflow-auto",
        )}
      >
        <StatusItem
          a={t("common:general.category")}
          b={`${app.category.main}-${app.category.sub}`}
        />
        <StatusItem a={t("common:general.model")} b={app.modelName} />
        {POKETTO_DETAIL_RATINGS_ENABLED && (
          <StatusItem a="ratings" b={numeral(app.state?.stars).format("0.0")} />
        )}
        <StatusItem a={t("common:general.language")} b={app.language} />
        <StatusItem a={t("common:general.platform")} b={app.platformType} />
      </section>

      {/* <section id={'user-cases'} className={'w-full shrink-0 overflow-auto | flex gap-4'}> */}
      {/*	*/}
      {/*	<DeviceContainer ratio={.6} device={isMobile ? 'iphone-14-pro' : 'surface-pro-2017'}> */}
      {/*		<div className={'w-full flex flex-col'}> */}
      {/*			<h2>heading 1</h2> */}
      {/*			<div>hhh</div> */}
      {/*			<h2>heading 2</h2> */}
      {/*			<div>hhh2</div> */}
      {/*		</div> */}
      {/*	</DeviceContainer> */}
      {/* </section> */}

      {/* tags */}
      <section id="tags" className="flex w-full flex-wrap gap-2">
        {app.tags.map((tag) => (
          <Badge variant="secondary" key={tag.id}>
            {tag.name}
          </Badge>
        ))}
      </section>

      <section id="desc" className="relative flex w-full flex-col">
        <CollapsablePara content={app.desc} />
      </section>

      <section id="ratings-reviews" className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          {/* todo: Ratings & */}
          <h2>{t("common:general.reviews")}</h2>
          {app.comments.length > 2 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">See All</Button>
              </DialogTrigger>
              <DialogContent className="h-[80vh]  max-w-[80vw] overflow-auto">
                <h2>All the comments</h2>
                <MasonryContainer>
                  {/* {comments.map((item) => (<PokettoComment comment={item} key={item.id}/>))} */}
                </MasonryContainer>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {app.comments.length === 0 && t("common:CurrentlyNoComments")}

        {/* todo: rate level */}
        {/* <div className={'grid grid-col-1 md:grid-cols-2 gap-4'}> */}
        {/*	<div className={'flex items-end justify-between'}> */}
        {/*		<p className={'flex items-end gap-2'}> */}
        {/*			<span className={'text-4xl font-bold'}>{numeral(poketto.state.ratedStars).format('0.0')}</span> */}
        {/*			<span className={'text-sm font-'}>out of 5</span> */}
        {/*		</p> */}
        {/*		<span>{numeral(poketto.state.ratedStars).format('0a')} Ratings</span> */}
        {/*	</div> */}
        {/*	<Image src={RatingChart} alt={'rating-chart'} width={320} height={40}/> */}
        {/* </div> */}
        <div className="grid gap-2">
          {/* {comments.slice(0, 2).map((item) => (<PokettoComment comment={item} key={item.id}/>))} */}
        </div>
      </section>

      <section id="information" className="flex w-full flex-col gap-4">
        <h2>{t("common:general.information")}</h2>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem
            a={t("common:general.platform")}
            b={
              <Link
                className="underline"
                href={
                  app.platformType === "Poketto" ? origin : FLOWGPT_HOMEPAGE
                }
                target="_blank"
              >
                {app.platformType}
              </Link>
            }
          />
          <InfoItem
            a={t("common:general.owner")}
            b={
              <Link
                className="underline"
                href={getUserLink(app.creator.id)}
                target="_blank"
              >
                {app.creator.id}
              </Link>
            }
          />
          <InfoItem a={t("common:general.model")} b={app.modelName} />
          <InfoItem
            a={t("common:general.openSource")}
            b={app.isOpenSource.toString()}
          />
          <InfoItem
            a={t("common:general.category")}
            b={`${app.category.main}-${app.category.sub}`}
          />
          <InfoItem a={t("common:general.language")} b={app.language} />
        </div>

        <Separator orientation="horizontal" />
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(app.state ?? {})
            .filter(vIsNumber)
            .sort((a, b) => (a[0] < b[0] ? -1 : 1))
            .map(([key, val]) => (
              <InfoItem key={key} a={t(`common:states.${key}.title`)} b={val} />
            ))}
        </div>
      </section>

      {POKETTO_DETAIL_FEATURES_ENABLED && (
        <>
          <Separator orientation="horizontal" />
          <section id="collections" className="flex w-full flex-col gap-4">
            <h2>Featured In</h2>
            <div>TODO</div>
          </section>
        </>
      )}

      {userId && appId && (
        <UninstallButton userId={userId} appId={appId} setOpen={setOpen} />
      )}
    </div>
  );
}

export function CollapsablePara({ content }: { content: string }) {
  const [shownMore, setShownMore] = useState(false);
  const [needMore, setNeedMore] = useState(false);
  const m = useMustache();

  const ref = useCallback((node: HTMLParagraphElement) => {
    if (!node) {
      return;
    }
    setNeedMore(node.scrollHeight > node.offsetHeight);
  }, []);

  return (
    <div className="flex w-full flex-col">
      <article
        className={clsx("p-prose", !shownMore && "line-clamp-4")}
        ref={ref}
      >
        <ReactMarkdown>{m(content)}</ReactMarkdown>
      </article>

      {needMore && ( // todo: better show-more effect with harmonious gradient
        <Button
          variant="link"
          className="ml-auto"
          onClick={() => setShownMore(!shownMore)}
        >
          {shownMore ? "Less" : "More"}
        </Button>
      )}
    </div>
  );
}

/**
 * 新加app后应该立即进入
 */
export function InstallButton({
  userId,
  appId,
  setOpen,
}: {
  userId: string;
  appId: string;
  setOpen?: (v: boolean) => void;
}) {
  const router = useRouter();
  const utils = trpcApi.useContext();
  const { data: hasApp } = trpcApi.conv.has.useQuery({
    conversation: { userId, appId },
  });
  const go = () => {
    void router.push(getConversationLink(userId, appId)); // app.id 进数据库后会生成新的
    setOpen && setOpen(false);
  };

  const { mutateAsync: addApp } = trpcApi.conv.add.useMutation({
    onSuccess: (data) => {
      toast.success(`Successfully added one app`);
      void utils.conv.list.invalidate();
      void utils.conv.get.invalidate();
      void utils.conv.has.invalidate();
      setOpen && setOpen(false);
      void go();
    },
  });

  return (
    <Button
      className={clsx(
        " h-6 rounded-3xl px-4 transition-all cursor-pointer text-white",
      )}
      onClick={hasApp ? go : () => addApp({ appId })}
    >
      {hasApp ? "Open" : "Get"}
    </Button>
  );
}

/**
 * 删除app后应该留在原地, todo: maybe can go into the list page, if so
 */
export function UninstallButton({
  userId,
  appId,
  setOpen,
}: {
  userId: string;
  appId: string;
  setOpen?: (v: boolean) => void;
}) {
  const router = useRouter();
  const { data: conv } = trpcApi.conv.get.useQuery({
    conversation: { userId, appId },
  });

  const utils = trpcApi.useContext();

  const { mutate: delConv, data: delResult } = trpcApi.conv.del.useMutation({
    onSuccess: (input) => {
      toast.success(`You have deleted one app.`);
      void utils.conv.list.invalidate();
      void utils.conv.has.invalidate();
      setOpen && setOpen(false);
      void router.push(getConversationsLink(userId));
    },
  });

  if (!conv) return null;

  return (
    <section id="collections" className="my-4 flex w-full flex-col gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={
              conv.app.platformId === POKETTO_APP_ID &&
              conv.app.platformType === "Poketto"
            }
          >
            Clear
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            确定要清除该App下的所有信息吗（包括会话记录）？
          </AlertDialogHeader>
          <AlertDialogDescription>
            ⚠️该动作将不可撤销，您也将无法恢复所有过往记录
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => delConv({ id: conv.id })}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
