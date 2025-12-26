import NotificationItem from "../custom/NotificationItem";

export default function NotificationModal({ open, onClose }) {
  if (!open) return null;

  return (
        <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="w-[380px] bg-gradient-to-br from-[#0f172a] to-[#020617]
                     border border-cyan-400/40 rounded-xl
                     shadow-[0_0_30px_#22d3ee55]
                     animate-popup"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-400/20">
            <h2 className="text-cyan-300 font-semibold tracking-widest text-sm">
              🔔 Diseno ALERTS
            </h2>
            <button
              onClick={onClose}
              className="text-cyan-400 hover:text-red-400 transition"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
            <NotificationItem
              title="Welcome to Disenoys!"
              desc="Happy to have you here. Explore and enjoy our features."
            />
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-cyan-400/20 text-right">
            <button className="text-xs text-cyan-400 hover:text-cyan-300">
              CLEAR ALL
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
