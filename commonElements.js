class MySidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="topBar">
                <div id="sideBarButton">
                    Menu
                </div>
                <div id="topBar__logo"></div>
            </div>

            <div id="modalCover"></div>

            <div id="sideBar">
                <a href="./"><div class="navButton">🏡 Home</div></a>
                <a><div class="navButton inactiveButton">📘 About Us <span class="comingSoon">coming soon</span></div></a>
                <a href="events"><div class="navButton">📅 Events</div></a>
                <a><div class="navButton inactiveButton">🧾 Blog <span class="comingSoon">coming soon</span></div></a>
                <a href="waterwell"><div class="navButton">🌊 Water Well Project</div></a>
                <a><div class="navButton inactiveButton">🍩 Donate <span class="comingSoon">coming soon</span></div></a>
                <a href="contactus"><div class="navButton">📞 Contact Us </div></a>

                <div id="footer">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSex7cgwwARzO6U1leDuoDIUw6SvdXmQ4l-VbvcbY610ZjthYA/viewform" target="_blank">
                        <div id="footer__needSupport">
                            <div id="footer__needSupport__container">Need Support?</div>
                        </div>
                    </a>
                    <div id="darkThemeToggle">Dark Theme</div>
                    <div><span id="year">2021</span> RAW TALK</div>
                </div>
            </div>
        `;

        // make current page navButton active
        let navButton = document.getElementsByClassName('navButton');
        let index = parseInt(this.getAttribute('data-navID'));
        navButton[index].classList.add('active');
    }
}

customElements.define('my-sidebar', MySidebar);

class MyCopyPaster extends HTMLElement {
    connectedCallback() {
        let copyText = this.getAttribute('data-copytext');
        this.innerHTML = '<div class="copyPaste" data-copytext="' + copyText + '" onclick="copyText(this)"></div><div class="copiedPopup">Copied</div>';
    }
}
if (!isiOS()) {
    customElements.define('my-copypaster', MyCopyPaster);
}

// check if it's iOS
function isiOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
}