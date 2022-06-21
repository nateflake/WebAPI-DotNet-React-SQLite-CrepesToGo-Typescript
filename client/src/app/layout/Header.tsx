import { AppBar, Toolbar, Typography } from "@mui/material";
import DarkModeSwitch from "./DarkModeSwitch";

interface Props {
  darkMode?: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">CrepesToGo</Typography>
        <DarkModeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode}></DarkModeSwitch>
      </Toolbar>
    </AppBar>
  )
}