export const FooterComponent = () => `
    <footer class="bg-slate-800 text-slate-300 py-6">
        <div class="container mx-auto">
            <div class="flex flex-wrap justify-between">
                <div class="w-full md:w-1/2 mb-6 md:mb-0">
                    <h5 class="text-lg font-semibold mb-4 text-white">Contacto:</h5>
                    <ul class="list-none">
                        <li class="mb-3 flex items-center">
                            <i class="bi bi-whatsapp text-white-400 mr-2"></i>
                            <span>+54 9 3517147858</span>
                        </li>
                        <li class="flex items-center">
                            <i class="bi bi-envelope text-white-400 mr-2"></i>
                            <span>home-market@gmail.com</span>
                        </li>
                    </ul>
                </div>

                <div class="w-full md:w-1/2">
                    <h5 class="text-lg font-semibold mb-4 text-white">Seguinos en:</h5>
                    <ul class="flex space-x-4">
                        <li>
                            <a href="#" class="text-white-400 hover:text-white">
                                <i class="bi bi-instagram text-2xl"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="text-white-400 hover:text-white">
                                <i class="bi bi-facebook text-2xl"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="text-white-400 hover:text-white">
                                <i class="bi bi-twitter text-2xl"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
`;