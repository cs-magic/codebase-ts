const defaultTheme = require("tailwindcss/defaultTheme");
const tailwindConfig = {
  darkMode: ["class"],
  /**
   * todo: 智能选择
   */
  content: [
    // deps // attention to the prefix
    // "../../node_modules/@cs-magic/common/dist/**/*",
    // "../../node_modules/@cs-magic/common-frontend/dist/**/*",
    // "../../node_modules/@cs-magic/shadcn/dist/**/*",
    // "../../node_modules/@cs-magic/react/dist/**/*",
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
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "backdrop-ring": "backdrop-ring 5s ease-in-out infinite",
        marquee: "marquee 5s linear infinite",
        marquee2: "marquee2 5s linear infinite",
        "fade-in": "fade-in 3s ease-in-out forwards",
        title: "title 3s ease-out forwards",
        "fade-left": "fade-left 3s ease-in-out forwards",
        "fade-right": "fade-right 3s ease-in-out forwards",
      },

      backgroundImage: {
        "gradient-radial":
          "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      borderStyle: {
        "wider-dashed": "dashed", // Name your custom style
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

      dropShadow: {
        DEFAULT: "0 0 5px var(--shadow)",
        lg: "0 0 20px var(--shadow)",
      },

      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-calsans)"],
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
          marquee: {
            "0%": { transform: "translate(0%)" },
            "100%": { transform: "translate(-110%)" },
          },
          marquee2: {
            "0%": { transform: "translate(110%)" },
            "100%": { transform: "translate(0%)" },
          },
        },

        "fade-in": {
          "0%": {
            opacity: "0%",
          },
          "75%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-left": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "fade-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        title: {
          "0%": {
            "line-height": "0%",
            "letter-spacing": "0.25em",
            opacity: "0",
          },
          "25%": {
            "line-height": "0%",
            opacity: "0%",
          },
          "80%": {
            opacity: "100%",
          },

          "100%": {
            "line-height": "100%",
            opacity: "100%",
          },
        },
      },

      textShadow: {
        // 需要额外设置
        douyin: "1px 1px 2px red, 0 0 1rem blue, 0 0 0.2rem blue;",
      },

      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-debug-screens"),
    // eslint-disable-next-line @typescript-eslint/unbound-method
    require("tailwindcss/plugin")(function ({
      addVariant,
      matchUtilities,
      theme,
    }) {
      addVariant("not-first", "&:not(first-child)"); // ref: https://www.reddit.com/r/tailwindcss/comments/s3wka1/comment/hspmjxo/?utm_source=share&utm_medium=web2x&context=3
      addVariant("not-last", "&:not(last-child)");

      // ref: https://stackoverflow.com/a/71795600/9422455
      addVariant("child", "& > *");

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

      matchUtilities(
        {
          wh: (value) => {
            // console.debug({value})
            return {
              width: value,
              height: value,
            };
          },
        },
        {
          values: theme("width"),
        },
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

  // daisyUI config (optional - here are the default values)
  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes

    darkTheme: "dark", // name of one of the included themes for dark mode
    themes: [
      {
        mytheme: {
          primary: "#a991f7",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light",
      "dark",
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
module.exports = tailwindConfig;
