

const NotificationItem = ({ title, desc })  => {
  return (
     <div
      className="p-3 rounded-lg border border-cyan-400/30
                 bg-black/40 hover:bg-cyan-400/10
                 hover:shadow-[0_0_12px_#22d3ee55]
                 transition cursor-pointer"
    >
      <p className="text-sm font-bold text-cyan-300 tracking-wide">
        {title}
      </p>
      <p className="text-xs text-cyan-200/70 mt-1">
        {desc}
      </p>
    </div>
  );
}
export default NotificationItem;