/** @type { import('@storybook/html').Preview } */
import DocumentationTemplate from './DocumentationTemplate.mdx';
import '../src/assets/css/main.scss';
import '../src/assets/js/main.js';

document.body.classList.add('antialiased');
document.body.classList.add('group/body');

const preview = {
    parameters: {
        docs: {
            // theme: kkTheme,
            page: DocumentationTemplate,
            toc: false, // 👈 Enables the table of contents
            autodocs: true, // 👈 Enables the autodocs
            source: {
                state: 'open', // 👈 This will ensure the source code panel is always open
            },
        },
    },
};
   
export default preview;


// 👇 This is the custom decorator that will remove the `sb-main-padded` class from the body element
const removePaddingClass = (storyFn) => {
    // Remove the `sb-main-padded` class from the body element
    document.body.classList.remove('sb-main-padded');
  
    // Return the story
    return storyFn();
};

// Add the custom decorator globally using the decorators array
export const decorators = [removePaddingClass];
