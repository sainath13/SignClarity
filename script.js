// fetch('https://icanhazdadjoke.com/slack')
//     .then(data => data.json())
//     .then(jokeData => {
//         const jokeText = jokeData.attachments[0].text;
//         const jokeElement = document.getElementById('jokeElement');

//         jokeElement.innerHTML = jokeText;
//     })
const summaryElement = document.getElementById('summary');
const button = document.getElementById('legalSimplificationButton');
const content = document.getElementById('legalSimplificationContent');
const summaryPage = document.getElementById("summaryPage");

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    console.log(url)
    if(url.startsWith('https://app.hellosign.com/')){
        const jokeElement = document.getElementById('summary');
        jokeElement.innerHTML = "YESSSSS"
    }
    else{
        const jokeElement = document.getElementById('summary');
        jokeElement.innerHTML = "NOOOOOOOO"
    }
    fetch('http://0.0.0.0:8000/default/0a9ad55670de6a3efc65d855ac9ed885b5198997')
        .then(data => data.json())
        .then(result => {
            const summary = result.summary;
            summaryElement.innerHTML = summary;
        })
    
});

const tagLinks = document.querySelectorAll('.tag.is-link');
const tagDescription = document.getElementById('tagDescription');
const returnToAllTags = document.getElementById('returnToAllTags');

tagLinks.forEach(tagLink => {
    tagLink.addEventListener('click', () => {
        content.style.display = 'none';
        const tagDetails = tagLink.getAttribute('data-tag-details');
        // Set the tag description content
        tagDescription.textContent = tagDetails;
        // Show the tag details and the "Return to All Tags" button
        document.getElementById('tagDetails').style.display = 'block';
        // returnToAllTags.style.display = 'block';
        // Hide the delete button for the clicked tag
        // tagLink.nextElementSibling.style.display = 'none';
        
    });
});

// JavaScript for returning to all tags
returnToAllTags.addEventListener('click', () => {
    // Show all tags
    // tagLinks.forEach(tag => tag.nextElementSibling.style.display = 'block');
    // Hide the tag details and the "Return to All Tags" button
    // document.getElementById('tagDetails').style.display = 'none';
    // returnToAllTags.style.display = 'none';
    content.style.display = 'block';
    document.getElementById('tagDetails').style.display = 'none';
    
});

button.addEventListener('click', () => {
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        summaryPage.style.display = 'none'
    } else {
        content.style.display = 'none';
        summaryPage.style.display = 'block'
    }
});
