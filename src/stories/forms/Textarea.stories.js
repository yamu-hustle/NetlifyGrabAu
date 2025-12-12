export default {
    title: 'Form Elements/Textarea',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'These examples show a few different styles of textarea inputs.'
            }
        }
    }
}

export const Textarea = () => {
    return `
        <div>
            <label for="OrderNotes" class="block text-sm font-medium text-gray-700"> Order notes </label>

            <textarea
                id="OrderNotes"
                class="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                rows="4"
                placeholder="Enter any additional order notes..."
            ></textarea>
        </div>
    `;
};