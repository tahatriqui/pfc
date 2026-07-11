import { Link } from "react-router-dom";

export default function Logo({ showText = true, size = "default" }) {
  const imageSize =
    size === "small"
      ? "h-14 w-14"
      : size === "large"
        ? "h-20 w-20"
        : "h-16 w-16";

  return (
    <div className="flex items-center gap-3">
      {" "}
      <Link to="/">
        <img
          src="/images/logo.png"
          alt="Student Project Management Platform Logo"
          className={` h-[130px] w-auto`}
        />
      </Link>
      {showText && (
        <div className="min-w-0">
          <h1 className="leading-[0.95]">
            <span className="block text-xl font-extrabold tracking-wide text-white">
              STUDENT
            </span>
            <span className="block text-xl font-extrabold tracking-wide text-white">
              PROJECT
            </span>
            <span className="block text-xl font-extrabold tracking-wide text-white">
              MANAGEMENT
            </span>
          </h1>

          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.35em] text-cyan-400">
            Platform
          </p>
        </div>
      )}
    </div>
  );
}
