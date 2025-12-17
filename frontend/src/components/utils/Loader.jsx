//course card
export const CourseLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white p-4 shadow rounded-xl space-y-3">
            <div className="h-40 bg-slate-300 rounded-lg"></div>

            <div className="h-5 w-3/4 bg-slate-300 rounded-lg"></div>

            <div className="h-4 w-full bg-slate-300 rounded-lg"></div>

            <div className="h-4 w-[90%] bg-slate-300 rounded-lg"></div>

            <div className="h-10 w-28 bg-slate-300 rounded-lg mt-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfileLoader = () => {
  return (
    <div className="relative hidden lg:flex  w-24 md:w-36 lg:w-40 xl:w-64 animate-pulse gap-2 p-4">
      <div className="h-12 w-12 rounded-full bg-slate-400"></div>
      <div className="flex-1">
        <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
        <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
      </div>
      <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
    </div>
  );
};

{
  /* search */
}

{
  /* <div className="mx-auto w-4/5 -mt-10 bg-white p-6 rounded-xl shadow">
        <div className="h-14 bg-slate-300 rounded-lg"></div>
      </div> */
}

{
  /* title */
}

{
  /* <div className="px-10 py-8 space-y-3">
        <div className="h-6 w-1/2 bg-slate-300 rounded"></div>

        <div className="h-4 w-3/5 bg-slate-300 rounded"></div>
      </div> */
}

{
  /* testimonials */
}

//   <div className="h-80 bg-slate-300 w-full mt-16"></div>
