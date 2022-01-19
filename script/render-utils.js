import { fetchAllRecipes, getUser } from './fetch-utils.js';

const loggedOutButtons = document.querySelector('.login-div');
const loggedInButton = document.querySelector('.logged-in-div');

export const renderHeader = async() => {
    const user = await getUser();
    if (user) {
        loggedInButton.classList.remove('visibility');
        loggedOutButtons.classList.add('visibility');
    } else {
        loggedInButton.classList.add('visibility');
        loggedOutButtons.classList.remove('visibility');
    }
};

export async function renderRecipes() {
    const recipes = await fetchAllRecipes();


    const postCardsContainer = document.querySelector('.post-cards-container');
    postCardsContainer.textContent = '';
    
    for (let recipe of recipes) {
        const postCardSection = document.createElement('section');
        postCardSection.classList.add('post-card');
        const sidebarDiv = document.createElement('div');
        sidebarDiv.classList.add('side-bar');
        const arrowUpButton = document.createElement('p');
        arrowUpButton.classList.add('arrow', 'up');
        const arrowDownButton = document.createElement('p');
        arrowDownButton.classList.add('arrow', 'down');
        const counterP = document.createElement('p');
        counterP.classList.add('counter');

        arrowDownButton.textContent = '▼';
        arrowUpButton.textContent = '▲';
        counterP.textContent = recipe.rating;

        sidebarDiv.append(arrowUpButton, counterP, arrowDownButton);

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-div');
        const userImage = document.createElement('img');
        userImage.classList.add('user-img');
        userImage.src = '../assets/nick.png';
        const timeStamp = document.createElement('p');
        timeStamp.classList.add('created-at');

        userDiv.append(userImage, timeStamp);
    
        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title');

        const imgOrText = document.createElement('div');
        imgOrText.classList.add('img-or-text');
        if (!recipe.image && !recipe.description) {
            imgOrText.classList.add('nothing');
        } else if (!recipe.image) {
            imgOrText.textContent = recipe.description;
        } else {
            imgOrText.style.backgroundImage = '';
        }
    
        timeStamp.textContent = recipe.created_at;
        cardTitle.textContent = recipe.name;
        cardInner.append(userDiv, cardTitle, imgOrText);
        postCardSection.append(sidebarDiv, cardInner);
        postCardsContainer.append(postCardSection);
    }
}