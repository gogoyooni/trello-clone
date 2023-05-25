import "./styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import Home from "../src/pages/Home";
import Layout from "../src/pages/Layout";
import Board from "./pages/Board";
import Content from "./components/Content";

export default function App() {
  return (
    <div id="root-container">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Layout />}>
            <Route path="/b" element={<Content />} />
            <Route path="/b/:id/" element={<Board />} />

            {/* <Route path="about" element={<About />} /> */}
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
          {/* <Route path="/b/:id" element={<Board />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
