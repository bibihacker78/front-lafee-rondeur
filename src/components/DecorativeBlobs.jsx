const DecorativeBlobs = () => {
  return (
    <>
      {/* BLOB TOP LEFT */}
      <div className="absolute top-20 left-0 w-[180px] h-[180px] bg-pink-200 opacity-40 blur-3xl rounded-full"></div>

      {/* BLOB MIDDLE RIGHT */}
      <div className="absolute top-[700px] right-0 w-[220px] h-[220px] bg-pink-300 opacity-30 blur-3xl rounded-full"></div>

      {/* BLOB BOTTOM LEFT */}
      <div className="absolute bottom-20 left-10 w-[160px] h-[160px] bg-pink-300 opacity-20 blur-2xl rounded-full"></div>
    </>
  );
};

export default DecorativeBlobs;
