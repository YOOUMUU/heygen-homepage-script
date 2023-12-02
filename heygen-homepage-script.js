const HeygenHome = {};

HeygenHome.openTab = function (tabName, tabContentSelector, tabLinkSelector) {
  const tabcontent = document.querySelectorAll(tabContentSelector);
  const tablinks = document.querySelectorAll(tabLinkSelector);

  tabcontent.forEach((tc) => tc.classList.add('is-hidden'));
  tablinks.forEach((tl) => tl.classList.remove('is-active'));

  document.getElementById(tabName).classList.remove('is-hidden');
  document
    .getElementById(`script_tab${tabName.split('-').pop()}`)
    .classList.add('is-active');
};

HeygenHome.setupVideoPlayback = function (
  selector,
  videoClass,
  fullscreenVideoId,
  fullscreenContainerId
) {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener('click', () => {
      const video = button.closest(videoClass).querySelector('video');
      playFullscreenVideo(video, fullscreenVideoId, fullscreenContainerId);
    });
  });
};

HeygenHome.playFullscreenVideo = function (
  video,
  fullscreenVideoId,
  fullscreenContainerId
) {
  const fullscreenVideo = document.getElementById(fullscreenVideoId);
  const fullscreenContainer = document.getElementById(fullscreenContainerId);

  fullscreenVideo.src = video.src;
  fullscreenVideo.currentTime = 0;
  fullscreenVideo.play();
  fullscreenContainer.style.display = 'flex';
};

HeygenHome.setupAudioPlayback = function (
  buttonSelector,
  playIconClass,
  pauseIconClass
) {
  document.querySelectorAll(buttonSelector).forEach((button) => {
    const audio = button.querySelector('audio');
    if (!audio) return;

    audio.addEventListener('ended', () =>
      resetAudioButton(button, playIconClass, pauseIconClass)
    );
    button.addEventListener('click', () =>
      toggleAudio(audio, button, playIconClass, pauseIconClass)
    );
  });
};

HeygenHome.toggleAudio = function (
  audio,
  button,
  playIconClass,
  pauseIconClass
) {
  const isPlaying = !audio.paused;
  resetAllAudio(buttonSelector, playIconClass, pauseIconClass);
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
    updateButtonState(button, true, playIconClass, pauseIconClass);
  }
};

HeygenHome.resetAllAudio = function (
  buttonSelector,
  playIconClass,
  pauseIconClass
) {
  document.querySelectorAll(buttonSelector).forEach((button) => {
    const audio = button.querySelector('audio');
    if (audio) audio.pause();
    updateButtonState(button, false, playIconClass, pauseIconClass);
  });
};

HeygenHome.updateButtonState = function (
  button,
  isPlaying,
  playIconClass,
  pauseIconClass
) {
  const playIcon = button.querySelector(playIconClass);
  const pauseIcon = button.querySelector(pauseIconClass);

  playIcon.classList.toggle('is-hidden', isPlaying);
  pauseIcon.classList.toggle('is-hidden', !isPlaying);
  button.classList.toggle('is-selected', isPlaying);
};

HeygenHome.resetAudioButton = function (button, playIconClass, pauseIconClass) {
  updateButtonState(button, false, playIconClass, pauseIconClass);
};

HeygenHome.setupVideoAutoplay = function (videoSelector) {
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback);
  document.querySelectorAll(videoSelector).forEach((video) => {
    observer.observe(video);
  });
};

HeygenHome.setupSlider = function (sliderId, prevBtnId, nextBtnId) {
  const slider = new Splide(sliderId, {
    perMove: 1,
    focus: 0,
    type: 'slide',
    arrows: false,
    pagination: false,
    speed: 400,
    dragAngleThreshold: 30,
    autoWidth: true,
    rewind: false,
    rewindSpeed: 400,
    drag: true,
    trimSpace: true,
  });

  slider.mount();

  const prevButton = document.querySelector(prevBtnId);
  const nextButton = document.querySelector(nextBtnId);

  prevButton.addEventListener('click', () => slider.go('<'));
  nextButton.addEventListener('click', () => slider.go('>'));

  function updateButtons() {
    prevButton.classList.toggle('is-active', slider.index !== 0);
    nextButton.classList.toggle(
      'is-active',
      slider.index !== slider.length - 1
    );
  }

  updateButtons();
  slider.on('moved', updateButtons);
};

window.HeygenHome = HeygenHome;
