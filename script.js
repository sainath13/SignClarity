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
        const summaryElement = document.getElementById('summary');
        summaryElement.innerHTML = "YESSSSS"
    }
    else{
        const summaryElement = document.getElementById('summary');
        summaryElement.innerHTML = "NOOOOOOOO"
    }
    fetch('http://0.0.0.0:8000/default/0a9ad55670de6a3efc65d855ac9ed885b5198997')
        .then(data => data.json())
        .then(result => {
            const summary = result.summary;
            summaryElement.innerHTML = summary;
            const tagHolder = document.getElementById('tagHolder');

            result.originalTexts.forEach(text => {
                console.log("creating tag for {}", text.title);
                const tagControl = document.createElement('div');
                tagControl.className = 'control';

                const tagDiv = document.createElement('div');
                tagDiv.className = 'tags has-addons';

                const tagLink = document.createElement('a');
                tagLink.className = 'tag is-link';
                tagLink.setAttribute('data-tag-details', text.title); // Use title as tag details

                tagLink.textContent = text.title; // Set tag text

                tagDiv.appendChild(tagLink);
                tagControl.appendChild(tagDiv);

                tagHolder.appendChild(tagControl);
            });
        
            const tagLinks = document.querySelectorAll('.tag.is-link');
            console.log("tag links is {}", tagLinks)
            tagLinks.forEach(tagLink => {
                tagLink.addEventListener('click', () => {
                    console.log("cliked on a tag link");
                    content.style.display = 'none';
                    const tagDetails = tagLink.getAttribute('data-tag-details');
                
                    tagDescription.textContent = tagDetails;
                    tagHolder.style.display = 'block'
                    document.getElementById('tagDetails').style.display = 'block';
                    document.getElementById('tagDescriptionName').text = tagDetails;
                    
                });
            });
            
            returnToAllTags.addEventListener('click', () => {
                console.log("cliked on return all");
                content.style.display = 'block';
                document.getElementById('tagDetails').style.display = 'none';
                
            });
    })
});

const tagDescription = document.getElementById('tagDescription');
const returnToAllTags = document.getElementById('returnToAllTags');



button.addEventListener('click', () => {
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        summaryPage.style.display = 'none'
    } else {
        content.style.display = 'none';
        summaryPage.style.display = 'block'
    }
});
