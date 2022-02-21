const Section = ({ title, children }) => {
  return (
    <div className="block pt-12 md:flex">
      <div className="pb-6 md:w-full md:max-w-150 md:p-0">
        <h2 className="font-xs font-light tracking-widest text-sm text-gray-600 leading-normal uppercase">
          {title}
        </h2>
      </div>
      <div className="flex-none text-lg text-gray-600 font-light md:flex-1 md:pl-20">
        {children}
      </div>
    </div>
  );
};

export default Section;
