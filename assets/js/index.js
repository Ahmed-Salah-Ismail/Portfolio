// ^ Write your JavaScript code here

// var darkMode = document.getElementById("theme-toggle-button");

// if (localStorage.getItem("darkMode") === "true") {
//   document.documentElement.classList.add("dark");
// } else {
//   document.documentElement.classList.remove("dark");
// }

// function toggleDarkMode() {
//   console.log("dark mode toggled");
//   document.documentElement.classList.toggle("dark");
//   var isDark = document.documentElement.classList.contains("dark");
//   localStorage.setItem("darkMode", isDark);
//   console.log(isDark);
// }

// darkMode.addEventListener("click", toggleDarkMode);

// Scroll to top button

var header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
  var currentSection = "";
  const headerHeight = header.offsetHeight;

  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      var sectionId = href.substring(1);
      var section = document.getElementById(sectionId);
      if (section) {
        var sectionTop = section.offsetTop - headerHeight;
        var sectionHeight = section.offsetHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = sectionId;
          break;
        }
      }
    }
  }

  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    var href = link.getAttribute("href");
    link.classList.remove("text-primary", "font-bold");
    link.classList.add("text-slate-600", "dark:text-slate-300");

    for (var j = 0; j < navLinks.length; j++) {
      var linkToUpdate = navLinks[j];
      var href = linkToUpdate.getAttribute("href");

      if (href === `#${currentSection}`) {
        // 1. اللينك النشط (اللي واقفين عليه)
        linkToUpdate.classList.remove("text-slate-600", "dark:text-slate-300");
        linkToUpdate.classList.add("text-primary", "font-bold");

        // إضافة الخط بالـ cssText
        linkToUpdate.style.cssText = `
        border-bottom: 2px solid currentColor;
        padding-bottom: 4px;
        transition: border-color 0.3s ease-in-out;
      `;
      } else {
        // 2. باقي اللينكات (الغير نشطة)
        linkToUpdate.classList.add("text-slate-600", "dark:text-slate-300");
        linkToUpdate.classList.remove("text-primary", "font-bold");

        // إخفاء الخط بجعله شفاف
        linkToUpdate.style.cssText = `
        border-bottom: 2px solid transparent;
        padding-bottom: 4px;
        transition: border-color 0.3s ease-in-out;
      `;
      }
    }
  }
});

// Filter portfolio items

var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");

function selectButton() {
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove(
          "active",
          "bg-linear-to-r",
          "from-primary",
          "to-secondary",
          "text-white",
        );
        filterButtons[j].classList.add(
          "bg-white",
          "dark:bg-slate-800",
          "text-slate-600",
          "dark:text-slate-300",
        );
      }

      this.classList.add(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );
      this.classList.remove(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
      );

      var filterValue = this.getAttribute("data-filter");

      for (var k = 0; k < portfolioItems.length; k++) {
        var itemCategory = portfolioItems[k].getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          portfolioItems[k].style.display = "block";
        } else {
          portfolioItems[k].style.display = "none";
        }
      }
    });
  }
}

selectButton();

// testimonials

var nextTestimonialBtn = document.getElementById("next-testimonial");
var prevTestimonialBtn = document.getElementById("prev-testimonial");
var testimonialsCarousel = document.getElementById("testimonials-carousel");
var cards = document.querySelectorAll(".testimonial-card");
var carouselIndicators = document.querySelectorAll(".carousel-indicator");
console.log(carouselIndicators);
var currentIndex = 0;

function nextTestimonial() {
  var cardWidth = cards[0].offsetWidth;
  var totalWidth = cards.length * cardWidth;
  var visibleWidth = testimonialsCarousel.parentElement.offsetWidth;
  var maxTranslate = totalWidth - visibleWidth;
  var nextTranslate = cardWidth * currentIndex;
  if (nextTranslate > maxTranslate) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  testimonialsCarousel.style.transform = `translateX(${cardWidth * currentIndex}px)`;
  for (var i = 0; i < carouselIndicators.length; i++) {
    var indicator = carouselIndicators[i];
    if (i === currentIndex) {
      indicator.classList.add("bg-primary");
      indicator.classList.remove("bg-slate-400", "dark:bg-slate-600");
    } else {
      indicator.classList.add("bg-slate-400", "dark:bg-slate-600");
      indicator.classList.remove("bg-primary");
    }
  }
}

function prevTestimonial() {
  var cardWidth = cards[0].offsetWidth;
  var totalWidth = cards.length * cardWidth;
  var visibleWidth = testimonialsCarousel.parentElement.offsetWidth;
  var maxTranslate = totalWidth - visibleWidth;
  if (currentIndex === 0) {
    currentIndex = Math.floor(maxTranslate / cardWidth);
  } else {
    currentIndex--;
  }
  testimonialsCarousel.style.transform = `translateX(${cardWidth * currentIndex}px)`;

  for (var i = 0; i < carouselIndicators.length; i++) {
    var indicator = carouselIndicators[i];
    if (i === currentIndex) {
      indicator.classList.add("bg-primary");
      indicator.classList.remove("bg-slate-400", "dark:bg-slate-600");
    } else {
      indicator.classList.add("bg-slate-400", "dark:bg-slate-600");
      indicator.classList.remove("bg-primary");
    }
  }
}

nextTestimonialBtn.addEventListener("click", nextTestimonial);
prevTestimonialBtn.addEventListener("click", prevTestimonial);

// scroll to top
var scrollToTopBtn = document.getElementById("scroll-to-top");
var heroSection = document.getElementById("hero-section");

function scrollToTop() {
  var totalHeight = header.offsetHeight + heroSection.offsetHeight;
  console.log(totalHeight);
  window.addEventListener("scroll", function () {
    if (window.scrollY >= totalHeight) {
      scrollToTopBtn.classList.remove("opacity-0", "invisible");
      scrollToTopBtn.classList.add("visible", "opacity-100");
    } else {
      scrollToTopBtn.classList.add("opacity-0", "invisible");
      scrollToTopBtn.classList.remove("visible", "opacity-100");
    }
  });
}
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
scrollToTop();

// ==========================================
// 6. القوائم المنسدلة (Custom Selects)
// ==========================================
var customSelects = document.querySelectorAll(".custom-select-wrapper");

customSelects.forEach(function (wrapper) {
  var selectBox = wrapper.querySelector(".custom-select");
  var optionsContainer = wrapper.querySelector(".custom-options");
  var options = wrapper.querySelectorAll(".custom-option");
  var selectedText = wrapper.querySelector(".selected-text");

  // بنجيب اسم القائمة عشان نربطها بالحقل المخفي
  var dataName = selectBox.getAttribute("data-name");
  var hiddenInput = document.getElementById("hidden-" + dataName);

  // 1. فتح وقفل القائمة لما تضغط عليها
  selectBox.addEventListener("click", function () {
    optionsContainer.classList.toggle("hidden");
    // تحديث أيقونة السهم
    var icon = selectBox.querySelector("i");
    icon.classList.toggle("rotate-180");
  });

  // 2. اختيار عنصر من القائمة
  options.forEach(function (option) {
    option.addEventListener("click", function () {
      var value = option.getAttribute("data-value");

      // تحديث النص الظاهر للمستخدم
      selectedText.textContent = option.textContent.trim();
      selectedText.classList.remove("text-slate-500", "dark:text-slate-400");
      selectedText.classList.add("text-slate-800", "dark:text-white");

      // تحديث قيمة الحقل المخفي عشان تتبعت لـ Formspree
      if (hiddenInput) {
        hiddenInput.value = value;
      }

      // قفل القائمة وتعديل السهم
      optionsContainer.classList.add("hidden");
      selectBox.querySelector("i").classList.remove("rotate-180");
    });
  });
});

// 3. قفل القائمة لو المستخدم ضغط في أي مكان تاني في الصفحة
document.addEventListener("click", function (e) {
  customSelects.forEach(function (wrapper) {
    if (!wrapper.contains(e.target)) {
      var optionsContainer = wrapper.querySelector(".custom-options");
      var icon = wrapper.querySelector(".custom-select i");

      optionsContainer.classList.add("hidden");
      icon.classList.remove("rotate-180");
    }
  });
});

//

// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Dark Mode ----------
  var darkModeButtons = document.querySelectorAll(".theme-toggle-button");

  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
    var isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
  }

  darkModeButtons.forEach((btn) => {
    btn.addEventListener("click", toggleDarkMode);
  });

  // ---------- Mobile Menu ----------
  const menuToggle = document.getElementById("menu-toggle");
  const menuToggleIcon = document.getElementById("menu-toggle-icon");
  const mobileMenuPanel = document.getElementById("mobile-menu-panel");

  menuToggle.addEventListener("click", () => {
    const isHidden = mobileMenuPanel.classList.contains("hidden");

    if (isHidden) {
      mobileMenuPanel.classList.remove("hidden");
      mobileMenuPanel.classList.add("flex");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggleIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
      mobileMenuPanel.classList.add("hidden");
      mobileMenuPanel.classList.remove("flex");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggleIcon.classList.replace("fa-xmark", "fa-bars");
    }
  });

  mobileMenuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuPanel.classList.add("hidden");
      mobileMenuPanel.classList.remove("flex");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggleIcon.classList.replace("fa-xmark", "fa-bars");
    });
  });
});
