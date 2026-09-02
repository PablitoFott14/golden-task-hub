import { Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Method from "./pages/Method";
import GoldenTasks from "./pages/GoldenTasks";
import TaskDetail from "./pages/TaskDetail";
import PreSubmit from "./pages/PreSubmit";
import SpecDoc from "./pages/SpecDoc";
import Faq from "./pages/Faq";

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

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Method />} />
        <Route path="/golden-tasks" element={<GoldenTasks />} />
        <Route path="/golden-tasks/:id" element={<TaskDetail />} />
        <Route path="/checklist" element={<PreSubmit />} />
        <Route path="/spec" element={<SpecDoc />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
