import Navbar from "./components/Navbar";
import GalleryPage from "./pages/GalleryPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useGallleryContext } from "./contexts/galleryContext";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";

function App() {
  const { mode } = useGallleryContext();
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <BrowserRouter>
        <Container maxWidth="xl" sx={{ marginY: 3 }}>
          <Routes>
            <Route path="/" element={<GalleryPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
