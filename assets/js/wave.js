(function () {
    const wave = document.querySelector(`.wave`);
    const progressIndicator = document.querySelector(`.progress-indicator`);
    const progressLabel = document.querySelector(
      `.progress-label > strong`
    );
    const input = document.querySelector(`input[type="number"]`);

    input.oninput = ({ target }) => {
      let value =
        target.value <= 100 && target.value >= 0 ? target.value : 40;
      progressLabel.textContent = value;
      wave.style.setProperty(`--progress-value`, value);
      wave.dataset.value = value;

      if (value > 50) progress.classList.add(`progress--upper-half-value`);
      else
        wave.classList.contains("progress--upper-half-value") &&
          wave.classList.remove(`progress--upper-half-value`);
    };
  })();