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
import Test from "./pages/UserWorkspaceHome";
import Protected from "./components/Protected";
import UserWorkspaceHome from "./pages/UserWorkspaceHome";
import UserBoards from "./pages/UserBoards";

export default function App() {
  return (
    <div id="root-container">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Layout />}>
            {/* <Route path="/w" element={<Test />} /> */}
            {/* <Route path="/protected/:id" element={<Protected />} /> */}
            <Route
              path="/u/:username/boards"
              element={
                <Protected>
                  <UserBoards />
                </Protected>
              }
            />
            <Route
              path="/w/:username"
              element={
                <Protected>
                  <Content />
                </Protected>
              }
            />
            <Route
              path="/w/:workspaceId/home"
              element={
                <Protected>
                  <UserWorkspaceHome />
                </Protected>
              }
            />
            <Route
              path="/w/:username/members"
              element={
                <Protected>
                  <Content />
                </Protected>
              }
            />
            <Route
              path="/w/:username/b/:boardName"
              element={
                <Protected>
                  <Board />
                </Protected>
              }
            />

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
