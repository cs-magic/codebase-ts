"use client"

import { cn } from "@cs-magic/shadcn/lib/utils"
import React, { type HTMLAttributes, type LegacyRef } from "react"
import Markdown, { type ExtraProps } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"


// import styles from "./markdown-comp.module.css"
// import "katex/katex.min.css";

export const MarkdownComp = ({
  children,
  fallbackCode,
  className,
  ...props
}: {
  children: string
  fallbackCode?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Markdown
      {...props}
      className={cn(className)}
      components={{
        h1: props => {
          // console.log("h1: ", { props })
          return <h1 className={"text-xl font-medium"}>{props.children}</h1>
        },
        p: props => {
          return (
            <p
              className={
                cn()
                // "truncate"
              }
            >
              {props.children}
            </p>
          )
        },
        code(props: JSX.IntrinsicElements["code"] & ExtraProps) {
          const { children, className, node, ref, ...rest } = props
          const match = /language-(\w+)/.exec(className ?? "")
          const language = match ? match[1] : undefined
          const inline = node?.position?.start.line === node?.position?.end.line
          console.log("code: ", { props, language, inline })

          if (inline) {
            return (
              <code {...rest} ref={ref} className={className}>
                {children}
              </code>
            )
          }

          return (
            <SyntaxHighlighter
              ref={ref as LegacyRef<SyntaxHighlighter>}
              {...rest}
              PreTag="div"
              className={"w-full"}
              language={language}
              style={darcula}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          )
        },
      }}
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkMath]}
    >
      {children}
    </Markdown>
  )
}
