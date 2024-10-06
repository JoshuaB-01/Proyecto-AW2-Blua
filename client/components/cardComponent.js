export function CardComponent(producto) {
    return `
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div class="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-auto object-cover"> 
            <div class="p-4">
                    <h5 class="text-xl font-bold text-slate-300 mb-2">${producto.nombre}</h5>
                    <p class="text-slate-400 mb-4">${producto.desc}</p>
                    <p class="text-2xl font-bold text-slate-300 mb-4">$${producto.precio.toFixed(2)}</p>
                    <div class="flex justify-between items-center space-x-2">
                        <input type="number" class="w-3/4 bg-slate-700 text-slate-300 rounded p-2" min="0" max="${producto.stock}" placeholder="0" step="1" id="cantidad-${producto.id}">
                        <button class="bg-green-500 hover:bg-green-600 text-white rounded p-2 flex-shrink-0" onclick="agregarAlCarrito(${producto.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
}