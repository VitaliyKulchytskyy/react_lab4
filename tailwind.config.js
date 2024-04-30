/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
            "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      mobile: '374px',
    },
    extend: {
      colors: {
        notification_box: "#F0F2F4",
        step_done: "#007AFF",
        default: "#B9B9C3",
        secondary_text: "#575F6E",
        main_cross: "#E2E4E5",
        green_success: "#34C759",
      }
    },
  },
  plugins: [],
}

