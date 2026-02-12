import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-[#ff008c10] text-gray-700 pt-16 pb-10 relative overflow-hidden">

      {/* Glow rose doux */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#ff008c22] blur-[160px] rounded-full pointer-events-none"></div>

      {/* Contenu principal */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">

        {/* Col 1 */}
        <div>
          <h3 className="text-xl font-semibold text-[#ff008c] mb-5">Aide</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#cc317e]">Suivre ma commande</a></li>
            <li><a href="#" className="hover:text-[#cc317e]">Délai de livraison</a></li>
            <li><a href="#" className="hover:text-[#cc317e]">Aide & questions</a></li>
            <li><a href="#" className="hover:text-[#cc317e]">Avis clients</a></li>
            <li><a href="#" className="hover:text-[#cc317e]">Blog & conseils</a></li>
          </ul>
        </div>

        {/* Col 2 */}
        <div>
          <h3 className="text-xl font-semibold text-[#ff008c] mb-5">
            La Fée de la Forme Guitare
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#cc317e]">À propos</a></li>
            <li><a href="#" className="hover:text-[#cc317e]">Nos boutiques</a></li>
            <li><a href="#" className="hover:text-[#cc317e]">Nous rejoindre</a></li>
            <li><a href="#" className="hover:text-[#cc317e]">Mentions légales</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="sm:col-span-2 lg:col-span-2">
          <h3 className="text-xl font-semibold text-[#ff008c] mb-3">
            Newsletter
          </h3>
          <p className="text-sm mb-5 text-gray-600 max-w-md">
            Recevez nos nouveautés, promotions exclusives et conseils beauté.
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-5 py-3 rounded-lg bg-white border border-[#ff008c33] placeholder-gray-400 text-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-[#ff008c99]"
            />

            <button
              className="px-8 py-3 bg-gradient-to-r from-[#ff008c] to-[#cc317e] 
                         text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:opacity-90 transition"
            >
              S’INSCRIRE
            </button>
          </form>
        </div>

      </div>

      {/* Bas */}
      <div className="relative max-w-7xl mx-auto px-6 mt-14 pt-6 border-t border-[#ff008c33] flex flex-col sm:flex-row items-center justify-between">
        
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} La Fée De La Forme Guitare.
        </p>

        {/* Icônes animées */}
        <div className="flex gap-6 text-2xl mt-4 sm:mt-0">
          {["facebook", "instagram", "tiktok"].map((icon) => (
            <a
              key={icon}
              href="#"
              className="text-[#cc317e] hover:text-[#ff008c] transform hover:scale-125 transition-all 
                         hover:drop-shadow-[0_0_8px_#ff008c]"
            >
              <i className={`fa-brands fa-${icon}`}></i>
            </a>
          ))}
        </div>

      </div>

    </footer>
  );
}

export default Footer;
