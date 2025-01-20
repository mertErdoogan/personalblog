export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center">
        <div className="w-24 h-7 bg-slate-200 rounded-lg"></div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-slate-200 rounded-t-lg "></div>
          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded h-10 mt-5"></div>
      <div className="flex flex-col gap-3 mt-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-20 grid grid-cols-4 gap-4">
            <div className="h-5 bg-slate-200 rounded-full"></div>
            <div className="h-16 flex flex-col gap-1">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-5 rounded-full w-full bg-slate-200"
                ></div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="h-9 w-20 rounded-lg bg-slate-200"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-9 w-9 rounded-lg bg-slate-200"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="w-8 h-8 bg-slate-200 rounded-xl"></div>
        ))}
        <div className="w-12 h-8 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
};
