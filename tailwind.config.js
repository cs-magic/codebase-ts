const tailwindConfig = {
  darkMode: ["class"],
  /**
   * todo: 智能选择
   */
  content: [
    // deps
    "../../node_modules/@cs-magic/shadcn/dist/**/*",
    "../../node_modules/@cs-magic/react/dist/**/*",

    // apps
    // "../../app_chrome-exts/aigc-enhancer/src/**/*",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      fontFamily: {
        // 需要本地安装
        pingfang: ["PingFang SC"],
        songti: ["Songti SC", "STSong"],
        art: [
          "Zapfino", //这个花体最飘逸！
          // "Trebuchet MS",
          // "Snell Roundhand", // 这个花体还行
          // "SignPainter",
          // "Rockwell",
          // "Party LET",
          // "Optima",
          // "Menlo",
          // "HYShangWeiShouShu W",
          // "Helvetica Neue",
          // "Chalkduster",
          // "Brush Script MT",
          // "Apple Chancery",
        ],
      },
      colors: {
        wechat: "hsl(var(--wechat))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        primary2: {
          DEFAULT: "hsl(var(--primary2))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        shadow: "var(--shadow)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "backdrop-ring": {
          "0%, 100%": {
            backdropFilter: "brightness(10%)",
          },
          "50%": {
            backdropFilter: "brightness(50%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "backdrop-ring": "backdrop-ring 5s ease-in-out infinite",
      },
      borderStyle: {
        "wider-dashed": "dashed", // Name your custom style
      },
      textShadow: {
        // 需要额外设置
        douyin: "1px 1px 2px red, 0 0 1rem blue, 0 0 0.2rem blue;",
      },
      dropShadow: {
        DEFAULT: "0 0 5px var(--shadow)",
        lg: "0 0 20px var(--shadow)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    // eslint-disable-next-line @typescript-eslint/unbound-method
    require("tailwindcss/plugin")(function ({
      addVariant,
      matchUtilities,
      theme,
    }) {
      addVariant("not-first", "&:not(first-child)"); // ref: https://www.reddit.com/r/tailwindcss/comments/s3wka1/comment/hspmjxo/?utm_source=share&utm_medium=web2x&context=3
      addVariant("not-last", "&:not(last-child)");

      addVariant("hocus", ["&:hover", "&:focus"]);

      matchUtilities(
        // ref: https://www.hyperui.dev/blog/text-shadow-with-tailwindcss
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),

    // @ts-ignore
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".border-wider-dashed": {
          borderStyle: "dashed",
          borderWidth: "1px",
          backgroundImage:
            "repeating-linear-gradient(to right, transparent, transparent 10px, black 10px, black 40px)", // Adjust the spacing here
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
module.exports = tailwindConfig;
