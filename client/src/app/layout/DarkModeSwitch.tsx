import { Switch } from "@mui/material";

interface Props {
  darkMode?: boolean;
  toggleDarkMode: () => void;
}

export default function DarkModeSwitch({ darkMode, toggleDarkMode }: Props) {
  return (
    <Switch checked={darkMode} onClick={() => { toggleDarkMode(); }} />
  )
}