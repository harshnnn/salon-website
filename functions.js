  var contactBtnSm = document.querySelector('.contact-btn-sm');
  var contactBtnLg = document.querySelector('.contact-btn-lg');
  contactBtnSm.addEventListener('click', () => {
    window.location.href = 'tel:' + 5095470580
  })
  contactBtnLg.addEventListener('click', () => {
    window.location.href = 'tel:' + 5095470580
  })
// Function to toggle menu visibility
const navList = document.getElementById('navList');

function toggleMenu() {
    navList.classList.toggle('mobNav');
}

// Toggle menu when burger icon is clicked
document.getElementById('menuToggleBtn').addEventListener('click', toggleMenu);


function scrollToPrices() {
    const pricesSection = document.getElementById('content5');
    pricesSection.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('pricesLink').addEventListener('click', scrollToPrices);

function scrollToServices() {
    const servicesSection = document.getElementById('content2');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('servicesLink').addEventListener('click', scrollToServices);


function scrollToGallery() {
    const servicesSection = document.getElementById('content7');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('galleryLink').addEventListener('click', scrollToGallery);


function scrollToAboutus() {
    const servicesSection = document.getElementById('content3');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('aboutusLink').addEventListener('click', scrollToAboutus);





  // function handleCallClick() {
  //     // Define the phone number
  //     var phoneNumber = "5095470580";

  //     // Call the phone number
  //     window.location.href = "tel:" + phoneNumber;
  // }

  // Function to check if an element is in viewport
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle opacity and transform
  function handleOpacityAndTransform() {
    var cardLeft = document.querySelector('.card-left');
    var cardImg = document.querySelector('.card-img');
    var cardInfoLeft = document.querySelector('.card-info-left');


    if (isInViewport(cardLeft)) {

      cardImg.style.opacity = 1;
      cardInfoLeft.style.opacity = 1;
      cardImg.style.transform = 'translateX(0)';
      cardInfoLeft.style.transform = 'translateX(0)';
    }


  }

  // Call the function initially
  handleOpacityAndTransform();

  // Add scroll event listener to check when elements come into view
  window.addEventListener('scroll', function () {
    handleOpacityAndTransform();
  })



  //content-5
  document.addEventListener('DOMContentLoaded', function () {
    // Sample data
    //var items = ["Item 1", "Item 2", "Item 3"];
    //var content = ["Content for Item 1", "Content for Item 2", "Content for Item 3"];
    var items = [
      'Haircut & Style',
      'Color Services',
      'Facial',
      'Hair Removal',
    ];
    var content = [
      `<div class='list-1-detail'>
        <div class='detail-1'>
            <p class='list-detail-heading'>Haircut <br /> $28</p>
            <p class='list-detail-content'>Consult with our stylists to create a look that compliments your features and accents your personal style. </p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Barber Cut <br /> $35</p>
            <p class='list-detail-content'>Our expert barbers specialize in short hairstyles for women. Tailored, polished pixie cut or other short style.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Shampoo & Cut <br /> $35</p>
            <p class='list-detail-content'>Shampoo and precision haircut, Hair is cleansed, conditioned and cut wet for an impeccable look</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Shampoo, Cut & Style <br /> $40</p>
            <p class='list-detail-content'>Shampoo, expert cut and styling for a tailored, polished look.</p>
        </div>
    </div>`,

      `<div class='list-1-detail'>
        <div class='detail-1'>
            <p class='list-detail-heading'>Root Touch Up <br />$55</p>
            <p class='list-detail-content'>Our expert colorists precisely touch up your roots with high-quality color for a fresh, seamless look.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>All-over Color <br />Starting at $65</p>
            <p class='list-detail-content'>Update your entire hair color for a bold, vibrant look. Our colorists use high-quality color and the latest techniques.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Gloss <br />Starting at $30</p>
            <p class='list-detail-content'>Enhance shine and refresh faded color with a gloss treatment. Leaves hair vibrant, hydrated and healthy looking.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Toning <br />$30</p>
            <p class='list-detail-content'>Correct and neutralize unwanted color tones. Our expert color toning services restore your hair's natural vibrancy.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Accent Highlight/Balayage <br />$70</p>
            <p class='list-detail-content'>Add dimension with subtle, natural-looking highlights placed throughout the mid-lengths and ends.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Partial Highlight/Balayage <br />$120</p>
            <p class='list-detail-content'>Brighten and add depth to your hair with highlights focused on the top and crown area for a sunshine effect.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Full Highlight/Balayage <br />$170</p>
            <p class='list-detail-content'>Completely transform your look with highlights throughout for radiant, multi-dimensional color from roots to ends.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>All Over Bleach <br />$70</p>
            <p class='list-detail-content'>Lighten hair multiple shades with an all over bleach for a dramatic color transformation.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Specialty Color <br />Price Varies</p>
            <p class='list-detail-content'>Vibrant fashion shades like pastels, neons, or ombré. Consult on customized specialty coloring services and pricing.</p>
        </div>
    </div>`,

      `<div class='list-1-detail'>
        <div class='detail-1'>
            <p class='list-detail-heading'>Express Facial <br />$35</p>
            <p class='list-detail-content'>Deep cleanse, exfoliate, and hydrate your skin with this quick pick-me-up facial.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Papaya Facial <br />$50</p>
            <p class='list-detail-content'>Reveal bright, youthful skin with this antioxidant and Vitamin C enriched facial.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Aloe & Cucumber Facial <br />$50</p>
            <p class='list-detail-content'>Soothe and deeply hydrate dry skin with this cooling, calming facial.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>English Rose Facial <br />$50</p>
            <p class='list-detail-content'>Gently purify while combating breakouts with this clarifying rose facial.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Gold Facial <br />$70</p>
            <p class='list-detail-content'>Replenish your skin with ultra-hydrating and nourishing gold extracts.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Diamond Facial <br />$70</p>
            <p class='list-detail-content'>Resurface and renew with this results-driven facial using diamond powder.</p>
        </div>
    </div>`,

      `<div class='list-1-detail'>
        <div class='detail-1'>
            <p class='list-detail-heading'>Full Face <br />$35</p>
            <p class='list-detail-content'>Remove unwanted facial hair quickly and effectively with waxing.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Eyebrow <br />$10</p>
            <p class='list-detail-content'>Get perfectly shaped brows with precision hair removal by threading.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Upper Lip <br />$6</p>
            <p class='list-detail-content'>Gently remove upper lip hair through threading for smooth results.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Forehead <br />$6</p>
            <p class='list-detail-content'>Remove unwanted forehead and hairline hair with precision threading.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Cheeks <br />$6</p>
            <p class='list-detail-content'>Define your cheeks and jawline by removing unwanted facial hair through threading.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Chin <br />$6</p>
            <p class='list-detail-content'>Shape your chin area with unwanted hair removal by threading.</p>
        </div>
        <div class='detail-1'>
            <p class='list-detail-heading'>Side Burns <br />$8</p>
            <p class='list-detail-content'>Clean up and define sideburns with precision threading services.</p>
        </div>
    </div>`
    ];

    let selectedItem = 0;
    let isExpanded = false;

    function handleItemClick(index) {
        selectedItem = index;
        renderSelectedItemContent();
        renderList();
    }

    function toggleList() {
        isExpanded = !isExpanded;
        renderList();
    }

    function renderList() {
        const listTitle = document.getElementById('listTitle');
        const listGroupContent = document.getElementById('listGroupContent');
    
        listTitle.innerHTML = '';
        listGroupContent.innerHTML = '';
    
        items.forEach(function (item, index) {
            const li = document.createElement('li');
            li.textContent = item;
            if (selectedItem === index) {
                li.classList.add('selected');
            }
            li.addEventListener('click', function () {
                handleItemClick(index);
                // Remove 'selected' class from all list items
                // document.querySelectorAll('#listTitle li').forEach(function (item) {
                //     item.classList.remove('selected');
                // });
                // Add 'selected' class to the clicked list item
                li.classList.add('selected');
            });
            listTitle.appendChild(li);
    
            const liContent = document.createElement('li');
            liContent.innerHTML = content[index];
            liContent.addEventListener('click', function () {
                handleItemClick(index);
            });
            listGroupContent.appendChild(liContent);
        });
    
        const toggleListBtn = document.getElementById('toggleList');
        toggleListBtn.addEventListener('click', toggleList);
    
        const chevronIcon = document.getElementById('chevronIcon');
        chevronIcon.textContent = isExpanded ?  '▶' : '▼';
    
        // const hiddenText = document.getElementById('hiddenText');
        // hiddenText.style.visibility = isExpanded ? 'visible' : 'hidden';
    
        // Add or remove class to listGroupContent based on isExpanded
        listTitle.classList.toggle('hidden', isExpanded);
    }
    

    function renderSelectedItemContent() {
        const selectedItemContent = document.getElementById('selectedItemContent');
        selectedItemContent.innerHTML = '';
        if (selectedItem !== null) {
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = content[selectedItem];
            selectedItemContent.appendChild(contentDiv);
        }
    }

    function openExternalLink() {
        window.open('https://thehaircompanypsc.square.site/', '_blank');
    }

    const bookSlotBtn = document.getElementById('bookSlotBtn');
    const bookBtn = document.getElementById('bookBtn');
    bookSlotBtn.addEventListener('click', openExternalLink);
    bookBtn.addEventListener('click', openExternalLink);

    renderList();
    renderSelectedItemContent();
});

//Animations
// Select the target element
 const targetElement1 = document.getElementById('content3');
 const leftAnimation = document.getElementById('content3left');
 const rightAnimation = document.getElementById('content3right')


// Set up the Intersection Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            leftAnimation.classList.add('postAnimationLeft');
            rightAnimation.classList.add('postAnimationRight');
            
            observer.unobserve(entry.target);
        }
    });
});

// Start observing the target element
observer.observe(targetElement1); 

// Set up the Intersection Observer for content2id1
const targetElement2id1 = document.getElementById('content2id1');
const leftAnimation2id1 = document.getElementById('content2id1');
const rightAnimation2id1 = document.getElementById('content2id2');

const observer2id1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            leftAnimation2id1.classList.add('postAnimationLeft');
            rightAnimation2id1.classList.add('postAnimationRight');
            
            observer2id1.unobserve(entry.target);
        }
    });
});

observer2id1.observe(targetElement2id1);

// Set up the Intersection Observer for content2id2
const targetElement2id2 = document.getElementById('content2id2');
const leftAnimation2id2 = document.getElementById('content2id2');
const rightAnimation2id2 = document.getElementById('content2id3');

const observer2id2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            leftAnimation2id2.classList.add('postAnimationLeft');
            rightAnimation2id2.classList.add('postAnimationRight');
            
            observer2id2.unobserve(entry.target);
        }
    });
});

observer2id2.observe(targetElement2id2);

// Set up the Intersection Observer for content2id3
const targetElement2id3 = document.getElementById('content2id3');
const leftAnimation2id3 = document.getElementById('content2id3');

const observer2id3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            leftAnimation2id3.classList.add('postAnimationLeft');
            
            observer2id3.unobserve(entry.target);
        }
    });
});

observer2id3.observe(targetElement2id3);

const targetElement3 = document.getElementById('content8');
const leftAnimation8 = document.getElementById('content8left');
const rightAnimation8 = document.getElementById('content8right');

const observer3 = new IntersectionObserver(entries =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            leftAnimation8.classList.add('postAnimationLeft');
            rightAnimation8.classList.add('postAnimationRight');
            observer3.unobserve(entry.target);
        }
    })
})

observer3.observe(targetElement3)
