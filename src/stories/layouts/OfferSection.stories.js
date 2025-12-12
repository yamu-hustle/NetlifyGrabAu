export default {
    title: 'Layouts/Offer Section',
}

export const OfferSection = () => {
    return `
        <section class="py-16 md:py-24 lg:py-28 ">
            <div class="container px-4">
                <div class="flex flex-wrap justify-center">
                    <div class="w-full md:w-10/12 lg:w-9/12 text-center">
                        <h2 class="text-3xl lg:text-4xl mb-4 font-bold capitalize text-center">
                            Offer Section, with a Dynamic Month and Year: <span class="dyn-month"></span> <span
                                class="dyn-year"></span>
                        </h2>
                    </div>
    
                    <div class="w-full md:w-9/12 text-center mb-8">
                        <img src="placeholder-2.jpg" alt="" />
                    </div>
    
                    <div class="w-full md:w-10/12 lg:w-8/12 lg:text-xl">
                        <p class="mb-5">
                            Fusce convallis viverra rutrum. Quisque lacinia sem consectetur, sodales erat eget, tempor mauris. Vivamus feugiat finibus lorem, convallis venenatis orci pellentesque vel. Fusce convallis viverra rutrum. Quisque lacinia sem consectetur, sodales erat eget, tempor mauris. Vivamus feugiat finibus lorem, convallis venenatis orci pellentesque vel.
                        </p>
    
                        <p class="mb-5"> Here is what you will discover: </p>
    
                        <ol class="m-0 p-0">
                            <li class="mb-5 relative pl-14 lg:pl-16">
                                <span class="absolute left-0 top-0 block w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center bg-green-500 text-white font-semibold rounded-full shadow-xl">1</span>
                                <p class="mb-0">
                                    <strong>Fusce convallis viverra rutrum:</strong> Quisque lacinia sem consectetur, sodales erat eget, tempor mauris. Vivamus feugiat finibus lorem, convallis venenatis orci pellentesque vel.
                                </p>
                            </li>
                            <li class="mb-5 relative pl-14 lg:pl-16">
                                <span class="absolute left-0 top-0 block w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center bg-green-500 text-white font-semibold rounded-full shadow-xl">2</span>
                                <p class="mb-0">
                                    <strong>Mauris elementum massa dolor, sit amet luctus:</strong> Sapien finibus vel donec a feugiat nibh. Mauris at nisl convallis, porta purus quis, molestie tortor. Suspendisse dictum nunc nec pretium consectetur.
                                </p>
                            </li>
                            <li class="mb-5 relative pl-14 lg:pl-16">
                                <span class="absolute left-0 top-0 block w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center bg-green-500 text-white font-semibold rounded-full shadow-xl">3</span>
                                <p class="mb-0">
                                    <strong>Fusce convallis viverra rutrum:</strong> Quisque lacinia sem consectetur, sodales erat eget, tempor mauris. Vivamus feugiat finibus lorem, convallis venenatis orci pellentesque vel.
                                </p>
                            </li>
                            <li class="mb-5 relative pl-14 lg:pl-16">
                                <span class="absolute left-0 top-0 block w-9 h-9 lg:w-11 lg:h-11 flex items-center justify-center bg-green-500 text-white font-semibold rounded-full shadow-xl">4</span>
                                <p class="mb-0">
                                    <strong>Mauris elementum massa dolor, sit amet luctus:</strong> Sapien finibus vel donec a feugiat nibh. Mauris at nisl convallis, porta purus quis, molestie tortor. Suspendisse dictum nunc nec pretium consectetur.
                                </p>
                            </li>
                        </ol>
    
                        <p class="mb-5">Fusce convallis viverra rutrum. Quisque lacinia sem consectetur, sodales erat eget, tempor mauris. Vivamus feugiat finibus lorem, convallis venenatis orci pellentesque vel. Fusce convallis viverra rutrum. Quisque lacinia sem consectetur, sodales erat eget, tempor mauris. Vivamus feugiat finibus lorem, convallis venenatis orci pellentesque vel.</p>
    
                        <form method="POST" action="" id="offer-form" class="kk-validation">
                            <div class="mb-4 relative">
                                <label class="sr-only" for="name">Full Name:</label>
                                <span class="w-5 absolute top-4 left-5">
                                    <img class="w-full" src="icon-name.svg"/>
                                </span>
                                <input type="text" class="h-14 w-full bg-white text-black lg:text-xl border-0 shadow-lg pl-14 rounded-md autofill:bg-white autofill:bg-none autofill:text-black" name="name" id="name" placeholder="Name" required />
                            </div>
    
                            <div class="mb-4 relative">
                                <label class="sr-only" for="email">Email Address:</label>
                                <span class="w-5 absolute top-5 left-5">
                                    <img class="w-full" src="icon-email.svg"/>
                                </span>
                                <input type="email" class="h-14 w-full bg-white text-black lg:text-xl border-0 shadow-lg pl-14 rounded-md autofill:bg-white autofill:bg-none autofill:text-black" name="email" id="email" placeholder="Email" required />
                            </div>
    
                            <div class="mb-4 relative">
                                <label class="sr-only" for="phone">Phone Number:</label>
                                <span class="w-5 absolute top-5 left-5">
                                    <img class="w-full" src="icon-phone.svg"/>
                                </span>
                                <input type="tel" class="h-14 w-full bg-white text-black lg:text-xl border-0 shadow-lg pl-14 rounded-md autofill:bg-white autofill:bg-none autofill:text-black" name="phone" id="phone" placeholder="Phone Number*" required />
                            </div>
    
                            <div class="mb-4 relative">
                                <label class="sr-only" for="message">Message:</label>
                                <span class="w-5 absolute top-4 left-5">
                                    <img class="w-full" src="icon-message.svg"/>
                                </span>
                                <textarea class="h-44 w-full bg-white text-black lg:text-xl border-0 shadow-lg pl-14 pt-3 rounded-md autofill:bg-white autofill:bg-none autofill:text-black" name="message" id="message" placeholder="Have questions?" required></textarea>
                            </div>
    
                            <input type="submit" class="inline-block w-full border-0 rounded-md lg:text-xl tracking-widest uppercase tracking-wide px-3 py-4 lg:py-6 whitespace-normal cursor-pointer bg-green-400 text-black transition duration-500  hover:no-underline hover:bg-green-400/80 hover:text-black" value="Claim Your Free Consultation">
    
                            <div class="form-messages mt-5  [&.error]:text-red-500 [&.success]:text-green-600 empty:hidden text-center" ></div>
                        </form>
    
                    </div>
                </div>
            </div>
        </section>
    `;
};
