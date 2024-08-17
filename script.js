function initializeProjectSelection() {
    $('.project').click(function() {
        var $details = $(this).find('.details');
        $('.details').not($details).removeClass('open').css('max-height', '0');
        $details.addClass('open').css('max-height', $details[0].scrollHeight + 'px');
        $('.project').removeClass('open'); // remove the open class from all projects
        $(this).addClass('open'); // add the open class to the clicked project
    });
}

// Function to initialize the Slick slider
function initializeSlickSlider() {
    $('.slideshow').slick({
        infinite: true,
        dots: true,
        centerMode: false,
        variableWidth: false,
        speed: 400,
    });
}

function initializeContentScripts() {
    initializeSlickSlider();
    initializeProjectSelection();
}

document.addEventListener("DOMContentLoaded", function() {
    const typingElement = document.getElementById('typing');
    const text = typingElement.textContent; // Get the text
    typingElement.textContent = ''; // Clear the initial text

    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text[index];
            index++;
            setTimeout(type, 100); // Adjust the speed of typing
        }
    }

    type();
});

function loadContent(page) {
    const mainContent = document.getElementById('main-content');

    // Add the fade-out and scaling down effect
    mainContent.classList.add('fade-out');
    mainContent.classList.remove('fade-in', 'bounce');

    setTimeout(() => {
        // Fetch the new content
        fetch(page)
            .then(response => response.text())
            .then(data => {
                // Parse the new HTML content
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const newContent = doc.querySelector('main').innerHTML;

                // Replace the old content with the new content
                mainContent.innerHTML = newContent;

                // Re-initialize scripts for new content, if necessary
                initializeContentScripts();

                // Add the fade-in and bounce effect
                mainContent.classList.add('fade-in', 'bounce');
                mainContent.classList.remove('fade-out');
            })
            .catch(error => {
                console.error('Error loading content:', error);
                mainContent.classList.remove('fade-out'); // Ensure the main content fades back in even if there's an error
            });
    }, 50); // Adjust this timeout to match the fade-out duration
}




// Handle navigation clicks
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('href');
        loadContent(page);
    });
});

// Initial content script call when the document is ready
document.addEventListener("DOMContentLoaded", function() {
    initializeContentScripts();
});
