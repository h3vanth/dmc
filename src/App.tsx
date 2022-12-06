import { ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
