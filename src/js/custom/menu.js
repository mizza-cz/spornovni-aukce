(function () {
  const toggler = document.querySelector(".menu-toggler");
  const menu = document.querySelector(".main-menu");
  const header = document.querySelector(".main-header");
  const links = document.querySelectorAll(".menu-link");

  const classNames = {
    visible: "visible",
    menuVisible: "menu-visible",
  };

  /**
   * Shows menu
   */
  const showMenu = () => {
    menu.classList.add(classNames.visible);
    toggler.setAttribute("aria-expanded", true);
    document.body.classList.add(classNames.menuVisible);
    document.body.style.overflowY = "hidden";
  };

  /**
   * Hides menu
   */
  const hideMenu = () => {
    menu.classList.remove(classNames.visible);
    toggler.setAttribute("aria-expanded", false);
    document.body.classList.remove(classNames.menuVisible);
    document.body.style.overflowY = "auto";
    hideAllSubmenus();
  };

  /**
   * Hides shown menu when click outside
   * @param {MouseEvent} e
   */
  const handleOutsideClick = (e) => {
    if (
      !toggler.contains(e.target) &&
      !menu.contains(e.target) &&
      document.body.classList.contains("menu-visible")
    )
      hideMenu();
  };

  /**
   * Hides shown submenu
   * @param {HTMLElement} link
   * @param {HTMLElement} submenu
   * @param {("hide"|"show")} action
   */
  const toggleSubmenu = (link, submenu, action) => {
    if (link && submenu) {
      // update link
      link.setAttribute("aria-expanded", action === "show" ? true : false);
      // update submenu
      if (action === "show") {
        submenu.classList.add(classNames.visible);
      } else {
        submenu.classList.remove(classNames.visible);
      }
    }
  };

  const hideAllSubmenus = () => {
    const submenus = document.querySelectorAll(
      `.submenu.${classNames.visible}`
    );
    const links = document.querySelectorAll('.menu-link[aria-expanded="true"]');
    for (let i = 0; i < links.length; i++) {
      toggleSubmenu(links[i], submenus[i], "hide");
    }
  };

  /**
   * Handles click on menu-link
   * @param {MouseEvent} e
   */
  const handleLinkClick = (e) => {
    const link = e.currentTarget;
    // has the link submenu?
    const submenu = link.nextElementSibling;
    if (submenu) {
      const href = e.currentTarget.getAttribute("href");
      if (href && href !== "#") return;

      e.preventDefault();

      // hide if it's clicked on shown submenu
      if (link.getAttribute("aria-expanded") === "true") {
        toggleSubmenu(link, submenu, "hide");
      } else {
        // hide all shown submenus
        hideAllSubmenus();
        // show clicked submenu
        toggleSubmenu(link, submenu, "show");
      }
    }
  };

  /**
   * Handle click on menu toggler
   */
  const handleTogglerClick = () => {
    // menu is hidden, show it
    if (toggler.getAttribute("aria-expanded") === "false") {
      showMenu();
      return;
    }
    // menu is shown, hide it
    hideMenu();
  };

  /**
   * Event handlers
   */
  document.addEventListener("click", handleOutsideClick);

  toggler.addEventListener("click", handleTogglerClick);

  links.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });
})();
