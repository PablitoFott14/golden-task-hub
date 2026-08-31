import { Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GoldenTasks from "./pages/GoldenTasks";
import TaskDetail from "./pages/TaskDetail";
import SpecDoc from "./pages/SpecDoc";
import PreSubmit from "./pages/PreSubmit";
import { IconArrow } from "./components/ui";

function NotFound() {
  return (
    <div className="content">
      <div className="stack">
        <p className="label">404</p>
        <h1 style={{ fontSize: "var(--text-2xl)" }}>That page is not in the hub.</h1>
        <p className="lede">Press ⌘K and search for what you were after.</p>
        <p>
          <Link className="btn btn--primary" to="/">
            Back to the overview <IconArrow size={12} />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/golden-tasks" element={<GoldenTasks />} />
        <Route path="/golden-tasks/:id" element={<TaskDetail />} />
        <Route path="/spec" element={<SpecDoc />} />
        <Route path="/checklist" element={<PreSubmit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
