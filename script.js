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
const loadingScreen = document.getElementById('loadingScreen');

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
    loadingScreen.style.display = 'block';
    fetch('http://0.0.0.0:8000/default/0a9ad55670de6a3efc65d855ac9ed885b5198997')
        .then(data => data.json())
        .then(result => {
            const summary = result.summary;
            summaryElement.innerHTML = summary;

            loadingScreen.style.display = 'none';
            const tagHolder = document.getElementById('tagHolder');
            result.originalTexts.forEach(text => {
                console.log("creating tag for {}", text.title);
                const tagControl = document.createElement('div');
                tagControl.className = 'control';
                const tagDiv = document.createElement('div');
                tagDiv.className = 'tags has-addons';
                const tagLink = document.createElement('a');
                tagLink.className = 'tag is-link';
                tagLink.setAttribute('data-tag-details', text.title);
                tagLink.setAttribute('data-description', text.detail);
                tagLink.textContent = text.title;
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
                    const description = tagLink.getAttribute('data-description');
                    loadingScreen.style.display = 'block';
                    fetch('http://0.0.0.0:8000/context', { 
                        method: 'POST', 
                        body: JSON.stringify({ title: description }), 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => response.json())
                    .then(detailSummary => {
                        console.log('detail summary is after api call', detailSummary);
                        loadingScreen.style.display = 'none';
                        tagDescription.textContent = tagDetails;
                        document.getElementById('tagDescriptionName').textContent = tagDetails;
                        tagDescription.textContent = detailSummary.summary;
                        document.getElementById('tagDetails').style.display = 'block';
                    })
                    .catch(error => {
                        console.error('Error fetching detail summary:', error);
                    });

                    // tagDescription.textContent = tagDetails;
                    // tagHolder.style.display = 'block'
                    // document.getElementById('tagDetails').style.display = 'block';
                    // document.getElementById('tagDescriptionName').text = tagDetails;
                    
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
