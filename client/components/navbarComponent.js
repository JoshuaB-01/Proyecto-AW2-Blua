const navElements = [
    {title: 'Home', link: '../pages/home.html'},
    {title: 'Categorías', link: '../pages/categorias.html'},
];

export function NavbarComponent() {
    return `
    <nav class="bg-slate-800 p-4">
        <div class="container mx-auto flex flex-wrap justify-between items-center">
            <div class="flex items-center w-full md:w-auto">
                <a href="../pages/home.html" class="text-white text-2xl font-bold mr-6">
                    <img src="../assets/logoweb.svg" alt="Logo" class="h-16 filter invert">
                </a>
                
                <div class="hidden md:flex space-x-4">
                    ${navElements.map(e => `
                        <a href="${e.link}" class="text-white hover:text-gray-300 font-bold">${e.title}</a>
                    `).join('')}
                </div>
                
                <button id="mobileMenuButton" class="md:hidden ml-auto text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            
            <div class="hidden md:flex items-center space-x-2">
                <button onclick="window.location.href='../pages/carrito.html'" class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
                    <i class="bi bi-cart"></i>
                </button>
                <button onclick="window.location.href='../index.html'" class="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                    <i class="bi bi-box-arrow-left"></i>
                </button>
            </div>
        </div>
        
        <div id="mobileMenu" class="hidden w-full mt-4">
            ${navElements.map(e => `
                <a href="${e.link}" class="block text-white py-2 hover:bg-slate-700">${e.title}</a>
            `).join('')}
            <div class="flex items-center space-x-2 mt-2">                
                <button onclick="window.location.href='../pages/carrito.html'" class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
                    <i class="bi bi-cart"></i>
                </button>
                <button onclick="window.location.href='../index.html'" class="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                    <i class="bi bi-box-arrow-left"></i>
                </button>
            </div>
        </div>
    </nav>
    `;
}

export function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}