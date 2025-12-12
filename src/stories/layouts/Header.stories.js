
export default {
    title: 'Layouts/Header',
};

export const Header = () => {
    return `
        <header class="site-header bg-white w-full py-4 bg-transparent z-[99] transition duration-300 shadow-md sticky">
            <div class="container px-4">
                <div class="flex justify-between items-center">
                    <div class="">
                        <a href="#top">
                            <span class="sr-only">Logo</span>
                            <img width="180" src="logo.svg"></img>
                        </a>
                    </div>
                    <a href="tel:XXXXXXXXXX" class="flex items-center" title="phone">
                        <div class="md:mr-3">
                            <img class="w-6" src="icon-phone.svg"></img>
                        </div>
                        <div class="hidden md:flex flex-col phone-text text-green-500 text-xl leading-tight">
                            <span class="block">Got Questions?</span>
                            <em class="font-bold not-italic">XX XXXX XXXX</em>
                        </div>
                    </a>
                </div>
            </div>
        </header>
        <div class="h-screen bg-blue-500"></div>
        <div class="h-screen bg-green-500"></div>
    `;
}