import { useEffect } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import "../assets/scss/theme-switch.scss";

export default function ThemeSwitch() {
  const { darkMode, setDarkMode } = useThemeContext();
  const theme = darkMode ? 'dark' : 'light';

  const switchTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    darkMode
      ? document.documentElement.setAttribute("darkMode", "")
      : document.documentElement.removeAttribute("darkMode");
  }, [darkMode]);

  return (
    <div id="theme-switch">
      <div className={`switch-track track-${theme}`}>
        <div className="switch-check">
          <span className="switch-icon">🌙</span>
        </div>
        <div className="switch-x">
          <span className="switch-icon">🌞</span>
        </div>
        <div className="switch-thumb"></div>
      </div>

      <input
        type="checkbox"
        checked={darkMode}
        onChange={switchTheme}
        aria-label="Switch between dark and light mode"
      />
    </div>
  );
}
