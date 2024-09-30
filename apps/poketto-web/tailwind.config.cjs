const { mauve, violet } = require("@radix-ui/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "../../node_modules/@cs-magic/shadcn/dist/**/*.{js,jsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "sm": "640px",
        // => @media (min-width: 640px) { ... }

        "md": "768px",
        // => @media (min-width: 768px) { ... }

        "lg": "1024px",
        // => @media (min-width: 1024px) { ... }

        "xl": "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px"
        // => @media (min-width: 1536px) { ... }
      }
    },
    extend: {

      spacing: {
        // Add any custom values you want here
      },

      colors: {
        ...mauve,
        ...violet,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        link: "hsl(var(--link))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" }
        },
        marquee: {
          "0%": { transform: "translate(0%)" },
          "100%": { transform: "translate(-110%)" }
        },
        marquee2: {
          "0%": { transform: "translate(110%)" },
          "100%": { transform: "translate(0%)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 5s linear infinite",
        "marquee2": "marquee2 5s linear infinite"
      }
    }
  },
  plugins: [
    // @ts-ignore
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss/plugin")(({ addVariant, matchUtilities, theme }) => {

      // ref: https://stackoverflow.com/a/71795600/9422455
      addVariant("child", "& > *");

      addVariant("hocus", ["&:hover", "&:focus"]);
      // todo: group-hocus

      matchUtilities(
        {
          wh:
            (value) => {
              // console.debug({value})
              return {
                width: value,
                height: value
              };
            }
        },
        {
          values: theme("width")
        }
      );
    }),
    require("daisyui")
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
          "primary": "#a991f7",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff"
        }
      },
      "light", "dark"
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false // Shows info about daisyUI version and used config in the console when building your CSS
  }
};

