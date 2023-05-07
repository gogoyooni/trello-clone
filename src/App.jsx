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

export default function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="about" element={<About />} /> */}
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
