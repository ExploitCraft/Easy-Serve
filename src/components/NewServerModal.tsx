// NewServerModal.tsx — Stub for the Step 4 wizard. Replace entirely in Step 4.

export default function NewServerModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl p-8 text-center"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ color: "var(--text-secondary)" }}>
          New Server Wizard — built in Step 4
        </p>
        <button
          onClick={onClose}
          className="mt-4 rounded-md px-4 py-2 text-xs font-semibold"
          style={{ background: "var(--teal)", color: "#03150e" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
