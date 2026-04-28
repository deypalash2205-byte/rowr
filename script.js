document.addEventListener('DOMContentLoaded', () => {
  const images = ['cup 1.png', 'cup 2.png', 'cup 3.png'];
  let currentIndex = 0;
  let isAnimating = false;

  const productImage = document.getElementById('carousel-image');
  const btnPrev = document.querySelector('.carousel-control.prev');
  const btnNext = document.querySelector('.carousel-control.next');
  const dots = document.querySelectorAll('.dot');

  function updateSlide(newIndex) {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    // 1. Transition out current image
    productImage.classList.add('transitioning-out');

    // Update dots immediately for responsiveness
    dots.forEach((dot, index) => {
      if (index === newIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // 2. Wait for opacity fade out (300ms defined in CSS)
    setTimeout(() => {
      // 3. Change image source
      productImage.src = images[newIndex];
      currentIndex = newIndex;

      // 4. Snap to transitioning-in state instantly
      productImage.style.transition = 'none'; // Disable transition for snap
      productImage.classList.remove('transitioning-out');
      productImage.classList.add('transitioning-in');

      // 5. Force reflow to apply the snap instantly
      void productImage.offsetWidth;

      // 6. Restore transition and remove transitioning-in class to animate to normal state
      productImage.style.transition = ''; // Restore CSS transition
      productImage.classList.remove('transitioning-in');

      // Prevent new animations until this one settles
      setTimeout(() => {
        isAnimating = false;
      }, 600); // 600ms transform transition duration
    }, 300);
  }

  btnNext.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % images.length;
    updateSlide(newIndex);
  });

  btnPrev.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide(newIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const newIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateSlide(newIndex);
    });
  });

  // Video Mute Toggle Logic
  const video = document.getElementById('brand-video');
  const muteBtn = document.getElementById('mute-toggle');
  
  if (video && muteBtn) {
    const iconMuted = muteBtn.querySelector('.icon-muted');
    const iconUnmuted = muteBtn.querySelector('.icon-unmuted');

    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      if (video.muted) {
        iconMuted.style.display = 'block';
        iconUnmuted.style.display = 'none';
      } else {
        iconMuted.style.display = 'none';
        iconUnmuted.style.display = 'block';
      }
    });
  }

  // Mobile Menu Toggle Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
});
