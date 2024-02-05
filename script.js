document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('text-input');
    const counterInfo = document.getElementById('counter-info');

    textInput.addEventListener('input', debounce(updateCounts, 300));

    function updateCounts() {
        const text = textInput.value;
        const counts = getCounts(text);

        for (const [counterId, count] of Object.entries(counts)) {
            const counterItem = document.getElementById(counterId);
            if (counterItem) {
                counterItem.querySelector('span').textContent = count;
            }
        }
    }

    function getCounts(text) {
        return {
            'word-count': countWords(text),
            'char-count': text.length,
            'line-count': countLines(text),
        };
    }

    function countWords(text) {
        const words = text.split(/\s+/).filter(word => word.length > 0);
        return words.length;
    }

    function countLines(text) {
        return text.split(/\r\n|\r|\n/).filter(line => line.length > 0).length;
    }

    function debounce(func, delay) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
});
