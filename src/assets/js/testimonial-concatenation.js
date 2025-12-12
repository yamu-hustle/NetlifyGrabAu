export default function testimonialTrim() {
    let quotes = document.querySelectorAll('.swiper blockquote p');

    quotes.forEach(quote => {
        let words = quote.textContent.split(' ');

        if (words.length > 100) {
            let displayedText = words.slice(0, 100).join(' ');
            let hiddenText = words.slice(100).join(' ');
            let moreLink = document.createElement('a');
            let lessLink = document.createElement('a');

            moreLink.classList.add('text-green-500');
            lessLink.classList.add('text-green-500');

            moreLink.textContent = 'Read More';
            lessLink.textContent = 'Show Less';

            moreLink.href = '#!';
            moreLink.style.display = 'block';  // Changed to block
            lessLink.href = '#!';
            lessLink.style.display = 'none';

            quote.innerHTML = displayedText;
            quote.appendChild(moreLink);

            let fullTextContainer = document.createElement('span');  // Changed to span for inline
            fullTextContainer.innerHTML = hiddenText;
            fullTextContainer.style.display = 'none';
            quote.appendChild(fullTextContainer);
            quote.appendChild(lessLink);

            moreLink.addEventListener('click', function (e) {
                e.preventDefault();
                fullTextContainer.style.display = 'inline';  // Changed to inline
                lessLink.style.display = 'block';  // Changed to block
                moreLink.style.display = 'none';
            });

            lessLink.addEventListener('click', function (e) {
                e.preventDefault();
                fullTextContainer.style.display = 'none';
                lessLink.style.display = 'none';
                moreLink.style.display = 'block';  // Changed to block
            });
        }
    });
}
