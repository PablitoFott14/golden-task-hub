import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Method from "./pages/Method";
import GoldenTasks from "./pages/GoldenTasks";
import TaskDetail from "./pages/TaskDetail";
import Grading from "./pages/Grading";
import Reference from "./pages/Reference";
import Complexity from "./pages/Complexity";

function NotFound() {
  return (
    <div className="wrap py-28 text-center">
      <div className="mono-label text-ink-400">404</div>
      <h1 className="mt-3 font-display text-3xl font-bold text-ink-900">Nothing lives here.</h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] text-ink-500">
        The page you followed does not exist in the hub. Start from the method, or press ⌘K and
        search for what you were after.
      </p>
      <Link to="/" className="btn-primary mt-7">
        Back to the method
      </Link>
    </div>
  );
}

/**
 * The five tabs replaced eight, so five routes moved. Every one of them is kept
 * as a redirect **carrying the hash across**, because the hash is what makes the
 * old link still useful: `/spec#weights` has to land on the weights pane, not
 * just on the page. Both new pages resolve an inbound anchor to the pane that
 * holds it, so nothing has to know the new shape.
 *
 * These exist for links that left the hub — a bookmark, a Slack message, a
 * Speed Audit comment. Every link *inside* the hub already points at the new
 * route, so a redirect is a safety net rather than the normal path.
 */
function Moved({ to, pane }: { to: string; pane?: string }) {
  const { hash } = useLocation();
  // A bare old URL has no hash to carry, so it needs the pane naming itself:
  // /spec has to open the dimensions, not the gate that is now the default.
  return <Navigate to={`${to}${hash || (pane ? `#${pane}` : "")}`} replace />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Method />} />
        <Route path="/golden-tasks" element={<GoldenTasks />} />
        <Route path="/golden-tasks/:id" element={<TaskDetail />} />
        <Route path="/complexity" element={<Complexity />} />
        <Route path="/grading" element={<Grading />} />
        <Route path="/reference" element={<Reference />} />

        {/* Where the eight tabs went. */}
        <Route path="/checklist" element={<Moved to="/grading" pane="pre-submit" />} />
        <Route path="/spec" element={<Moved to="/grading" pane="task-parameters" />} />
        <Route path="/onboarding" element={<Moved to="/reference" pane="onboarding" />} />
        <Route path="/whats-new" element={<Moved to="/reference" pane="whats-new" />} />
        <Route path="/faq" element={<Moved to="/reference" pane="faq" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
