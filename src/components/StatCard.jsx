export default function StatCard({
  title,
  value,
  description,
  icon,
  iconStyle,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h4 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h4>

          <p className="text-xs text-green-600 mt-2 font-medium">
            {description}
          </p>
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${iconStyle}`}>
          {icon}
        </div>

      </div>
    </div>
  );
}