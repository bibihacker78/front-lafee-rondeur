export default function Separateur({ titre }) {
  return (
    <div className="flex items-center justify-center my-12">
      <div className="h-[1px] w-1/4 bg-gradient-to-r from-transparent via-[#ff008c40] to-transparent"></div>

      <p className="mx-4 text-xl font-semibold text-[#ff008c] tracking-wide">
        {titre}
      </p>

      <div className="h-[1px] w-1/4 bg-gradient-to-r from-transparent via-[#ff008c40] to-transparent"></div>
    </div>
  );
}
