import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Method from "./pages/Method";
import GoldenTasks from "./pages/GoldenTasks";
import TaskDetail from "./pages/TaskDetail";
import FailureApproach from "./pages/FailureApproach";
import SpecDoc from "./pages/SpecDoc";
import Reference from "./pages/Reference";
import { checklist } from "./data/checklist";

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
 * Every route the restructures retired is kept as a redirect **carrying the
 * hash across**, because the hash is what makes the old link still useful:
 * `/spec#weights` has to land on the weights pane, not just on the page. Both
 * destination pages resolve an inbound anchor to the pane that holds it, so
 * nothing has to know the new shape.
 *
 * These exist for links that left the hub — a bookmark, a Slack message, a
 * Speed Audit comment. Every link *inside* the hub already points at the live
 * route, so a redirect is a safety net rather than the normal path.
 */
function Moved({ to, pane }: { to: string; pane?: string }) {
  const { hash } = useLocation();
  // A bare old URL has no hash to carry, so it needs the pane naming itself:
  // /checklist has to open the gate, not the onboarding that is the default.
  return <Navigate to={`${to}${hash || (pane ? `#${pane}` : "")}`} replace />;
}

/** Anchors that belonged to the gate and therefore followed it to Reference. */
const gateAnchors = new Set(["pre-submit", ...checklist.map((s) => s.id)]);

/**
 * `/grading` is the one old route whose contents went to two different tabs:
 * the spec stayed put and became `/spec`, the gate moved into Reference. So
 * this redirect reads the hash to know which one a link wanted.
 */
function MovedFromGrading() {
  const { hash } = useLocation();
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return gateAnchors.has(id) ? (
    <Navigate to={`/reference${hash}`} replace />
  ) : (
    <Navigate to={`/spec${hash}`} replace />
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Method />} />
        <Route path="/golden-tasks" element={<GoldenTasks />} />
        {/* The vendor closeout task was replaced wholesale, so an old link
            lands on the index rather than on a task that is not the one it
            meant. It is above the `:id` route or it never matches. */}
        <Route
          path="/golden-tasks/vendor-closeout"
          element={<Navigate to="/golden-tasks" replace />}
        />
        <Route path="/golden-tasks/:id" element={<TaskDetail />} />
        <Route path="/failure-approach" element={<FailureApproach />} />
        {/* The proposals tool is parked: off the site, kept in the source, and
            no longer imported, so it is not in the bundle either. An old link
            lands on the method rather than on a 404. */}
        <Route path="/complexity" element={<Navigate to="/" replace />} />
        <Route path="/spec" element={<SpecDoc />} />
        <Route path="/reference" element={<Reference />} />

        {/* Where the retired tabs went. */}
        <Route path="/grading" element={<MovedFromGrading />} />
        <Route path="/checklist" element={<Moved to="/reference" pane="pre-submit" />} />
        <Route path="/onboarding" element={<Moved to="/reference" pane="onboarding" />} />
        <Route path="/whats-new" element={<Moved to="/reference" pane="whats-new" />} />
        <Route path="/faq" element={<Moved to="/reference" pane="faq" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
