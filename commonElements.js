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
                <a href="index.html"><div class="navButton">🏡 Home</div></a>
                <a href="waterwell.html"><div class="navButton">🌊 Water Well Project</div></a>

                <div id="footer">
                    <div id="darkThemeToggle">Dark Theme</div>
                    <div><span id="year">2021</span> RAW TALK</div>
                    <div id="businessInquiry">For business inquiry, <br>
                        please contact Zakaria at <br>+44 774 928 4101</div>
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