import { create } from 'twrnc';

const tw = create({
    theme: {
        extend: {
            colors: {
                primary: "#004C70",
                "primary-dark": "#003b5c",
                secondary: "#ff6b00",
                "background-dark": "#0f1115",
                "surface-dark": "#181b21",
                "surface-highlight": "#23262e",
                "success": "#22c55e",
                "error": "#ef4444",
                "warning": "#ffcc00",
                "info": "#3b82f6",
                "ob-primary": "#f27f0d",
                "ob-primary-dark": "#c2660a",
                "ob-background-light": "#f8f7f5",
                "ob-background-dark": "#221910",
                "ob-surface-dark": "#2d241b",
            },
            fontFamily: {
                display: ["System"], // Fallback to system if custom fonts aren't loaded yet
            },
        }
    }
});

export default tw;
