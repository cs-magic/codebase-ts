import { useUserInDb } from "@/hooks/use-user-in-db";
import { trpcApi } from "@/trpc-api";
import { getOrigin } from "@cs-magic/common/router";
import { useDebouncedValue } from "@mantine/hooks";
import {
  HandIcon,
  LapTimerIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { CommandLoading } from "cmdk";
import { Globe } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ComponentProps,
  FC,
  HTMLProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { TbLanguage } from "react-icons/tb";
import { toast } from "sonner";

import { Avatar, AvatarImage } from "@cs-magic/shadcn/ui/avatar";
import { Button } from "@cs-magic/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@cs-magic/shadcn/ui/command";
import { Dialog, DialogContent } from "@cs-magic/shadcn/ui/dialog";
import { Input } from "@cs-magic/shadcn/ui/input";
import { Separator } from "@cs-magic/shadcn/ui/separator";
import { Skeleton } from "@cs-magic/shadcn/ui/skeleton";

import { AppDetailContainer } from "@/components/app/container";
import { IconContainer } from "@cs-magic/react/components/containers";
import { CompanySVG, ProductIcon } from "@/components/icons";
import {
  ICON_DIMENSION_SM,
  POKETTO_APP_ID,
  POKETTO_INTERNATIONAL_HOME,
  POKETTO_MAINLAND_CHINA_HOME,
  URI,
} from "@/config";
import { useMount } from "@/hooks/use-mount";
import { usePokettoConversationUrl } from "@/hooks/use-url";
import clsx from "@/lib/clsx";
import { getImageUri } from "@/lib/string";
import { useAppStore } from "@/store";

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const mounted = useMount();

  if (!mounted || !theme) {
    return <Skeleton className="h-8 w-8" />;
  }

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]!;
  return (
    <div onClick={() => setTheme(nextTheme)} className="hover:bg-accent">
      {theme === "light" && <SunIcon className={ICON_DIMENSION_SM} />}
      {theme === "dark" && <MoonIcon className={ICON_DIMENSION_SM} />}
      {theme === "system" && <LapTimerIcon className={ICON_DIMENSION_SM} />}
    </div>
  );
}

export const LocaleSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const languages = ["zh-CN", "en"];
  const curLanguage = i18n.language;
  const nextLanguage =
    languages[
      (languages.findIndex((l) => l === curLanguage) + 1) % languages.length
    ];
  // console.log({ curLanguage, nextLanguage })

  return (
    <TbLanguage
      className={ICON_DIMENSION_SM}
      onClick={() => {
        void router.push(router.pathname, router.asPath, {
          locale: nextLanguage,
        });
        // i18n.changeLanguage(nextLanguage)
      }}
    />
  );
};

/**
 * 晚点再开启公司模式，目前就一个业务，没有必要
 */
export function LogoWithName({ withCompany }: { withCompany?: false }) {
  const { t } = useTranslation();

  const productLogo = (
    <Link className="p-btn-horizontal w-fit shrink-0" href="/">
      <ProductIcon />
      <span className="hidden md:flex whitespace-nowrap text-lg tracking-widest">
        {t(`product.name`)}
      </span>
    </Link>
  );
  return withCompany ? (
    // 学 vercel 的，ref: https://nextjs.org/docs/messages/prerender-error
    <div className="flex items-center gap-2 h-8">
      <Link href="https://cs-magic.com" className="hidden md:flex">
        <IconContainer>
          <CompanySVG className="wh-8" />
        </IconContainer>
      </Link>

      <Separator
        orientation="vertical"
        className="rotate-[30deg] mx-2 hidden md:flex"
      />

      {productLogo}
    </div>
  ) : (
    productLogo
  );
}

export default function Navbar() {
  const { t } = useTranslation();

  const { userId } = useUserInDb();

  return (
    <div className="flex items-center border-b px-4 py-2 gap-0">
      <LogoWithName />

      <div className="grow" />
      <CommandSearch className={"mx-2"} />

      <IconContainer>
        <LocaleSwitcher />
      </IconContainer>

      <IconContainer>
        <ThemeSwitcher />
      </IconContainer>

      {/*<Popover>*/}
      {/*  <PopoverTrigger>*/}
      {/*    <IconContainer>*/}
      {/*      <QuestionMarkCircledIcon />*/}
      {/*    </IconContainer>*/}
      {/*  </PopoverTrigger>*/}

      {/*  <PopoverContent>*/}
      {/*    <section className="flex flex-col gap-2">*/}
      {/*      {menuItems*/}
      {/*        .filter((k) => menuGroups.question!.includes(k.field))*/}
      {/*        .map((item) => (*/}
      {/*          <SidebarNavItem key={item.field} {...item} />*/}
      {/*        ))}*/}
      {/*    </section>*/}
      {/*  </PopoverContent>*/}
      {/*</Popover>*/}

      {/*<Link href={URI.user.settings}>*/}
      {/*  <IconContainer>*/}
      {/*    <GearIcon />*/}
      {/*  </IconContainer>*/}
      {/*</Link>*/}

      <Link
        href={`${getOrigin().includes("cn") ? POKETTO_INTERNATIONAL_HOME : POKETTO_MAINLAND_CHINA_HOME}/login`}
      >
        <IconContainer>
          <Globe className={"w-4 h-4"} />
        </IconContainer>
      </Link>

      <span className={"ml-2"}>
        {userId ? (
          <Link href={URI.user.feedback}>
            <IconContainer>
              <HandIcon />
            </IconContainer>
          </Link>
        ) : (
          <Button
            // size={"xs"}
            variant={"outline"}
            onClick={() => void signIn()}
            className={"whitespace-nowrap"}
          >
            {t("common:Login")}
          </Button>
        )}
      </span>
    </div>
  );
}

const Item: FC<ComponentProps<typeof CommandItem>> = ({
  className,
  ...props
}) => {
  return (
    <CommandItem
      className={clsx("w-full flex items-center gap-2", className)}
      {...props}
    />
  );
};

function CommandSearch({ className, ...props }: HTMLProps<HTMLDivElement>) {
  const { t, i18n } = useTranslation();

  const [search, setSearch] = React.useState("");
  const [toSearch] = useDebouncedValue(search, 200);
  const { data: queried } = trpcApi.app.list.useInfiniteQuery(
    { searchKey: toSearch, limit: 5 },
    {},
  );

  const {
    searchHistory,
    pushSearch,
    searchOpen: open,
    setSearchOpen: setOpen,
  } = useAppStore();
  const pokettoConversationUrl = usePokettoConversationUrl();

  const router = useRouter();

  const [appId, setAppId] = useState<string | null>(null);
  const refInput = useRef<HTMLInputElement>(null);

  /**
   *  close dialog if url changed
   */
  useEffect(() => {
    // console.log({ path: router.asPath })
    setOpen(false);
  }, [router.asPath]);

  /**
   * refocus so that arrow navigation works again
   */
  useEffect(() => {
    if (!appId) {
      // console.log("re-focusing input", refInput.current)
      refInput.current?.focus();
    }
  }, [appId]);

  // console.log({ cmdValue })

  return (
    <div
      className={clsx(
        "relative flex w-[256px] items-center text-sm text-muted-foreground",
        className,
      )}
      {...props}
    >
      {appId && (
        <AppDetailContainer
          appId={appId}
          open={!!appId}
          onOpenChange={(v) => {
            // close dialog
            if (!v) {
              setAppId(null);
            }
          }}
        />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" p-0 shadow-lg h-[360px] overflow-auto">
          <Command
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
            filter={(value, search) => {
              // note: value 都是小写， ref: https://github.com/pacocoursey/cmdk#command-cmdk-root
              return 1;
              // if (value.includes("poketto")) return 1
              // if (value.includes(search)) return 1
              // return 0
            }}
          >
            <CommandInput
              ref={refInput}
              placeholder={t("common:command.inputPlaceholder")}
              value={search}
              onValueChange={setSearch}
              onKeyDown={(event) => {
                // 兼容拼音
                if (event.nativeEvent.isComposing) {
                  event.preventDefault();
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {/* 历史的UI呈现不知道怎么搞比较好 */}
              {/*<CommandGroup heading="历史">*/}
              {/*  <div className="flex flex-wrap gap-2">*/}
              {/*    {searchHistory.map((key) => (*/}
              {/*      <Item key={key} className="w-fit" value={key} onSelect={() => pushSearch(key)}>*/}
              {/*        <span>{key}</span>*/}
              {/*      </Item>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*</CommandGroup>*/}

              <CommandGroup heading="系统">
                <Item
                  value={POKETTO_APP_ID}
                  onSelect={() => {
                    pushSearch(toSearch);
                    if (pokettoConversationUrl) {
                      void router.push(pokettoConversationUrl);
                    } else {
                      toast.error("您需要登录才可以启用 Poketto！");
                    }
                  }}
                >
                  <ProductIcon />
                  <span>召唤 Poketto</span>
                </Item>
              </CommandGroup>

              <CommandGroup heading="Apps">
                <CommandEmpty>No results found.</CommandEmpty>
                {!queried ? (
                  <CommandLoading>Hang on…</CommandLoading>
                ) : (
                  queried.pages
                    .flatMap((item) => item.items)
                    .map((app) => (
                      <Item
                        key={app.id}
                        value={app.id}
                        onSelect={(value) => {
                          // console.log("selected: ", { value, appId: app.id })
                          pushSearch(app.name);
                          setAppId(app.id);
                        }}
                      >
                        <Avatar className={"wh-5"}>
                          <AvatarImage src={getImageUri(app.avatar)} />
                        </Avatar>
                        <span>{app.name ?? app.id}</span>
                      </Item>
                    ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      <MagnifyingGlassIcon className="absolute left-2 wh-5" />
      <Input className="grow" onFocus={() => setOpen(!open)} />
      <kbd className="pointer-events-none absolute right-2 hidden h-6  shrink-0  select-none items-center gap-1 rounded border bg-muted p-2 font-mono font-medium text-muted-foreground md:inline-flex">
        ⌘ K
      </kbd>
    </div>
  );
}
