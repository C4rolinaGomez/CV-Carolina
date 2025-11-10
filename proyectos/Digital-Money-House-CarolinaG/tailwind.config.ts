import type { Config } from "tailwindcss";

const Config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/assets/**/*.{png,svg,webp}",
  ],
  theme: {
		extend: {
			backgroundImage: {
				"bg-desktop": "url('/assets/bg-desktop.webp')",
        "bg-mobile":"url('/assets/bg-mobile.png')",
        "bg-tablet":"url('/assets/bg-tablet.png')"
			},
      backgroundColor: {
        "dark1": "#000000ff",
        "dark2": "#3a393e",
        "green": '#c1fd35',
        "gray1": '#cecece',
        "error1": "#EE3737",
        "error2": "#E81010",
        "button1": "#CECECE",
        "black": "#000",
        "white": "#FFF"
      },
		},
    colors: {
      "dark1": "#000000ff",
      secondary: "#3a393e",
      "green": '#c1fd35',
      "gray1": '#cecece',
      "error1": "#EE3737",
      "error2": "#E81010",
      "button1": "#CECECE",
      black: "#000",
      white: "#FFF"
    },

    fontFamily: {
      "open-sans": "'Open Sans'"
      },
      
    screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
    },
	},
  plugins: [],

} 

export default Config;



