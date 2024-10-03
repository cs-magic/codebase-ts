import { useTranslation } from "next-i18next";
import React, {
  type HTMLProps,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useState,
} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@cs-magic/shadcn/ui/tooltip";
/**
 * TypeError: Cannot set property ResponsiveMasonry of #<Object> which has only a getter
 *     at Object.<anonymous> (/Users/mark/coding/codebase-ts/node_modules/react-responsive-masonry/lib/index.js:18:27)
 */
// import ReactResponsiveMasonry, {
//   ResponsiveMasonry,
// } from "react-responsive-masonry";
import MasonryCSS from "react-masonry-css";
import "./containers.css";

import { Loading } from "@/components/loading";
import { type DEVICE_TYPE, DEVICES } from "@cs-magic/common/device";
import { clsx } from "clsx";

export function GridContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full gap-2 | grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      )}
    >
      {children}
    </div>
  );
}

export function MasonryContainer({
  children,
  lib = "masonic",
}: PropsWithChildren & {
  lib?: "masonic" | "react-responsive-masonry" | "react-masonry-css";
}) {
  // return null;
  // todo: TypeError: Cannot set property ResponsiveMasonry of #<Object> which has only a getter

  switch (lib) {
    case "masonic":
      return "todo";

    case "react-responsive-masonry":
      return;
    // (
    //   <ResponsiveMasonry
    //     columnsCountBreakPoints={{ 600: 2, 900: 3, 1200: 4, 1500: 5 }}
    //   >
    //     <ReactResponsiveMasonry gutter="1rem">
    //       {children}
    //     </ReactResponsiveMasonry>
    //   </ResponsiveMasonry>
    // );

    case "react-masonry-css":
    default:
      const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
      };
      return (
        <MasonryCSS
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {children}
        </MasonryCSS>
      );
  }
}

export function MarqueeContainer({
  children,
  className,
  ...props
}: PropsWithChildren & HTMLProps<HTMLDivElement>) {
  // ref:
  // 1. https://play.tailwindcss.com/VJvK9YXBoB?layout=horizontal
  // 2. https://flowgpt.com/prompt/vqxUPqsxdZ1swXykpypj8?isModal=true
  const [isOverflow, setOverflow] = useState(false);
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const { scrollWidth, offsetWidth } = node;
      if (scrollWidth > offsetWidth) {
        setOverflow(true);
      }
    }
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "relative flex w-full overflow-hidden",
        !isOverflow && "justify-center",
        className,
      )}
      {...props}
    >
      <div
        className={clsx("whitespace-nowrap ", isOverflow && "animate-marquee ")}
      >
        {children}
      </div>
      {isOverflow && (
        <div className="absolute top-0 animate-marquee2">{children}</div>
      )}
    </div>
  );
}

export function DeviceContainerInner({
  height,
  width,
  ratio = 1,
  children,
}: PropsWithChildren & {
  height: number;
  width: number;
  ratio?: number;
}) {
  return (
    <div
      style={{ height: height * ratio, width: width * ratio }}
      className="shrink-0 overflow-hidden"
    >
      <div className="origin-top-left" style={{ transform: `scale(${ratio})` }}>
        {children}
      </div>
    </div>
  );
}

export function DeviceContainer({
  device = "iphone-14-pro",
  ratio = 1,
  children,
}: PropsWithChildren & {
  device?: DEVICE_TYPE;
  ratio?: number;
}) {
  const { w, h, r = 68 } = DEVICES[device];
  return (
    <DeviceContainerInner width={w} height={h} ratio={ratio}>
      <div className={clsx("device", `device-${device}`)}>
        <div className="device-frame">
          {/* ref: https://codesandbox.io/s/react-phone-mockup-slider-wsdy5?file=/src/App.js:1232-1296 */}
          <div
            className="h-full w-full overflow-hidden bg-white"
            style={{ borderRadius: r }}
          >
            {children}
          </div>
        </div>
        <div className="device-stripe " />
        <div className="device-header " />
        <div className="device-sensors " />
        <div className="device-btns " />
        <div className="device-power " />
      </div>
    </DeviceContainerInner>
  );
}

export function NormalScrollContainer({ children }: PropsWithChildren) {
  return <div className="grow overflow-auto">{children}</div>;
}

export function AutoScrollContainer({ children }: PropsWithChildren) {
  return (
    <ScrollToBottom
      debounce={50}
      checkInterval={50}
      className="w-full h-full"
      initialScrollBehavior="auto"
    >
      {children}
    </ScrollToBottom>
  );
}

/**
 *
 * @param content 是 lg 下的 label，否则是悬浮内容
 * @param children
 * @param props
 * @param disableHoverableContent, ref: https://www.radix-ui.com/primitives/docs/components/tooltip#api-reference
 * @constructor
 */
export function ResponsiveTooltip({
  content,
  children,
  disableHoverableContent,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipTrigger> & {
  content?: ReactNode;
  disableHoverableContent?: boolean;
}) {
  return (
    <Tooltip
      delayDuration={100}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipTrigger
        className={clsx(
          "flex items-center gap-2 p-interactive px-2 w-full",
          className,
        )}
        {...props}
      >
        {children}
        <span className="hidden lg:flex mr-2">{content}</span>
      </TooltipTrigger>

      <TooltipContent className="lg:hidden">{content}</TooltipContent>
    </Tooltip>
  );
}

export function IconContainer({
  children,
  className,
  ...props
}: PropsWithChildren & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "p-2 rounded-sm flex justify-center items-center gap-1 cursor-pointer p-interactive",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const AsyncListContainer = <T,>({
  items,
  style,
}: {
  items?: T[];
  style: (ele: T) => ReactNode;
}) => {
  const { t } = useTranslation();
  return !items ? (
    <Loading />
  ) : !items.length ? (
    <div className={"w-full flex flex-col items-center"}>
      {t("common:CurrentlyNoResult")}
    </div>
  ) : (
    <>{items.map((p, index) => style(p))}</>
  );
};
