export default {
    title: 'Design Elements/Comparison Table',
}

export const ComparisonTable = () => {
    return `
        <section class="py-16 md:py-24 lg:py-28">
            <div class="container px-4">
                <div class="flex flex-wrap justify-center items-center justify-center">
                    <div class="w-full xl:w-10/12">
                        <table class="bg-white rounded-md text-left">
                            <tbody>
                            <tr class="border-b-2 border-gray-200 uppercase text-sm lg:text-lg xl:text-xl">
                                <th class="w-[40%] p-3 md:p-5 align-middle ">
                                    Feature
                                </th>
                                <th class="w-[20%] p-3 md:p-5 align-middle text-center bg-indigo-900 relative before:absolute before:w-full before:left-0 before:h-10 before:bg-indigo-900 before:-top-4 before:rounded-r-lg before:rounded-l-lg">
                                    <img class="w-full w-10/12" src="logo.svg"/>
                                </th>
                                <th class="w-[20%] p-3 md:p-5 align-middle text-center">
                                    Other Jewelry Stores
                                </th>
                                <th class="w-[20%] p-3 md:p-5 align-middle text-center">
                                    Third Option
                                </th>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    One-Of-A-Kind Rings
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                                <td class="w-[20%] text-center">X</td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    High Quality Stones
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                                <td class="w-[20%] text-center">X</td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    G.I.A Certified Diamonds
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class=" text-center">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    Personalised, One-On-One Time
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class=" text-center">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    Lifetime Warranty
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                                <td class="w-[20%] text-center">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    Hassle Free Refunds and Returns
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                                <td class="w-[20%] text-center">X</td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    Free Ring Resizing
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    Natural and Lab Grown Diamonds
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                                <td class="w-[20%] text-center">X</td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    Lifetime Diamond Upgrades
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                                <td class="w-[20%] text-center">X</td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    100% Satisfaction Guarantee
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                                <td class="w-[20%] text-center">X</td>
                            </tr>
                            <tr class="border-b-2 border-gray-200">
                                <th class="w-[20%] p-3 md:p-5 font-normal lg:text-xl align-middle">
                                    Diamond Price-Beat Promise
                                </td>
                                <td class="w-[20%] text-center bg-indigo-900 relative before:absolute before:w-full before:left-0 before:h-[130%] before:bg-indigo-900 before:top-0 before:rounded-t-lg before:rounded-l-lg before:rounded-r-md">
                                    <img class="w-7 inline-block relative z-20" src="icon-check.svg" alt="Icon check"/>
                                </td>
                                <td class="w-[20%] text-center">X</td>
                                <td class="w-[20%] text-center">
                                    <img class="w-7 inline-block" src="icon-check.svg" alt="Icon check"/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    `
};
