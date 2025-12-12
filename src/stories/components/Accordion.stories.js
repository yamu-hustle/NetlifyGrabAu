import accordion from '../../assets/js/accordion.js';

export default {
    title: 'Components/Accordion',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The `Accordion` component displays a list of collapsible items. Use this component to create a collapsible list of items that can be expanded or collapsed.',
            },
        },
    },
};

export const Accordion = () => {
    // Initialize your accordion component or create a new element to apply it to
    const container = document.createElement('div');
    container.classList.add('container', 'p-4');
    container.innerHTML = `
        <!-- FAQ Section - If you're not using this be sure to comment out the SCSS and JS files named "accordion" -->
        <div class="w-full md:w-10/12 lg:w-8/12 mx-auto">
            <div class="mb-4">
                <div class="accordion__title active relative cursor-pointer bg-gray-100 transition-colors duration-500 relative font-bold text-black text-lg  px-6 py-6 pr-14  after:w-0 after:h-0 after:border-8 after:border-b-0 after:border-transparent after:border-t-black after:block after:absolute after:right-6 after:top-1/2 after:-translate-y-1/2 after:transition-[transform] after:duration-500 [&.active]:bg-black [&.active]:text-white [&.active]:after:border-t-white [&.active]:after:rotate-180">
                    Et quasi architecto
                </div>
                <div class="accordion__content h-0 overflow-hidden transition-[height] duration-500">
                    <div class="p-6">
                        <p class="pb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <div class="accordion__title relative cursor-pointer bg-gray-100 transition-colors duration-500 relative font-bold text-black text-lg  px-6 py-6 pr-14 after:w-0 after:h-0 after:border-8 after:border-b-0 after:border-transparent after:border-t-black after:block after:absolute after:right-6 after:top-1/2 after:-translate-y-1/2 after:transition-[transform] after:duration-500 [&.active]:bg-black [&.active]:text-white [&.active]:after:border-t-white [&.active]:after:rotate-180">
                    Et quasi architecto
                </div>
                <div class="accordion__content h-0 overflow-hidden transition-[height] duration-500">
                    <div class="p-6">
                        <p class="pb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </div>
                </div>
            </div>
            <div class="accordion__title relative cursor-pointer bg-gray-100 transition-colors duration-500 relative font-bold text-black text-lg  px-6 py-6 pr-14 after:w-0 after:h-0 after:border-8 after:border-b-0 after:border-transparent after:border-t-black after:block after:absolute after:right-6 after:top-1/2 after:-translate-y-1/2 after:transition-[transform] after:duration-500 [&.active]:bg-black [&.active]:text-white [&.active]:after:border-t-white [&.active]:after:rotate-180">
                Et quasi architecto
            </div>
            <div class="accordion__content h-0 overflow-hidden transition-[height] duration-500">
                <div class="p-6">
                    <p class="pb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
            </div>
        </div>
    `;

  setTimeout(() => accordion(), 0); // Add timeout to make sure dom is there when js loads

  return container;
};